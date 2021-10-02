module.exports = (Game, Listener, materials, stateListener, state) => {
    const scene = state.scene
    const cubePlayer = state.player.cubePlayer

    for (let i in state.cubes) {
        const cube = state.cubes[i]
        const selectedObject = scene.getObjectByName(cube.cube.name);
        cube.cube.position.z += state.cubeSpeed

        if (!cube.damage && Game.detectCollisionCubes(cube.cube, cubePlayer)) {
            cube.damage = true
            Game.playerCollisionWithCube(cube, Game, i)
        }

        if (cube.cube.position.z > 5) {
            scene.remove(selectedObject);
            state.cubes.splice(i, 1)
        }        
    }

    if (+new Date()-state.lastCubeTime > state.cubeBirthSpeed) {
        state.lastCubeTime = +new Date()
        Game.addCube()
    }
}