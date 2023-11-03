import createGame from '../public/js/Game/Game/index.js'
import startRender from '../public/js/Game/RenderScreen/index.js'
import createListener from '../public/js/Game/Listener/index.js'
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import cookies from 'next-cookies';
import data from '../public/js/data.js'
import * as THREE from 'three';
import Head from 'next/head';

const Game = (props) => {
    const cookie = cookies(data)
    const router = useRouter()

    useEffect(async() => {
        let canvas = document.getElementById('canvas')
        let Listener = createListener();
        let game = createGame(Listener, canvas, THREE);
        Listener.state.game = game

        game.loading()
        game.start()

        startRender(canvas, game, Listener, THREE)
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

                <canvas id="canvas" />
                <div id="container" />
                <div id="screenElements" />

                <div id="lifeBar">
                    <div id="lifeBar1" />
                    <div id="lifeBar2" />
                    <p id="lifePercentText">100%</p>
                </div>
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