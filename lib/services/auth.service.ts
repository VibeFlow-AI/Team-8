import { 
  User, 
  LoginRequest, 
  RegisterStudentRequest, 
  RegisterMentorRequest, 
  AuthResponse 
} from '@/lib/types/user.types';
import { ApiResponse } from '@/lib/types/api.types';

/**
 * Service layer for authentication operations
 * Replace mock data with actual API calls when backend is ready
 */
export class AuthService {
  private static baseUrl = process.env.NEXT_PUBLIC_API_URL || '/api';

  /**
   * Authenticate user login
   */
  static async login(credentials: LoginRequest): Promise<AuthResponse> {
    try {
      // TODO: Replace with actual API call
      // const response = await fetch(`${this.baseUrl}/auth/login`, {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(credentials),
      // });
      // const result: ApiResponse<AuthResponse> = await response.json();
      // 
      // if (!result.success) {
      //   throw new Error(result.error || 'Login failed');
      // }
      // 
      // // Store tokens in localStorage or secure storage
      // localStorage.setItem('authToken', result.data.token);
      // localStorage.setItem('refreshToken', result.data.refreshToken);
      // 
      // return result.data;

      // Mock implementation for development
      const mockUser: User = {
        id: Math.random().toString(36).substr(2, 9),
        email: credentials.email,
        firstName: 'Mock',
        lastName: 'User',
        role: credentials.userType,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      const mockResponse: AuthResponse = {
        user: mockUser,
        token: 'mock-jwt-token',
        refreshToken: 'mock-refresh-token',
      };

      return mockResponse;
    } catch (error) {
      console.error('Login error:', error);
      throw new Error('Invalid credentials');
    }
  }

  /**
   * Register a new student
   */
  static async registerStudent(data: RegisterStudentRequest): Promise<AuthResponse> {
   
  }

  /**
   * Register a new mentor
   */
  static async registerMentor(data: RegisterMentorRequest): Promise<AuthResponse> {
    try {
      // TODO: Replace with actual API call
      
      // Mock implementation
      const mockUser: User = {
        id: Math.random().toString(36).substr(2, 9),
        email: data.email,
        firstName: data.firstName,
        lastName: data.lastName,
        role: 'mentor',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      return {
        user: mockUser,
        token: 'mock-jwt-token',
        refreshToken: 'mock-refresh-token',
      };
    } catch (error) {
      console.error('Mentor registration error:', error);
      throw new Error('Registration failed');
    }
  }

  /**
   * Logout user
   */
  static async logout(): Promise<void> {
    try {
      // TODO: Invalidate token on server
      // await fetch(`${this.baseUrl}/auth/logout`, {
      //   method: 'POST',
      //   headers: { 'Authorization': `Bearer ${this.getToken()}` },
      // });

      // Clear local storage
      if (typeof window !== 'undefined') {
        localStorage.removeItem('authToken');
        localStorage.removeItem('refreshToken');
        localStorage.removeItem('user');
      }
    } catch (error) {
      console.error('Logout error:', error);
      // Still clear local storage even if server call fails
      if (typeof window !== 'undefined') {
        localStorage.removeItem('authToken');
        localStorage.removeItem('refreshToken');
        localStorage.removeItem('user');
      }
    }
  }

  /**
   * Get current user from token
   */
  static async getCurrentUser(): Promise<User | null> {
    try {
      const token = this.getToken();
      if (!token) return null;

      // TODO: Replace with actual API call
      // const response = await fetch(`${this.baseUrl}/auth/me`, {
      //   headers: { 'Authorization': `Bearer ${token}` },
      // });
      // const result: ApiResponse<User> = await response.json();
      // return result.data;

      // Mock implementation - get from localStorage
      if (typeof window !== 'undefined') {
        const userStr = localStorage.getItem('user');
        return userStr ? JSON.parse(userStr) : null;
      }
      return null;
    } catch (error) {
      console.error('Get current user error:', error);
      return null;
    }
  }

  /**
   * Refresh access token
   */
  static async refreshToken(): Promise<string | null> {
    try {
      const refreshToken = this.getRefreshToken();
      if (!refreshToken) return null;

      // TODO: Replace with actual API call
      // const response = await fetch(`${this.baseUrl}/auth/refresh`, {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ refreshToken }),
      // });
      // const result: ApiResponse<{ token: string }> = await response.json();
      // 
      // if (result.success) {
      //   localStorage.setItem('authToken', result.data.token);
      //   return result.data.token;
      // }

      return null;
    } catch (error) {
      console.error('Token refresh error:', error);
      return null;
    }
  }

  /**
   * Get stored auth token
   */
  static getToken(): string | null {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('authToken');
    }
    return null;
  }

  /**
   * Get stored refresh token
   */
  static getRefreshToken(): string | null {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('refreshToken');
    }
    return null;
  }

  /**
   * Check if user is authenticated
   */
  static isAuthenticated(): boolean {
    return !!this.getToken();
  }
}
