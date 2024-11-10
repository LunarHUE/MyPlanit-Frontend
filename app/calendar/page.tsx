

import BarLoader from '@/components/hover/bar-loader'
import AppCalendar from '@/features/calendar/components/calendar'
import { EventsCalendarProvider } from '@/features/calendar/providers/events-calendar-provider'
import React, { Suspense } from 'react'

export default function CalendarPage() {
  return (
    <Suspense fallback={<BarLoader />}>
      <EventsCalendarProvider>
        <AppCalendar />
      </EventsCalendarProvider>
    </Suspense>
  )
}
