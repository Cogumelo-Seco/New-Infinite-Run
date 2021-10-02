import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import Head from "next/head";

const Game = (props) => {
    const router = useRouter()

    useEffect(() => {
        let buttonSong = new Audio('/songs/coin.mp3')
        buttonSong.playbackRate = 15
        
        const playGame = document.getElementById('playGame')
        playGame.addEventListener('click', () => router.push('/game'))
        playGame.addEventListener('mouseover', () => buttonSong.play())
    }, [])

    return (
        <html lang="pt-BR">
            <Head>
                <title>Home</title>

                <meta charset="UTF-8" />
                <meta http-equiv="X-UA-Compatible" content="IE=edge" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                
                <link rel="stylesheet" href="/css/home/animations.css" />
                <link rel="stylesheet" href="/css/home/home.css" />
                <link rel="stylesheet" href="/css/home/resizable.css" />
            </Head>
            <body>

                <section>
                    <h1 id="gameName">Infinite Run</h1>

                    <ul>
                        <li id="playGame">Iniciar Jogo</li>
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