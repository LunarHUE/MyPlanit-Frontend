'use client'

import SendAuthedRequest from '@/app/_actions/send-authed-api'
import type { Assignment } from '@/lib/types'
import { useQuery } from '@tanstack/react-query'

async function fetchAssignments(courseId: string) {
  const data = await SendAuthedRequest<Assignment[]>(
    `/course/${courseId}/assignment`
  )
  console.log(data)
  return data
}

export default function useCourseAssignments(courseId: string) {
  const { isLoading, error, data } = useQuery({
    queryKey: ['coursesData', courseId],
    queryFn: () => fetchAssignments(courseId),
    staleTime: 1000 * 60 * 5,
  })
  return { data, isLoading, error }
}
