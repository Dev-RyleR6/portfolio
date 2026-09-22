/**
 * Vercel Serverless Function: Proxy contact form submissions to Web3Forms
 * Keeps the WEB3FORMS_ACCESS_KEY hidden on the server in environment variables.
 */
module.exports = async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).json({ success: false, message: 'Method Not Allowed' });
  }

  const accessKey = process.env.WEB3FORMS_ACCESS_KEY;
  if (!accessKey) {
    console.error('WEB3FORMS_ACCESS_KEY is not configured in environment variables.');
    return res.status(500).json({
      success: false,
      message: 'Contact service is temporarily unconfigured. Please reach out directly via email.',
    });
  }

  let body = req.body;
  if (typeof body === 'string') {
    try {
      body = JSON.parse(body);
    } catch {
      return res.status(400).json({ success: false, message: 'Invalid JSON payload.' });
    }
  }

  const { name, email, message, botcheck, 'h-captcha-response': captchaToken } = body || {};

  // Honeypot check: reject bot submissions
  if (botcheck) {
    return res.status(200).json({ success: false, message: 'Submission rejected.' });
  }

  if (!name || !email || !message) {
    return res.status(400).json({ success: false, message: 'Please fill in all required fields.' });
  }

  // Basic email pattern check
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(email))) {
    return res.status(400).json({ success: false, message: 'Please enter a valid email address.' });
  }

  const cleanName = String(name).replace(/[\r\n]/g, ' ').trim().slice(0, 80);
  const cleanEmail = String(email).trim().slice(0, 254);
  const cleanMessage = String(message).trim().slice(0, 4000);

  try {
    const web3Response = await fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({
        access_key: accessKey,
        subject: `Portfolio Contact: ${cleanName}`,
        name: cleanName,
        email: cleanEmail,
        message: cleanMessage,
        botcheck: botcheck || '',
        'h-captcha-response': captchaToken || '',
      }),
    });

    const data = await web3Response.json().catch(() => ({}));
    return res.status(web3Response.status).json(data);
  } catch (err) {
    console.error('Error proxying request to Web3Forms:', err);
    return res.status(502).json({
      success: false,
      message: 'Failed to contact delivery service. Please try again later.',
    });
  }
};

