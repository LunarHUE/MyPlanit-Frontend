"use client";

import SendAuthedRequest from '@/app/_actions/send-authed-api';
import type { CalendarEvent} from '@/lib/types';
import {
  useQuery,
} from '@tanstack/react-query'

async function fetchEvents () {
  const data = await SendAuthedRequest<CalendarEvent[]>(`/event`);
  return data;
};

export default function useEvents () {
  const { isLoading, error, data } = useQuery({
    queryKey: ['eventsData', ],
    queryFn: () => fetchEvents(),
    staleTime: 1000 * 60 * 5,
  })
  return { data, isLoading, error };
};
