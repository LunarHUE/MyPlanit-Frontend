import { Button } from '@/components/ui/button'
import React, { useState, useEffect } from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import BarLoader from '@/components/hover/bar-loader'
import SendAuthedRequest from '@/app/_actions/send-authed-api'
import { useEventCalendarContext } from '../providers/events-calendar-provider'
import type { CalendarEvent } from '@/lib/types'

export default function GenerateScheduleDialog() {
  const { setEvents } = useEventCalendarContext()
  const messages = [
    'Reviewing Course Modules...',
    'Checking Syllabus...',
    'Generating Metadata...',
    'Generating AI Schedule...',
    'Analyzing your study habits...',
    'Creating a custom study plan...',
    'Optimizing your study schedule...',
  ]
  const [loading, setLoading] = useState(true)
  const [message, setMessage] = useState<string>('')

  useEffect(() => {
    const fetchEvents = async () => {
      const eventsData = await SendAuthedRequest<CalendarEvent[]>(
        '/generate/event',
        'POST'
      )
      console.log(eventsData)
      if (eventsData.success) {
        // console.log(eventsData.data)
        // setEvents(eventsData.data)
        // setLoading(false)
        window.location.reload()
      }
    }
    fetchEvents()
    const timer = setInterval(() => {
      setMessage(messages.shift() ?? 'Almost Done...')
    }, 7500)

    setTimeout(() => {
      setLoading(false)
      clearInterval(timer)
    }, messages.length * 7500 + 1000)

    return () => {
      clearInterval(timer)
    }
  }, [])

  return (
    <Dialog>
      <DialogTrigger>
        <Button>Generate AI Schedule</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Generating AI Study Schedule...</DialogTitle>
        </DialogHeader>
        <DialogDescription className="flex flex-col items-center justify-center h-[300px] gap-3">
          {message && <p>{message}</p>}
          {loading && <BarLoader />}
          {!loading && <p>Done!</p>}
        </DialogDescription>
      </DialogContent>
    </Dialog>
  )
}
