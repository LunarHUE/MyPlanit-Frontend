'use client'

import type { Assignment, CalendarEvent } from '@/lib/types'
import React, { createContext, useContext, useEffect, useState } from 'react'
import useEvents from '../hooks/use-events'
import useAssignments from '../hooks/use-assignments'
import { useRootContext } from '@/lib/providers/root-provider'
import BarLoader from '@/components/hover/bar-loader'

interface EventCalendarContextType {
  events: CalendarEvent[]
  selectedDate: Date | undefined
  setSelectedDate: React.Dispatch<React.SetStateAction<Date | undefined>>
}

const EventCalendarContext = createContext<
  EventCalendarContextType | undefined
>(undefined)

interface CalendarEventsProviderProps {
  children: React.ReactNode
}

export const EventsCalendarProvider = ({
  children,
}: CalendarEventsProviderProps) => {
  const [selectedDate, setSelectedDate] = React.useState<Date | undefined>(
    new Date()
  )
  const [events, setEvents] = useState<CalendarEvent[]>([])
  const [assignments, setAssignments] = useState<Assignment[]>([])
  const { data: assignmentsData, isLoading: assignmentsLoading } =
    useAssignments()

  const {
    data: eventsData,
    isLoading: eventsLoading,
    error: eventsError,
  } = useEvents()

  useEffect(() => {
    if (eventsData?.success) {
      setEvents(eventsData.data)
    }
    if (assignmentsData?.success) {
      setAssignments(assignmentsData.data)
    }
  }, [eventsData, assignmentsData])

  console.log(assignments)

  if (eventsLoading || assignmentsLoading) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <BarLoader />
      </div>
    )
  }

  console.log(events)

  return (
    <EventCalendarContext.Provider
      value={{ events, selectedDate, setSelectedDate }}
    >
      {children}
    </EventCalendarContext.Provider>
  )
}

export const useEventCalendarContext = () => {
  const context = useContext(EventCalendarContext)
  if (context === undefined) {
    throw new Error(
      'useEventCalendarContext must be used within an EventCalendarProvider'
    )
  }
  return context
}
