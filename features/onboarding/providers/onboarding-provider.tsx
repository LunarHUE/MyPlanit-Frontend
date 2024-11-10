'use client'

import React, { createContext, useContext, useState } from 'react';
import { useQueryState } from 'nuqs'
import { createParser } from 'nuqs'

const parseAsFormData = createParser({
  parse(queryValue) {
    const inBetween = queryValue.split('|')
    if (inBetween.length !== 4) return {
      firstName: '',
      lastName: '',
      canvasUrl: '',
      canvasKey: ''
    }
    const [firstName, lastName, canvasUrl, canvasKey] = inBetween
    const numStars = inBetween.length - 1
    return {
      firstName,
      lastName,
      canvasUrl,
      canvasKey
    }
  },
  serialize(value) {
    return `${value.firstName}|${value.lastName}|${value.canvasUrl}|${value.canvasKey}`
  }
})

interface FormData {
  firstName: string;
  lastName: string;
  canvasUrl: string;
  canvasKey: string;
};

interface OnboardingContextType {
  step: number;
  setStep: React.Dispatch<React.SetStateAction<number>>;
  formData: FormData | null
  setFormData: React.Dispatch<React.SetStateAction<any>>;
}

const OnboardingContext = createContext<OnboardingContextType | undefined>(undefined);

interface OnBoardingProviderProps {
  children: React.ReactNode;
}

export const OnboardingProvider = ({ children }: OnBoardingProviderProps) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useQueryState('formData', parseAsFormData);

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
