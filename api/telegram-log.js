// Vercel Serverless Function for Telegram Logging
// Receives website activity logs and forwards them to Telegram

module.exports = async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    try {
        const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
        const CHAT_ID = process.env.TELEGRAM_CHAT_ID;

        if (!BOT_TOKEN || !CHAT_ID) {
            console.error('Missing TELEGRAM_BOT_TOKEN or TELEGRAM_CHAT_ID');
            return res.status(500).json({ error: 'Server configuration error' });
        }

        const payload = req.body || {};
        const isSessionEnd = payload.type === 'session_end';

        let logMessage;
        if (isSessionEnd) {
            logMessage = `📊 User Session Summary\n` +
                `Entry: ${payload.entryTime || 'Unknown'}\n` +
                `Exit: ${payload.exitTime || 'Unknown'}\n` +
                `Duration: ${payload.duration || 'Unknown'}\n` +
                `Reason: ${payload.reason || 'Unknown'}\n` +
                `Total Clicks: ${payload.totalClicks || 0}\n` +
                `Page: ${payload.pageURL || 'Unknown'}\n` +
                `Device: ${payload.deviceType || 'Unknown'} (${payload.browser || 'Unknown'} on ${payload.os || 'Unknown'})\n` +
                `Screen: ${payload.screenSize || 'Unknown'}\n` +
                `Language: ${payload.language || 'Unknown'}`;
        } else {
            logMessage = `🔔 New Activity Log\n` +
                `Page: ${payload.pageURL || 'Unknown'}\n` +
                `Referrer: ${payload.referrer || 'Direct'}\n` +
                `Device: ${payload.deviceType || 'Unknown'} (${payload.browser || 'Unknown'} on ${payload.os || 'Unknown'})\n` +
                `Screen: ${payload.screenSize || 'Unknown'}\n` +
                `Language: ${payload.language || 'Unknown'}\n` +
                `Button: "${payload.buttonText || 'Unknown'}"\n` +
                `Time: ${payload.timestamp || new Date().toISOString()}`;
        }

        const telegramURL = `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`;
        const response = await fetch(telegramURL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                chat_id: CHAT_ID,
                text: logMessage,
                parse_mode: 'Markdown'
            })
        });

        const telegramData = await response.json();

        if (!telegramData.ok) {
            console.error('Telegram API error:', telegramData);
            return res.status(500).json({
                success: false,
                error: telegramData.description || 'Telegram API failed',
                telegramData
            });
        }

        return res.status(200).json({
            success: true,
            messageId: telegramData.result?.message_id,
            telegramData
        });
    } catch (error) {
        console.error('Telegram log error:', error);
        return res.status(500).json({
            error: 'Failed to send Telegram message',
            details: error.message
        });
    }
};