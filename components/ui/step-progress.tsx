import React from 'react';
import { Progress } from '@/components/ui/progress';

interface Step {
  id: number;
  title: string;
  description: string;
}

interface StepProgressProps {
  steps: Step[];
  currentStep: number;
  className?: string;
}

export function StepProgress({ steps, currentStep, className = '' }: StepProgressProps) {
  const progressValue = ((currentStep - 1) / (steps.length - 1)) * 100;
  const currentStepData = steps.find(step => step.id === currentStep);

  return (
    <div className={`mb-8 ${className}`}>
      {/* Step Title and Progress Bar */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex-1">
          <h3 className="font-semibold text-lg">{currentStepData?.title}</h3>
          <p className="text-sm text-gray-600">{currentStepData?.description}</p>
        </div>
        <div className="text-sm text-gray-500 ml-4">
          Step {currentStep} of {steps.length}
        </div>
      </div>
      
      {/* Progress Bar */}
      <div className="space-y-2">
        <Progress value={progressValue} className="h-2" />
        <div className="flex justify-between text-xs text-gray-500">
          <span>Start</span>
          <span>Complete</span>
        </div>
      </div>
    </div>
  );
}
