import TopBar from '@/components/dashboard/TopBar';

export default function DashboardLayout({ children }) {
  return (
    <>
      <TopBar />
      <main
        className="max-w-[1440px] mx-auto"
        style={{ padding: 'clamp(28px,2.8vw,52px) clamp(24px,3vw,60px)' }}
      >
        {children}
      </main>
    </>
  );
}
