// Vercel Serverless API Route: /api/visitor
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

  try {
    // We use counterapi.dev namespace for arwa53collection
    const endpoint = isHit
      ? 'https://api.counterapi.dev/v1/arwa53collection/visitors/up'
      : 'https://api.counterapi.dev/v1/arwa53collection/visitors';

    const response = await fetch(endpoint, {
      method: 'GET',
      headers: { 'Accept': 'application/json' },
    });

    if (response.ok) {
      const data = await response.json();
      return res.status(200).json({
        success: true,
        count: data.count || data.value || 1,
      });
    }
  } catch (err) {
    console.warn('Counter upstream error, falling back:', err.message);
  }

  // Fallback if external API is unreachable
  return res.status(200).json({
    success: true,
    count: null,
    fallback: true,
  });
}
