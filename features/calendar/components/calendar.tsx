'use client'
import { Dialog } from '@/components/ui/dialog'

import React, { useEffect } from 'react'
import { Calendar } from './shad-calendar'
import { useEventCalendarContext } from '../providers/events-calendar-provider'
import useWindowSize from '@/hooks/use-window-size'
import CalendarSideBar from './calendar-sidebar'
import { useSidebarContext } from '@/components/sidebar/sidebar-provider'
import EventDialog from './event-dialog'
import { parseAsInteger, useQueryState } from 'nuqs'
import { Button } from '@/components/ui/button'
import GenerateScheduleDialog from './generate-schedule-dialog'

export default function AppCalendar() {
  const { open, setOpen } = useSidebarContext()
  const { events, selectedDate, setSelectedDate } = useEventCalendarContext()
  const [eventId, setEventId] = useQueryState('eventId', parseAsInteger)
  const { width: screenWidth } = useWindowSize()
  const smallerScreen = screenWidth < 768

  const selectedEventsCount = events.filter(
    (event) =>
      new Date(event.startDateTime).toDateString() ===
      selectedDate?.toDateString()
  ).length

  const selectedEvent = events.find((event) => event.id === eventId)

  useEffect(() => {
    if (selectedEventsCount === 0) setOpen(true)

    if (selectedEventsCount > 0) {
      setOpen(false)
    }
  }, [selectedEventsCount])

  if (events.length === 0) {
    return (
      <div className="w-full h-full flex flex-col gap-3 items-center justify-center">
        <p className="text-muted-foreground">No schedule found.</p>
        <GenerateScheduleDialog />
      </div>
    )
  }

  return (
    <div className="flex max-w-full w-full">
      {selectedEvent && (
        <Dialog onOpenChange={() => setEventId(null)} open>
          <EventDialog event={selectedEvent} />
        </Dialog>
      )}

      {events.length > 0 && (
        <Calendar
          mode="single"
          selected={selectedDate}
          onSelect={setSelectedDate}
          className="rounded-md border w-full h-full overflow-y-auto scroll-container"
        />
      )}

      {selectedEventsCount > 0 && !smallerScreen && !open && (
        <CalendarSideBar />
      )}
    </div>
  )
}
