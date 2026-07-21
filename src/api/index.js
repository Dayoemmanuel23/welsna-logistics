import express from 'express';
import nodemailer from 'nodemailer';
import path from 'path';
import { fileURLToPath } from 'url';

const app = express();
app.use(express.json());

// CORS
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  res.header('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
  if (req.method === 'OPTIONS') return res.sendStatus(200);
  next();
});

// Lazy SMTP transporter
let transporter;
function getTransporter() {
  if (!transporter) {
    transporter = nodemailer.createTransport({
      host: process.env.MAIL_HOST,
      port: parseInt(process.env.MAIL_PORT || '587'),
      secure: process.env.MAIL_SECURE === 'true',
      auth: { user: process.env.MAIL_USER, pass: process.env.MAIL_PASS }
    });
  }
  return transporter;
}

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Contact form
app.post('/api/contact', async (req, res) => {
  try {
    const { name, email, phone, message } = req.body;
    if (!name || !message) return res.status(400).json({ error: 'Name and message are required' });

    const mail = getTransporter();
    await mail.sendMail({
      from: `"Welsna Website" <${process.env.MAIL_USER}>`,
      to: 'info@welsnanigerialtd.com',
      subject: `New Enquiry from ${name}`,
      html: `<h2>New Contact Form Submission</h2>
             <p><strong>Name:</strong> ${name}</p>
             <p><strong>Email:</strong> ${email || 'Not provided'}</p>
             <p><strong>Phone:</strong> ${phone || 'Not provided'}</p>
             <p><strong>Message:</strong></p><p>${message}</p>`
    });

    res.json({ success: true, message: 'Message sent successfully' });
  } catch (err) {
    console.error('Contact error:', err);
    res.status(500).json({ error: 'Failed to send message' });
  }
});

// Quote request
app.post('/api/quote', async (req, res) => {
  try {
    const { service, origin, destination, weight } = req.body;
    const mail = getTransporter();
    await mail.sendMail({
      from: `"Welsna Website" <${process.env.MAIL_USER}>`,
      to: 'info@welsnanigerialtd.com',
      subject: `New Quote Request — ${service}`,
      html: `<h2>New Quote Request</h2>
             <p><strong>Service:</strong> ${service}</p>
             <p><strong>Origin:</strong> ${origin}</p>
             <p><strong>Destination:</strong> ${destination}</p>
             <p><strong>Weight:</strong> ${weight} kg</p>`
    });
    res.json({ success: true });
  } catch (err) {
    console.error('Quote error:', err);
    res.status(500).json({ error: 'Failed to submit quote' });
  }
});

export default app;

// For Truehost (non-serverless), start the server directly when executed
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
if (process.argv[1] && path.resolve(process.argv[1]) === path.resolve(__filename)) {
  // Serve static files from the project root when running directly
  app.use(express.static(path.join(__dirname, '..', '..')));
  app.get('*', (req, res) => {
    if (!req.path.startsWith('/api')) {
      res.sendFile(path.join(__dirname, '..', '..', 'index.html'));
    }
  });
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => console.log(`Welsna server running on port ${PORT}`));
}
