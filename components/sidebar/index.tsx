"use client"

import { cn } from '@/lib/utils'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { useSidebarContext } from './sidebar-provider'
import { motion } from 'framer-motion'
import SidebarItem, { CourseSideBarItem } from './sidebar-item'
import { sideBarItems, dropDownItems } from './data'
import DropDownItem from './dropdown-item'
import { ChevronDown, ChevronsRight } from 'lucide-react'
import Logo from '../ui/logo'
import { Popover, PopoverContent } from '../ui/popover'
import { PopoverTrigger } from '@radix-ui/react-popover'
import Link from 'next/link'
import { useEffect } from 'react'
import useWindowSize from '@/hooks/use-window-size'

interface RetractingSidebarProps {
  className?: string
}

const courses = [
  {
    id: "course1",
    name: "Course 1",
  },
  {
    id: "course2",
    name: "Course 2",
  },
  {
    id: "course3",
    name: "Course 3",
  },
] as const;

export function SideBar({ className }: RetractingSidebarProps) {
  const { open, setOpen } = useSidebarContext();
  const { width: screenWidth } = useWindowSize();
  const isMobile = screenWidth < 500;

  useEffect(() => {
    if (isMobile) {
      setOpen(false);
    }
    if (!isMobile) {
      setOpen(true);
    }
  }, [screenWidth, isMobile, setOpen]);


  return (
    <motion.nav
      layout
      className={cn(
        'sticky top-0 h-screen shrink-0 border-r border-border p-2',
        className
      )}
      style={{
        width: open ? isMobile ? screenWidth : '225px' : 'fit-content',
      }}
    >
      <div className="mb-3 border-b border-border pb-3">
        <SidebarDropdownMenu />
      </div>
      <div className="space-y-1">
        {sideBarItems.map((item) => {
          if (item.id == "courses") {
            return (
              <Popover key={item.id}>
                <PopoverTrigger className="w-full">
                  <CourseSideBarItem />
                </PopoverTrigger>
                <PopoverContent side={`${isMobile ? "bottom": "right"}`}>
                  <div className="w-full flex justify-center">
                    <span className="text-sm text-muted-foreground">
                      You can view all courses{" "}
                      <Link href={"/courses"} className="text-primary">here.</Link>
                    </span>
                  </div>
                  <div className="flex flex-col gap-1 p-2">
                    {courses.map((course) => (
                      <SidebarItem
                        key={course.id}
                        id={course.id}
                        href={`/courses/${course.id}`}
                      >
                        {course.name}
                      </SidebarItem>
                    ))}
                  </div>
                </PopoverContent>
              </Popover>
            )
          }

          return (
            <SidebarItem
              key={item.id}
              id={item.id}
              icon={item.icon}
              href={item.href}
              notifs={item?.notifs}
            >
              {item.content}
            </SidebarItem>
          )
        })}
      </div>
      <ToggleClose />
    </motion.nav>
  )
}

function SidebarDropdownMenu() {
  return (
    <div className="w-full">
      <DropdownMenu>
        <DropdownMenuTrigger className="w-full h-full">
          <TitleSection />
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          {dropDownItems.map((item) => (
            <DropDownItem key={item.id} {...item} />
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}

function TitleSection() {
  const { open } = useSidebarContext()

  return (
    <div>
      <div className="flex cursor-pointer items-center justify-between rounded-md transition-colors hover:bg-secondary">
        <div className={`flex items-center gap-2`}>
          <div className="flex max-w-12">
            <Logo />
          </div>
          {open && (
            <>
              <motion.div
                layout
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.125 }}
              >
                <span className="block text-xs font-semibold">MyPlanIt</span>
                <span className="block text-xs text-muted-foreground text-left">
                  Student
                </span>
              </motion.div>
            </>
          )}
        </div>
        {open && <ChevronDown className="mr-2" />}
      </div>
    </div>
  )
}

function ToggleClose() {
  const { open, setOpen } = useSidebarContext()

  return (
    <motion.button
      layout
      onClick={() => setOpen((pv) => !pv)}
      className="absolute bottom-0 left-0 right-0 border-t border-border transition-colors hover:bg-secondary"
    >
      <div className="flex items-center p-2">
        <motion.div
          layout
          className="grid size-10 place-content-center text-lg"
        >
          <ChevronsRight
            className={`transition-transform text-foreground ${
              open && 'rotate-180'
            }`}
          />
        </motion.div>
        {open && (
          <motion.span
            layout
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.125 }}
            className="text-xs font-medium text-foreground"
          >
            Hide
          </motion.span>
        )}
      </div>
    </motion.button>
  )
}
