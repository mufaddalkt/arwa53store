import { NextRequest, NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({
    success: true,
    status: 'online',
    timestamp: new Date().toISOString(),
    store: 'Arwa 53 Collection - Banswara Atelier',
  });
}
