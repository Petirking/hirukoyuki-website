const express = require('express');
const axios = require('axios');
require('dotenv').config();

const router = express.Router();

// Endpoint to receive logs from frontend and send to Telegram
router.post('/telegram-log', async (req, res) => {
    try {
        const clientData = req.body;
        const clientIP = req.ip || req.connection.remoteAddress || 'Unknown';

        // Get location from IP
        let location = 'Unknown';
        try {
            const geoResponse = await axios.get(`http://ip-api.com/json/${clientIP}`);
            if (geoResponse.data.status === 'success') {
                location = `${geoResponse.data.city}, ${geoResponse.data.country}`;
            }
        } catch (geoError) {
            console.log('Geolocation failed:', geoError.message);
        }

        // Format the log message
        const logMessage = `
🔔 New Activity Log
Page: ${clientData.pageURL || 'Unknown'}
Referrer: ${clientData.referrer || 'Direct'}
Device: ${clientData.deviceType} (${clientData.browser} on ${clientData.os})
Screen: ${clientData.screenSize}
Language: ${clientData.language}
IP: ${clientIP} (${location})
Button: "${clientData.buttonText || 'Unknown'}"
Time: ${clientData.timestamp}
        `.trim();

        // Send to Telegram
        const telegramURL = `https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}/sendMessage`;
        await axios.post(telegramURL, {
            chat_id: process.env.TELEGRAM_CHAT_ID,
            text: logMessage,
            parse_mode: 'Markdown'
        });

        res.status(200).json({ success: true });
    } catch (error) {
        console.error('Telegram log error:', error.message);
        res.status(500).json({ error: 'Failed to log' });
    }
});

module.exports = router;