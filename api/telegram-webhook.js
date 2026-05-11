// Vercel Serverless Function for Telegram Webhook
// Handles incoming bot commands such as "/start" and replies with bot status.

module.exports = async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

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
};