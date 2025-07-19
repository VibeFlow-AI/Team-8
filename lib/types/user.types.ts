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
  // Firebase authentication
  firebaseUid: string;
  email: string;
  
  // Personal information
  fullName: string;
  age: number;
  contactNumber: string;
  
  // Academic information
  educationLevel: 'Grade_9' | 'O_L' | 'A_L';
  school: string;
  
  // Learning preferences
  preferredLearningStyle: 'Visual' | 'Hands_On' | 'Theoretical' | 'Mixed';
  learningDisabilities: boolean;
  disabilityDetails?: string;
  
  // Subjects of interest
  subjects: {
    subjectName: string;
    currentYear: number;
    skillLevel: 'Beginner' | 'Intermediate' | 'Advanced';
  }[];
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
