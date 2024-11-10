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

export default function GenerateScheduleDialog() {
  const messages = [
    'Generating AI Schedule...',
    'Analyzing your study habits...',
    'Creating a custom study plan...',
    'Optimizing your study schedule...',
    'Almost done...',
  ]
  const [loading, setLoading] = useState(true)
  const [message, setMessage] = useState<string>('')

  useEffect(() => {
    const timer = setInterval(() => {
      setMessage(messages.shift() ?? '')
    }, 3000)

    setTimeout(() => {
      setLoading(false)
      clearInterval(timer)
    }, messages.length * 3000 + 1000)

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
        </DialogDescription>
      </DialogContent>
    </Dialog>
  )
}
