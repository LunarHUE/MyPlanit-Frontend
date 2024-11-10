"use client"

import React, { useEffect, useState } from 'react'
import { useEventCalendarContext } from '../providers/events-calendar-provider';
import { motion } from 'framer-motion';
import { format, isSameDay  } from 'date-fns'
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import { useQueryState } from 'nuqs';


export default function CalendarSideBar() {
  const { events, selectedDate, setSelectedDate } = useEventCalendarContext();
   const [eventId, setEventId] = useQueryState("eventId");
  const [selectedEvents, setSelectedEvents] = useState(events.filter(event => {
    const date = new Date(event.start);
    return date.toDateString() === selectedDate?.toDateString();
  }))

  useEffect(() => {
    if (selectedDate) {
      setSelectedEvents(
        events.filter((event) => isSameDay(event.start, selectedDate))
      )
    }
  }, [selectedDate])


  return (
    <motion.div layout className="h-full w-[500px] bg-sidebar-background"
      initial={{ x: 500 }}
      animate={{ x: 0 }}
      transition={{
        x: { type: 'spring', stiffness: 300, damping: 30 }
      }}
    >
      <ScrollArea className="h-[96vh] my-6">
        <div className="relative">
          {/* Time slots */}
          {Array.from({ length: 24 }).map((_, index) => (
            <div
              key={index}
              className="absolute left-0 w-full border-t border-sidebar-border"
              style={{ top: `${index * 60}px` }}
            >
              <Badge className="absolute top-1 left-0 bg-sidebar-accent px-2 text-xs text-sidebar-foreground">
                {index < 11 ? index + 1: index % 12 + 1}:{index < 11 ? '00 AM' : '00 PM'}
              </Badge>
            </div>
          ))}

          {/* Events */}
          {selectedEvents.map((event) => {
            const startMinutes = event.start.getHours() * 60 + event.start.getMinutes() - 60;
            const startTime = format(event.start, 'h:mma');
            const endTime = format(event.end, 'h:mma');
            const duration = (event.end.getTime() - event.start.getTime()) / 60000;
            return (
              <div
                onClick={() => setEventId(event.id)}
                key={event.id}
                className="cursor-pointer absolute left-20 right-4 rounded-md bg-primary p-2 text-sm"
                style={{
                  top: `${startMinutes}px`,
                  height: `${duration}px`,
                }}
              >
                <h3 className="font-semibold">{event.title}</h3>
                <p className="text-xs text-muted-foreground">
                  {startTime} - {endTime}
                </p>
              </div>
            )
          })}
        </div>
      </ScrollArea>
    </motion.div>
  )
}
