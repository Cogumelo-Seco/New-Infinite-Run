import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/addons/postprocessing/RenderPass.js';
import { ShaderPass } from 'three/addons/postprocessing/ShaderPass.js';
import { FXAAShader } from 'three/addons/shaders/FXAAShader.js';
import { OutputPass } from 'three/addons/postprocessing/OutputPass.js';
import { VignetteShader } from 'three/addons/shaders/VignetteShader.js';

import { FocusShader } from 'three/addons/shaders/FocusShader.js';
import { FilmShader } from 'three/addons/shaders/FilmShader.js';
import { RGBShiftShader } from 'three/addons/shaders/RGBShiftShader.js';
import { TechnicolorShader } from 'three/addons/shaders/TechnicolorShader.js';
import { HorizontalBlurShader } from 'three/addons/shaders/HorizontalBlurShader.js';
import { HorizontalTiltShiftShader } from 'three/addons/shaders/HorizontalTiltShiftShader.js';
import { VerticalBlurShader } from 'three/addons/shaders/VerticalBlurShader.js';
import { VerticalTiltShiftShader } from 'three/addons/shaders/VerticalTiltShiftShader.js';
import { ColorifyShader } from 'three/addons/shaders/ColorifyShader.js';
import { ColorCorrectionShader } from 'three/addons/shaders/ColorCorrectionShader.js';
import { BleachBypassShader } from 'three/addons/shaders/BleachBypassShader.js';
import { GammaCorrectionShader } from 'three/addons/shaders/GammaCorrectionShader.js';
import { MirrorShader } from 'three/addons/shaders/MirrorShader.js';
import { SepiaShader } from 'three/addons/shaders/SepiaShader.js';
import { DotScreenShader } from 'three/addons/shaders/DotScreenShader.js';
import { GlitchPass } from 'three/addons/postprocessing/GlitchPass.js';

function createGame(Listener, canvas, THREE) {
    const state = {
        debug: false,
        fps: '0-0',
        gameStage: 'logo',
        firstLoading: true,
        paused: false,
        cubesPercent: [ 50, 92, 95, 97 ],
        cubes: { },
        poles: { },
        player: {
            scoreMultiplier: 1,
            score: 0,
            life: 100,
            lifeLimit: 100,
            distance: 0,
            v: 0,
            cubePlayer: null,
            currentJump: 0,
            doubleJumpControl: true,
        },
        loading: {
            loaded: 0,
            total: 0,
            msg: 'Loading...'
        },
        settings: {
            difficulty: 1,
            renderingQuality: 1,
            renderingQualityValue: 1,
            shadowQuality: 2,
            textureQuality: 1,
            shaders: 0,
            Vignette: true,
            FXAA: true,
            Low: false,
            VSync: false,
        },
        difficultyTex: {
            0: 'Fácil',
            1: 'Médio',
            2: 'Difícil',
            3: 'Extremo'
        },
        menuTextList: [
            'Use espaço para pular, você tem pulo duplo',
            'Use \'A D\' ou as setas direcionais para controlar o cubo',
            'Colida com os objetos amarelos para ganhar vida e pontos',
        ],
        currentTextMenu: 0,
        textMenuTime: +new Date(),
        options: null,
        sceneObjs: {},
        difficultyMultiplier: 1,
        cubeBirthSpeed: 500,
        lastCubeTime: +new Date(),
        lastPoleTime: +new Date(),
        playerFPSControl: 0,
        cubesFPSControl: 0,
        animationFPSControl: 0,
        regenFPSControl: 0,
        animations: {
            logoAnimation: {
                frame: 0,
                startFrame: 0,
                endFrame: 100,
                totalDalay: 0,
                dalay: 0,
                //loop: true
            },
        },
        Pass: { },
        Shaders: {
            FocusShader,
            GlitchPass,
            FilmShader,
            RGBShiftShader,
            BleachBypassShader,
            TechnicolorShader,
            HorizontalBlurShader,
            HorizontalTiltShiftShader,
            VerticalBlurShader,
            VerticalTiltShiftShader,
            ColorifyShader,
            ColorCorrectionShader,
            GammaCorrectionShader,
            MirrorShader,
            SepiaShader,
            DotScreenShader
        }
    }

    const addSounds = (command) => require('./GameFunctions/addSounds').default(state)
    const playSong = (type, command) => require('./GameFunctions/playSong').default(type, command, state)
    const buildScenery = (command) => require('./GameFunctions/buildScenery').default(command, state)
    const addCube = (command) => require('./GameFunctions/addCube').default(state, THREE)
    const addPole = (command) => require('./GameFunctions/addPole').default(state, THREE)
    const detectCollisionCubes = (object1, object2) => require('./GameFunctions/detectCollisionCubes').default(object1, object2)
    const playerCollisionWithCube = (command) => require('./GameFunctions/playerCollisionWithCube').default(command)
    
    state.Listener = Listener
    state.playSong = playSong
    state.canvas = canvas

    async function changeSettings({ shadowQuality, renderingQuality, difficulty, shaders, Vignette, FXAA, Low }) {
        let scene = state.scene

        if (Vignette != undefined && Vignette != state.settings.Vignette) {
            state.settings.Vignette = Vignette
            let VignettePass = state.Pass.VignettePass

            if (Vignette) state.composer.addPass(VignettePass)
            else state.composer.removePass(VignettePass)
        }

        if (FXAA != undefined && FXAA != state.settings.FXAA) {
            state.settings.FXAA = FXAA
            let FXAAPass = state.Pass.FXAAPass

            if (FXAA) state.composer.addPass(FXAAPass)
            else state.composer.removePass(FXAAPass)
        }

        if (Low != undefined && Low != state.settings.Low) {
            state.settings.Low = Low
            state.renderer.shadowMap.enabled = Low ? false : true;

            for (let i in state.sceneObjs) {
                let obj = state.sceneObjs[i]
                if (obj?.COLOR) {
                    obj.material = Low ? new THREE.MeshBasicMaterial({ color: obj.COLOR }) : new THREE.MeshPhongMaterial({ color: obj.COLOR, emissive: 'hsl(0, 0%, 0%)' })
                    obj.material.needsUpdate = true
                }
            }
        }

        if (!isNaN(difficulty) && difficulty != state.settings.difficulty && state.gameStage == 'menu') {
            state.settings.difficulty = difficulty
            
            switch (difficulty) {
                case 0:
                    state.cubesPercent = [ 60, 94, 95, 95 ]
                    break
                case 1:
                    state.cubesPercent = [ 50, 92, 95, 97 ]
                    break
                case 2:
                    state.cubesPercent = [ 40, 90, 95, 97 ]
                    break
                case 3:
                    state.cubesPercent = [ 30, 90, 95, 100 ]
                    break
            }

            switch (difficulty) {
                case 3:
                    state.player.lifeLimit = 50
                    state.player.life = state.player.lifeLimit
                    state.player.scoreMultiplier = 4
                    break
                default:
                    state.player.lifeLimit = 100
                    state.player.life = state.player.lifeLimit
                    state.player.scoreMultiplier = 1
            }
        } else if (!isNaN(difficulty) && difficulty != state.settings.difficulty && state.gameStage != 'menu') {
            alert('A dificuldade só pode ser mudada no menu principal.')
        }

        if (!isNaN(shaders) && shaders != state.settings.shaders) {
            let currentShadersPass = state.settings.shadersPass//state.Shaders[Object.keys(state.Shaders)[state.settings.shaders-1]]
            if (currentShadersPass) state.composer.removePass(currentShadersPass)

            state.settings.shaders = shaders
            let shadersName = Object.keys(state.Shaders)[state.settings.shaders-1]
            let newShaders = state.Shaders[shadersName]

            if (newShaders) {
                let newShadersPass = null
                if (shadersName.includes('Pass')) newShadersPass = new newShaders(scene, state.camera)
                else newShadersPass = new ShaderPass(newShaders)
                state.composer.addPass(newShadersPass)
                state.settings.shadersPass = newShadersPass
            }
        }

        if (!isNaN(renderingQuality) && renderingQuality != state.settings.renderingQuality) {
            state.settings.renderingQuality = renderingQuality

            switch (renderingQuality) {
                case 0:
                    state.settings.renderingQualityValue = 0.75
                    break
                case 1:
                    state.settings.renderingQualityValue = 1
                    break
                case 2:
                    state.settings.renderingQualityValue = 2
                    break
                case 3:
                    state.settings.renderingQualityValue = 4
                    break
            }
        }

        if(!isNaN(shadowQuality) && shadowQuality != state.settings.shadowQuality) {
            let light = scene.getObjectByName('sunLight')
            let lightTarget = scene.getObjectByName('sunLightTarget')

            scene.remove(light)
            scene.remove(lightTarget)

            light = new THREE.DirectionalLight(0x918c77, 20);
            light.position.set(20, 55, -100)
            light.target.position.set(0, 0, -50)
            
            light.shadow.camera.left = -70;
            light.shadow.camera.right = 70;
            light.shadow.camera.top = 120;
            light.shadow.camera.bottom = -70;

            state.settings.shadowQuality = shadowQuality
            switch(shadowQuality) {
                case 0:
                    light.castShadow = false
                    break
                case 1:
                    light.castShadow = true
                    light.shadow.mapSize.x = 2048
                    light.shadow.mapSize.y = 2048
                    break
                case 2:
                    light.castShadow = true
                    light.shadow.mapSize.x = 2048*2
                    light.shadow.mapSize.y = 2048*2
                    break
                case 3:
                    light.castShadow = true
                    light.shadow.mapSize.x = 2048*4
                    light.shadow.mapSize.y = 2048*4
                    break
                case 4:
                    light.castShadow = true
                    light.shadow.mapSize.x = 2048*8
                    light.shadow.mapSize.y = 2048*8
                    break
            }

            light.name = 'sunLight'
            light.target.name = 'sunLightTarget'
            scene.add(light);
            scene.add(light.target);
        }
    }

    async function start(lowMode) {
        if (lowMode) state.settings = {
            difficulty: 1,
            renderingQuality: 0,
            renderingQualityValue: 0.75,
            shadowQuality: 0,
            textureQuality: 0,
            shaders: 0,
            Vignette: false,
            FXAA: false,
            Low: true,
            VSync: true,
        }

        let container = document.getElementById('container');
        container.style.width = window.innerWidth
        container.style.height = window.innerHeight

        let camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 1.5, 5000);
        camera.lookAt(0, 0, 0);
        camera.position.y = 4.75
        camera.rotation.x = -0.475
        let scene = new THREE.Scene();

        let renderer = new THREE.WebGLRenderer();
        renderer.setPixelRatio(window.devicePixelRatio);
        renderer.setSize(window.innerWidth, window.innerHeight);
        //renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.autoClear = false;
        renderer.shadowMap.enabled = lowMode ? false : true;
        renderer.setClearColor(0xFFE995, 1);
        container.appendChild(renderer.domElement);

        //

        const renderPass = new RenderPass(scene, camera);
		renderPass.clearAlpha = 0;

        //

        const VignettePass = new ShaderPass(VignetteShader);
        const FXAAPass = new ShaderPass(FXAAShader);
        const outputPass = new OutputPass();
        const pixelRatio = renderer.getPixelRatio();

        FXAAPass.material.uniforms['resolution'].value.x = 1 / (window.innerWidth * pixelRatio);
        FXAAPass.material.uniforms['resolution'].value.y = 1 / (window.innerHeight * pixelRatio);

        
        let composer = new EffectComposer(renderer);
        composer.addPass(renderPass);
        composer.addPass(outputPass);

        if (!lowMode) {
            composer.addPass(FXAAPass)
            composer.addPass(VignettePass)
        }

        state.Pass.VignettePass = VignettePass
        state.Pass.FXAAPass = FXAAPass

        await buildScenery({ THREE, scene, lowMode })

        state.renderer = renderer
        state.camera = camera
        state.scene = scene
        state.container = container
        state.composer = composer


        //

        let openSettings = () => {
            let difficultySelect = document.getElementById('difficultyOptionButtonSelect')
            let shadowButtonSelect = document.getElementById('shadowOptionButtonSelect')
            let rendererSelect = document.getElementById('rendererOptionButtonSelect')

            if (difficultySelect) difficultySelect.value = state.settings.difficulty
            if (shadowButtonSelect) shadowButtonSelect.value = state.settings.shadowQuality
            if (rendererSelect) rendererSelect.value = state.settings.renderingQuality

            let optionScreenElement = document.getElementById('optionScreenElement')
            optionScreenElement.style.display = optionScreenElement.style.display == 'table' ? 'none' : 'table'
        }

        state.options = {
            menu: {
                Play: () => {
                    state.paused = false
                    state.gameStage = 'game'
                },
                Opções: openSettings,
            },
            pause: {
                Retomar: () => {
                    state.paused = false
                    state.gameStage = 'game'
                },
                Opções: openSettings,
                Sair: () => {
                    state.gameStage = 'end'
                    state.paused = false
                    state.player.cubePlayer.position.x = 0
                    for (let i in state.cubes) scene.remove(state.cubes[i].cube)
                    //for (let i in state.cubes) state.cubes.splice(i, 1)
                    state.cubes = {}
                }
            }
        }
    }

    async function gameLoop(command) {
        if (state.gameStage == 'logo' && state.animations.logoAnimation.frame >= state.animations.logoAnimation.endFrame) state.gameStage = 'menu'

        if (state.player.life <= 0 && !state.debug) {
            state.gameStage = 'end'
            state.player.cubePlayer.x = 0
            for (let i in state.cubes) state.scene.remove(state.cubes[i].cube)
            //for (let i in state.cubes) state.cubes.splice(i, 1)
            state.cubes = {}
        }


        if (+new Date()-state.textMenuTime >= 6000) {
            state.textMenuTime = +new Date()
            if (state.currentTextMenu+1 >= state.menuTextList.length) state.currentTextMenu = 0
            else state.currentTextMenu += 1
        }

        if (state.regenFPSControl+4000 <= +new Date() && state.settings.difficulty <= 1) {
            state.regenFPSControl = +new Date()
            if (state.player.life+(state.settings.difficulty == 1 ? 1 : 2) <= state.player.lifeLimit) state.player.life += state.settings.difficulty == 1 ? 1 : 2
            else state.player.life = state.player.lifeLimit
        }

        if (state.animationFPSControl+25 <= +new Date()) {
            state.animationFPSControl = +new Date()

            for (let i in state.animations) {
                let animation = state.animations[i]

                if (animation.dalay <= +new Date() && !animation.paused) {
                    animation.frame += animation.boomerang ? animation.boomerangForward ? 1 : -1 : 1
                    if (animation.frame > animation.endFrame) {
                        if (!animation.boomerang) animation.frame = animation.loop ? animation.startFrame : animation.endFrame
                        else animation.boomerangForward = animation.boomerangForward ? false : true
                    } else if (animation.frame < animation.startFrame) {
                        animation.boomerangForward = animation.boomerangForward ? false : true
                        animation.frame = animation.startFrame
                    }
                    animation.dalay = +new Date()+animation.totalDalay
                }
            }
        }
        

        if (state.gameStage == 'game' && !state.paused) {
            let player = state.player
            let keys = Listener.state.keys

            if (!player.cubePlayer || !state.camera) return
            
            player.cubePlayer.position.y = player.zeroPointY+player.distance
            
            if (state.playerFPSControl+25 <= +new Date()) {
                state.playerFPSControl = +new Date()

                if ((keys['KeyD'] || keys['ArrowRight']) && player.cubePlayer.position.x < 4.5) {
                    player.cubePlayer.position.x += 0.25
                }
                if ((keys['KeyA'] || keys['ArrowLeft']) && player.cubePlayer.position.x > -4.5) {
                    player.cubePlayer.position.x -= 0.25
                }

                if (player.distance <= 0) player.currentJump = 0
                if (!keys['Space']) player.doubleJumpControl = true

                if (keys['Space'] && (player.currentJump <= 1 && player.doubleJumpControl || player.distance <= 0)) {
                    player.v = 0.95-(player.currentJump/4)
                    player.currentJump += 1
                    player.doubleJumpControl = false
                }
                
                // Aceleração
                let a = 15 * (10 ** (-2))
                let getNewDistance = (S0, v, t) => S0 + v*t + 0.5 * (a*t)**2

                let timeGap = player.distance <= 0.001 && player.v <= 0 ? 0 : player.v < 0 ? 0.35 : 0.6
                player.distance = Math.min(Math.max(getNewDistance(player.distance, player.v, timeGap), 0), 15)
                player.v = player.v - (a * timeGap)
            }

            state.camera.position.y = player.cubePlayer.position.y+4
            //state.camera.rotation.y = (state.camera.position.x-player.cubePlayer.position.x)/64
            state.camera.position.x = player.cubePlayer.position.x

        }


        if (state.cubesFPSControl+35 <= +new Date()) {
            state.cubesFPSControl = +new Date()
            let scene = state.scene

            if (state.gameStage == 'game' && !state.paused) {
                for (let i in state.cubes) {
                    const cube = state.cubes[i]
                    const selectedObject = cube.cube//scene.getObjectByName(cube.cube.name);

                    if (!cube.collided) {
                        cube.cube.position.z += cube.speed

                        if (cube.type == 'special' && selectedObject) {
                            selectedObject.rotation.y += 0.20
                        }
                    } else if (selectedObject) {
                        cube.color += 5
                        cube.scale -= 0.1
                        if (cube.scale <= 0) {
                            scene.remove(selectedObject);
                            delete state.cubes[i]
                            //state.cubes.splice(i, 1)
                        } else {
                            selectedObject.position.z -= 0.5
                            selectedObject.position.y += 0.1
                            selectedObject.material.color.set(`hsl(${cube.color}, 100%, 50%)`)
                            selectedObject.scale.x = cube.scale;
                            selectedObject.scale.y = cube.scale;
                            selectedObject.scale.z = cube.scale;
                        }
                    }
        
                    if (!cube.collided && detectCollisionCubes(cube.cube, state.player.cubePlayer)) {
                        cube.collided = true
                        playerCollisionWithCube({ cube, state, playSong, i })
                    }
        
                    if (cube.cube.position.z > 10) {
                        scene.remove(selectedObject);
                        delete state.cubes[i]
                        //state.cubes.splice(i, 1)
                    }
                }

                if (+new Date()-state.lastCubeTime > state.cubeBirthSpeed*(state.difficultyMultiplier/1.5)) {
                    state.lastCubeTime = +new Date()
                    await addCube()
                    await addCube()

                    state.player.score += ((Math.floor(Math.random()*10)+5)/4)*state.player.scoreMultiplier

                    let difficulty = (state.settings.difficulty+1)*2
                    let maxDifficulty = difficulty == 2 ? 0.6 : difficulty == 4 ? 0.5 : difficulty == 6 ? 0.4 : difficulty == 8 ? 0.4 : 0.4

                    if (state.difficultyMultiplier > maxDifficulty) state.difficultyMultiplier = state.difficultyMultiplier-(difficulty/1000)
                    else state.difficultyMultiplier = maxDifficulty
                }
            }

            if (!state.paused) {
                for (let i in state.poles) {
                    const pole = state.poles[i]
                    const selectedObject = pole.pole//scene.getObjectByName(cube.cube.name);

                    if (selectedObject.position.z > 310) {
                        scene.remove(selectedObject);
                        delete state.poles[i]
                    } else {
                        selectedObject.position.z += pole.speed
                    }
                }

                if (+new Date()-state.lastPoleTime > 2000*(3-Math.min(2, (Math.max(state.difficultyMultiplier, 0.4)*1.5)))) {
                    state.lastPoleTime = +new Date()
                    await addPole()
                }
            }
        }
    }

    async function loading(command) {
        state.loading.total = await addSounds()

        let toLoad = state.sounds

        const newLoad = (msg) => {
            state.loading.loaded += 1
            state.loading.msg = `(${state.loading.loaded}/${state.loading.total}) - ${msg}`

            if (state.loading.loaded >= state.loading.total) completeLoading()
            else load(toLoad[state.loading.loaded])
        }

        const completeLoading = () => {
            state.loading.msg = `(${state.loading.loaded}/${state.loading.total}) 100% - Complete loading`
        }

        const load = async({ dir, animationConfigDir }) => {
            let loaded = false

            setTimeout(() => {
                if (!loaded) newLoad('[ERROR File failed to load] '+dir)
            }, 10000)

            if ([ 'ogg', 'mp3' ].includes(dir.split('.')[dir.split('.').length-1])) {
                //let link = 'https://raw.githubusercontent.com/Cogumelo-Seco/Cogu-FNF-Files/main/'+dir

                let sound = new Audio()
                sound.addEventListener('loadeddata', (e) => {
                    loaded = true
                    //newLoad(e.path[0].src)
                    newLoad(dir)
                })
                sound.addEventListener('error', (e) => newLoad('[ERROR] '+dir))
                sound.src = `/Sound/${dir}`
                sound.preload = 'auto'
                state.sounds[dir] = sound
            } /*else {
                let link = 'https://raw.githubusercontent.com/Cogumelo-Seco/Cogu-FNF-Files/main/imgs/'+dir
                let animationConfig = animationConfigDir ? JSON.parse(await fetch('https://raw.githubusercontent.com/Cogumelo-Seco/Cogu-FNF-Files/main/imgs/'+animationConfigDir).then(r => r.text())) : null

                let img = new Image()
                img.addEventListener('load', (e) => {
                    loaded = true
                    //newLoad(e.path[0].src)
                    newLoad(dir)
                })
                img.addEventListener('error',(e) => newLoad('[ERROR] '+dir))
                img.src = link
                img.id = dir
                state.images[dir] = {
                    image: img,
                    animationConfig
                }
            }*/
        }

        load(toLoad[0])
    }
    
    return {
        start,
        gameLoop,
        loading,
        playSong,
        state,
        changeSettings
    }
}

export default createGame