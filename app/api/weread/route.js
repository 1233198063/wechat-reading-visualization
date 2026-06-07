import { NextResponse } from 'next/server';

const WEREAD_GATEWAY = process.env.WEREAD_GATEWAY || 'https://i.weread.qq.com/api/agent/gateway';

/* WeRead API reverse proxy.
   Forwards POST /api/weread → WeRead gateway, passing Authorization through.
   All data flows browser → this server → WeRead. Never leaves your infra. */
export async function POST(request) {
  const auth = request.headers.get('authorization') || '';
  const body = await request.text();

  let upstream;
  try {
    upstream = await fetch(WEREAD_GATEWAY, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: auth,
        'User-Agent': 'ReadMap/2.0',
      },
      body,
      // Node.js 18+ fetch respects this env var, but we set it here for clarity
      // @ts-ignore — undici option
      dispatcher: undefined,
    });
  } catch (err) {
    return NextResponse.json({ errcode: -1, errmsg: err.message }, { status: 502 });
  }

  const data = await upstream.json();
  return NextResponse.json(data, { status: upstream.status });
}
