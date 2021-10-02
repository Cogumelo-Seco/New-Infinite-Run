import createGame from '../public/js/Game/Game/index.js'
import startRender from '../public/js/Game/RenderScreen/index.js'
import createListener from '../public/js/Game/Listener/index.js'
import materials from '../public/js/Game/materials.js'
import * as THREE from 'three';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import Head from "next/head";

const Game = (props) => {
    const router = useRouter()

    useEffect(() => {
        let scene = new THREE.Scene()
        let camera = new THREE.PerspectiveCamera(45, window.innerWidth/window.innerHeight, 0.1, 1000)
        let renderer = new THREE.WebGLRenderer()

        const Materials = materials()
        const Listener = createListener()
        const Game = createGame(scene, camera, renderer, Materials, Listener)
        Game.run()
        startRender(Game, Listener, Materials, router)

        let buttonSong = new Audio('/songs/coin.mp3')
        buttonSong.playbackRate = 15

        const comeBackHome = document.getElementById('comeBackHome')
        comeBackHome.addEventListener('click', () => {
            document.getElementById('game').innerHTML = ''
            router.push('/')
        })
        comeBackHome.addEventListener('mouseover', () => buttonSong.play())

        const restartGame = document.getElementById('resumeGame')
        restartGame.addEventListener('click', () => {
            document.body.style.cursor = 'none'
            document.getElementById('pauseScreen').style.display = 'none'
            Listener.state.paused = false
        })
        restartGame.addEventListener('mouseover', () => buttonSong.play())
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

                    <div id="pauseScreen">
                        <h1>Pause</h1>
                        <p id="resumeGame">Voltar ao jogo</p>
                        <p id="comeBackHome">Voltar ao menu</p>
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