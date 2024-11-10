"use client";
import {
  Dialog,
} from "@/components/ui/dialog"

import React, { useEffect } from 'react'
import { Calendar } from './shad-calendar';
import { useEventCalendarContext } from '../providers/events-calendar-provider';
import useWindowSize from '@/hooks/use-window-size';
import CalendarSideBar from './calendar-sidebar';
import { useSidebarContext } from '@/components/sidebar/sidebar-provider';
import EventDialog from './event-dialog';
import { useQueryState } from 'nuqs';

export default function AppCalendar() {
  const { open, setOpen } = useSidebarContext();
  const { events, selectedDate, setSelectedDate } = useEventCalendarContext();
  const [eventId, setEventId] = useQueryState("eventId");
  const { width: screenWidth } = useWindowSize();
  const smallerScreen = screenWidth < 768;

  const selectedEventsCount = events.filter(event => (
    new Date(event.start).toDateString() === selectedDate?.toDateString()
  )).length

  const selectedEvent = events.find(event => event.id === eventId);

  useEffect(() => {
    if (selectedEventsCount === 0)
      setOpen(true);

    if (selectedEventsCount > 0) {
      setOpen(false);
    }
  }, [selectedEventsCount]);

  return (
    <div className="flex max-w-full w-full">
      {selectedEvent && (
        <Dialog onOpenChange={() => setEventId(null)} open>
          <EventDialog event={selectedEvent} />
        </Dialog>
      )

      }
      <Calendar
        mode="single"
        selected={selectedDate}
        onSelect={setSelectedDate}
        className="rounded-md border w-full h-full overflow-y-auto scroll-container"
      />
      {selectedEventsCount > 0 && !smallerScreen && !open && (
        <CalendarSideBar />
      )}
    </div>

  )
}
