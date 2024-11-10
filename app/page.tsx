import Dashboard from '@/features/dashboard/components/dashboard';

export default function Home() {
  return (
    <>
      <div>
        <h1 className="text-white mt-10 scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0">Home</h1>
        <Dashboard />
      </div>
    </>
  );
}
