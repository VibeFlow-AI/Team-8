import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '../../../../lib/generated/prisma';
import { z } from 'zod';

const prisma = new PrismaClient();

// Validation schema for student registration
const studentRegistrationSchema = z.object({
  // Firebase UID and email from Firebase Auth
  firebaseUid: z.string().min(1, 'Firebase UID is required'),
  email: z.string().email('Invalid email address'),
  
  // Student personal details
  fullName: z.string().min(1, 'Full name is required').max(255, 'Full name is too long'),
  age: z.number().int().min(5).max(100, 'Age must be between 5 and 100'),
  contactNumber: z.string().min(10, 'Contact number must be at least 10 digits').max(15, 'Contact number is too long'),
  educationLevel: z.enum(['Grade_9', 'O_L', 'A_L'], {
    errorMap: () => ({ message: 'Education level must be Grade 9, O/L, or A/L' })
  }),
  school: z.string().min(1, 'School name is required').max(255, 'School name is too long'),
  preferredLearningStyle: z.enum(['Visual', 'Hands_On', 'Theoretical', 'Mixed'], {
    errorMap: () => ({ message: 'Learning style must be Visual, Hands-On, Theoretical, or Mixed' })
  }),
  learningDisabilities: z.boolean(),
  disabilityDetails: z.string().max(500, 'Disability details are too long').optional(),
  
  // Student subjects - array of subjects with their details
  subjects: z.array(z.object({
    subjectName: z.string().min(1, 'Subject name is required').max(100, 'Subject name is too long'),
    currentYear: z.number().int().min(1).max(13, 'Current year must be between 1 and 13'),
    skillLevel: z.enum(['Beginner', 'Intermediate', 'Advanced'], {
      errorMap: () => ({ message: 'Skill level must be Beginner, Intermediate, or Advanced' })
    })
  })).min(1, 'At least one subject is required').max(10, 'Maximum 10 subjects allowed')
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validate request body
    const validatedData = studentRegistrationSchema.parse(body);
    
    // Check if user already exists with this Firebase UID or email
    const existingUser = await prisma.user.findFirst({
      where: {
        OR: [
          { firebaseUid: validatedData.firebaseUid },
          { email: validatedData.email }
        ]
      }
    });
    
    if (existingUser) {
      return NextResponse.json(
        { error: 'User with this Firebase UID or email already exists' },
        { status: 409 }
      );
    }
    
    // Create user and student details in a transaction
    const result = await prisma.$transaction(async (tx) => {
      // Create user
      const user = await tx.user.create({
        data: {
          firebaseUid: validatedData.firebaseUid,
          email: validatedData.email,
          role: 'student',
        }
      });
      
      // Create student details
      const studentDetails = await tx.studentDetails.create({
        data: {
          userId: user.userId,
          fullName: validatedData.fullName,
          age: validatedData.age,
          contactNumber: validatedData.contactNumber,
          educationLevel: validatedData.educationLevel,
          school: validatedData.school,
          preferredLearningStyle: validatedData.preferredLearningStyle,
          learningDisabilities: validatedData.learningDisabilities,
          disabilityDetails: validatedData.learningDisabilities ? (validatedData.disabilityDetails || null) : null,
        }
      });
      
      // Create student subjects
      const studentSubjects = await Promise.all(
        validatedData.subjects.map(subject =>
          tx.studentSubject.create({
            data: {
              userId: user.userId,
              subjectName: subject.subjectName,
              currentYear: subject.currentYear,
              skillLevel: subject.skillLevel,
            }
          })
        )
      );
      
      return {
        user: {
          userId: user.userId.toString(),
          firebaseUid: user.firebaseUid,
          email: user.email,
          role: user.role,
          createdAt: user.createdAt,
        },
        studentDetails: {
          fullName: studentDetails.fullName,
          age: studentDetails.age,
          contactNumber: studentDetails.contactNumber,
          educationLevel: studentDetails.educationLevel,
          school: studentDetails.school,
          preferredLearningStyle: studentDetails.preferredLearningStyle,
          learningDisabilities: studentDetails.learningDisabilities,
          disabilityDetails: studentDetails.disabilityDetails,
          createdAt: studentDetails.createdAt,
        },
        subjects: studentSubjects.map(subject => ({
          id: subject.id.toString(),
          subjectName: subject.subjectName,
          currentYear: subject.currentYear,
          skillLevel: subject.skillLevel,
        }))
      };
    });
    
    return NextResponse.json(
      {
        success: true,
        message: 'Student registered successfully',
        data: result
      },
      { status: 201 }
    );
    
  } catch (error) {
    console.error('Student registration error:', error);
    
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        {
          error: 'Validation failed',
          details: error.errors.map(err => ({
            field: err.path.join('.'),
            message: err.message,
            code: err.code
          }))
        },
        { status: 400 }
      );
    }
    
    if (error instanceof Error) {
      // Handle known errors
      if (error.message.includes('Unique constraint')) {
        return NextResponse.json(
          { error: 'A user with this information already exists' },
          { status: 409 }
        );
      }
      
      if (error.message.includes('Foreign key constraint')) {
        return NextResponse.json(
          { error: 'Invalid reference data provided' },
          { status: 400 }
        );
      }
    }
    
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}
