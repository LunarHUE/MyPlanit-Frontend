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
import BarLoader from '@/components/hover/bar-loader'

export default function Dashboard() {
  const { coursesResponse, coursesLoading } = useRootContext()

  if (coursesLoading) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <BarLoader />
      </div>
    )
  }

  const courses = coursesResponse?.data

  if (!courses || courses.length === 0) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <p className="text-muted-foreground">No courses found.</p>
      </div>
    )
  }

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
