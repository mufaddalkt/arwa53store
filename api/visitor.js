// Vercel Serverless API Route: /api/visitor
// Handles real-time counter & Geolocation detection for Arwa 53 Store Admin Panel

function anonymizeIp(ip) {
  if (!ip) return 'Unknown IP';
  const parts = ip.split('.');
  if (parts.length === 4) {
    return `${parts[0]}.${parts[1]}.***.***`;
  }
  return ip.substring(0, 8) + '***';
}

function getCountryFlag(countryCode) {
  if (!countryCode || countryCode.length !== 2) return '🌐';
  const codePoints = countryCode
    .toUpperCase()
    .split('')
    .map((char) => 127397 + char.charCodeAt(0));
  return String.fromCodePoint(...codePoints);
}

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,POST');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, Authorization'
  );

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  const isHit = req.method === 'POST' || req.query.action === 'hit';

  // Extract Vercel Geolocation Headers
  const rawCity = req.headers['x-vercel-ip-city'];
  const city = rawCity ? decodeURIComponent(rawCity) : 'Banswara';
  const region = req.headers['x-vercel-ip-country-region'] || 'RJ';
  const country = req.headers['x-vercel-ip-country'] || 'IN';
  const latitude = req.headers['x-vercel-ip-latitude'] || '23.5518';
  const longitude = req.headers['x-vercel-ip-longitude'] || '74.4470';
  const rawIp = req.headers['x-real-ip'] || req.headers['x-forwarded-for'] || req.socket?.remoteAddress || '';
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
    });

    if (response.ok) {
      const data = await response.json();
      count = data.count || data.value || null;
    }
  } catch (err) {
    console.warn('Counter upstream notice:', err.message);
  }

  return res.status(200).json({
    success: true,
    count,
    location: locationData,
  });
}
