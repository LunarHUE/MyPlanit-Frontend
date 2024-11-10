'use client'

import SendAuthedRequest from '@/app/_actions/send-authed-api'
import type { Assignment, CalendarEvent } from '@/lib/types'
import { useQuery } from '@tanstack/react-query'

async function fetchAssignments() {
  const data = await SendAuthedRequest<Assignment[]>(
    `/course/assignment`
  )
  return data
}

export default function useAssignments() {
  const { isLoading, error, data } = useQuery({
    queryKey: ['assignmentData'],
    queryFn: () => fetchAssignments(),
    staleTime: 1000 * 60 * 5,
  })
  return { data, isLoading, error }


}
