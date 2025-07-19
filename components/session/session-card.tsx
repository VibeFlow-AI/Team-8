import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Session } from '@/lib/types/session.types';

interface SessionCardProps {
  session: Session;
  userRole: 'student' | 'mentor';
  onViewDetails?: (sessionId: string) => void;
  onJoinSession?: (sessionId: string) => void;
  onCancel?: (sessionId: string) => void;
}

export function SessionCard({ 
  session, 
  userRole, 
  onViewDetails, 
  onJoinSession, 
  onCancel 
}: SessionCardProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'upcoming':
        return 'default';
      case 'in-progress':
        return 'secondary';
      case 'completed':
        return 'outline';
      case 'cancelled':
        return 'destructive';
      default:
        return 'outline';
    }
  };

  const formatDate = (date: string, time: string) => {
    const sessionDate = new Date(`${date}T${time}`);
    return sessionDate.toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const canJoinSession = () => {
    const sessionDateTime = new Date(`${session.date}T${session.time}`);
    const now = new Date();
    const timeDiff = sessionDateTime.getTime() - now.getTime();
    // Allow joining 15 minutes before session
    return timeDiff <= 15 * 60 * 1000 && timeDiff > -30 * 60 * 1000 && session.status === 'upcoming';
  };

  return (
    <Card className="p-4">
      <div className="flex justify-between items-start mb-3">
        <div>
          <h3 className="font-semibold text-lg">{session.subject}</h3>
          <p className="text-gray-600 text-sm">
            {userRole === 'student' ? `with ${session.mentorName}` : `with ${session.studentName}`}
          </p>
        </div>
        <Badge variant={getStatusColor(session.status)}>
          {session.status.charAt(0).toUpperCase() + session.status.slice(1)}
        </Badge>
      </div>

      <div className="mb-3 space-y-1">
        <p className="text-sm">
          <span className="font-medium">Date:</span> {formatDate(session.date, session.time)}
        </p>
        <p className="text-sm">
          <span className="font-medium">Duration:</span> {session.duration} minutes
        </p>
        <p className="text-sm">
          <span className="font-medium">Price:</span> ${session.price}
        </p>
      </div>

      {session.description && (
        <p className="text-sm text-gray-600 mb-4 line-clamp-2">
          {session.description}
        </p>
      )}

      <div className="flex gap-2">
        {onViewDetails && (
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => onViewDetails(session.id)}
            className="flex-1"
          >
            View Details
          </Button>
        )}

        {canJoinSession() && onJoinSession && session.meetingLink && (
          <Button 
            size="sm" 
            onClick={() => onJoinSession(session.id)}
            className="flex-1"
          >
            Join Session
          </Button>
        )}

        {session.status === 'upcoming' && onCancel && (
          <Button 
            variant="destructive" 
            size="sm" 
            onClick={() => onCancel(session.id)}
          >
            Cancel
          </Button>
        )}
      </div>
    </Card>
  );
}
