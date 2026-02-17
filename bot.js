const { default: makeWASocket, useMultiFileAuthState, DisconnectReason } = require('@whiskyjs/baileys');const qrcode = require('qrcode-terminal');const fs = require('fs');const { handleMenu, handleBugsAndroid, handleBugsIOS } = require('./commands');async function startBot() {
    const { state, saveCreds } = await useMultiFileAuthState('auth_info');    const sock = makeWASocket({
        auth: state,
        printQRInTerminal: true,
    });    sock.ev.on('connection.update', (update) => {
        const { connection, lastDisconnect } = update;
        if (connection === 'close') {
            const shouldReconnect = lastDisconnect.error?.output?.statusCode !== DisconnectReason.loggedOut;
            console.log('Conexión cerrada, intentando reconectar...', shouldReconnect);            if (shouldReconnect) {
                startBot();            }        } else if (connection === 'open') {
            console.log('Bot conectado a WhatsApp!');        }    });    sock.ev.on('creds.update', saveCreds);    sock.ev.on('messages.upsert', async ({ messages }) => {
        const msg = messages[0];        if (!msg.message) return;

        const text = msg.message.conversation || msg.message.extendedTextMessage?.text || '';
        if (text.startsWith('.')) {
            const command = text.split(' ')[0].toLowerCase();            switch (command) {
                case '.menu':
                    await handleMenu(sock, msg);                    break;
                case '.bug-android':
                    await handleBugsAndroid(sock, msg);                    break;
                case '.bug-ios':
                    await handleBugsIOS(sock, msg);                    break;
                default:
                    await sock.sendMessage(msg.key.remoteJid, { text: 'Comando no reconocido. Usa .menu para ver las opciones.' });            }        }    });}startBot();
