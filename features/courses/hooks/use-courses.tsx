"use client";

import SendAuthedRequest from '@/app/_actions/send-authed-api';
import type { Course } from '@/lib/types';
import {
  useQuery,
} from '@tanstack/react-query'

async function fetchCourses () {
  const data= await SendAuthedRequest<Course[]>(`/course`);
  return data;
};

export default function useCourses () {
  const { isLoading, error, data } = useQuery({
    queryKey: ['coursesData'],
    queryFn: () => fetchCourses(),
    staleTime: 1000 * 60 * 5,
  })
  return { data, isLoading, error };
};
