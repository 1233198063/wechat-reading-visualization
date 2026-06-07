'use client';

import LoginCard from '@/components/login/LoginCard';

export default function LoginPage() {
  return (
    <div
      id="login-screen"
      className="flex flex-col items-center justify-center min-h-screen p-6 relative overflow-hidden"
    >
      {/* 竹叶水墨装饰 */}
      <svg
        className="absolute top-0 right-0 w-80 h-80 pointer-events-none opacity-10"
        viewBox="0 0 300 300"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M280 10 Q240 60 200 40 Q180 30 170 50 Q160 70 180 90 Q200 110 160 130 Q130 145 140 170 Q150 195 120 210"
          stroke="#4a7a54"
          strokeWidth="1.5"
          fill="none"
        />
        <ellipse cx="230" cy="48" rx="28" ry="10" transform="rotate(-35 230 48)" fill="#4a7a54" opacity="0.6" />
        <ellipse cx="185" cy="75" rx="24" ry="9"  transform="rotate(-20 185 75)"  fill="#4a7a54" opacity="0.5" />
        <ellipse cx="165" cy="108" rx="26" ry="9" transform="rotate(-50 165 108)" fill="#4a7a54" opacity="0.5" />
        <ellipse cx="148" cy="148" rx="22" ry="8" transform="rotate(-15 148 148)" fill="#4a7a54" opacity="0.45" />
        <circle cx="60" cy="260" r="40" fill="#6b9c72" opacity="0.08" />
        <circle cx="40" cy="240" r="25" fill="#6b9c72" opacity="0.06" />
      </svg>

      <LoginCard />
    </div>
  );
}
