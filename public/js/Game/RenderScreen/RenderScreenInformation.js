export default async (ctx, canvas, game, Listener, functions) => {
    ctx.font = 'bold 10px Arial'

    let FPSText = game.state.fpsDisplay+'FPS'

    ctx.fillStyle = 'rgba(0, 0, 0, 0.5)'
    ctx.fillRect(canvas.width-(ctx.measureText('000FPS').width)-5, 0, ctx.measureText('000FPS').width+4, 15)

    ctx.fillStyle = 'white'
    ctx.fillText(FPSText, canvas.width-(ctx.measureText(FPSText).width)-2, 10)

    //

    let creatorText = 'Criado por: Cogu'
    let difficultyText = 'Dificuldade: '+game.state.difficultyTex[game.state.settings.difficulty]

    
    ctx.fillStyle = 'rgba(0, 0, 0, 0.5)'
    ctx.fillRect(canvas.width-(Math.max(ctx.measureText(difficultyText).width, ctx.measureText(creatorText).width))-5, canvas.height-28, ctx.measureText(difficultyText).width+10, 50)


    ctx.fillStyle = 'white'
    ctx.fillText(difficultyText, canvas.width-(ctx.measureText(difficultyText).width)-2, canvas.height-17)

    ctx.fillStyle = 'white'
    ctx.fillText(creatorText, canvas.width-(ctx.measureText(creatorText).width)-2, canvas.height-5)

    Listener.state.buttons['CreatorText'].minX = (canvas.width-(Math.max(ctx.measureText(difficultyText).width, ctx.measureText(creatorText).width))-5)/canvas.width*1000
    Listener.state.buttons['CreatorText'].minY = (canvas.height-28)/canvas.height*1000

    //

    let scoreText = `Score: ${Number.parseInt(game.state.player.score)}`

    ctx.font = 'bold 25px Arial'
    ctx.fillStyle = 'rgba(0, 0, 0, 0.5)'
    ctx.fillRect(0, canvas.height-30, ctx.measureText(scoreText).width+10, 40)

    ctx.fillStyle = 'white'
    ctx.fillText(scoreText, 5, canvas.height-5)

    //

    const player = game.state.player

    const lifeBar1 = document.getElementById('lifeBar1')
    const lifeBar2 = document.getElementById('lifeBar2')
    const lifePercentText = document.getElementById('lifePercentText')

    if (player.life >= game.state.player.lifeLimit) player.life = game.state.player.lifeLimit
    if (player.life <= 0) player.life = 0

    lifePercentText.innerText = `${Number.parseInt(player.life)}%`
    lifeBar1.style.width = `${player.life}%`
    lifeBar2.style.width = `${player.life}%`
}