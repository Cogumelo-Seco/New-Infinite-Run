module.exports = (Game, Listener, materials, stateListener, state, data) => {
    const camera = state.camera
    const keys = stateListener.keys
    const player = state.player
    const cubePlayer = player.cubePlayer

    if (cubePlayer.position.y >= 5) player.jump = false
    if (keys['Space'] && player.jump) cubePlayer.position.y++
    if (cubePlayer.position.y > 0 && !state.player.jump || !Listener.state.keys['Space'] && cubePlayer.position.y > 0 && cubePlayer.position.y <= 5) cubePlayer.position.y -= 0.5
    if (cubePlayer.position.y < 0.5) state.player.jump = true

    if (+new Date()-player.speedTime > player.speed) {
        player.speedTime = +new Date()
        //if (keys['KeyW']) cubePlayer.position.z -= 0.5
        //if (keys['KeyS']) cubePlayer.position.z += 0.5
        if (keys['KeyA'] && cubePlayer.position.x > -4.5 || keys['ArrowLeft'] && cubePlayer.position.x > -4.5) cubePlayer.position.x -= 0.5        
        if (keys['KeyD'] && cubePlayer.position.x < 4.5 || keys['ArrowRight'] && cubePlayer.position.x < 4.5) cubePlayer.position.x += 0.5
    }

    camera.position.x = cubePlayer.position.x
    camera.position.y = cubePlayer.position.y+3.5
    camera.position.z = cubePlayer.position.z+5
}