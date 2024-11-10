import OnboardingSteps from '@/features/onboarding/components/onboarding-steps'
import React from 'react'
import { OnboardingProvider } from '@/features/onboarding/providers/onboarding-provider'
import { Suspense } from 'react'
import BarLoader from '@/components/hover/bar-loader'
export default function OnboardingPage() {
return (
    <div className="flex w-full h-full items-center justify-center">
      <Suspense fallback={<BarLoader />}>
        <OnboardingProvider>
          <OnboardingSteps />
        </OnboardingProvider>
      </Suspense>
    </div>
  )
}
