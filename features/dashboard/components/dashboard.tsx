"use client";

import React from 'react'
import {Card, CardHeader, CardTitle, CardDescription} from '@/components/ui/card'
import Link from 'next/link';

const courses = [
    {
      id: "course1",
      name: "Course 1",
    },
    {
      id: "course2",
      name: "Course 2",
    },
    {
      id: "course3",
      name: "Course 3",
    },
    {
        id: "course4",
        name: "Course 4"
    },
    {
        id: "course5",
        name: "Course 5"
    },
  ] as const;

export default function Dashboard() {
    return (
        <div
            className='grid grid-cols-3 gap-4'
        >
            {courses.map((course) => (
                <Link
                    href={`/courses/${course.id}`}
                >
                    <Card 
                        className="w-[350px]"
                        key={course.id}
                        id={course.id}
                    >
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