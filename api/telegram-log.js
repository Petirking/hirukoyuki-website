// Vercel Serverless Function for Telegram Logging
// Uses environment variables: TELEGRAM_BOT_TOKEN and TELEGRAM_CHAT_ID

module.exports = async (req, res) => {
    // Only allow POST requests
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    try {
        const clientData = req.body;
        const clientIP = req.headers['x-forwarded-for']?.split(',')[0] || req.connection.remoteAddress || 'Unknown';
        const isSessionEnd = clientData.type === 'session_end';

        // Get environment variables
        const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
        const CHAT_ID = process.env.TELEGRAM_CHAT_ID;

        if (!BOT_TOKEN || !CHAT_ID) {
            console.error('Missing TELEGRAM_BOT_TOKEN or TELEGRAM_CHAT_ID');
            return res.status(500).json({ error: 'Server configuration error' });
        }

        // Get location from IP
        let location = 'Unknown';
        try {
            const geoResponse = await fetch(`http://ip-api.com/json/${clientIP}`);
            const geoData = await geoResponse.json();
            if (geoData.status === 'success') {
                location = `${geoData.city}, ${geoData.country}`;
            }
        } catch (geoError) {
            console.log('Geolocation failed:', geoError.message);
        }

        let logMessage;

        if (isSessionEnd) {
            // Format for session end
            logMessage = `📊 User Session Summary
Entry: ${clientData.entryTime}
Exit: ${clientData.exitTime}
Duration: ${clientData.duration}
Reason: ${clientData.reason}
Total Clicks: ${clientData.totalClicks}
Page: ${clientData.pageURL}
Device: ${clientData.deviceType} (${clientData.browser} on ${clientData.os})
Screen: ${clientData.screenSize}
Language: ${clientData.language}
IP: ${clientIP} (${location})`;
        } else {
            // Format for individual activity
            logMessage = `🔔 New Activity Log
Page: ${clientData.pageURL || 'Unknown'}
Referrer: ${clientData.referrer || 'Direct'}
Device: ${clientData.deviceType} (${clientData.browser} on ${clientData.os})
Screen: ${clientData.screenSize}
Language: ${clientData.language}
IP: ${clientIP} (${location})
Button: "${clientData.buttonText || 'Unknown'}"
Time: ${clientData.timestamp}`;
        }

        // Send to Telegram using fetch
        const telegramURL = `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`;
        const telegramResponse = await fetch(telegramURL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                chat_id: CHAT_ID,
                text: logMessage,
                parse_mode: 'Markdown'
            })
        });

        const telegramData = await telegramResponse.json();

        if (!telegramData.ok) {
            console.error('Telegram API error:', telegramData);
            return res.status(500).json({ error: 'Failed to send Telegram message' });
        }

        res.status(200).json({ success: true, messageId: telegramData.result.message_id });
    } catch (error) {
        console.error('Telegram log error:', error.message);
        res.status(500).json({ error: 'Failed to log', details: error.message });
    }
};