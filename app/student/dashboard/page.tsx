'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

interface Session {
  id: string;
  mentorName: string;
  subject: string;
  date: string;
  time: string;
  status: 'upcoming' | 'completed' | 'cancelled';
}

export default function StudentDashboardPage() {
  const [sessions, setSessions] = useState<Session[]>([]);
  const [studentName, setStudentName] = useState('John Doe'); // Mock data

  useEffect(() => {
    // Mock data - replace with actual API call
    setSessions([
      {
        id: '1',
        mentorName: 'Dr. Sarah Wilson',
        subject: 'Computer Science',
        date: '2025-07-25',
        time: '2:00 PM',
        status: 'upcoming'
      },
      {
        id: '2',
        mentorName: 'Prof. Michael Chen',
        subject: 'Mathematics',
        date: '2025-07-20',
        time: '10:00 AM',
        status: 'completed'
      }
    ]);
  }, []);

  const upcomingSessions = sessions.filter(session => session.status === 'upcoming');
  const pastSessions = sessions.filter(session => session.status === 'completed');

  return (
    <div className="p-6">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">Welcome back, {studentName}!</h1>
          <p className="text-gray-600 mt-2">Manage your mentoring sessions and bookings</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-2">Total Sessions</h3>
            <p className="text-3xl font-bold text-blue-600">{sessions.length}</p>
          </Card>
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-2">Upcoming Sessions</h3>
            <p className="text-3xl font-bold text-green-600">{upcomingSessions.length}</p>
          </Card>
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-2">Completed Sessions</h3>
            <p className="text-3xl font-bold text-gray-600">{pastSessions.length}</p>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Upcoming Sessions</h2>
              <Button>
                <a href="/student/book-session">Book New Session</a>
              </Button>
            </div>
            {upcomingSessions.length > 0 ? (
              <div className="space-y-4">
                {upcomingSessions.map((session) => (
                  <div key={session.id} className="border rounded-lg p-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-semibold">{session.mentorName}</h3>
                        <p className="text-gray-600">{session.subject}</p>
                        <p className="text-sm text-gray-500">{session.date} at {session.time}</p>
                      </div>
                      <Button variant="outline" size="sm">
                        <a href={`/student/booked-session/${session.id}`}>View Details</a>
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500">No upcoming sessions</p>
            )}
          </Card>

          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4">Recent Sessions</h2>
            {pastSessions.length > 0 ? (
              <div className="space-y-4">
                {pastSessions.map((session) => (
                  <div key={session.id} className="border rounded-lg p-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-semibold">{session.mentorName}</h3>
                        <p className="text-gray-600">{session.subject}</p>
                        <p className="text-sm text-gray-500">{session.date} at {session.time}</p>
                      </div>
                      <span className="px-2 py-1 bg-green-100 text-green-800 rounded text-xs">
                        Completed
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500">No completed sessions yet</p>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
}
