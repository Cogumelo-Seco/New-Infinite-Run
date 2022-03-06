module.exports = (Game, Listener, materials, cookie, ctx) => {
    if (+new Date()-Game.state.fps.split('-')[1] > 1000) {
        Game.state.fpsDisplay = Game.state.fps.split('-')[0]
        Game.state.fps = `0-${+new Date()}`
    }

    ctx.fillStyle = 'white'
    ctx.font = `bold 10px Arial`
    if (cookie.showFPS == 'true') {
        ctx.fillStyle = 'rgba(0, 0, 0, 0.5)'
        ctx.fillRect((window.innerWidth-5)-ctx.measureText(`${Game.state.fpsDisplay}FPS`).width-5, 0, ctx.measureText(`${Game.state.fpsDisplay}FPS`).width+10, 15)

        ctx.fillStyle = 'white'
        ctx.fillText(`${Game.state.fpsDisplay}FPS`, (window.innerWidth-5)-ctx.measureText(`${Game.state.fpsDisplay}FPS`).width, 10);
    }
    
    if (Game.state.gameState != 'game') ctx.fillText(`Power by: Cogumelo`, (window.innerWidth-22)-ctx.measureText(`Power by: Cogumelo`).width, window.innerHeight-22);
    //ctx.fillText(`Mouse: ${Listener.state.mousePosition.x}X ${Listener.state.mousePosition.y}Y`, 5, 10);

    if (Game.state.gameState == 'game') {
        if (Game.state.counter >= 1) {
            ctx.fillStyle = 'rgba(0, 0, 0, 0.5)'
            ctx.fillRect(window.innerWidth/2-25, window.innerHeight/2-25, 50, 50)

            ctx.fillStyle = 'white'
            ctx.font = `bold 40px Arial`
            ctx.fillText(Game.state.counter, window.innerWidth/2-ctx.measureText(Game.state.counter).width/2, window.innerHeight/2+15);
        }

        ctx.font = `bold 15px Arial`
        ctx.fillStyle = 'rgba(0, 0, 0, 0.5)'
        ctx.fillRect(0, window.innerHeight-20, ctx.measureText(`Score: ${Game.state.player.score}`).width+15, 20)
        
        ctx.fillStyle = 'white'
        ctx.fillText(`Score: ${Game.state.player.score}`, 5, window.innerHeight-5);

        if (Listener.state.paused) {
            ctx.fillStyle = 'rgba(0, 0, 0, 0.5)'
            ctx.fillRect(0, 0, window.innerWidth, window.innerHeight)

            ctx.fillStyle = 'white'
            ctx.font = `bold 40px Arial`
            ctx.fillText('Pause', window.innerWidth/2-ctx.measureText('Pause').width/2, window.innerHeight/2+15);
        }
    }
}