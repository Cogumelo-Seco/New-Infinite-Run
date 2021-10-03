import createGame from '../public/js/Game/Game/index.js'
import startRender from '../public/js/Game/RenderScreen/index.js'
import createListener from '../public/js/Game/Listener/index.js'
import materials from '../public/js/Game/materials.js'
import * as THREE from 'three';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import Head from "next/head";
import data from '../public/js/data.js'

const Game = (props) => {
    const router = useRouter()

    useEffect(() => {
        let scene = new THREE.Scene()
        let camera = new THREE.PerspectiveCamera(45, window.innerWidth/window.innerHeight, 0.1, 1000)
        camera.lookAt(0, 0, 0);
        let renderer = new THREE.WebGLRenderer()
        renderer.shadowMap.enabled = true;

        const Materials = materials()
        const Listener = createListener()
        const Game = createGame(scene, camera, renderer, Materials, Listener, data)
        Game.run()
        startRender(Game, Listener, Materials, router, data)
    }, [])

    return (
        <html lang="pt-BR">
            <Head>
                <title>Game</title>

                <meta charset="UTF-8" />
                <meta http-equiv="X-UA-Compatible" content="IE=edge" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                
                <link rel="stylesheet" href="/css/game/animations.css" />
                <link rel="stylesheet" href="/css/game/game.css" />
                <link rel="stylesheet" href="/css/game/resizable.css" />
            </Head>
            <body>
                <div id="game"></div>
                <section>
                    <div id="lifeBar">
                        <div id="lifeBar2" />
                        <p id="lifePercentText">100%</p>
                    </div>

                    <div id="couter">3</div>

                    <div id="pauseObfuscation">
                        <h1 id="pauseText">Pause</h1>
                    </div>               

                    <div id="playerScore">Score: ?</div>

                    <div id="fpsDisplay">?FPS</div>
                </section>
            </body>
        </html>
    )
}

export async function getStaticProps() {
    return {
        props: {
            
        },
        revalidate: 1800
    }
}

export default Game