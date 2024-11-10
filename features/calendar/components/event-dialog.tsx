import { DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Skeleton } from '@/components/ui/skeleton';
import useCourse from '@/features/courses/hooks/use-course';
import type { CalendarEvent } from '@/lib/types';
import { format } from 'date-fns';
import { CalendarIcon, ClockIcon, GraduationCapIcon, MapPinIcon } from 'lucide-react';
import React, { useEffect } from 'react'


interface EventDialogProps {
  event: CalendarEvent;
}

const course = {
    id: 1,
    name: 'Course 1',
    course_code: 'COURSE1',
    time_zone: 'UTC',
  }


export default function EventDialog({
  event,
}: EventDialogProps) {

  const { data: courseData, isLoading: courseLoading } = useCourse("1");

  if (courseLoading) {
    return (
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>
            <Skeleton className="h-6 w-3/4" />
          </DialogTitle>
          <Skeleton className="h-4 w-5/6 mt-2" />
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <CalendarIcon className="h-4 w-4 text-muted-foreground" />
            <Skeleton className="h-4 w-full col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <ClockIcon className="h-4 w-4 text-muted-foreground" />
            <Skeleton className="h-4 w-full col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <GraduationCapIcon className="h-4 w-4 text-muted-foreground" />
            <Skeleton className="h-4 w-full col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-start gap-4">
            <div className="col-span-3 space-y-2">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-5/6" />
            </div>
          </div>
        </div>
      </DialogContent>
    )
  }

  return (
    <DialogContent className="sm:max-w-[425px]">
      <DialogHeader>
        <DialogTitle>{event.title}</DialogTitle>
        <DialogDescription>
          Event details for {format(event.start, 'MMMM d, yyyy')}
        </DialogDescription>
      </DialogHeader>
      <div className="grid gap-4 py-4">
        <div className="grid grid-cols-4 items-center gap-4">
          <CalendarIcon className="h-4 w-4" />
          <div className="col-span-3">
            {format(event.start, 'MMMM d, yyyy')}
          </div>
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <ClockIcon className="h-4 w-4" />
          <div className="col-span-3">
            {format(event.start, 'h:mm a')} - {format(event.end, 'h:mm a')}
          </div>
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <GraduationCapIcon className="h-4 w-4" />
          <div className="col-span-3">
            {course.name} ({course.course_code})
          </div>
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <div className="col-span-3">
            {event.description}
          </div>
        </div>
      </div>
    </DialogContent>
  )
}
