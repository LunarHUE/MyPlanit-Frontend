"use client";

import { SideBar } from '@/components/sidebar';
import {motion} from 'framer-motion';
export default function Home() {
  return (
    <div className="flex">
      <SideBar />
      <motion.div layout>
        <h1 className="text-white">Home</h1>
      </motion.div>
    </div>
  );
}
