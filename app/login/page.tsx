'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userType, setUserType] = useState<'student' | 'mentor'>('student');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle login logic here
    console.log('Login attempt:', { email, password, userType });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <Card className="w-full max-w-md p-6">
        <h1 className="text-2xl font-bold text-center mb-6">Login to VibeFlow</h1>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
              required
            />
          </div>

          <div>
            <Label>I am a:</Label>
            <div className="flex gap-4 mt-2">
              <label className="flex items-center">
                <input
                  type="radio"
                  value="student"
                  checked={userType === 'student'}
                  onChange={(e) => setUserType(e.target.value as 'student' | 'mentor')}
                  className="mr-2"
                />
                Student
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  value="mentor"
                  checked={userType === 'mentor'}
                  onChange={(e) => setUserType(e.target.value as 'student' | 'mentor')}
                  className="mr-2"
                />
                Mentor
              </label>
            </div>
          </div>

          <Button type="submit" className="w-full">
            Login
          </Button>
        </form>

        <div className="mt-4 text-center text-sm">
          <p>Don't have an account?</p>
          <div className="mt-2 space-x-4">
            <a href="/student/registration" className="text-blue-600 hover:underline">
              Register as Student
            </a>
            <a href="/mentor/registration" className="text-blue-600 hover:underline">
              Register as Mentor
            </a>
          </div>
        </div>
      </Card>
    </div>
  );
}
