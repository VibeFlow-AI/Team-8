import { useState, useEffect } from 'react';
import { User, AuthResponse } from '@/lib/types/user.types';
import { AuthService } from '@/lib/services/auth.service';

/**
 * Custom hook for authentication state management
 */
export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Initialize auth state on mount
  useEffect(() => {
    const initAuth = async () => {
      try {
        setIsLoading(true);
        const currentUser = await AuthService.getCurrentUser();
        setUser(currentUser);
      } catch (err) {
        console.error('Auth initialization error:', err);
        setError('Failed to initialize authentication');
      } finally {
        setIsLoading(false);
      }
    };

    initAuth();
  }, []);

  const login = async (email: string, password: string, userType: 'student' | 'mentor') => {
    try {
      setIsLoading(true);
      setError(null);
      
      const response: AuthResponse = await AuthService.login({
        email,
        password,
        userType,
      });
      
      setUser(response.user);
      
      // Store user in localStorage for persistence
      if (typeof window !== 'undefined') {
        localStorage.setItem('user', JSON.stringify(response.user));
      }
      
      return response;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Login failed';
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    try {
      setIsLoading(true);
      await AuthService.logout();
      setUser(null);
      setError(null);
    } catch (err) {
      console.error('Logout error:', err);
      // Clear user state even if logout fails
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  };

  const isAuthenticated = !!user;
  const isStudent = user?.role === 'student';
  const isMentor = user?.role === 'mentor';

  return {
    user,
    isLoading,
    error,
    isAuthenticated,
    isStudent,
    isMentor,
    login,
    logout,
  };
}
