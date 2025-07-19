/**
 * API utilities for making HTTP requests
 */

export interface RequestConfig {
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE';
  headers?: Record<string, string>;
  body?: any;
}

/**
 * Base API client with common functionality
 */
export class ApiClient {
  private static baseUrl = process.env.NEXT_PUBLIC_API_URL || '/api';

  /**
   * Make an authenticated API request
   */
  static async request<T>(endpoint: string, config: RequestConfig = {}): Promise<T> {
    const { method = 'GET', headers = {}, body } = config;
    
    const url = `${this.baseUrl}${endpoint}`;
    
    // Add auth token if available
    const token = this.getAuthToken();
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    // Add content type for POST/PUT requests
    if (body && !headers['Content-Type']) {
      headers['Content-Type'] = 'application/json';
    }

    const requestConfig: RequestInit = {
      method,
      headers,
      ...(body && { body: typeof body === 'string' ? body : JSON.stringify(body) }),
    };

    try {
      const response = await fetch(url, requestConfig);
      
      if (!response.ok) {
        const errorData = await this.parseErrorResponse(response);
        throw new ApiError(errorData.message || 'Request failed', response.status, errorData);
      }

      // Handle empty responses
      if (response.status === 204) {
        return {} as T;
      }

      const data = await response.json();
      return data;
    } catch (error) {
      if (error instanceof ApiError) {
        throw error;
      }
      
      // Network or parsing errors
      throw new ApiError(
        error instanceof Error ? error.message : 'Network error',
        0,
        error
      );
    }
  }

  /**
   * GET request
   */
  static async get<T>(endpoint: string, params?: Record<string, any>): Promise<T> {
    let url = endpoint;
    
    if (params) {
      const searchParams = new URLSearchParams();
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          searchParams.append(key, String(value));
        }
      });
      
      if (searchParams.toString()) {
        url += `?${searchParams.toString()}`;
      }
    }
    
    return this.request<T>(url);
  }

  /**
   * POST request
   */
  static async post<T>(endpoint: string, data?: any): Promise<T> {
    return this.request<T>(endpoint, {
      method: 'POST',
      body: data,
    });
  }

  /**
   * PUT request
   */
  static async put<T>(endpoint: string, data?: any): Promise<T> {
    return this.request<T>(endpoint, {
      method: 'PUT',
      body: data,
    });
  }

  /**
   * DELETE request
   */
  static async delete<T>(endpoint: string): Promise<T> {
    return this.request<T>(endpoint, {
      method: 'DELETE',
    });
  }

  /**
   * Get auth token from storage
   */
  private static getAuthToken(): string | null {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('authToken');
    }
    return null;
  }

  /**
   * Parse error response
   */
  private static async parseErrorResponse(response: Response): Promise<any> {
    try {
      return await response.json();
    } catch {
      return { message: response.statusText || 'Unknown error' };
    }
  }
}

/**
 * Custom API Error class
 */
export class ApiError extends Error {
  constructor(
    message: string,
    public status: number,
    public details?: any
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

/**
 * Request interceptor for automatic token refresh
 */
export function setupTokenRefresh() {
  // This would typically be implemented to automatically refresh tokens
  // when they expire and retry failed requests
}

/**
 * Upload file utility
 */
export async function uploadFile(file: File, endpoint: string): Promise<string> {
  const formData = new FormData();
  formData.append('file', file);

  const token = typeof window !== 'undefined' ? localStorage.getItem('authToken') : null;
  
  const response = await fetch(`${ApiClient['baseUrl']}${endpoint}`, {
    method: 'POST',
    body: formData,
    headers: {
      ...(token && { Authorization: `Bearer ${token}` }),
    },
  });

  if (!response.ok) {
    throw new Error('File upload failed');
  }

  const data = await response.json();
  return data.url;
}
