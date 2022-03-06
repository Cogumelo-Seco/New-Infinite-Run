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
    ctx.fillText('Você Morreu', canvas.width/2-(ctx.measureText('Você Morreu').width/2), canvas.height/5);

    ctx.fillStyle = 'white'
    ctx.font = `bold ${window.innerWidth/60}px Arial`
    ctx.fillText(`Seu score máximo na dificuldade ${document.getElementById('selectDifficulty')?.value} foi: ${Game.state.maxScore}`, canvas.width/2-(ctx.measureText(`Seu score máximo na dificuldade ${document.getElementById('selectDifficulty')?.value} foi : ${Game.state.maxScore}`).width/2), canvas.height/3);

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
    ctx.fillText('Iniciar novo jogo', startGameButtonX+startGameButtonWidth/2-(ctx.measureText('Iniciar novo jogo').width/2), startGameButtonY+startGameButtonHeight/2+(window.innerWidth/50/3));

    let comeBackHomeButtonX = Listener.state.buttons.ComeBackHome.minX/1000*window.innerWidth
    let comeBackHomeButtonY = Listener.state.buttons.ComeBackHome.minY/1000*window.innerHeight
    let comeBackHomeButtonWidth = Listener.state.buttons.ComeBackHome.maxX/1000*window.innerWidth-comeBackHomeButtonX
    let comeBackHomeButtonHeight = Listener.state.buttons.ComeBackHome.maxY/1000*window.innerHeight-comeBackHomeButtonY

    if (Listener.state.buttons.ComeBackHome.over) ctx.fillStyle = '#2A2A2A'
    else ctx.fillStyle = '#414141'
    ctx.fillRect(comeBackHomeButtonX, comeBackHomeButtonY, comeBackHomeButtonWidth, comeBackHomeButtonHeight)

    if (Listener.state.buttons.ComeBackHome.over) ctx.font = `bold ${window.innerWidth/49}px Arial`
    else  ctx.font = `bold ${window.innerWidth/50}px Arial`
    ctx.fillStyle = 'white'
    ctx.fillText('Voltar ao início', comeBackHomeButtonX+comeBackHomeButtonWidth/2-(ctx.measureText('Voltar ao início').width/2), comeBackHomeButtonY+comeBackHomeButtonHeight/2+(window.innerWidth/50/3));
}