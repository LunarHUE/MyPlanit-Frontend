"use client";

import React from 'react'
import { useOnboardingContext } from '../providers/onboarding-provider';
import SteppedProgress from '@/components/hover/stepped-progress';
import StepOneForm from '../forms/step-one-form';
import StepTwoForm from '../forms/step-two-form';
import useProfileQuery from '@/hooks/use-profile-query';
import { useUser } from '@auth0/nextjs-auth0/client';

export default function OnboardingSteps() {
  const { step } = useOnboardingContext();

  const { user, isLoading: userLoading, error: userError } = useUser();

  if (userLoading || !user) return <div>Loading...</div>

  const { data: profile, isLoading: profileLoading, error: profileError } = useProfileQuery(user?.sub ?? '')

  if (profileLoading) return <div>Loading...</div>

  if (profile) {
    window.location.href = '/';
    return null;
  }

  return (
    <div className="bg-card border-2 border-border flex flex-col px-5 py-2 w-[30vw] h-[60vh] rounded-xl gap-3">

      <div className="border-b-2 border-border">
        <h1 className="text-2xl font-bold py-3">
          Onboarding
        </h1>
      </div>
      <div className="flex flex-col h-full gap-10">
        <SteppedProgress numSteps={2} stepsComplete={step - 1} />
        {step === 1 && (
          <StepOneForm />
        )}
        {step === 2 && (
          <StepTwoForm />
        )}

      </div>
    </div>
  )
}
