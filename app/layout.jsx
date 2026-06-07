import './globals.css';

export const metadata = {
  title: '翻页里程 · ReadMap',
  description: '微信读书个人数据可视化 · WeChat Reading Dashboard',
};

export default function RootLayout({ children }) {
  return (
    <html lang="zh-CN">
      <body>{children}</body>
    </html>
  );
}
