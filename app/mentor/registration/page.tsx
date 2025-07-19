"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { StepProgress } from "@/components/ui/step-progress";

const steps = [
  {
    id: 1,
    title: "Personal Information",
    description: "Provide your personal details.",
  },
  {
    id: 2,
    title: "Areas of Expertise",
    description: "Showcase your skills and experience.",
  },
  {
    id: 3,
    title: "Social & Professional Links",
    description: "Connect your social and professional accounts.",
  },
];

export default function MentorRegistrationPage() {
  const [mounted, setMounted] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    fullName: "",
    age: "",
    email: "",
    contactNumber: "",
    preferredLanguage: "English",
    currentLocation: "",
    shortBio: "",
    professionalRole: "",
    subjects: "",
    teachingExperience: "",
    preferredLevels: [] as string[],
    linkedin: "",
    portfolio: "",
    profilePicture: null as File | null,
  });

  useEffect(() => {
    const savedStep = localStorage.getItem("mentorFormStep");
    const savedData = localStorage.getItem("mentorFormData");

    if (savedStep) {
      setCurrentStep(Number(savedStep));
    }

    if (savedData) {
      setFormData(JSON.parse(savedData));
    }

    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;

    // Validate phone number for contactNumber field
    if (name === "contactNumber" && value !== "") {
      const phoneRegex = /^\d+$/;
      if (!phoneRegex.test(value)) return;
    }

    const newFormData = {
      ...formData,
      [name]: value,
    };

    setFormData(newFormData);

    // Save to localStorage (excluding File object)
    const dataToSave = { ...newFormData, profilePicture: null };
    localStorage.setItem("mentorFormData", JSON.stringify(dataToSave));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData({
        ...formData,
        profilePicture: e.target.files[0],
      });
    }
  };

  const handlePreferredLevelsChange = (level: string) => {
    setFormData((prev) => ({
      ...prev,
      preferredLevels: prev.preferredLevels.includes(level)
        ? prev.preferredLevels.filter((l) => l !== level)
        : [...prev.preferredLevels, level],
    }));
  };

  const handleNext = () => {
    const nextStep = Math.min(currentStep + 1, 3);
    setCurrentStep(nextStep);
    localStorage.setItem("mentorFormStep", nextStep.toString());
  };

  const handlePrevious = () => {
    const prevStep = Math.max(currentStep - 1, 1);
    setCurrentStep(prevStep);
    localStorage.setItem("mentorFormStep", prevStep.toString());
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (currentStep < 3) {
      handleNext();
    } else {
      try {
        const { getAuth } = await import("firebase/auth");
        const auth = getAuth();
        const user = auth.currentUser;

        if (!user) {
          alert("You must be logged in to register as a mentor.");
          return;
        }

        const subjects = formData.subjects.split(',').map(s => s.trim());
        const apiData = {
          firebaseUid: user.uid,
          email: user.email!,
          fullName: formData.fullName,
          age: parseInt(formData.age),
          contactNumber: formData.contactNumber,
          preferredLanguage: formData.preferredLanguage,
          currentLocation: formData.currentLocation,
          bio: formData.shortBio,
          professionalRole: formData.professionalRole,
          subjects: subjects.map(subject => ({
            subjectName: subject,
            teachingExperience: formData.teachingExperience.replace(' years', '').replace('+', '_Plus_Years').replace('-', '_to_'),
            preferredLevels: formData.preferredLevels,
          })),
          linkedinUrl: formData.linkedin,
          githubOrPortfolioUrl: formData.portfolio,
          profilePictureUrl: "https://example.com/profile.jpg", // Placeholder
        };

        const response = await fetch('/api/mentor/register', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(apiData),
        });

        if (response.ok) {
          alert('Mentor registration successful!');
          localStorage.removeItem('mentorFormData');
          localStorage.removeItem('mentorFormStep');
        } else {
          const errorData = await response.json();
          alert(`Registration failed: ${errorData.error}`);
        }
      } catch (error) {
        console.error("Error during mentor registration:", error);
        alert("An unexpected error occurred. Please try again.");
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-2xl mx-auto p-6">
        <Card className="p-8">
          <h1 className="text-3xl font-bold text-center mb-8">
            Mentor Registration
          </h1>
          <StepProgress
            steps={steps}
            currentStep={currentStep}
            className="mb-6"
          />

          <form onSubmit={handleSubmit} className="space-y-6">
            {currentStep === 1 && (
              <div>
                <h2 className="text-xl font-semibold mb-4">
                  Personal Information
                </h2>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="fullName">Full Name</Label>
                    <Input
                      id="fullName"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="age">Age</Label>
                    <Input
                      id="age"
                      name="age"
                      type="number"
                      value={formData.age}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="email">Email Address</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="contactNumber">Contact Number</Label>
                    <Input
                      id="contactNumber"
                      name="contactNumber"
                      type="tel"
                      value={formData.contactNumber}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="preferredLanguage">
                      Preferred Language
                    </Label>
                    <select
                      id="preferredLanguage"
                      name="preferredLanguage"
                      value={formData.preferredLanguage}
                      onChange={handleChange}
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                      required
                    >
                      <option value="English">English</option>
                      <option value="Sinhala">Sinhala</option>
                      <option value="Tamil">Tamil</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>

                  <div>
                    <Label htmlFor="currentLocation">Current Location</Label>
                    <Input
                      id="currentLocation"
                      name="currentLocation"
                      value={formData.currentLocation}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="professionalRole">Professional Role</Label>
                    <Input
                      id="professionalRole"
                      name="professionalRole"
                      value={formData.professionalRole}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="shortBio">Short Bio</Label>
                    <Textarea
                      id="shortBio"
                      name="shortBio"
                      value={formData.shortBio}
                      onChange={handleChange}
                      placeholder="Introduce yourself in 2-3 sentences"
                      required
                    />
                  </div>
                </div>
              </div>
            )}

            {currentStep === 2 && (
              <div>
                <h2 className="text-xl font-semibold mb-4">
                  Areas of Expertise
                </h2>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="subjects">
                      Subjects you are planning to teach
                    </Label>
                    <Input
                      id="subjects"
                      name="subjects"
                      value={formData.subjects}
                      onChange={handleChange}
                      placeholder="e.g., Physics, Chemistry (comma-separated)"
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="teachingExperience">
                      Teaching/Training Experience
                    </Label>
                    <select
                      id="teachingExperience"
                      name="teachingExperience"
                      value={formData.teachingExperience}
                      onChange={handleChange}
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                      required
                    >
                      <option value="">Select Experience</option>
                      <option value="None">None</option>
                      <option value="1-3 years">1-3 years</option>
                      <option value="3-5 years">3-5 years</option>
                      <option value="5+ years">5+ years</option>
                    </select>
                  </div>

                  <div>
                    <Label>Preferred Level of Students</Label>
                    <div className="grid grid-cols-2 gap-2 mt-2">
                      {[
                        "Grade 3-5",
                        "Grade 6-9",
                        "Grade 10-11",
                        "Advanced Level",
                      ].map((level) => (
                        <label
                          key={level}
                          className="flex items-center space-x-2"
                        >
                          <input
                            type="checkbox"
                            checked={formData.preferredLevels.includes(level)}
                            onChange={() => handlePreferredLevelsChange(level)}
                            className="rounded"
                          />
                          <span className="text-sm">{level}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {currentStep === 3 && (
              <div>
                <h2 className="text-xl font-semibold mb-4">
                  Social & Professional Links
                </h2>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="linkedin">LinkedIn Profile</Label>
                    <Input
                      id="linkedin"
                      name="linkedin"
                      type="url"
                      value={formData.linkedin}
                      onChange={handleChange}
                      placeholder="https://linkedin.com/in/yourprofile"
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="portfolio">
                      Portfolio/Website (Optional)
                    </Label>
                    <Input
                      id="portfolio"
                      name="portfolio"
                      type="url"
                      value={formData.portfolio}
                      onChange={handleChange}
                      placeholder="https://yourwebsite.com"
                    />
                  </div>

                  <div>
                    <Label htmlFor="profilePicture">Profile Picture</Label>
                    <Input
                      id="profilePicture"
                      name="profilePicture"
                      type="file"
                      onChange={handleFileChange}
                      accept="image/*"
                      required
                    />
                  </div>
                </div>
              </div>
            )}

            <div className="flex justify-between pt-6">
              {currentStep > 1 && (
                <Button
                  type="button"
                  variant="outline"
                  onClick={handlePrevious}
                >
                  Previous
                </Button>
              )}
              <div className="ml-auto">
                <Button type="submit">
                  {currentStep === 3 ? "Submit" : "Next"}
                </Button>
              </div>
            </div>
          </form>
        </Card>
      </div>
    </div>
  );
}
