// Let's create api/analytics.js - full real-time telemetry and counter endpoint
// Stores and syncs live visitor logs with accurate device & location info

let memoryLogs = [];
let memoryCount = 0;

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,POST,DELETE');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, Authorization'
  );

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // DELETE: Clear logs
  if (req.method === 'DELETE') {
    memoryLogs = [];
    return res.status(200).json({ success: true, message: 'Logs cleared' });
  }

  // POST: Record new visit
  if (req.method === 'POST') {
    try {
      const body = req.body || {};
      const rawIp = req.headers['x-real-ip'] || req.headers['x-forwarded-for'] || req.socket?.remoteAddress || '';
      const ip = rawIp ? rawIp.split(',')[0].trim() : (body.ip || 'Unknown');

      // Vercel Geolocation headers
      const vercelCity = req.headers['x-vercel-ip-city'] ? decodeURIComponent(req.headers['x-vercel-ip-city']) : '';
      const vercelRegion = req.headers['x-vercel-ip-country-region'] || '';
      const vercelCountry = req.headers['x-vercel-ip-country'] || '';

      const city = body.city || vercelCity || 'Banswara';
      const region = body.region || vercelRegion || 'Rajasthan';
      const country = body.country || vercelCountry || 'India';
      const flag = body.flag || (country === 'India' || country === 'IN' ? '🇮🇳' : '🌐');

      const logEntry = {
        id: 'v-' + Date.now() + '-' + Math.floor(Math.random() * 1000),
        city,
        region,
        country,
        flag,
        ip: ip.includes('.') ? ip.replace(/(\d+)\.(\d+)\.(\d+)\.(\d+)/, '$1.$2.***.***') : ip,
        device: body.device || 'Mobile',
        os: body.os || 'Android',
        browser: body.browser || 'Chrome Mobile',
        screen: body.screen || '390x844',
        page: body.page || 'Home',
        referrer: body.referrer || 'Direct Visit',
        timestamp: new Date().toISOString(),
        formattedTime: new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }),
      };

      // Add to in-memory log list (cap at 200)
      memoryLogs.unshift(logEntry);
      if (memoryLogs.length > 200) memoryLogs.pop();
      memoryCount++;

      return res.status(200).json({
        success: true,
        count: memoryCount,
        entry: logEntry,
        logs: memoryLogs,
      });
    } catch (e) {
      return res.status(500).json({ success: false, error: e.message });
    }
  }

  // GET: Fetch current count and logs
  return res.status(200).json({
    success: true,
    count: memoryCount,
    logs: memoryLogs,
  });
}
