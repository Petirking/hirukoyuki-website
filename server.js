// Local development server
// For production, deploy to Vercel and use Vercel Functions in /api directory

const express = require('express');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.static(path.join(__dirname)));

// Local API route for development (mimics Vercel Function)
app.post('/api/telegram-log', async (req, res) => {
    try {
        const clientData = req.body;
        const clientIP = req.ip || req.connection.remoteAddress || 'Unknown';
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

        // Send to Telegram
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
});

// Local API route for webhook (mimics Vercel Function)
app.post('/api/telegram-webhook', async (req, res) => {
    try {
        const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
        if (!BOT_TOKEN) {
            console.error('Missing TELEGRAM_BOT_TOKEN');
            return res.status(500).json({ error: 'Server configuration error' });
        }

        const body = req.body || {};
        const message = body.message || body.callback_query?.message;
        const text = message?.text?.trim();

        if (text === '/start') {
            const chatId = message.chat.id;
            const time = new Date().toLocaleString('en-US', {
                year: 'numeric',
                month: '2-digit',
                day: '2-digit',
                hour: '2-digit',
                minute: '2-digit',
                hour12: true
            }).replace(',', '');

            const startReply = `🤖 HIRUKOYUKI BOT STATUS\n\nStatus: Active ✅\nWebsite: Online ✅\nTelegram Log: Connected ✅\n\nDomain: https://hirukoyuki.my\nEnvironment: Production\nTime: ${time}\n\nMessage:\nTelegram logging system is running normally.`;

            const response = await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    chat_id: chatId,
                    text: startReply,
                    parse_mode: 'Markdown'
                })
            });

            const telegramData = await response.json();
            if (!telegramData.ok) {
                console.error('Telegram /start response error:', telegramData);
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
        }

        return res.status(200).json({ success: true, message: 'No command to process' });
    } catch (error) {
        console.error('Telegram webhook error:', error);
        return res.status(500).json({ error: 'Failed to process webhook', details: error.message });
    }
});

// Start server
app.listen(PORT, () => {
    console.log(`Development server running on http://localhost:${PORT}`);
    console.log('For production, deploy to Vercel and set environment variables:');
    console.log('  - TELEGRAM_BOT_TOKEN');
    console.log('  - TELEGRAM_CHAT_ID');
});