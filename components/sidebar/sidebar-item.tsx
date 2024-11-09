"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useSidebarContext } from './sidebar-provider';
import { BookText } from 'lucide-react';

// Careful what you import from this file, the default import of this file is the React component
// import { type SidebarItem } from "./sidebar-item";
export type SidebarItem = {
  icon: React.ReactNode;
  id: string;
  href?: string;
  content?: React.ReactNode;
  notifs?: number;
}


interface SidebarItemProps extends Omit<SidebarItem, "content"> {
  children: React.ReactNode;
}

export function CourseSideBarItem() {
  const {
    selected,
    setSelected,
    open,
  } = useSidebarContext();

  return (
    <motion.div
      layout
      onClick={() => setSelected("courses")}
      className={`relative h-10 w-full  rounded-md transition-colors text-muted-foreground ${selected === "course" ? "bg-secondary" : "hover:bg-secondary"}`}
    >
      <div className="flex items-center h-full w-full">
        <motion.div
          layout
          className={`flex h-full items-center ${!open ? 'w-full justify-center': "w-10 place-content-center"} text-lg`}
        >
          <BookText />
        </motion.div>
        {open && (
          <motion.span
            layout
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.125 }}
            className="text-xs font-medium"
          >
            Courses
          </motion.span>
        )}
      </div>
    </motion.div>
  );
}

// import SidebarItem from "./sidebar-item";
export default function SidebarItem({
  icon,
  id,
  href,
  children,
  notifs,
}: SidebarItemProps){

  const {
    selected,
    setSelected,
    open,
  } = useSidebarContext();

  return (
    <motion.div
      layout
      onClick={() => setSelected(id)}
      className={`relative h-10 w-full  rounded-md transition-colors text-muted-foreground ${selected === id ? "bg-secondary" : "hover:bg-secondary"}`}
    >
      <Link className="flex items-center h-full w-full" href={`${href}`}>
        <motion.div
          layout
          className={`flex h-full items-center ${!open ? 'w-full justify-center': "w-10 place-content-center"} text-lg`}
        >
          {icon}
        </motion.div>
        {open && (
          <motion.span
            layout
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.125 }}
            className="text-xs font-medium"
          >
            {children}
          </motion.span>
        )}
        {notifs && open && (
          <motion.span
            initial={{ scale: 0, opacity: 0 }}
            animate={{
              opacity: 1,
              scale: 1,
            }}
            style={{ y: "-50%" }}
            transition={{ delay: 0.5 }}
            className="absolute right-2 top-1/2 size-4 rounded bg-indigo-500 text-xs text-foreground flex justify-center"
          >
            {notifs}
          </motion.span>
        )}
      </Link>
    </motion.div>
  );
};