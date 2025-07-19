// Types for Student Registration API

export interface StudentSubject {
  subjectName: string;
  currentYear: number;
  skillLevel: 'Beginner' | 'Intermediate' | 'Advanced';
}

export interface StudentRegistrationRequest {
  // Firebase authentication
  firebaseUid: string;
  email: string;
  
  // Student personal details
  fullName: string;
  age: number;
  contactNumber: string;
  educationLevel: 'Grade_9' | 'O_L' | 'A_L';
  school: string;
  preferredLearningStyle: 'Visual' | 'Hands_On' | 'Theoretical' | 'Mixed';
  learningDisabilities: boolean;
  disabilityDetails?: string;
  
  // Student academic details
  subjects: StudentSubject[];
}

export interface StudentRegistrationResponse {
  success: boolean;
  message: string;
  data: {
    user: {
      userId: bigint;
      firebaseUid: string;
      email: string;
      role: string;
      createdAt: Date;
    };
    studentDetails: {
      fullName: string;
      age: number;
      contactNumber: string;
      educationLevel: string;
      school: string;
      preferredLearningStyle: string;
      learningDisabilities: boolean;
      disabilityDetails: string | null;
      createdAt: Date;
    };
    subjects: {
      id: bigint;
      subjectName: string;
      currentYear: number;
      skillLevel: string;
    }[];
  };
}

export interface ApiErrorResponse {
  error: string;
  details?: {
    field: string;
    message: string;
    code: string;
  }[];
}
