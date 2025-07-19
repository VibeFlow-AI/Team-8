// Example usage of the Student Registration API with Firebase Authentication

import type { StudentRegistrationRequest, StudentRegistrationResponse } from '../types/student';

/**
 * Register a new student with Firebase authentication
 * @param studentData - The student registration data
 * @returns Promise with registration response
 */
export async function registerStudent(
  studentData: StudentRegistrationRequest
): Promise<StudentRegistrationResponse> {
  const response = await fetch('/api/student/register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(studentData),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || 'Registration failed');
  }

  return data;
}

// Example request body for student registration:
export const exampleStudentRegistration: StudentRegistrationRequest = {
  // Firebase authentication (obtained after Firebase Auth)
  firebaseUid: "firebase_user_uid_here",
  email: "john.doe@student.com",
  
  // Personal details
  fullName: "John Doe",
  age: 16,
  contactNumber: "0771234567",
  educationLevel: "O_L", // Grade_9, O_L, or A_L
  school: "Colombo International School",
  preferredLearningStyle: "Mixed", // Visual, Hands_On, Theoretical, or Mixed
  
  // Accommodations or disabilities
  learningDisabilities: true,
  disabilityDetails: "Mild dyslexia, requires extra time for reading comprehension",
  
  // Subjects of interest with skill levels
  subjects: [
    {
      subjectName: "Mathematics",
      currentYear: 11,
      skillLevel: "Intermediate"
    },
    {
      subjectName: "Physics",
      currentYear: 11,
      skillLevel: "Beginner"
    },
    {
      subjectName: "Chemistry",
      currentYear: 11,
      skillLevel: "Advanced"
    },
    {
      subjectName: "English Literature",
      currentYear: 11,
      skillLevel: "Intermediate"
    }
  ]
};

// Example with no disabilities:
export const exampleStudentNoDisabilities: StudentRegistrationRequest = {
  firebaseUid: "firebase_user_uid_2",
  email: "jane.smith@student.com",
  fullName: "Jane Smith",
  age: 17,
  contactNumber: "0779876543",
  educationLevel: "A_L",
  school: "Royal College Colombo",
  preferredLearningStyle: "Visual",
  learningDisabilities: false,
  // disabilityDetails not provided when learningDisabilities is false
  subjects: [
    {
      subjectName: "Biology",
      currentYear: 12,
      skillLevel: "Advanced"
    },
    {
      subjectName: "Chemistry",
      currentYear: 12,
      skillLevel: "Advanced"
    }
  ]
};

// Usage with Firebase Authentication:
/*
import { auth } from '../firebase/config'; // Your Firebase config
import { createUserWithEmailAndPassword } from 'firebase/auth';

async function completeStudentRegistration(email: string, password: string, studentData: Omit<StudentRegistrationRequest, 'firebaseUid' | 'email'>) {
  try {
    // 1. Create user with Firebase Auth
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const firebaseUser = userCredential.user;
    
    // 2. Register student in your database
    const registrationData: StudentRegistrationRequest = {
      firebaseUid: firebaseUser.uid,
      email: firebaseUser.email!,
      ...studentData
    };
    
    const result = await registerStudent(registrationData);
    console.log('Student registered successfully:', result);
    
    return result;
  } catch (error) {
    console.error('Registration failed:', error);
    throw error;
  }
}
*/
