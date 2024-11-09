import { SideBar } from '@/components/sidebar';
import Dashboard from '@/features/dashboard/components/dashboard';
export default function Home() {
  return (
    <>
      <SideBar />
      <div>
        <h1 className="text-white">Home</h1>
        <Dashboard />
      </div>
    </>
  );
}
