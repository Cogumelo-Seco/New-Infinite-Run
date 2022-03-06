module.exports = (Game, Listener, materials, cookie, router, ctx) => {
    ctx.fillStyle = '#555'
    ctx.fillRect(0, 0, window.innerWidth, window.innerHeight)

    ctx.fillStyle = '#242424'
    ctx.fillRect(0, 0, 20, window.innerHeight)
    ctx.fillRect(0, 0, window.innerWidth, 20)
    ctx.fillRect(window.innerWidth-20, 0, 20, window.innerHeight)
    ctx.fillRect(0, window.innerHeight-20, window.innerWidth, 20)

    ctx.fillStyle = 'white'
    ctx.font = `bold ${window.innerWidth/15}px Arial`
    ctx.fillText('Infinite Run', canvas.width/2-(ctx.measureText('Infinite Run').width/2), canvas.height/5);

    let startGameButtonX = Listener.state.buttons.PlayGame.minX/1000*window.innerWidth
    let startGameButtonY = Listener.state.buttons.PlayGame.minY/1000*window.innerHeight
    let startGameButtonWidth = Listener.state.buttons.PlayGame.maxX/1000*window.innerWidth-startGameButtonX
    let startGameButtonHeight = Listener.state.buttons.PlayGame.maxY/1000*window.innerHeight-startGameButtonY

    if (Listener.state.buttons.PlayGame.over) ctx.fillStyle = '#2A2A2A'
    else ctx.fillStyle = '#414141'
    ctx.fillRect(startGameButtonX, startGameButtonY, startGameButtonWidth, startGameButtonHeight)

    if (Listener.state.buttons.PlayGame.over) ctx.font = `bold ${window.innerWidth/49}px Arial`
    else  ctx.font = `bold ${window.innerWidth/50}px Arial`
    ctx.fillStyle = 'white'
    ctx.fillText('Iniciar jogo', startGameButtonX+startGameButtonWidth/2-(ctx.measureText('Iniciar jogo').width/2), startGameButtonY+startGameButtonHeight/2+(window.innerWidth/50/3));

    let optionsButtonX = Listener.state.buttons.Options.minX/1000*window.innerWidth
    let optionsButtonY = Listener.state.buttons.Options.minY/1000*window.innerHeight
    let optionsButtonWidth = Listener.state.buttons.Options.maxX/1000*window.innerWidth-optionsButtonX
    let optionsButtonHeight = Listener.state.buttons.Options.maxY/1000*window.innerHeight-optionsButtonY

    if (Listener.state.buttons.Options.over) ctx.fillStyle = '#2A2A2A'
    else ctx.fillStyle = '#414141'
    ctx.fillRect(optionsButtonX, optionsButtonY, optionsButtonWidth, optionsButtonHeight)

    if (Listener.state.buttons.Options.over) ctx.font = `bold ${window.innerWidth/49}px Arial`
    else  ctx.font = `bold ${window.innerWidth/50}px Arial`
    ctx.fillStyle = 'white'
    ctx.fillText('Opções', optionsButtonX+optionsButtonWidth/2-(ctx.measureText('Opções').width/2), optionsButtonY+optionsButtonHeight/2+(window.innerWidth/50/3));
}