export default async (ctx, canvas, game, Listener, functions) => {
    ctx.font = 'bold 10px Arial'

    let FPSText = game.state.fpsDisplay+'FPS'

    ctx.fillStyle = 'rgba(0, 0, 0, 0.5)'
    ctx.fillRect(canvas.width-(ctx.measureText('000FPS').width)-5, 0, ctx.measureText('000FPS').width+4, 15)

    ctx.fillStyle = 'white'
    ctx.fillText(FPSText, canvas.width-(ctx.measureText(FPSText).width)-2, 10)

    //

    let difficultyText = 'Dificuldade: '+game.state.difficultyTex[game.state.settings.difficulty]

    ctx.fillStyle = 'rgba(0, 0, 0, 0.5)'
    ctx.fillRect(canvas.width-ctx.measureText(difficultyText).width-5, canvas.height-17, ctx.measureText(difficultyText).width+10, 20)

    ctx.fillStyle = 'white'
    ctx.fillText(difficultyText, canvas.width-(ctx.measureText(difficultyText).width)-2, canvas.height-5)

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

    if (player.life >= 100) player.life = 100
    if (player.life <= 0) player.life = 0

    lifePercentText.innerText = `${Number.parseInt(player.life)}%`
    lifeBar1.style.width = `${player.life}%`
    lifeBar2.style.width = `${player.life}%`
}