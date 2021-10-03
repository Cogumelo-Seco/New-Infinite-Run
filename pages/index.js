import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import Head from "next/head";
import data from '../public/js/data.js'

const Game = (props) => {
    const router = useRouter()

    useEffect(() => {
        document.body.style.cursor = 'default'
        
        const options = document.getElementById('options')
        const playGame = document.getElementById('playGame')
        const optionsButton = document.getElementById('optionsButton')
        const saveButton = document.getElementById('saveButton')
        const selectGraphic = document.getElementById('selectGraphic')
        const cancelButton = document.getElementById('cancelButton')
        const fullScreenCheckbox = document.getElementById('fullScreenCheckbox')
        const selectDifficulty = document.getElementById('selectDifficulty')
        const shadow = document.getElementById('shadow')
        const shadowCheckbox = document.getElementById('shadowCheckbox')

        let buttonSong = new Audio('/songs/coin.mp3')
        buttonSong.playbackRate = 15
                
        playGame.addEventListener('click', () => router.push('/game'))
        playGame.addEventListener('mouseover', () => buttonSong.play())
        
        optionsButton.addEventListener('click', () => {
            options.style.display = 'block'
        })
        optionsButton.addEventListener('mouseover', () => buttonSong.play())

        if (data.graphic == 2) selectGraphic.value = 'Alto'
        else if (data.graphic == 1) selectGraphic.value = 'Médio'
        else selectGraphic.value = 'Baixo'

        if (data.difficulty == 3) selectDifficulty.value = 'Impossível'
        if (data.difficulty == 2) selectDifficulty.value = 'Difícil'
        else if (data.difficulty == 1) selectDifficulty.value = 'Normal'
        else selectDifficulty.value = 'Fácil'

        fullScreenCheckbox.checked = data.fullScreen

        saveButton.addEventListener('click', () => {
            if (selectGraphic.value == 'Alto') data.graphic = 2
            else if (selectGraphic.value == 'Médio') data.graphic = 1
            else data.graphic = 0

            if (selectDifficulty.value == 'Impossível') data.difficulty = 3
            else if (selectDifficulty.value == 'Difícil') data.difficulty = 2
            else if (selectDifficulty.value == 'Normal') data.difficulty = 1
            else data.difficulty = 0

            data.shadow = selectGraphic.value == 'Alto' ? shadowCheckbox.checked : false
            data.fullScreen = fullScreenCheckbox.checked
            options.style.display = 'none'
        })

        cancelButton.addEventListener('click', () => options.style.display = 'none')

        function loop() {
            if (selectGraphic.value == 'Alto') shadow.style.display = 'block'
            else shadow.style.display = 'none'

            let rAF = window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.requestAnimationFrame;

            rAF(() => {
                loop()
            })
        }
        loop()
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
                        <li id="optionsButton">Opções</li>
                    </ul>

                    <div id="options">
                        <p id="difficulty">
                            Dificuldade <select id="selectDifficulty" >
                                <option>Fácil</option>
                                <option>Normal</option>
                                <option>Difícil</option>
                                <option>Impossível</option>
                            </select>
                        </p>
                        <p id="graphic">
                            Gráfico <select id="selectGraphic" >
                                <option>Baixo</option>
                                <option>Médio</option>
                                <option>Alto</option>                                
                            </select>
                        </p>
                        <p id="shadow">
                            Sombra <label className="switch">
                                <input type="checkbox" id="shadowCheckbox" />
                                <span className="slider"></span>
                            </label>
                        </p>
                        <p>
                            Tela cheia <label className="switch">
                                <input type="checkbox" id="fullScreenCheckbox" />
                                <span className="slider"></span>
                            </label>
                        </p>
                        <button id="saveButton">Salvar</button>
                        <button id="cancelButton">Cancelar</button>
                    </div>

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