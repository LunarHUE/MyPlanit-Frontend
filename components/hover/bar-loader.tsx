"use client";

import { Variants, motion } from "framer-motion";

const variants = {
  initial: {
    scaleY: 0.5,
    opacity: 0,
  },
  animate: {
    scaleY: 1,
    opacity: 1,
    transition: {
      repeat: Infinity,
      repeatType: "mirror",
      duration: 1,
      ease: "circIn",
    },
  },
} as Variants;


export default function BarLoader() {
  return (
    <motion.div
      transition={{
        staggerChildren: 0.25,
      }}
      initial="initial"
      animate="animate"
      className="flex flex-col gap-1"
    >
      <div className="flex gap-1">
        <motion.div variants={variants} className="h-12 w-2 bg-foreground" />
        <motion.div variants={variants} className="h-12 w-2 bg-foreground" />
        <motion.div variants={variants} className="h-12 w-2 bg-foreground" />
        <motion.div variants={variants} className="h-12 w-2 bg-foreground" />
        <motion.div variants={variants} className="h-12 w-2 bg-foreground" />

      </div>
    </motion.div>
  );
}
