// api/send-ticket.js
// Vercel serverless function to send ticket email via Resend

export default async function handler(req, res) {
    // CORS headers
    res.setHeader('Access-Control-Allow-Origin', 'https://www.lenskingsproductions.store');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    const { name, email, reference, ticketImage } = req.body;

    if (!email || !ticketImage) {
        return res.status(400).json({ error: 'Email and ticket image are required' });
    }

    try {
        const response = await fetch('https://api.resend.com/emails', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${process.env.RESEND_API_KEY}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                from: 'Lenskings Productions <tickets@lenskingsproductions.store>',
                to: [email],
                subject: 'Your Ticket: Online Music Bootcamp',
                html: `
                    <h2>Thank you, ${name}!</h2>
                    <p>Your ticket for the <strong>Online Music Bootcamp</strong> is attached.</p>
                    <p><strong>Date:</strong> 2nd September 2027<br>
                    <strong>Time:</strong> 10:00 AM - 2:00 PM (EAT)<br>
                    <strong>Ticket ID:</strong> ${reference}</p>
                    <p>Please keep this ticket safe. You will receive the Zoom link closer to the event date.</p>
                    <p>God bless!<br>— Parto Organist & Lenskings Productions</p>
                `,
                attachments: [
                    {
                        filename: `ticket-${reference}.png`,
                        content: ticketImage.replace(/^data:image\/png;base64,/, ''),
                        content_type: 'image/png'
                    }
                ]
            })
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || 'Failed to send email');
        }

        return res.status(200).json({ success: true, id: data.id });
    } catch (error) {
        console.error('Email error:', error);
        return res.status(500).json({ error: 'Failed to send ticket email' });
    }
}