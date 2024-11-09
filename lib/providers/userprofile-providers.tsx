"use client";

import { motion } from 'framer-motion';
import React, { createContext, useContext, useState, ReactNode } from "react";
import type { Profile } from '../types';
import useProfileQuery from '@/hooks/use-profile-query';
import { useUser, type UserProfile } from '@auth0/nextjs-auth0/client';
import { useRouter } from 'next/navigation';

type ProfileProviderProps = {
  profile: Profile | null;
  setProfile: React.Dispatch<React.SetStateAction<Profile | null>>;
  user: UserProfile
};

const UserProfileProviderContext = createContext<ProfileProviderProps | undefined>(undefined);

export const UserProfileProvider = ({ children }: { children: ReactNode }) => {
  const [profile, setProfile] = useState<Profile | null>(null);
  const router = useRouter();
  const { user: userData, isLoading: userLoading, error: userError } = useUser();

  if (userLoading)
    return <div>Loading...</div>;

  const { data: profileData, isLoading: profileLoading, error: profileError } = useProfileQuery(userData!.sub!);

  if (profileLoading)
    return <div>Loading...</div>;

  if (!profileData && !window.location.pathname.includes('/onboarding'))
    router.push('/onboarding');

  return (
    <UserProfileProviderContext.Provider value={{ profile, setProfile, user: userData! }}>
      <motion.main layout className="flex">
        {children}
      </motion.main>
    </UserProfileProviderContext.Provider>
  );
};

export const useUserProfileContext = () => {
  const context = useContext(UserProfileProviderContext);
  if (!context) {
    throw new Error("useUserProfileContext must be used within a UserProfileProvider");
  }
  return context;
};