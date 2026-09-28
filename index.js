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
    // auto accept tpahere from you
    if (msg.includes('ITzRouk23') && msg.includes('tpahere') || msg.includes('has requested to teleport') || msg.includes('tpahere')) {
      setTimeout(() => {
        bot.chat('/tpaccept')
        console.log('Sent /tpaccept')
      }, 2000)
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
