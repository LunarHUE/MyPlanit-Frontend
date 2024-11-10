"use client";

import React from 'react'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'

const courses = [
    {
      id: "course1",
      name: "Course 1",
      term: "Fall 2024",
      enrolled: "Student",
      publish: "Yes"
    },
    {
      id: "course2",
      name: "Course 2",
      term: "Fall 2024",
      enrolled: "Student",
      publish: "Yes"
    },
    {
      id: "course3",
      name: "Course 3",
      term: "Fall 2024",
      enrolled: "Student",
      publish: "Yes"
    },
    {
        id: "course4",
        name: "Course 4",
        term: "Fall 2024",
        enrolled: "Student",
        publish: "Yes"
    },
    {
        id: "course5",
        name: "Course 5",
        term: "Fall 2024",
        enrolled: "Student",
        publish: "No"
    },
  ] as const;

const oldCourses = [
{
    id: "course101",
    name: "Course 101",
    term: "Fall 2023",
    enrolled: "Student",
    publish: "Yes"
}
] as const;

export function Courses() {
    return (
        <Table className='w-full'>
            <TableHeader className='w-full'>
                <TableRow className='w-full grid-col-4'>
                    <TableHead>Course</TableHead>
                    <TableHead>Term</TableHead>
                    <TableHead>Enrolled As</TableHead>
                    <TableHead>Published</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody className='w-full'>
                {courses.map((course) => (
                    <TableRow key={course.id} className='w-full grid-col-4'>
                        <TableCell>{course.name}</TableCell>
                        <TableCell>{course.term}</TableCell>
                        <TableCell>{course.enrolled}</TableCell>
                        <TableCell>{course.publish}</TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    )
}

export function OldCourses() {
    return (
        <Table className='w-full'>
            <TableHeader className='w-full'>
                <TableRow className='w-full grid-col-4'>
                    <TableHead>Course</TableHead>
                    <TableHead>Term</TableHead>
                    <TableHead>Enrolled As</TableHead>
                    <TableHead>Published</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody className='w-full'>
                {oldCourses.map((oldCourse) => (
                    <TableRow key={oldCourse.id} className='w-full grid-col-4'>
                        <TableCell>{oldCourse.name}</TableCell>
                        <TableCell>{oldCourse.term}</TableCell>
                        <TableCell>{oldCourse.enrolled}</TableCell>
                        <TableCell>{oldCourse.publish}</TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    )
}