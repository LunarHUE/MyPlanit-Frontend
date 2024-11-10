'use client'

import React from 'react'
import useCourse from '../hooks/use-course'
import useCourseAssignments from '../hooks/use-course-assignments'
import BarLoader from '@/components/hover/bar-loader'

export default function CourseDetail({ courseId }: { courseId: string }) {
  const {
    data: courseData,
    isLoading: courseLoading,
    error: courseError,
  } = useCourse(courseId)
  const {
    data: assignmentData,
    isLoading: assignmentLoading,
    error: assignmentError,
  } = useCourseAssignments(courseId)

  const loading = courseLoading || assignmentLoading

  if (loading) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <BarLoader />
      </div>
    )
  }

  const course = courseData?.data

  if (!course) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <p className="text-gray-600">Course not found.</p>
      </div>
    )
  }

  const assignments = assignmentData?.data

  return (
    <div className=" mx-auto p-6">
      {/* Course Information */}
      <div className="shadow-md rounded-lg p-6 mb-8">
        <h1 className="text-3xl font-bold mb-2">{course.name}</h1>
        <p className="text-muted-foreground mb-4">{course.course_code}</p>
        {course.syllabus_body && (
          <div
            className="prose"
            dangerouslySetInnerHTML={{ __html: course.syllabus_body }}
          ></div>
        )}
      </div>

      {/* Assignments List */}
      <div className="overflow-y-auto h-[60vh]">
        <h2 className="text-2xl font-bold mb-4">Assignments</h2>
        {assignments && assignments.length > 0 ? (
          <ul className="space-y-4">
            {assignments.map((assignment) => (
              <li key={assignment.id} className="bg-card shadow rounded-lg p-6">
                <h3 className="text-xl font-semibold mb-2">
                  {assignment.name}
                </h3>
                {assignment.description && (
                  <div
                    className="prose mb-4"
                    dangerouslySetInnerHTML={{
                      __html: assignment.description,
                    }}
                  ></div>
                )}
                {assignment.due_at && (
                  <p className="text-gray-500">
                    Due: {new Date(assignment.due_at).toLocaleString()}
                  </p>
                )}
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-600">No assignments found.</p>
        )}
      </div>
    </div>
  )
}
