'use client'

import React from 'react'
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card'
import Link from 'next/link'
import { useRootContext } from '@/lib/providers/root-provider'

export default function Dashboard() {
  const { coursesResponse, coursesLoading } = useRootContext()
  const courses = coursesResponse?.data || []

  return (
    <div className="grid grid-cols-3 gap-4">
      {courses.map((course) => (
        <Link key={course.id} href={`/courses/${course.id}`}>
          <Card className="w-[350px]">
            <CardHeader>
              <CardTitle>{course.name}</CardTitle>
              <CardDescription>This is a static class card.</CardDescription>
            </CardHeader>
          </Card>
        </Link>
      ))}
    </div>
  )
}
