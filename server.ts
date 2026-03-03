import 'dotenv/config';
import express from 'express';
import { createServer as createViteServer } from 'vite';
import { Resend } from 'resend';

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Parse JSON bodies
  app.use(express.json());

  // API Routes
  app.post('/api/contact', async (req, res) => {
    const { name, email, message } = req.body;

    if (!process.env.RESEND_API_KEY) {
      console.error('Missing RESEND_API_KEY');
      return res.status(500).json({ error: 'Server configuration error' });
    }

    const resend = new Resend(process.env.RESEND_API_KEY);

    try {
      const data = await resend.emails.send({
        from: 'onboarding@resend.dev', // Default sender for testing
        to: 'kevin17kmetec@gmail.com',
        subject: `Novo sporočilo od ${name}`,
        html: `
          <p><strong>Ime:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Sporočilo:</strong></p>
          <p>${message}</p>
        `,
      });

      if (data.error) {
        console.error('Resend API error:', data.error);
        return res.status(500).json({ error: data.error.message });
      }

      res.status(200).json({ success: true, data });
    } catch (error) {
      console.error('Error sending email:', error);
      res.status(500).json({ error: 'Failed to send email' });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    // Serve static files in production
    app.use(express.static('dist'));
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
