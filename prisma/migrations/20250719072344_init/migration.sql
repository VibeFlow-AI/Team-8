-- CreateEnum
CREATE TYPE "Role" AS ENUM ('student', 'mentor');

-- CreateEnum
CREATE TYPE "EducationLevel" AS ENUM ('Grade 9', 'O/L', 'A/L');

-- CreateEnum
CREATE TYPE "LearningStyle" AS ENUM ('Visual', 'Hands-On', 'Theoretical', 'Mixed');

-- CreateEnum
CREATE TYPE "SkillLevel" AS ENUM ('Beginner', 'Intermediate', 'Advanced');

-- CreateEnum
CREATE TYPE "PreferredLanguage" AS ENUM ('English', 'Sinhala', 'Tamil', 'Other');

-- CreateEnum
CREATE TYPE "TeachingExperience" AS ENUM ('None', '1-3 years', '3-5 years', '5+ years');

-- CreateEnum
CREATE TYPE "BookingStatus" AS ENUM ('pending', 'confirmed', 'cancelled');

-- CreateTable
CREATE TABLE "users" (
    "user_id" BIGSERIAL NOT NULL,
    "firebase_uid" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "role" "Role" NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "last_login" TIMESTAMP(3),

    CONSTRAINT "users_pkey" PRIMARY KEY ("user_id")
);

-- CreateTable
CREATE TABLE "studentdetails" (
    "user_id" BIGINT NOT NULL,
    "full_name" TEXT,
    "age" INTEGER,
    "contact_number" TEXT,
    "education_level" "EducationLevel",
    "school" TEXT,
    "preferred_learning_style" "LearningStyle",
    "learning_disabilities" BOOLEAN,
    "disability_details" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "studentdetails_pkey" PRIMARY KEY ("user_id")
);

-- CreateTable
CREATE TABLE "studentsubjects" (
    "id" BIGSERIAL NOT NULL,
    "user_id" BIGINT NOT NULL,
    "subject_name" TEXT NOT NULL,
    "current_year" INTEGER NOT NULL,
    "skill_level" "SkillLevel" NOT NULL,

    CONSTRAINT "studentsubjects_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "mentordetails" (
    "user_id" BIGINT NOT NULL,
    "full_name" TEXT,
    "age" INTEGER,
    "contact_number" TEXT,
    "preferred_language" "PreferredLanguage",
    "current_location" TEXT,
    "bio" TEXT,
    "professional_role" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "mentordetails_pkey" PRIMARY KEY ("user_id")
);

-- CreateTable
CREATE TABLE "mentorsubjects" (
    "id" BIGSERIAL NOT NULL,
    "user_id" BIGINT NOT NULL,
    "subject_name" TEXT NOT NULL,
    "teaching_experience" "TeachingExperience" NOT NULL,
    "preferred_levels" TEXT[],

    CONSTRAINT "mentorsubjects_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "sociallinks" (
    "id" BIGSERIAL NOT NULL,
    "user_id" BIGINT NOT NULL,
    "linkedin_url" TEXT NOT NULL,
    "github_or_portfolio_url" TEXT,
    "profile_picture_url" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "sociallinks_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "sessions" (
    "session_id" BIGSERIAL NOT NULL,
    "mentor_user_id" BIGINT NOT NULL,
    "subject_name" TEXT NOT NULL,
    "session_date" DATE NOT NULL,
    "start_time" TIME NOT NULL,
    "duration_hours" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "sessions_pkey" PRIMARY KEY ("session_id")
);

-- CreateTable
CREATE TABLE "bookings" (
    "booking_id" BIGSERIAL NOT NULL,
    "session_id" BIGINT NOT NULL,
    "student_user_id" BIGINT NOT NULL,
    "booking_status" "BookingStatus" NOT NULL,
    "payment_slip_url" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "bookings_pkey" PRIMARY KEY ("booking_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_firebase_uid_key" ON "users"("firebase_uid");

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- AddForeignKey
ALTER TABLE "studentdetails" ADD CONSTRAINT "studentdetails_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "studentsubjects" ADD CONSTRAINT "studentsubjects_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "studentdetails"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "mentordetails" ADD CONSTRAINT "mentordetails_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "mentorsubjects" ADD CONSTRAINT "mentorsubjects_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "mentordetails"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sociallinks" ADD CONSTRAINT "sociallinks_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "mentordetails"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sessions" ADD CONSTRAINT "sessions_mentor_user_id_fkey" FOREIGN KEY ("mentor_user_id") REFERENCES "mentordetails"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "bookings" ADD CONSTRAINT "bookings_session_id_fkey" FOREIGN KEY ("session_id") REFERENCES "sessions"("session_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "bookings" ADD CONSTRAINT "bookings_student_user_id_fkey" FOREIGN KEY ("student_user_id") REFERENCES "studentdetails"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;
