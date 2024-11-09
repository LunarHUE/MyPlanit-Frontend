"use client";

import React from 'react'
import { Calendar } from './shad-calendar';
import { useEventCalendarContext } from '../providers/events-calendar-provider';
import useWindowSize from '@/hooks/use-window-size';

export default function AppCalendar() {
  const { selectedDate, setSelectedDate } = useEventCalendarContext();

  const { width: screenWidth } = useWindowSize();
  const smallerScreen = screenWidth < 768;

  return (
    <Calendar
      mode="single"
      selected={selectedDate}
      onSelect={setSelectedDate}
      className="rounded-md border w-full h-full overflow-y-auto scroll-container"
    />
  )
}
