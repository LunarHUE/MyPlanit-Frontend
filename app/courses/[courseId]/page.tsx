import Link from 'next/link';
export default function Home({params}: {params: {courseId: string}}) {
    return (
    <div className="w-full m-6">
      <div >
        <h1 className="text-white mt-10 scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0">{params.courseId}</h1>
        {/* render dynamic component with id */}
      </div>
      <div className="flex h-full">
        <div className="flex-col w-1/4">
            <Link href={`/courses/${params.courseId}`}>
                <div className='w-full p-2 transition-colors hover:bg-secondary'>Home</div>
            </Link>
            <Link href={`/courses/${params.courseId}`}>
                <div className='w-full p-2 transition-colors hover:bg-secondary'>Announcements</div>
            </Link>
            <Link href={`/courses/${params.courseId}`}>
                <div className='w-full p-2 transition-colors hover:bg-secondary'>Assignments</div>
            </Link>
            <Link href={`/courses/${params.courseId}`}>
                <div className='w-full p-2 transition-colors hover:bg-secondary'>Grades</div>
            </Link>
            <Link href={`/courses/${params.courseId}`}>
                <div className='w-full p-2 transition-colors hover:bg-secondary'>Syllabus</div>
            </Link>
            <Link href={`/courses/${params.courseId}`}>
                <div className='w-full p-2 transition-colors hover:bg-secondary'>Modules</div>
            </Link>
        </div>
        <div className="w-3/4 mt-2">
            Content
        </div>
      </div>
    </div>
  );
}
