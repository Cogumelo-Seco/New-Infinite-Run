import createGame from '../public/js/Game/Game/index.js'
import startRender from '../public/js/Game/RenderScreen/index.js'
import createListener from '../public/js/Game/Listener/index.js'
import materials from '../public/js/Game/materials.js'
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import cookies from 'next-cookies';
import Head from "next/head";
import data from '../public/js/data.js'
import * as THREE from 'three';

const Game = (props) => {
    const cookie = cookies(data)
    const router = useRouter()

    useEffect(async() => {
        const { EffectComposer  } = require('three/examples/jsm/postprocessing/EffectComposer.js')
        const { RenderPass  } = require('three/examples/jsm/postprocessing/RenderPass.js')

        const options = document.getElementById('options')
        const saveButton = document.getElementById('saveButton')  
        const cancelButton = document.getElementById('cancelButton')        

        const selectDifficulty = document.getElementById('selectDifficulty')
        const selectGraphic = document.getElementById('selectGraphic')
        const selectShadowQuality = document.getElementById('selectShadowQuality')        
        const FXAACheckbox = document.getElementById('FXAACheckbox')
        const showFPSCheckbox = document.getElementById('showFPSCheckbox')
        const performanceModeCheckbox = document.getElementById('performanceModeCheckbox')

        if (!cookie.FXAA) {            
            cookie.showFPS = 'true'
            cookie.FXAA = 'true'
            cookie.performanceMode = 'false'
            cookie.difficulty = 2
            cookie.graphic = 4
            cookie.shadowQuality = 3

            selectDifficulty.value = 'Normal'
            selectGraphic.value = 'Alto'
            selectShadowQuality.value = 'Alto'
            FXAACheckbox.checked = true
            showFPSCheckbox.checked = true
            performanceModeCheckbox.checked = false

            document.cookie = `graphic=${cookie.graphic}; path=/`;
            document.cookie = `shadowQuality=${cookie.shadowQuality}; path=/`;
            document.cookie = `FXAA=${cookie.FXAA}; path=/`;
            document.cookie = `showFPS=${cookie.showFPS}; path=/`;
            document.cookie = `performanceMode=${cookie.performanceMode}; path=/`;
            document.cookie = `difficulty=${cookie.difficulty}; path=/`;
        } else {
            FXAACheckbox.checked = cookie.FXAA == 'true' ? true : false
            showFPSCheckbox.checked = cookie.showFPS == 'true' ? true : false
            performanceModeCheckbox.checked = cookie.performanceMode == 'true' ? true : false

            if (cookie.graphic == 1) selectGraphic.value = 'Muito Baixo'
            else if (cookie.graphic == 2) selectGraphic.value = 'Baixo'
            else if (cookie.graphic == 3) selectGraphic.value = 'Médio'
            else selectGraphic.value = 'Alto'

            if (cookie.difficulty == 1) selectDifficulty.value = 'Fácil'
            else if (cookie.difficulty == 2) selectDifficulty.value = 'Normal'
            else if (cookie.difficulty == 3) selectDifficulty.value = 'Difícil'
            else selectDifficulty.value = 'Impossível'

            if (cookie.shadowQuality == 1) selectShadowQuality.value = 'Baixo'
            else if (cookie.shadowQuality == 2) selectShadowQuality.value = 'Médio'
            else selectShadowQuality.value = 'Alto'
        }

        cancelButton.addEventListener('click', () => options.style.display = 'none', false)
        saveButton.addEventListener('click', () => {
            cookie.FXAA = FXAACheckbox.checked.toString()
            cookie.showFPS = showFPSCheckbox.checked.toString()
            cookie.performanceMode = performanceModeCheckbox.checked.toString()

            if (selectGraphic.value == 'Muito Baixo') cookie.graphic = 1
            else if (selectGraphic.value == 'Baixo') cookie.graphic = 2
            else if (selectGraphic.value == 'Médio') cookie.graphic = 3
            else cookie.graphic = 4

            if (selectDifficulty.value == 'Fácil') cookie.difficulty = 1
            else if (selectDifficulty.value == 'Normal') cookie.difficulty = 2
            else if (selectDifficulty.value == 'Difícil') cookie.difficulty = 3
            else cookie.difficulty = 4

            if (selectShadowQuality.value == 'Baixo') cookie.shadowQuality = 1
            else if (selectShadowQuality.value == 'Médio') cookie.shadowQuality = 2
            else cookie.shadowQuality = 3

            document.cookie = `graphic=${cookie.graphic}; path=/`;
            document.cookie = `shadowQuality=${cookie.shadowQuality}; path=/`;
            document.cookie = `FXAA=${cookie.FXAA}; path=/`;
            document.cookie = `showFPS=${cookie.showFPS}; path=/`;
            document.cookie = `performanceMode=${cookie.performanceMode}; path=/`;
            document.cookie = `difficulty=${cookie.difficulty}; path=/`;

            options.style.display = 'none'
        }, false)

        let scene = new THREE.Scene()
        let camera = new THREE.PerspectiveCamera(50, window.innerWidth/window.innerHeight, 0.1, 500000)
        camera.lookAt(0, 0, 0);
        let renderer = new THREE.WebGLRenderer()
        renderer.shadowMap.enabled = true;
        renderer.setClearColor(0xFFE995, 1);

        const composer = new EffectComposer(renderer);
        composer.addPass(new RenderPass(scene, camera));

        const Materials = materials()
        const Listener = createListener(cookie)
        const Game = createGame(scene, camera, renderer, composer, Materials, Listener, cookie)
        Listener.state.Game = Game

        await Game.loadData()

        let gameElement = document.getElementById('game').appendChild(renderer.domElement)
        gameElement.id = "gameElement"

        startRender(Game, Listener, Materials, router, cookie)
    }, [])

    return (
        <html lang="pt-BR">
            <Head>
                <title>Infinite Run</title>
            </Head>
            <head>
                <meta charset="UTF-8" />
                <meta http-equiv="X-UA-Compatible" content="IE=edge" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                
                <link rel="stylesheet" href="/css/game/animations.css" />
                <link rel="stylesheet" href="/css/game/game.css" />
                <link rel="stylesheet" href="/css/game/resizable.css" />
            </head>            
            <body>
                <section>
                    <canvas id="canvas" />
                    <div id="game" />

                    <div id="lifeBar">
                        <div id="lifeBar1" />
                        <div id="lifeBar2" />
                        <p id="lifePercentText">100%</p>
                    </div>

                    <div id="options">
                        <table>
                            <tr>
                                <th className="optionName">Dificuldade</th>
                                <th className="optionProp">
                                    <select className="option" id="selectDifficulty" >
                                        <option>Fácil</option>
                                        <option>Normal</option>
                                        <option>Difícil</option>
                                        <option>Impossível</option>
                                    </select>
                                </th>
                            </tr>
                            <tr>
                                <th className="optionName">Grafico</th>
                                <th className="optionProp">
                                    <select className="option" id="selectGraphic" >
                                        <option>Muito Baixo</option>
                                        <option>Baixo</option>
                                        <option>Médio</option>
                                        <option>Alto</option>
                                    </select>
                                </th>
                            </tr>
                            <tr>
                                <th className="optionName">Qualidade das sombras</th>
                                <th className="optionProp">
                                    <select className="option" id="selectShadowQuality" >
                                        <option>Baixo</option>
                                        <option>Médio</option>
                                        <option>Alto</option>                                
                                    </select>
                                </th>
                            </tr>
                            <tr>
                                <th className="optionName">FXAA</th>
                                <th className="optionProp">
                                    <label className="switch">
                                        <input type="checkbox" id="FXAACheckbox" />
                                        <span className="slider"></span>
                                    </label>
                                </th>
                            </tr>
                            <tr>
                                <th className="optionName">Mostrar FPS</th>
                                <th className="optionProp">
                                    <label className="switch">
                                        <input type="checkbox" id="showFPSCheckbox" />
                                        <span className="slider"></span>
                                    </label>
                                </th>
                            </tr>
                            <tr>
                                <th className="optionName">Modo desempenho</th>
                                <th className="optionProp">
                                    <label className="switch">
                                        <input type="checkbox" id="performanceModeCheckbox" />
                                        <span className="slider"></span>
                                    </label>
                                </th>
                            </tr>
                        </table>
                        <button id="saveButton">Salvar</button>
                        <button id="cancelButton">Cancelar</button>
                    </div>                   
                </section>
            </body>
        </html>
    )
}

/*<p>
    Tela cheia <label className="switch">
        <input type="checkbox" id="fullScreenCheckbox" />
        <span className="slider"></span>
    </label>
</p>*/

export async function getStaticProps() {
    return {
        props: {
            
        },
        revalidate: 1800
    }
}

export default Game