import { Courses } from '@/features/courses/components/courses'
export default function Home() {
  return (
    <>
      <div className="w-full p-6">
        <h1 className="text-white mt-10 scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0">
          All Courses
        </h1>
        <Courses />
        <h1 className="text-white mt-10 scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0">
          Previous Courses
        </h1>
        <Courses past />
      </div>
    </>
  )
}
