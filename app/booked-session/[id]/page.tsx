'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';

interface SessionDetails {
  id: string;
  mentorName: string;
  mentorEmail: string;
  subject: string;
  description: string;
  date: string;
  time: string;
  duration: number;
  status: 'upcoming' | 'in-progress' | 'completed' | 'cancelled';
  meetingLink?: string;
  price: number;
  notes?: string;
}

export default function BookedSessionPage({ params }: { params: { id: string } }) {
  const [session, setSession] = useState<SessionDetails | null>(null);
  const [notes, setNotes] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Mock data - replace with actual API call using params.id
    setTimeout(() => {
      setSession({
        id: params.id || '1',
        mentorName: 'Dr. Sarah Wilson',
        mentorEmail: 'sarah.wilson@email.com',
        subject: 'Machine Learning Fundamentals',
        description: 'Introduction to ML algorithms and their applications',
        date: '2025-07-25',
        time: '14:00',
        duration: 60,
        status: 'upcoming',
        meetingLink: 'https://meet.google.com/abc-def-ghi',
        price: 50,
        notes: 'Please prepare your questions about neural networks.'
      });
      setLoading(false);
    }, 1000);
  }, [params.id]);

  const handleCancelSession = () => {
    if (confirm('Are you sure you want to cancel this session?')) {
      // Handle cancellation logic
      console.log('Cancelling session:', session?.id);
      if (session) {
        setSession({ ...session, status: 'cancelled' });
      }
    }
  };

  const handleAddNotes = () => {
    if (session) {
      setSession({ ...session, notes: notes });
      setNotes('');
      alert('Notes saved successfully!');
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'upcoming':
        return 'bg-blue-100 text-blue-800';
      case 'in-progress':
        return 'bg-green-100 text-green-800';
      case 'completed':
        return 'bg-gray-100 text-gray-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading session details...</p>
        </div>
      </div>
    );
  }

  if (!session) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Card className="p-8 text-center">
          <h1 className="text-2xl font-bold text-red-600 mb-4">Session Not Found</h1>
          <p className="text-gray-600 mb-4">The session you're looking for doesn't exist.</p>
          <Button>
            <a href="/student-dashboard">Back to Dashboard</a>
          </Button>
        </Card>
      </div>
    );
  }

  const sessionDateTime = new Date(`${session.date}T${session.time}`);
  const now = new Date();
  const isUpcoming = sessionDateTime > now;
  const canJoin = sessionDateTime <= now && session.status === 'upcoming';

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="mb-6">
          <Button variant="outline" className="mb-4">
            <a href="/student-dashboard">← Back to Dashboard</a>
          </Button>
          <h1 className="text-3xl font-bold">Session Details</h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <Card className="p-6">
              <div className="flex justify-between items-start mb-4">
                <h2 className="text-2xl font-semibold">{session.subject}</h2>
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(session.status)}`}>
                  {session.status.charAt(0).toUpperCase() + session.status.slice(1)}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <h3 className="font-semibold text-gray-700">Mentor</h3>
                  <p className="text-lg">{session.mentorName}</p>
                  <p className="text-sm text-gray-600">{session.mentorEmail}</p>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-700">Duration & Price</h3>
                  <p className="text-lg">{session.duration} minutes</p>
                  <p className="text-sm text-gray-600">${session.price}</p>
                </div>
              </div>

              <div className="mb-4">
                <h3 className="font-semibold text-gray-700 mb-2">Description</h3>
                <p className="text-gray-600">{session.description}</p>
              </div>

              {session.notes && (
                <div className="mb-4">
                  <h3 className="font-semibold text-gray-700 mb-2">Notes</h3>
                  <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
                    <p className="text-gray-700">{session.notes}</p>
                  </div>
                </div>
              )}
            </Card>

            {session.status !== 'cancelled' && session.status !== 'completed' && (
              <Card className="p-6">
                <h3 className="text-lg font-semibold mb-4">Add Notes</h3>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="notes">Session Notes</Label>
                    <Textarea
                      id="notes"
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      placeholder="Add any notes or questions for this session..."
                      rows={4}
                    />
                  </div>
                  <Button onClick={handleAddNotes} disabled={!notes.trim()}>
                    Save Notes
                  </Button>
                </div>
              </Card>
            )}
          </div>

          <div className="space-y-6">
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4">Session Time</h3>
              <div className="space-y-2">
                <div>
                  <p className="text-sm text-gray-600">Date</p>
                  <p className="text-lg font-medium">
                    {sessionDateTime.toLocaleDateString('en-US', {
                      weekday: 'long',
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Time</p>
                  <p className="text-lg font-medium">
                    {sessionDateTime.toLocaleTimeString('en-US', {
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </p>
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4">Actions</h3>
              <div className="space-y-3">
                {canJoin && session.meetingLink && (
                  <Button className="w-full" size="lg">
                    <a href={session.meetingLink} target="_blank" rel="noopener noreferrer">
                      Join Session
                    </a>
                  </Button>
                )}

                {isUpcoming && session.status === 'upcoming' && (
                  <>
                    <Button variant="outline" className="w-full">
                      Reschedule Session
                    </Button>
                    <Button 
                      variant="destructive" 
                      className="w-full"
                      onClick={handleCancelSession}
                    >
                      Cancel Session
                    </Button>
                  </>
                )}

                {session.status === 'completed' && (
                  <Button variant="outline" className="w-full">
                    Rate & Review
                  </Button>
                )}

                <Button variant="outline" className="w-full">
                  Contact Mentor
                </Button>
              </div>
            </Card>

            {session.meetingLink && (
              <Card className="p-6">
                <h3 className="text-lg font-semibold mb-4">Meeting Details</h3>
                <div>
                  <p className="text-sm text-gray-600 mb-2">Meeting Link</p>
                  <div className="bg-gray-50 p-3 rounded border">
                    <a 
                      href={session.meetingLink} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline text-sm break-all"
                    >
                      {session.meetingLink}
                    </a>
                  </div>
                </div>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
