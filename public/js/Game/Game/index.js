import * as THREE from 'three';

module.exports = function Game(scene, camera, renderer, composer, materials, Listener, cookie) {
    let state = {
        gameState: 'menu',
        maxScore: 0,
        fullScreen: false,
        started: false,
        counter: 3,
        time: 0,
        cubeBirthSpeed: 1000,
        lastCubeTime: 0,
        cubeSpeed: 1,
        buildScenery: true,
        fps: '0-0',
        fpsDisplay: '??',
        sounds: [],
        player: {
            speedTime: 0,
            speed: 30,
            jump: true,
            score: 0,
            life: 100,
            dead: false
        },
        cubes: [],
        Listener,
        renderer,
        composer,
        scene,
        camera
    }

    const getGameFunction = (type) => require(`./GameFunctions/${type}`)

    const addSounds = () => require(`./GameFunctions/addSounds`)(state)
    const addCube = (command) => getGameFunction('addCube')(command, state, materials, scene) 
    const buildScenery = (command) => getGameFunction('buildScenery')(command, state, materials, scene, cookie)
    const detectCollisionCubes = (obj1, obj2) => getGameFunction('detectCollisionCubes')(obj1, obj2)
    const playerCollisionWithCube = (cube, game, cubeCount) => getGameFunction('playerCollisionWithCube')(cube, game, cubeCount)
    const playSoundEffect = (type, command) => getGameFunction('playSoundEffect')(type, command, state)

    function run() {
        document.getElementById('lifeBar').style.display = 'block'

        const BoxGeometry = new THREE.BoxGeometry(1, 1.5, 1)
        let cubePlayer = null
        if (state.player.cubePlayer) cubePlayer = state.player.cubePlayer
        else if (cookie.performanceMode == 'false') cubePlayer = new THREE.Mesh(BoxGeometry, materials.player)
        else cubePlayer = new THREE.Mesh(BoxGeometry, materials.playerLow)
        cubePlayer.castShadow = true
        scene.add(cubePlayer) 

        let interval = setInterval(() => {
            
            if (state.counter >= 1 && !Listener.state.paused) state.counter = state.counter-1
            else if (!state.started && !Listener.state.paused) state.started = true

            if (!Listener.state.paused && state.started) {
                state.time++
                state.player.score += 10
                if (state.player.life+0.5 >= 100) state.player.life = 100
                else state.player.life += 0.5

                switch(cookie.difficulty) {
                    case 0:
                        if (state.cubeBirthSpeed < 200) state.cubeBirthSpeed = 200
                        else state.cubeBirthSpeed -= 2
                        break
                    case 1:
                        if (state.cubeBirthSpeed < 150) state.cubeBirthSpeed = 150
                        else state.cubeBirthSpeed -= 9
                        break
                    case 2:
                        if (state.cubeBirthSpeed < 100) state.cubeBirthSpeed = 100
                        else state.cubeBirthSpeed -= 15
                        break
                    case 3:
                        if (state.cubeBirthSpeed <= 0) state.cubeBirthSpeed = 0
                        else state.cubeBirthSpeed -= 30
                        break
                }

                if (state.cubeBirthSpeed <= 160 && cookie.difficulty == 3) state.cubeSpeed = 0.5
                else state.cubeSpeed = state.cubeBirthSpeed/(state.cubeBirthSpeed/2)
                /*if (state.cubeBirthSpeed < 900) state.cubeSpeed = 1.25
                if (state.cubeBirthSpeed < 800) state.cubeSpeed = 1.5
                if (state.cubeBirthSpeed < 700) state.cubeSpeed = 1.75
                if (state.cubeBirthSpeed < 600) state.cubeSpeed = 2
                if (state.cubeBirthSpeed < 500) state.cubeSpeed = 2.25
                if (state.cubeBirthSpeed < 400) state.cubeSpeed = 2.5
                if (state.cubeBirthSpeed < 300) state.cubeSpeed = 2.75
                if (state.cubeBirthSpeed < 200) state.cubeSpeed = 3
                if (state.cubeBirthSpeed < 100) state.cubeSpeed = 3.5
                if (state.cubeBirthSpeed < 50 && cookie.difficulty == 3) state.cubeSpeed = 0.5*/
            }
        }, 1000)

        let interval2 = setInterval(() => {
            const player = state.player
            const keys = Listener.state.keys

            if (keys['KeyQ']) player.life = 0

            if (player.life <= 0) {
                document.getElementById('lifeBar').style.display = 'none'

                state.gameState = 'dead'
                state.maxScore = Number(player.score)
                state.started = false
                state.counter = 3
                state.time = 0
                state.cubeBirthSpeed = 1000
                state.lastCubeTime = 0
                state.cubeSpeed = 1
                state.player = {
                    speedTime: 0,
                    speed: 30,
                    jump: true,
                    score: 0,
                    life: 100,
                    dead: false,
                    cubePlayer
                }

                for (let i in state.cubes) {
                    const cube = state.cubes[i]
                    const selectedObject = scene.getObjectByName(cube.cube.name);

                    scene.remove(selectedObject);
                    state.cubes.splice(i, 1)
                }

                clearInterval(interval)
                clearInterval(interval2)
            }

            if (!Listener.state.paused) movePlayer(player, keys, cubePlayer)
            if (state.started && !Listener.state.paused) moveCubes(player, keys, cubePlayer)
        }, 16)

        state.player.cubePlayer = cubePlayer

        if (state.buildScenery) buildScenery(cookie)
    }

    function movePlayer(player, keys, cubePlayer) {
        if (cubePlayer.position.y >= 6) player.jump = false
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
        camera.rotation.x = -0.45
    }

    function moveCubes(player, keys, cubePlayer) {
        for (let i in state.cubes) {
            const cube = state.cubes[i]
            const selectedObject = scene.getObjectByName(cube.cube.name);
            cube.cube.position.z += state.cubeSpeed

            if (!cube.damage && detectCollisionCubes(cube.cube, cubePlayer)) {
                cube.damage = true
                playerCollisionWithCube(cube, state, playSoundEffect, i)
            }

            if (cube.cube.position.z > 10) {
                scene.remove(selectedObject);
                state.cubes.splice(i, 1)
            }
        }

        if (+new Date()-state.lastCubeTime > state.cubeBirthSpeed) {
            state.lastCubeTime = +new Date()
            addCube(cookie)
        }
    }

    async function loadData() {
        await addSounds()

        for (let i of state.sounds) {
            let sound = new Audio(`/sounds/${i}.mp3`)
            state.sounds[i] = sound
        }
    }

    return {
        state,
        run,
        loadData,
        addCube,
        buildScenery,
        detectCollisionCubes,
        playerCollisionWithCube,
        playSoundEffect
    }
}