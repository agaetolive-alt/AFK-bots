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

    let accepting = false

  bot.on('messagestr', (message) => {
    console.log('ChatMsg:', message)
    const msg = message.toLowerCase()

    if (msg.includes('re uested') && !accepting) {
      accepting = true
      console.log('TPA detected, spamming accept...')
      
      let tries = 0
      const spam = setInterval(() => {
        tries++
        bot.chat('/tpaccept ITzRouk23')
        console.log(`Sent /tpaccept try ${tries}`)
        
        if (tries >= 15) {
          clearInterval(spam)
          accepting = false
          console.log('Stopped spamming after 15 tries')
        }
      }, 2000)

      // Stop spamming if teleport succeeds
      bot.once('messagestr', (m2) => {
        const lm = m2.toLowerCase()
        if (lm.includes('teleport') && (lm.includes('success') || lm.includes('teleported'))) {
          clearInterval(spam)
          accepting = false
          console.log('Teleport success, stopped spamming')
        }
      })
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
