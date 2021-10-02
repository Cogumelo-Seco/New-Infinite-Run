import * as THREE from 'three';

module.exports = (scene, camera, renderer, materials, Listener) => {
    const state = {
        time: 0,
        cubeBirthSpeed: 1000,
        lastCubeTime: 0,
        cubeSpeed: 1,
        fps: '0-0',
        player: {
            speedTime: 0,
            speed: 30,
            jump: true,
            score: 0,
            life: 100,
            dead: false
        },
        cubes: [],
        renderer,
        scene,
        camera
    }

    const getGameFunction = (type) => require(`./GameFunctions/${type}`)

    const addCube = (command) => getGameFunction('addCube')(command, state, materials, scene) 
    const buildScenery = (command) => getGameFunction('buildScenery')(command, state, materials, scene)
    const detectCollisionCubes = (obj1, obj2) => getGameFunction('detectCollisionCubes')(obj1, obj2)
    const playerCollisionWithCube = (cube, game, cubeCount) => getGameFunction('playerCollisionWithCube')(cube, game, cubeCount)
    const playSoundEffect = (type) => getGameFunction('playSoundEffect')(type)

    const run = () => {
        let gameElement = document.getElementById('game').appendChild(renderer.domElement)
        gameElement.id = "gameElement"

        const BoxGeometry = new THREE.BoxGeometry(1, 1.5, 1)
        const cubePlayer = new THREE.Mesh(BoxGeometry, materials.blue)
        scene.add(cubePlayer) 

        setInterval(() => {
            state.time++
            state.player.score += 10
            if (state.cubeBirthSpeed <= 0) state.cubeBirthSpeed = 0
            else state.cubeBirthSpeed -= 5
            if (state.cubeBirthSpeed < 600) state.boxSpeed = 2
            if (state.cubeBirthSpeed < 500) state.boxSpeed = 3
            if (state.cubeBirthSpeed < 400) state.boxSpeed = 4
            if (state.cubeBirthSpeed < 300) state.boxSpeed = 5
            if (state.cubeBirthSpeed < 200) state.boxSpeed = 6
            if (state.cubeBirthSpeed < 100) state.boxSpeed = 7
        }, 1000)

        camera.rotation.x -= 0.5

        state.player.cubePlayer = cubePlayer

        document.body.style.cursor = 'none'

        buildScenery()
    }

    return {
        state,
        run,
        addCube,
        buildScenery,
        detectCollisionCubes,
        playerCollisionWithCube,
        playSoundEffect
    }
}