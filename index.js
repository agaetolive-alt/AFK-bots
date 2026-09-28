  bot.on('spawn', () => {
    console.log('Bot spawned!')
    setTimeout(()=> {
      bot.chat('/login 5101520')
      console.log('Sent login')
      
      // wait 8 sec for login to complete, then go to economy
      setTimeout(()=> {
        bot.chat('/server economy')
        console.log('Sent to economy 1st try')
        // retry after 5 sec in case first was too early
        setTimeout(()=> {
          bot.chat('/server economy')
          console.log('Sent to economy 2nd try')
        }, 5000)
      }, 8000)
    }, 3000)
  })
