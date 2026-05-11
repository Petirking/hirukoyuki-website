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
        const telegramMessage = payload.message || payload.callback_query?.message;
        const isTelegramStart = telegramMessage?.text?.trim() === '/start';
        const isSessionEnd = payload.type === 'session_end';
        const isStatus = payload.type === 'status';
        const isVisitorOnline = payload.type === 'visitor_online';

        if (isTelegramStart) {
            const chatId = telegramMessage.chat.id;
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

        let logMessage;
        if (isStatus) {
            const time = new Date().toLocaleString('en-US', {
                year: 'numeric',
                month: '2-digit',
                day: '2-digit',
                hour: '2-digit',
                minute: '2-digit',
                hour12: true
            }).replace(',', '');
            
            logMessage = `🤖 HIRUKOYUKI BOT STATUS\n\nStatus: Active ✅\nWebsite: Online ✅\nTelegram Log: Connected ✅\n\nDomain: https://hirukoyuki.my\nEnvironment: Production\nTime: ${time}\n\nMessage:\nTelegram logging system is running normally.`;
        } else if (isVisitorOnline) {
            const time = payload.timestamp || new Date().toLocaleString('en-US', {
                year: 'numeric',
                month: '2-digit',
                day: '2-digit',
                hour: '2-digit',
                minute: '2-digit',
                hour12: true
            }).replace(',', '');
            
            logMessage = `🟢 HIRUKOYUKI VISITOR ONLINE\n\nCurrent Online Visitors: ${payload.onlineVisitors || 0}\n\nDaily Visitors: ${payload.dailyVisitors || 0}\nWeekly Visitors: ${payload.weeklyVisitors || 0}\nMonthly Visitors: ${payload.monthlyVisitors || 0}\nTotal Visitors: ${payload.totalVisitors || 0}\n\nVisitor counting uses device/session detection.\nDuplicate visits from the same device/session will not increase visitor count repeatedly.\n\nInactive or offline visitors will be removed automatically after timeout detection.\n\nPage: ${payload.pageURL || 'Unknown'}\n\nDevice: ${payload.deviceType || 'Unknown'}\nBrowser: ${payload.browser || 'Unknown'}\nOS: ${payload.os || 'Unknown'}\nScreen: ${payload.screenSize || 'Unknown'}\nLanguage: ${payload.language || 'Unknown'}\n\nTime: ${time}`;
        } else if (isSessionEnd) {
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
            const time = payload.timestamp || new Date().toLocaleString('en-US', {
                year: 'numeric',
                month: '2-digit',
                day: '2-digit',
                hour: '2-digit',
                minute: '2-digit',
                hour12: true
            }).replace(',', '');
            
            logMessage = `🔔 HIRUKOYUKI ACTIVITY LOG\n\nEvent: User Interaction\n\nInteraction Type: ${payload.interactionType || 'Click'}\nButton/Text/Input: ${payload.buttonText || 'Unknown'}\n\nElement Tag: ${payload.elementTag || 'Unknown'}\nElement ID: ${payload.elementId || 'Unknown'}\nElement Class: ${payload.elementClass || 'Unknown'}\n\nInput Value: ${payload.inputValue || 'N/A'}\nSelected Option: ${payload.selectedOption || 'N/A'}\n\nPage: ${payload.pageURL || 'Unknown'}\nReferrer: ${payload.referrer || 'Direct'}\n\nDevice: ${payload.deviceType || 'Unknown'}\nBrowser: ${payload.browser || 'Unknown'}\nOS: ${payload.os || 'Unknown'}\nScreen: ${payload.screenSize || 'Unknown'}\nLanguage: ${payload.language || 'Unknown'}\n\nTime: ${time}`;
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