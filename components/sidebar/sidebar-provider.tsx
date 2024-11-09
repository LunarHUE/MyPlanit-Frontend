"use client";

import { motion } from 'framer-motion';
import React, { createContext, useContext, useState, ReactNode } from "react";

type SidebarContextType = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  selected: string;
  setSelected: React.Dispatch<React.SetStateAction<string>>;
};

const SidebarContext = createContext<SidebarContextType | undefined>(undefined);

export const SidebarProvider = ({ children }: { children: ReactNode }) => {
  const [open, setOpen] = useState(true);
  const [selected, setSelected] = useState("dashboard");

  return (
    <SidebarContext.Provider value={{ open, setOpen, selected, setSelected }}>
      <motion.main layout className="flex h-full">
        {children}
      </motion.main>
    </SidebarContext.Provider>
  );
};

export const useSidebarContext = () => {
  const context = useContext(SidebarContext);
  if (!context) {
    throw new Error("useSidebarContext must be used within a SidebarProvider");
  }
  return context;
};