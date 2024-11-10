"use client";

import SendAuthedRequest from '@/app/_actions/send-authed-api';
import type { Assignment, CalendarEvent} from '@/lib/types';
import {
  useQuery,
} from '@tanstack/react-query'

async function fetchEvents (courseId: string) {
  const data = await SendAuthedRequest<Assignment[]>(`/course/${courseId}/assignment`);
  return data;
};

export default function useAssignment(courseIds: string[]) {
  const assignments: Assignment[] = [];
  courseIds.forEach(courseId => {
    const { isLoading, error, data } = useQuery({
      queryKey: ['eventsData', courseId],
      queryFn: () => fetchEvents(courseId),
      staleTime: 1000 * 60 * 5,
    });
    if (data?.data) {
      assignments.push(...data?.data);
    }
  });

  return assignments;
};
