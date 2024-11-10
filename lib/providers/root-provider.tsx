'use client'

import useCourses from '@/features/courses/hooks/use-courses'
import React, { createContext } from 'react'
import type { APIResponse, Course } from '../types'
interface RootContextType {
  coursesResponse: APIResponse<Course[]> | undefined
  coursesLoading: boolean
  coursesError: Error | null
}

const RootContext = createContext<RootContextType | undefined>(undefined)

interface RootProviderProps {
  children: React.ReactNode
}
export default function RootProvider({ children }: RootProviderProps) {
  const {
    data: coursesResponse,
    isLoading: coursesLoading,
    error: coursesError,
  } = useCourses()

  return (
    <RootContext.Provider
      value={{ coursesResponse, coursesLoading, coursesError }}
    >
      {children}
    </RootContext.Provider>
  )
}

export function useRootContext() {
  const context = React.useContext(RootContext)
  if (!context) {
    throw new Error('useRoot must be used within a RootProvider')
  }
  return context
}
