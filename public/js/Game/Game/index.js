import * as THREE from 'three';

module.exports = (scene, camera, renderer, materials, Listener, data) => {
    const state = {
        fullScreen: false,
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
        if (data.graphic > 0) var cubePlayer = new THREE.Mesh(BoxGeometry, materials.player)
        else var cubePlayer = new THREE.Mesh(BoxGeometry, materials.playerLow)
        if (data.shadow) {
            cubePlayer.castShadow = true
            cubePlayer.receiveShadow = false
        }
        scene.add(cubePlayer) 

        camera.rotation.x = -1.5
        setInterval(() => {
            const couter = document.getElementById('couter')
            if (Number(couter.innerText) >= 0) couter.innerText = Number(couter.innerText)-1
            else if (camera.rotation.x == -1.5) {
                camera.rotation.x = -0.48
                couter.style.display = 'none'
            }

            if (!state.fullScreen && data.fullScreen) {
                state.fullScreen = true
                document.documentElement.requestFullscreen()
                    .catch(() => console.log('Erro ao tentar deixar o jogo em tela cheia'))
            }

            if (!Listener.state.paused) {
                state.time++
                state.player.score += 10
                switch(data.difficulty) {
                    case 0:
                        if (state.cubeBirthSpeed < 100) state.cubeBirthSpeed = 100
                        else state.cubeBirthSpeed -= 2
                        break
                    case 1:
                        if (state.cubeBirthSpeed < 65) state.cubeBirthSpeed = 65
                        else state.cubeBirthSpeed -= 9
                        break
                    case 2:
                        if (state.cubeBirthSpeed < 50) state.cubeBirthSpeed = 50
                        else state.cubeBirthSpeed -= 15
                        break
                    case 3:
                        if (state.cubeBirthSpeed <= 0) state.cubeBirthSpeed = 0
                        else state.cubeBirthSpeed -= 30
                        break
                }
                if (state.cubeBirthSpeed < 900) state.cubeSpeed = 1.25
                if (state.cubeBirthSpeed < 800) state.cubeSpeed = 1.5
                if (state.cubeBirthSpeed < 700) state.cubeSpeed = 1.75
                if (state.cubeBirthSpeed < 600) state.cubeSpeed = 2
                if (state.cubeBirthSpeed < 500) state.cubeSpeed = 2.25
                if (state.cubeBirthSpeed < 400) state.cubeSpeed = 2.5
                if (state.cubeBirthSpeed < 300) state.cubeSpeed = 2.75
                if (state.cubeBirthSpeed < 200) state.cubeSpeed = 3
                if (state.cubeBirthSpeed < 100) state.cubeSpeed = 3.5
                if (state.cubeBirthSpeed < 50 && data.difficulty == 3) state.cubeSpeed = 0.5
            }
        }, 1000)

        state.player.cubePlayer = cubePlayer

        document.body.style.cursor = 'none'

        buildScenery(data)
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