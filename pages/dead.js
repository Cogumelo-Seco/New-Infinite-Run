import data from '../public/js/data.js';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import Head from "next/head";

const Game = (props) => {
    const router = useRouter()

    useEffect(() => {
        document.body.style.cursor = 'default'
        
        if (!data.score) router.push('/game')
        let buttonSong = new Audio('/songs/coin.mp3')
        buttonSong.playbackRate = 15

        const comeBackHome = document.getElementById('comeBackHome')
        comeBackHome.addEventListener('click', () => router.push('/'))
        comeBackHome.addEventListener('mouseover', () => buttonSong.play())

        const restartGame = document.getElementById('restartGame')
        restartGame.addEventListener('click', () => router.push('/game'))
        restartGame.addEventListener('mouseover', () => buttonSong.play())
    }, [])

    return (
        <html lang="pt-BR">
            <Head>
                <title>Dead</title>

                <meta charset="UTF-8" />
                <meta http-equiv="X-UA-Compatible" content="IE=edge" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                
                <link rel="stylesheet" href="/css/dead/animations.css" />
                <link rel="stylesheet" href="/css/dead/dead.css" />
                <link rel="stylesheet" href="/css/dead/resizable.css" />
            </Head>
            <body>

                <section>
                    <h1 id="title">Você morreu</h1>
                    <h2 id="maxScore">Seu score máximo foi: {data.score}</h2>

                    <ul>
                        <li id="comeBackHome">Voltar ao Início</li>
                        <li id="restartGame">Reiniciar jogo</li>
                    </ul>

                    <div id="ownerName">Power by: Cogumelo</div>
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