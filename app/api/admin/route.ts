import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { passkey } = body;
    if (passkey === 'arwa53admin' || passkey === 'admin53') {
      return NextResponse.json({ success: true, authorized: true });
    }
    return NextResponse.json({ success: false, authorized: false }, { status: 401 });
  } catch {
    return NextResponse.json({ error: 'Invalid payload' }, { status: 400 });
  }
}
