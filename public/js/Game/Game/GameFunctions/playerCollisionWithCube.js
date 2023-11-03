export default ({ cube, state, playSong, cubeCount }) => {
    const selectedObject = cube.cube//state.scene.getObjectByName(cube.cube.name);

    switch(cube.type) {
        case 'special':
            state.scene.remove(selectedObject);
            delete state.cubes[cube.cube.name]//.splice(cubeCount, 1)
            state.player.score += Math.floor(Math.random()*30)+80
            if (state.player.life+5 >= 100) state.player.life = 100
            else state.player.life += 5
            playSong('specialCube.mp3', { newSong: true, volume: 0.5 })
            break
        default:
            if (state.player.life-5 <= 0) state.player.life = 0
            else state.player.life -= 5

            state.player.score -= (Math.floor(Math.random()*10)+5)/2
            playSong('damage.mp3', { newSong: true, volume: 0.5 })
    }
}