"use client";

import React, { useEffect, useState } from 'react'
import { useOnboardingContext } from '../providers/onboarding-provider';
import SteppedProgress from '@/components/hover/stepped-progress';
import StepOneForm from '../forms/step-one-form';
import StepTwoForm from '../forms/step-two-form';
import { motion } from 'framer-motion';
import SendAuthedRequest from '@/app/_actions/send-authed-api';
import type { Profile } from '@/lib/types';
import { useRouter } from 'next/navigation';
import BarLoader from '@/components/hover/bar-loader';

export default function OnboardingSteps() {
  const { step, formData } = useOnboardingContext();
  const router = useRouter();

  useEffect(() => {
    const postData = async () => {
      if (step === 3) {
        const res = await SendAuthedRequest<Profile>(`/profile`, "POST", formData);
        if (res.success) {
          router.push('/');
          return;
        }
        console.log(res)
      }
    };
    postData();
  }, [step])

  return (
    <div className="bg-card border-2 border-border flex flex-col w-[500px] px-5 py-3 h-[450px] rounded-xl gap-3">
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
        {step === 3 && (
          <motion.div initial={{y: 12, opacity: 0}} animate={{y: 0, opacity: 1}} className="flex flex-col h-[60%] items-center w-full justify-center gap-2">
            <h1 className="text-xl font-bold">Onboarding Complete!</h1>
            <p className="text-center">You are being redirected.</p>
            <BarLoader />
          </motion.div>
        )}

      </div>
    </div>
  )
}
