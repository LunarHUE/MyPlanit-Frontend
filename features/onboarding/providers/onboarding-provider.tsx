'use client'

import React, { createContext, useContext, useState } from 'react';
interface FormData {
  firstName: string;
  lastName: string;
  canvasUrl: string;
  canvasKey: string;
};

interface OnboardingContextType {
  step: number;
  setStep: React.Dispatch<React.SetStateAction<number>>;
  formData: FormData
  setFormData: React.Dispatch<React.SetStateAction<FormData>>;
}

const OnboardingContext = createContext<OnboardingContextType | undefined>(undefined);

interface OnBoardingProviderProps {
  children: React.ReactNode;
}

export const OnboardingProvider = ({ children }: OnBoardingProviderProps) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    canvasUrl: '',
    canvasKey: '',
  });

  return (
    <OnboardingContext.Provider value={{ step, setStep, formData, setFormData }}>
      {children}
    </OnboardingContext.Provider>
  );
};

export const useOnboardingContext = () => {
  const context = useContext(OnboardingContext);
  if (context === undefined) {
    throw new Error('useOnboarding must be used within an OnboardingProvider');
  }
  return context;
};
