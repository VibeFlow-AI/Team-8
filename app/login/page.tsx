'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardHeader, CardContent, CardFooter, CardTitle } from '@/components/ui/card';
import { auth } from '@/lib/firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (userType: 'student' | 'mentor') => {
    // Reset error state
    setError('');
    
    // Validate form inputs
    if (!email || !password) {
      setError('Email and password are required');
      return;
    }
    
    try {
      setLoading(true);
      
      // Sign in with Firebase Auth
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      
      const user = userCredential.user;
      console.log('User logged in successfully:', user);
      
      // Store user type in localStorage for future reference
      localStorage.setItem('userType', userType);
      
      // Redirect to the appropriate dashboard based on user type
      if (userType === 'student') {
        router.push('/student/dashboard');
      } else {
        router.push('/mentor/dashboard');
      }
      
    } catch (err: any) {
      console.error('Login error:', err);
      // Handle specific Firebase auth errors
      if (err.code === 'auth/user-not-found' || err.code === 'auth/wrong-password') {
        setError('Invalid email or password');
      } else if (err.code === 'auth/invalid-email') {
        setError('Invalid email address');
      } else if (err.code === 'auth/too-many-requests') {
        setError('Too many failed login attempts. Please try again later');
      } else {
        setError('Failed to login. Please try again');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">
            Login to VibeFlow
          </CardTitle>
        </CardHeader>
        
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
            />
          </div>
          
          <div>
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
            />
          </div>

          {error && (
            <div className="bg-red-50 text-red-600 p-3 rounded-md text-sm">
              {error}
            </div>
          )}

          <div className="pt-4 flex flex-col gap-3">
            <Button 
              variant="default" 
              className="w-full"
              onClick={() => handleLogin('student')}
              disabled={loading}
            >
              {loading ? 'Logging in...' : 'Login as Student'}
            </Button>
            
            <Button 
              variant="outline" 
              className="w-full"
              onClick={() => handleLogin('mentor')}
              disabled={loading}
            >
              {loading ? 'Logging in...' : 'Login as Mentor'}
            </Button>
          </div>
        </CardContent>
        
        <CardFooter className="flex justify-center flex-col gap-1">
          <p className="text-sm text-center text-muted-foreground">
            Don't have an account?
          </p>
          <Link href="/signup" className="text-sm text-primary hover:underline">
            Sign up here
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
}
