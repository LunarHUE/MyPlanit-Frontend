import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Skeleton } from '@/components/ui/skeleton'
import useCourse from '@/features/courses/hooks/use-course'
import type { CalendarEvent } from '@/lib/types'
import { toCST } from '@/lib/utils'
import { format } from 'date-fns'
import {
  CalendarIcon,
  ClockIcon,
  GraduationCapIcon,
  MapPinIcon,
} from 'lucide-react'
import React, { useEffect } from 'react'

interface EventDialogProps {
  event: CalendarEvent
}

export default function EventDialog({ event }: EventDialogProps) {
  const { data: courseData, isLoading: courseLoading } = useCourse(
    `${event.courseID}`
  )

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

  const start = toCST(new Date(event.startDateTime))
  const end = toCST(new Date(event.endDateTime))
  const course = courseData?.data

  console.log(course)
  return (
    <DialogContent className="sm:max-w-[425px]">
      <DialogHeader>
        <DialogTitle>{event.title}</DialogTitle>
        <DialogDescription>
          Event details for {format(start, 'MMMM d, yyyy')}
        </DialogDescription>
      </DialogHeader>
      <div className="grid gap-4 py-4">
        <div className="grid grid-cols-4 items-center gap-4">
          <CalendarIcon className="h-4 w-4" />
          <div className="col-span-3">{format(start, 'MMMM d, yyyy')}</div>
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <ClockIcon className="h-4 w-4" />
          <div className="col-span-3">
            {format(start, 'h:mm a')} - {format(end, 'h:mm a')}
          </div>
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <GraduationCapIcon className="h-4 w-4" />
          <div className="col-span-3">
            {course?.name} ({course?.course_code})
          </div>
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <div className="col-span-3">{event.description}</div>
        </div>
      </div>
    </DialogContent>
  )
}
