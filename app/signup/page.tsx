'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import Link from 'next/link';
import { auth } from '@/lib/firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { useRouter } from 'next/navigation';

export default function SignupPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  
  const handleSignup = async (userType: 'student' | 'mentor') => {
    // Reset error state
    setError('');
    
    // Validate form inputs
    if (!email || !password || !confirmPassword) {
      setError('All fields are required');
      return;
    }
    
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    
    if (password.length < 6) {
      setError('Password should be at least 6 characters');
      return;
    }
    
    try {
      setLoading(true);
      
      // Create user with Firebase Auth
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      
      const user = userCredential.user;
      console.log('User created successfully:', user);
      
      // Store user type in localStorage for redirection logic
      localStorage.setItem('userType', userType);
      
      // Redirect to the appropriate registration page based on user type
      if (userType === 'student') {
        router.push('/student/registration');
      } else {
        router.push('/mentor/registration');
      }
      
    } catch (err: any) {
      console.error('Signup error:', err);
      // Handle specific Firebase auth errors
      if (err.code === 'auth/email-already-in-use') {
        setError('Email already in use. Please login instead.');
      } else if (err.code === 'auth/invalid-email') {
        setError('Invalid email address.');
      } else if (err.code === 'auth/weak-password') {
        setError('Password is too weak.');
      } else {
        setError('Failed to create account. Please try again.');
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
            Create Your VibeFlow Account
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
              placeholder="Create a password"
              required
            />
          </div>

          <div>
            <Label htmlFor="confirmPassword">Confirm Password</Label>
            <Input
              id="confirmPassword"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm your password"
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
              onClick={() => handleSignup('student')}
              disabled={loading}
            >
              {loading ? 'Signing up...' : 'Sign up as Student'}
            </Button>
            
            <Button 
              variant="outline" 
              className="w-full"
              onClick={() => handleSignup('mentor')}
              disabled={loading}
            >
              {loading ? 'Signing up...' : 'Sign up as Mentor'}
            </Button>
          </div>
        </CardContent>
        
        <CardFooter className="flex justify-center flex-col gap-1">
          <p className="text-sm text-center text-muted-foreground">
            Already have an account?
          </p>
          <Link href="/login" className="text-sm text-primary hover:underline">
            Login here
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
}
