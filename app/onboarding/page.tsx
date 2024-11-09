import OnboardingSteps from '@/features/onboarding/components/onboarding-steps'
import React from 'react'
import { OnboardingProvider } from '@/features/onboarding/providers/onboarding-provider'

export default function OnboardingPage() {
  return (
    <div className="container flex h-full items-center justify-center">
      <OnboardingProvider>
        <OnboardingSteps />
      </OnboardingProvider>

    </div>
  )
}
