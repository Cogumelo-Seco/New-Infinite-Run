module.exports = (Game, Listener, materials, cookie, ctx) => {
    const camera = Game.state.camera
    const keys = Listener.state.keys
    const player = Game.state.player
    const cubePlayer = player.cubePlayer

    if (!Game.state.started) return
/*
    if (cubePlayer.position.y >= 6) player.jump = false
    if (keys['Space'] && player.jump) cubePlayer.position.y++
    if (cubePlayer.position.y > 0 && !Game.state.player.jump || !Listener.state.keys['Space'] && cubePlayer.position.y > 0 && cubePlayer.position.y <= 5) cubePlayer.position.y -= 0.5
    if (cubePlayer.position.y < 0.5) Game.state.player.jump = true
/*
    if (+new Date()-player.speedTime > player.speed) {
        player.speedTime = +new Date()
        if (keys['KeyW']) cubePlayer.position.z -= 0.5
        if (keys['KeyS']) cubePlayer.position.z += 0.5
        if (keys['KeyA'] && cubePlayer.position.x > -4.5 || keys['ArrowLeft'] && cubePlayer.position.x > -4.5) cubePlayer.position.x -= 0.5        
        if (keys['KeyD'] && cubePlayer.position.x < 4.5 || keys['ArrowRight'] && cubePlayer.position.x < 4.5) cubePlayer.position.x += 0.5
    }*/

    /*camera.position.x = cubePlayer.position.x
    camera.position.y = cubePlayer.position.y+3.5
    camera.position.z = cubePlayer.position.z+5
    camera.rotation.x = -0.45*/
}