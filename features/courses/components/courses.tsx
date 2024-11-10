'use client'

import React from 'react'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { useRootContext } from '@/lib/providers/root-provider'
import Link from 'next/link'

export function Courses({ past }: { past?: boolean }) {
  const { coursesResponse, coursesLoading } = useRootContext()
  const courses = coursesResponse?.data || []
  console.log(coursesResponse)
  courses.filter((course) => {
    if (past && course.end_at && new Date(course.end_at) < new Date()) {
      return course
    }
    if (!past && course.end_at && new Date(course.end_at) >= new Date()) {
      return course
    }
  })
  if (coursesLoading) {
    return <span>Loading...</span>
  }
  return (
    <Table className="w-full">
      <TableHeader className="w-full">
        <TableRow className="w-full grid-col-4">
          <TableHead>Course</TableHead>
          <TableHead>Term</TableHead>
          <TableHead>Enrolled As</TableHead>
          <TableHead>Published</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody className="w-full">
        {courses.map((course) => (
          <TableRow key={course.id} className="w-full grid-col-4">
            <TableCell>
              <Link href={`/courses/${course.id}`}>{course.name}</Link>
            </TableCell>
            <TableCell>{course.end_at}</TableCell>
            <TableCell className="capitalize">
              {course.enrollments[0].type}
            </TableCell>
            <TableCell>Yes</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
