module.exports = (cube, state, playSoundEffect, cubeCount) => {
    const selectedObject = state.scene.getObjectByName(cube.cube.name);

    switch(cube.type) {
        case 'special':
            state.scene.remove(selectedObject);
            state.cubes.splice(cubeCount, 1)
            state.player.score += 100
            if (state.player.life+10 >= 100) state.player.life = 100
            else state.player.life += 10
            playSoundEffect('specialCube')
            break
        default:
            if (state.player.life-5 <= 0) state.player.life = 0
            else state.player.life -= 5
            playSoundEffect('damage')
    }
}