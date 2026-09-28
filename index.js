require('http').createServer((req,res)=>res.end('Bot running')).listen(process.env.PORT||3000);
const mineflayer = require('mineflayer')
const bot = mineflayer.createBot({
  host: 'helixnetwork.in',
  username: 'Rouk_23',
  auth: 'offline',
  version: false
})
bot.on('spawn', () => {
  setTimeout(()=> bot.chat('/login 5101520'), 3000)
})
bot.on('chat', (username, message) => {
  if (username === 'ITzRouk23' && message.toLowerCase().includes('tpa')) {
    bot.chat('/tpaccept')
  }
})
