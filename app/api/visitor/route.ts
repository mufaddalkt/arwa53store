import { NextRequest, NextResponse } from 'next/server';

function anonymizeIp(ip: string): string {
  if (!ip) return 'Unknown IP';
  const parts = ip.split('.');
  if (parts.length === 4) {
    return `${parts[0]}.${parts[1]}.***.***`;
  }
  return ip.substring(0, 8) + '***';
}

function getCountryFlag(countryCode: string): string {
  if (!countryCode || countryCode.length !== 2) return '🌐';
  const codePoints = countryCode
    .toUpperCase()
    .split('')
    .map((char) => 127397 + char.charCodeAt(0));
  return String.fromCodePoint(...codePoints);
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const isHit = searchParams.get('action') === 'hit';

  const rawCity = req.headers.get('x-vercel-ip-city');
  const city = rawCity ? decodeURIComponent(rawCity) : 'Banswara';
  const region = req.headers.get('x-vercel-ip-country-region') || 'RJ';
  const country = req.headers.get('x-vercel-ip-country') || 'IN';
  const latitude = req.headers.get('x-vercel-ip-latitude') || '23.5518';
  const longitude = req.headers.get('x-vercel-ip-longitude') || '74.4470';
  const rawIp = req.headers.get('x-real-ip') || req.headers.get('x-forwarded-for') || '';
  const ip = anonymizeIp(rawIp.split(',')[0].trim());

  const locationData = {
    city: city || 'Banswara',
    region: region || 'Rajasthan',
    country: country || 'IN',
    flag: getCountryFlag(country || 'IN'),
    latitude,
    longitude,
    ip: ip || '103.212.***.***',
    timestamp: new Date().toISOString(),
  };

  let count = null;
  try {
    const endpoint = isHit
      ? 'https://api.counterapi.dev/v1/arwa53collection/visitors/up'
      : 'https://api.counterapi.dev/v1/arwa53collection/visitors';

    const response = await fetch(endpoint, {
      method: 'GET',
      headers: { Accept: 'application/json' },
      cache: 'no-store',
    });

    if (response.ok) {
      const data = await response.json();
      count = data.count || data.value || null;
    }
  } catch (err: any) {
    console.warn('Counter upstream notice:', err?.message);
  }

  return NextResponse.json(
    {
      success: true,
      count,
      location: locationData,
    },
    {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET,POST,OPTIONS',
      },
    }
  );
}

export async function POST(req: NextRequest) {
  return GET(req);
}

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET,POST,OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    },
  });
}
