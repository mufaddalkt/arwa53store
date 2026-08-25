// Vercel Serverless API Route: /api/admin
export default function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, Authorization'
  );

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  const configuredPassword = process.env.ADMIN_PASSWORD || 'arwa53admin';

  if (req.method === 'POST') {
    const { password, action } = req.body || {};

    if (action === 'verify' || !action) {
      if (!password) {
        return res.status(400).json({ success: false, message: 'Password is required' });
      }

      if (password === configuredPassword) {
        // Generate simple auth session token
        const token = Buffer.from(`arwa53_admin_${Date.now()}_${Math.random()}`).toString('base64');
        return res.status(200).json({
          success: true,
          message: 'Authentication successful',
          token,
        });
      } else {
        return res.status(401).json({ success: false, message: 'Invalid Admin Password' });
      }
    }
  }

  return res.status(405).json({ message: 'Method Not Allowed' });
}
