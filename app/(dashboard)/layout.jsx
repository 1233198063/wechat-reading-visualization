import TopBar from '@/components/dashboard/TopBar';

export default function DashboardLayout({ children }) {
  return (
    <>
      <TopBar />
      <main
        className="max-w-[1440px] mx-auto"
        style={{ padding: 'clamp(28px,2.8vw,52px) clamp(16px,3vw,60px)' }}
      >
        {/* pb-20 为手机底部导航留白，桌面端消除 */}
        <div className="pb-20 md:pb-0">
          {children}
        </div>
      </main>
    </>
  );
}
