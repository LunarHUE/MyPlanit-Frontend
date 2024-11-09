

import AppCalendar from '@/features/calendar/components/calendar'
import { EventsCalendarProvider } from '@/features/calendar/providers/events-calendar-provider'
import React from 'react'

export default function CalendarPage() {
  return (
    <EventsCalendarProvider>
      <AppCalendar />
    </EventsCalendarProvider>
  )
}
