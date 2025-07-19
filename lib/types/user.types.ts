// Types for user authentication and management
export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: UserRole;
  profileImage?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Student extends User {
  role: 'student';
  university: string;
  major: string;
  year: string;
  bio?: string;
}

export interface Mentor extends User {
  role: 'mentor';
  title: string;
  organization: string;
  expertise: string[];
  experience: string;
  education: string;
  hourlyRate: number;
  bio: string;
  availability: string[];
  rating: number;
  totalSessions: number;
  linkedin?: string;
  portfolio?: string;
}

export type UserRole = 'student' | 'mentor';

export interface LoginRequest {
  email: string;
  password: string;
  userType: UserRole;
}

export interface RegisterStudentRequest {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  university: string;
  major: string;
  year: string;
  bio?: string;
}

export interface RegisterMentorRequest {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  title: string;
  organization: string;
  expertise: string[];
  experience: string;
  education: string;
  hourlyRate: number;
  bio: string;
  availability: string[];
  linkedin?: string;
  portfolio?: string;
}

export interface AuthResponse {
  user: User;
  token: string;
  refreshToken: string;
}
