require('http').createServer((req,res)=>res.end('Bot running')).listen(process.env.PORT||3000);
const mineflayer = require('mineflayer')

function createBot() {
  const bot = mineflayer.createBot({
    host: 'helixnetwork.in',
    username: 'Rouk_23',
    auth: 'offline',
    version: false
  })

  bot.on('spawn', () => {
    console.log('Bot spawned!')
    setTimeout(() => {
      bot.chat('/login 5101520')
      console.log('Sent login')
      setTimeout(() => {
        bot.chat('/server economy')
        console.log('Sent /server economy after 10s')
      }, 10000)
    }, 3000)
  })

  bot.on('messagestr', (message) => {
    console.log('ChatMsg:', message)
    const msg = message.toLowerCase()
    if (msg.includes('re uested')) {
      console.log('TPA detected, accepting...')
      bot.chat('/tpaccept')
      setTimeout(() => bot.chat('/tpaccept'), 1500)
    }
  })

  bot.on('error', (err) => console.log('Error:', err.message))
  bot.on('kicked', (reason) => console.log('Kicked:', reason))
  bot.on('end', () => {
    console.log('Disconnected, reconnecting in 10s...')
    setTimeout(createBot, 10000)
  })
}

createBot()
