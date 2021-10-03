module.exports = (cube, game, cubeCount) => {
    const state = game.state
    const scene = state.scene
    const selectedObject = scene.getObjectByName(cube.cube.name);

    switch(cube.type) {
        case 'special':
            scene.remove(selectedObject);
            state.cubes.splice(cubeCount, 1)
            state.player.score += 100
            if (state.player.life < 100) state.player.life += 10
            game.playSoundEffect('specialCube')
            break
        default:
            if (state.player.life > 0) state.player.life -= 5
            game.playSoundEffect('damage')
    }
}