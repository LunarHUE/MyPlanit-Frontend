import CourseDetail from '@/features/courses/components/course-detail'

export default function Home({ params }: { params: { courseId: string } }) {
  return (
    <div className="w-full m-6">
      <CourseDetail courseId={params.courseId} />
    </div>
  )
}
