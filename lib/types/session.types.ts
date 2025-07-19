// Types for session-related operations
export interface Session {
  id: string;
  studentId: string;
  mentorId: string;
  studentName: string;
  mentorName: string;
  subject: string;
  description: string;
  date: string;
  time: string;
  duration: number; // in minutes
  status: SessionStatus;
  meetingLink?: string;
  price: number;
  notes?: string;
}

export interface SessionRequest {
  id: string;
  studentId: string;
  mentorId: string;
  studentName: string;
  subject: string;
  description: string;
  date: string;
  time: string;
  duration: number;
  status: 'pending' | 'approved' | 'rejected';
}

export interface BookSessionRequest {
  mentorId: string;
  subject: string;
  description: string;
  date: string;
  time: string;
  duration: number;
}

export interface Mentor {
  id: string;
  name: string;
  email?: string;
  title?: string;
  organization?: string;
  expertise: string[];
  experience?: string;
  rating: number;
  price: number; // hourlyRate for consistency
  bio?: string;
  availability: string[];
  profileImage?: string;
}

export type SessionStatus = 'upcoming' | 'in-progress' | 'completed' | 'cancelled';

export interface SessionFilters {
  status?: SessionStatus;
  mentorId?: string;
  studentId?: string;
  dateFrom?: string;
  dateTo?: string;
}
