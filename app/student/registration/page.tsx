'use client';

import { useState, useEffect, useCallback, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { StepProgress } from '@/components/ui/step-progress';
import { AuthService } from '@/lib/services/auth.service';
import { useSearchParams } from 'next/navigation';

interface FormData {
  // Part 1: Basic Information
  fullName: string;
  age: string;
  email: string;
  contactNumber: string;
  
  // Part 2: Academic Background
  educationLevel: string;
  school: string;
  
  // Part 3: Subject & Skill Assessment
  subjectsOfInterest: string;
  currentYear: string;
  subjectSkills: { [subject: string]: string };
  preferredLearningStyle: string[];
  hasLearningDisabilities: string;
  learningDisabilitiesDescription: string;
}

const STORAGE_KEY = 'student-registration-form';

const initialFormData: FormData = {
  fullName: '',
  age: '',
  email: '',
  contactNumber: '',
  educationLevel: '',
  school: '',
  subjectsOfInterest: '',
  currentYear: '',
  subjectSkills: {},
  preferredLearningStyle: [],
  hasLearningDisabilities: '',
  learningDisabilitiesDescription: '',
};

const steps = [
  { id: 1, title: 'Who Are You?', description: 'Basic Information' },
  { id: 2, title: 'Academic Background', description: 'Educational Details' },
  { id: 3, title: 'Subject & Skill Assessment', description: 'Learning Preferences' },
];

export default function StudentRegistrationPage() {
  const searchParams = useSearchParams();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<FormData>(initialFormData);

  // Load data from localStorage on component mount
  useEffect(() => {
    const savedData = localStorage.getItem(STORAGE_KEY);
    if (savedData) {
      try {
        const parsedData = JSON.parse(savedData);
        setFormData(parsedData);
        // Also restore the current step if saved
        const savedStep = localStorage.getItem(`${STORAGE_KEY}-step`);
        if (savedStep) {
          setCurrentStep(parseInt(savedStep, 10));
        }
      } catch (error) {
        console.error('Error loading saved form data:', error);
      }
    }
  }, []);

  // Save data to localStorage whenever formData changes
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
  }, [formData]);

  // Save current step to localStorage
  useEffect(() => {
    localStorage.setItem(`${STORAGE_KEY}-step`, currentStep.toString());
  }, [currentStep]);

  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  }, []);

  const handleSubjectSkillChange = useCallback((subject: string, skill: string) => {
    setFormData(prev => ({
      ...prev,
      subjectSkills: {
        ...prev.subjectSkills,
        [subject]: skill
      }
    }));
  }, []);

  const handleLearningStyleChange = useCallback((style: string, checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      preferredLearningStyle: checked
        ? [...prev.preferredLearningStyle, style]
        : prev.preferredLearningStyle.filter(s => s !== style)
    }));
  }, []);

  const subjectsArray = useMemo(() => {
    return formData.subjectsOfInterest
      .split(',')
      .map(subject => subject.trim())
      .filter(subject => subject.length > 0);
  }, [formData.subjectsOfInterest]);

  const validateStep = (step: number): boolean => {
    switch (step) {
      case 1:
        return !!(formData.fullName && formData.age && formData.email && formData.contactNumber);
      case 2:
        return !!(formData.educationLevel && formData.school);
      case 3:
        return !!(formData.subjectsOfInterest && formData.currentYear && formData.preferredLearningStyle.length > 0);
      default:
        return false;
    }
  };

  const nextStep = () => {
    if (validateStep(currentStep) && currentStep < 3) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const [isRegistering, setIsRegistering] = useState(false);
  const [registrationError, setRegistrationError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (validateStep(3)) {
      try {
        setIsRegistering(true);
        setRegistrationError(null);
        console.log('Starting student registration process - direct API submission');
        
        // Prepare subjects array from subjectSkills
        const subjects = Object.entries(formData.subjectSkills).map(([subjectName, skillLevel]) => ({
          subjectName,
          currentYear: parseInt(formData.currentYear, 10),
          skillLevel: skillLevel as 'Beginner' | 'Intermediate' | 'Advanced'
        }));
        
        // Get Firebase UID from URL query parameter
        const firebaseUid = searchParams.get('uid');
        if (!firebaseUid) {
          throw new Error('Firebase UID is required. Please ensure you are properly authenticated.');
        }

        // Register student in backend with the Firebase UID from URL
        const studentData = {
          firebaseUid,
          email: formData.email,
          fullName: formData.fullName,
          age: parseInt(formData.age, 10),
          contactNumber: formData.contactNumber,
          educationLevel: mapEducationLevel(formData.educationLevel),
          school: formData.school,
          preferredLearningStyle: mapLearningStyle(formData.preferredLearningStyle[0] || 'Mixed'),
          learningDisabilities: formData.hasLearningDisabilities === 'yes',
          disabilityDetails: formData.hasLearningDisabilities === 'yes' ? formData.learningDisabilitiesDescription : undefined,
          subjects
        };
        
        const authResponse = await AuthService.registerStudent(studentData);
        console.log('Student registered in backend:', authResponse);
        
        // 4. Clear localStorage after successful submission
        localStorage.removeItem(STORAGE_KEY);
        localStorage.removeItem(`${STORAGE_KEY}-step`);
        
        // 5. Store auth data in localStorage
        localStorage.setItem('user', JSON.stringify(authResponse.user));
        localStorage.setItem('authToken', authResponse.token);
        localStorage.setItem('refreshToken', authResponse.refreshToken);
        
        alert('Registration completed successfully!');
        
        // 6. Redirect to student dashboard
        window.location.href = '/student/dashboard';
      } catch (error) {
        console.error('Registration error:', error);
        const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
        setRegistrationError(errorMessage);
        alert(`Registration failed: ${errorMessage}`);
      } finally {
        setIsRegistering(false);
      }
    }
  };
  
  // Helper functions to map form values to API expected values
  const mapEducationLevel = (level: string): 'Grade_9' | 'O_L' | 'A_L' => {
    switch (level) {
      case 'grade9': return 'Grade_9';
      case 'ordinary': return 'O_L';
      case 'advanced': return 'A_L';
      default: return 'O_L';
    }
  };
  
  const mapLearningStyle = (style: string): 'Visual' | 'Hands_On' | 'Theoretical' | 'Mixed' => {
    switch (style) {
      case 'Visual': return 'Visual';
      case 'Hands-On': return 'Hands_On';
      case 'Theoretical': return 'Theoretical';
      case 'Mixed': return 'Mixed';
      default: return 'Mixed';
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-4">
            <h2 className="text-xl font-semibold mb-4">Who Are You?</h2>
            
            <div>
              <Label htmlFor="fullName">Full Name</Label>
              <Input
                id="fullName"
                name="fullName"
                value={formData.fullName}
                onChange={handleInputChange}
                required
              />
            </div>

            <div>
              <Label htmlFor="age">Age</Label>
              <Input
                id="age"
                name="age"
                type="number"
                min="1"
                max="100"
                value={formData.age}
                onChange={handleInputChange}
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
                onChange={handleInputChange}
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
                onChange={handleInputChange}
                required
              />
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-4">
            <h2 className="text-xl font-semibold mb-4">Academic Background</h2>
            
            <div>
              <Label htmlFor="educationLevel">Current Education Level</Label>
              <select
                id="educationLevel"
                name="educationLevel"
                value={formData.educationLevel}
                onChange={handleInputChange}
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background"
                required
              >
                <option value="">Select Education Level</option>
                <option value="grade9">Grade 9</option>
                <option value="ordinary">Ordinary Level</option>
                <option value="advanced">Advanced Level</option>
              </select>
            </div>

            <div>
              <Label htmlFor="school">School</Label>
              <Input
                id="school"
                name="school"
                value={formData.school}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <h2 className="text-xl font-semibold mb-4">Subject & Skill Assessment</h2>
            
            <div>
              <Label htmlFor="subjectsOfInterest">Subjects of Interest</Label>
              <Input
                id="subjectsOfInterest"
                name="subjectsOfInterest"
                value={formData.subjectsOfInterest}
                onChange={handleInputChange}
                placeholder="e.g., Mathematics, Physics, Chemistry (comma separated)"
                required
              />
              <p className="text-sm text-gray-500 mt-1">Enter subjects separated by commas</p>
            </div>

            <div>
              <Label htmlFor="currentYear">Current Year</Label>
              <Input
                id="currentYear"
                name="currentYear"
                type="number"
                min="1"
                max="13"
                value={formData.currentYear}
                onChange={handleInputChange}
                required
              />
            </div>

            {subjectsArray.length > 0 && (
              <div>
                <Label>Current Skill Level (Per Subject)</Label>
                <div className="space-y-3 mt-2">
                  {subjectsArray.map((subject, index) => (
                    <div key={index} className="border rounded-lg p-3">
                      <p className="font-medium mb-2">{subject}</p>
                      <div className="flex gap-4">
                        {['Beginner', 'Intermediate', 'Advanced'].map((level) => (
                          <label key={level} className="flex items-center gap-2">
                            <input
                              type="radio"
                              name={`skill-${subject}`}
                              value={level}
                              checked={formData.subjectSkills[subject] === level}
                              onChange={() => handleSubjectSkillChange(subject, level)}
                              className="text-blue-600"
                            />
                            <span className="text-sm">{level}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div>
              <Label>Preferred Learning Style</Label>
              <div className="grid grid-cols-2 gap-3 mt-2">
                {['Visual', 'Hands-On', 'Theoretical', 'Mixed'].map((style) => (
                  <label key={style} className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={formData.preferredLearningStyle.includes(style)}
                      onChange={(e) => handleLearningStyleChange(style, e.target.checked)}
                      className="text-blue-600"
                    />
                    <span className="text-sm">{style}</span>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <Label>Do you have any learning disabilities or accommodations needed?</Label>
              <div className="flex gap-4 mt-2 mb-3">
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="hasLearningDisabilities"
                    value="yes"
                    checked={formData.hasLearningDisabilities === 'yes'}
                    onChange={handleInputChange}
                    className="text-blue-600"
                  />
                  <span className="text-sm">Yes</span>
                </label>
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="hasLearningDisabilities"
                    value="no"
                    checked={formData.hasLearningDisabilities === 'no'}
                    onChange={handleInputChange}
                    className="text-blue-600"
                  />
                  <span className="text-sm">No</span>
                </label>
              </div>
              
              {formData.hasLearningDisabilities === 'yes' && (
                <Textarea
                  name="learningDisabilitiesDescription"
                  value={formData.learningDisabilitiesDescription}
                  onChange={handleInputChange}
                  placeholder="Please describe your learning disabilities or accommodations needed..."
                  rows={3}
                />
              )}
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-8">
      <Card className="w-full max-w-4xl p-6">
        <h1 className="text-2xl font-bold text-center mb-8">Student Registration</h1>
        
        {/* Step Progress */}
        <StepProgress 
          steps={steps} 
          currentStep={currentStep} 
        />

        <form onSubmit={handleSubmit}>
          {renderStep()}

          {/* Navigation Buttons */}
          <div className="flex justify-between mt-8">
            <Button
              type="button"
              variant="outline"
              onClick={prevStep}
              disabled={currentStep === 1}
            >
              Previous
            </Button>

            {currentStep < 3 ? (
              <Button
                type="button"
                onClick={nextStep}
                disabled={!validateStep(currentStep)}
              >
                Next
              </Button>
            ) : (
              <Button
                type="submit"
                disabled={!validateStep(3) || isRegistering}
              >
                {isRegistering ? 'Registering...' : 'Complete Registration'}
              </Button>
            )}
          </div>
        </form>
        
        {registrationError && (
          <div className="mt-4 p-3 bg-red-50 border border-red-300 text-red-800 rounded-md">
            <p className="text-sm font-medium">Registration failed</p>
            <p className="text-xs">{registrationError}</p>
          </div>
        )}

        <div className="mt-6 text-center text-sm">
          <p>Already have an account? <a href="/login" className="text-blue-600 hover:underline">Login here</a></p>
        </div>
      </Card>
    </div>
  );
}
