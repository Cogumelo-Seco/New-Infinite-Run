module.exports = (Game, Listener, materials, stateListener, state) => {
    const fpsDisplay = document.getElementById('fpsDisplay');
    if (+new Date()-Game.state.fps.split('-')[1] > 1000) {
        fpsDisplay.innerText = `${Game.state.fps.split('-')[0]}FPS`
        Game.state.fps = `0-${+new Date()}`
    }

    const playerScore = document.getElementById('playerScore')

    playerScore.innerText = `Score: ${Game.state.player.score}`
}