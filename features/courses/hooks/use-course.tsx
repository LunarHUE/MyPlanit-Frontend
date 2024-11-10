"use client";

import SendAuthedRequest from '@/app/_actions/send-authed-api';
import type { Course } from '@/lib/types';
import {
  useQuery,
} from '@tanstack/react-query'

async function fetchCourse (courseId: string) {
  const data= await SendAuthedRequest<Course>(`/course/${courseId}`);
  return data;
};

export default function useCourse (courseId: string) {
  const { isLoading, error, data } = useQuery({
    queryKey: ['courseData', courseId],
    queryFn: () => fetchCourse(courseId),
    staleTime: 1000 * 60 * 5,
  })
  return { data, isLoading, error };
};
