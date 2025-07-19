import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '../../../../lib/generated/prisma';
import { z } from 'zod';

const prisma = new PrismaClient();

// Validation schema for mentor registration
const mentorRegistrationSchema = z.object({
  // Firebase auth details
  firebaseUid: z.string().min(1, 'Firebase UID is required'),
  email: z.string().email('Invalid email address'),
  
  // Personal details
  fullName: z.string().min(1, 'Full name is required').max(255, 'Full name is too long'),
  age: z.number().int().min(21, 'Mentors must be at least 21 years old').max(100),
  contactNumber: z.string().min(10).max(15, 'Contact number is too long'),
  preferredLanguage: z.enum(['English', 'Sinhala', 'Tamil', 'Other']),
  currentLocation: z.string().min(1, 'Location is required').max(255),
  bio: z.string().max(500, 'Bio must not exceed 500 characters'),
  professionalRole: z.string().min(1, 'Professional role is required').max(255),
  
  // Teaching subjects
  subjects: z.array(z.object({
    subjectName: z.string().min(1, 'Subject name is required'),
    teachingExperience: z.enum(['None', 'One_to_Three_Years', 'Three_to_Five_Years', 'Five_Plus_Years']),
    preferredLevels: z.array(z.string()).min(1, 'Select at least one preferred level'),
  })).min(1, 'At least one subject is required'),
  
  // Social links
  linkedinUrl: z.string().url('Invalid LinkedIn URL'),
  githubOrPortfolioUrl: z.string().url('Invalid URL').optional(),
  profilePictureUrl: z.string().url('Invalid profile picture URL').optional(),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validatedData = mentorRegistrationSchema.parse(body);
    
    // Check if user exists
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
    
    // Create mentor in transaction
    const result = await prisma.$transaction(async (tx) => {
      // Create user
      const user = await tx.user.create({
        data: {
          firebaseUid: validatedData.firebaseUid,
          email: validatedData.email,
          role: 'mentor',
        }
      });
      
      // Create mentor details
      const mentorDetails = await tx.mentorDetails.create({
        data: {
          userId: user.userId,
          fullName: validatedData.fullName,
          age: validatedData.age,
          contactNumber: validatedData.contactNumber,
          preferredLanguage: validatedData.preferredLanguage,
          currentLocation: validatedData.currentLocation,
          bio: validatedData.bio,
          professionalRole: validatedData.professionalRole,
        }
      });
      
      // Create mentor subjects
      const mentorSubjects = await Promise.all(
        validatedData.subjects.map(subject =>
          tx.mentorSubject.create({
            data: {
              userId: user.userId,
              subjectName: subject.subjectName,
              teachingExperience: subject.teachingExperience,
              preferredLevels: subject.preferredLevels,
            }
          })
        )
      );
      
      // Create social links
      const socialLinks = await tx.socialLink.create({
        data: {
          userId: user.userId,
          linkedinUrl: validatedData.linkedinUrl,
          githubOrPortfolioUrl: validatedData.githubOrPortfolioUrl,
          profilePictureUrl: validatedData.profilePictureUrl,
        }
      });
      
      return {
        user: {
          userId: user.userId.toString(),
          firebaseUid: user.firebaseUid,
          email: user.email,
          role: user.role,
          createdAt: user.createdAt,
        },
        mentorDetails: {
          fullName: mentorDetails.fullName,
          age: mentorDetails.age,
          contactNumber: mentorDetails.contactNumber,
          preferredLanguage: mentorDetails.preferredLanguage,
          currentLocation: mentorDetails.currentLocation,
          bio: mentorDetails.bio,
          professionalRole: mentorDetails.professionalRole,
          createdAt: mentorDetails.createdAt,
        },
        subjects: mentorSubjects.map(subject => ({
          id: subject.id.toString(),
          subjectName: subject.subjectName,
          teachingExperience: subject.teachingExperience,
          preferredLevels: subject.preferredLevels,
        })),
        socialLinks: {
          id: socialLinks.id.toString(),
          linkedinUrl: socialLinks.linkedinUrl,
          githubOrPortfolioUrl: socialLinks.githubOrPortfolioUrl,
          profilePictureUrl: socialLinks.profilePictureUrl,
        }
      };
    });
    
    return NextResponse.json(
      {
        success: true,
        message: 'Mentor registered successfully',
        data: result
      },
      { status: 201 }
    );
    
  } catch (error) {
    console.error('Mentor registration error:', error);
    
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
