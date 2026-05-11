// Vercel Serverless Function for Telegram Logging
// Simple test version - sends confirmation message to Telegram

module.exports = async function handler(req, res) {
    // Only allow POST requests
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    try {
        // Read environment variables
        const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
        const CHAT_ID = process.env.TELEGRAM_CHAT_ID;

        // Check if environment variables are set
        if (!BOT_TOKEN || !CHAT_ID) {
            console.error('Missing TELEGRAM_BOT_TOKEN or TELEGRAM_CHAT_ID');
            return res.status(500).json({ error: 'Server configuration error' });
        }

        // Simple test message
        const testMessage = '✅ HirukoYuki Telegram Log Working';

        // Send to Telegram using fetch
        const telegramURL = `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`;
        const response = await fetch(telegramURL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                chat_id: CHAT_ID,
                text: testMessage,
                parse_mode: 'Markdown'
            })
        });

        const telegramData = await response.json();

        // Return Telegram API response
        return res.status(200).json(telegramData);

    } catch (error) {
        console.error('Telegram log error:', error);
        return res.status(500).json({
            error: 'Failed to send message',
            details: error.message
        });
    }
};