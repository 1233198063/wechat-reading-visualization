import { redirect } from 'next/navigation';

const SUPABASE_CONFIGURED =
  process.env.NEXT_PUBLIC_SUPABASE_URL &&
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

export default async function RootPage() {
  if (SUPABASE_CONFIGURED) {
    const { createServerClient } = await import('@/lib/supabase/server');
    const supabase = createServerClient();
    const { data: { session } } = await supabase.auth.getSession();
    redirect(session ? '/overview' : '/login');
  }

  // Supabase 未配置时直接进 login（API Key 模式）
  redirect('/login');
}
