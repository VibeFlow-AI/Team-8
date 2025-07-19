import { useState, useEffect } from 'react';
import { Session, SessionRequest } from '@/lib/types/session.types';
import { SessionService } from '@/lib/services/session.service';

/**
 * Custom hook for session management
 */
export function useSessions(userId: string, userRole: 'student' | 'mentor') {
  const [sessions, setSessions] = useState<Session[]>([]);
  const [sessionRequests, setSessionRequests] = useState<SessionRequest[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch sessions on mount and when userId changes
  useEffect(() => {
    if (!userId) return;

    const fetchSessions = async () => {
      try {
        setIsLoading(true);
        setError(null);

        if (userRole === 'student') {
          const userSessions = await SessionService.getStudentSessions(userId);
          setSessions(userSessions);
        } else if (userRole === 'mentor') {
          const requests = await SessionService.getMentorSessionRequests(userId);
          setSessionRequests(requests);
          // TODO: Also fetch mentor's confirmed sessions
        }
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Failed to fetch sessions';
        setError(errorMessage);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSessions();
  }, [userId, userRole]);

  const bookSession = async (mentorId: string, sessionData: any) => {
    try {
      setError(null);
      const newSession = await SessionService.bookSession({
        mentorId,
        ...sessionData,
      });
      
      setSessions(prev => [...prev, newSession]);
      return newSession;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to book session';
      setError(errorMessage);
      throw new Error(errorMessage);
    }
  };

  const respondToRequest = async (requestId: string, action: 'approve' | 'reject') => {
    try {
      setError(null);
      await SessionService.respondToSessionRequest(requestId, action);
      
      // Update local state
      setSessionRequests(prev =>
        prev.map(request =>
          request.id === requestId
            ? { ...request, status: action === 'approve' ? 'approved' : 'rejected' }
            : request
        )
      );
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : `Failed to ${action} request`;
      setError(errorMessage);
      throw new Error(errorMessage);
    }
  };

  const cancelSession = async (sessionId: string) => {
    try {
      setError(null);
      await SessionService.cancelSession(sessionId);
      
      // Update local state
      setSessions(prev =>
        prev.map(session =>
          session.id === sessionId
            ? { ...session, status: 'cancelled' }
            : session
        )
      );
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to cancel session';
      setError(errorMessage);
      throw new Error(errorMessage);
    }
  };

  // Filter sessions by status
  const upcomingSessions = sessions.filter(s => s.status === 'upcoming');
  const completedSessions = sessions.filter(s => s.status === 'completed');
  const pendingRequests = sessionRequests.filter(r => r.status === 'pending');

  return {
    sessions,
    sessionRequests,
    upcomingSessions,
    completedSessions,
    pendingRequests,
    isLoading,
    error,
    bookSession,
    respondToRequest,
    cancelSession,
  };
}
