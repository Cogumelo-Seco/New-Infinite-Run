export default async (ctx, canvas, game, Listener, functions) => {
    let screenResize = Math.floor(Math.min(canvas.height*0.45, canvas.width*0.22))/150
    let screenElements = document.getElementById('screenElements')
    screenElements.style.backgroundColor = 'rgba(0, 0, 0, 0.5)'
    let notUpdate = screenElements && !screenElements.getElementsByClassName('endMenuElement')[0]
    //try {
        let endMenuElement = screenElements.getElementsByClassName('endMenuElement')[0] || document.createElement('div')

        
        if (notUpdate) screenElements.innerHTML = ''
        endMenuElement.className = 'endMenuElement stage'
        
        let endMenuStyle = document.getElementById('endMenuStyle') || document.createElement('style')
        endMenuStyle.id = 'endMenuStyle'
        endMenuStyle.innerHTML = `
            #returnButton {
                color: white;
                background-color: rgba(100, 100, 100, 0.85);
                border: 2px solid black;
                border-radius: 8px;
                transition: all 0.2s;
            }
            #returnButton:hover {
                background-color: rgba(100, 125, 150, 0.85);
            }
        `
        endMenuElement.appendChild(endMenuStyle)

        if (notUpdate) {
            let titleElement = document.getElementById('titleElement') || document.createElement('h1')
            titleElement.id = 'titleElement'
            titleElement.innerText = 'Fim de Jogo'
            titleElement.style.fontSize = screenResize*50+'px'
            titleElement.style.margin = `${screenResize*15+'px'} auto`
            titleElement.style.fontWeight = 'bold'
            endMenuElement.appendChild(titleElement)

            let currentDificulty = game.state.difficultyTex[game.state.settings.difficulty]

            let subtitleElement = document.getElementById('subtitleElement') || document.createElement('h1')
            subtitleElement.id = 'subtitleElement'
            subtitleElement.innerText = `Seu score na dificuldade ${currentDificulty || 'None'} foi: ${Number.parseInt(game.state.player.score)}`
            subtitleElement.style.fontSize = screenResize*11+'px'
            subtitleElement.style.margin = `${screenResize*15+'px'} auto`
            subtitleElement.style.fontWeight = 'bold'
            subtitleElement.style.width = '80%'
            endMenuElement.appendChild(subtitleElement)

            //

            let returnButton = document.getElementById('returnButton') || document.createElement('button')
            returnButton.id = 'returnButton'
            returnButton.innerHTML = 'Voltar'
            returnButton.style.width = canvas.width*0.3+'px'
            returnButton.style.height = screenResize*30+'px'
            returnButton.style.position = 'absolute'
            returnButton.style.left = canvas.width*0.5-(canvas.width*0.3/2)+'px'
            returnButton.style.top = canvas.height*0.5+'px'
            returnButton.style.fontSize = screenResize*12+'px'

            endMenuElement.onclick = () => {
                game.state.gameStage = 'menu'
                game.state.paused = false
                game.state.difficultyMultiplier = 1
                game.state.player.score = 0
                game.state.player.life = game.state.player.lifeLimit
                for (let i in game.state.poles) game.state.poles[i].speed = Math.min(2, (Math.max(game.state.difficultyMultiplier, 0.4)*1.5))
            }
            
            endMenuElement.appendChild(returnButton)

            screenElements.appendChild(endMenuElement)
        }
    //} catch {}
/*
    let screenResize = Math.floor(Math.min(canvas.height*0.45, canvas.width*0.22))/150

    let screenElements = document.getElementById('screenElements')
    let notUpdate = screenElements && !screenElements.getElementsByClassName('menuElement')[0]
    try {
        let menuElement = screenElements.getElementsByClassName('menuElement')[0] || document.createElement('div')

        
        if (notUpdate) screenElements.innerHTML = ''
        menuElement.className = 'menuElement stage'

        let menuStyle = document.getElementById('menuStyle') || document.createElement('style')
        menuStyle.id = 'menuStyle'
        menuStyle.innerHTML = `
            .menuButton {
                color: white;
                background-color: rgba(100, 100, 100, 0.85);
                border: 2px solid black;
                border-radius: 4px;
                transition: all 0.2s;
            }
            .menuButton:hover {
                background-color: rgba(100, 125, 150, 0.85);
            }

            #optionScreenElement {
                display: none;
                background-color: rgba(100, 100, 100, 0.85);
                position: absolute;
                width: ${canvas.width*0.45}px;
                left: ${canvas.width*0.5}px;
                top: 55%;
                transform: translateY(-50%);
                font-size: ${screenResize*8}px
            }

            th, td {
                border: 2px solid black;
                padding: 8px
            }

            #ApplyChangesButton {
                color: white;
                background-color: rgba(100, 100, 100, 0.85);
                border: 2px solid black;
                border-radius: 4px;
                padding: 4px;
                position: absolute;
                left: 0;
                bottom: -30px;
                transition: all 0.2s;
            }
            #ApplyChangesButton:hover {
                background-color: rgba(100, 125, 150, 0.85);
            }
        `
        menuElement.appendChild(menuStyle)

        let currentOptions = game.state.options[game.state.gameStage == 'menu' ? 'menu' : 'pause']

        let Y = canvas.height*0.55-((Object.keys(game.state.options.menu).length-1)*(canvas.height*0.15))
        for (let i in currentOptions) {
            let optionElement = document.getElementById(i+'-optionElement') || document.createElement('button')
            optionElement.id = i+'-optionElement'
            optionElement.className = 'menuButton'
            optionElement.innerHTML = i
            optionElement.style.width = canvas.width*0.3+'px'
            optionElement.style.height = screenResize*30+'px'
            optionElement.style.position = 'absolute'
            optionElement.style.left = canvas.width*0.25/2+'px'
            optionElement.style.top = Y+'px'
            optionElement.style.fontSize = screenResize*12+'px'

            optionElement.onclick = currentOptions[i]

            if (notUpdate) menuElement.appendChild(optionElement)

            Y += canvas.height*0.15*1.5
        }

        let titleElement = document.getElementById('titleElement') || document.createElement('h1')
        titleElement.id = 'titleElement'
        titleElement.innerText = 'Infinite Run'
        titleElement.style.fontSize = screenResize*50+'px'
        titleElement.style.marginTop = screenResize*10+'px'
        titleElement.style.fontWeight = 'bold'

        menuElement.appendChild(titleElement)

        if (notUpdate) {
            
            //

            let optionScreenElement = document.getElementById('optionScreenElement') || document.createElement('table')
            optionScreenElement.id = 'optionScreenElement'


            //

            let difficultyOption = document.getElementById('difficultyOption') || document.createElement('tr')
            difficultyOption.id = 'difficultyOption'

            let difficultyOptionText = document.getElementById('difficultyOptionText') || document.createElement('th')
            difficultyOptionText.id = 'difficultyOptionText'
            difficultyOptionText.innerText = 'Dificuldade'

            let difficultyOptionButton = document.getElementById('difficultyOptionButton') || document.createElement('th')
            difficultyOptionButton.id = 'difficultyOptionButton'
            difficultyOptionButton.innerHTML = `
                <select>
                    <option value="0">Fácil</option>
                    <option value="1">Médio</option>
                    <option value="2">Difícil</option>
                </select>
            `
            difficultyOption.appendChild(difficultyOptionText)
            difficultyOption.appendChild(difficultyOptionButton)

            //

            let shadowOption = document.getElementById('shadowOption') || document.createElement('tr')
            shadowOption.id = 'shadowOption'

            let shadowOptionText = document.getElementById('shadowOptionText') || document.createElement('th')
            shadowOptionText.id = 'shadowOptionText'
            shadowOptionText.innerText = 'Qualidade das Sombras'

            let shadowOptionButton = document.getElementById('shadowOptionButton') || document.createElement('th')
            shadowOptionButton.id = 'shadowOptionButton'
            shadowOptionButton.innerHTML = `
                <select>
                    <option value="0">Baixo</option>
                    <option value="1">Médio</option>
                    <option value="2">Auto</option>
                    <option value="3">Ultra</option>
                </select>
            `
            shadowOption.appendChild(shadowOptionText)
            shadowOption.appendChild(shadowOptionButton)

            //

            let rendererOption = document.getElementById('rendererOption') || document.createElement('tr')
            rendererOption.id = 'rendererOption'

            let rendererOptionText = document.getElementById('rendererOptionText') || document.createElement('th')
            rendererOptionText.id = 'rendererOptionText'
            rendererOptionText.innerText = 'Qualidade de Renderização'

            let rendererOptionButton = document.getElementById('rendererOptionButton') || document.createElement('th')
            rendererOptionButton.id = 'rendererOptionButton'
            rendererOptionButton.innerHTML = `
                <select>
                    <option value="0">Baixo</option>
                    <option value="1">Médio</option>
                    <option value="2">Auto</option>
                    <option value="3">Ultra</option>
                </select>
            `
            rendererOption.appendChild(rendererOptionText)
            rendererOption.appendChild(rendererOptionButton)

            //

            let ApplyChangesButton = document.getElementById('ApplyChangesButton') || document.createElement('button')
            ApplyChangesButton.id = 'ApplyChangesButton'
            ApplyChangesButton.innerText = 'Aplicar Alterações'
            
            optionScreenElement.appendChild(ApplyChangesButton)

            //


            optionScreenElement.appendChild(difficultyOption)
            optionScreenElement.appendChild(shadowOption)
            optionScreenElement.appendChild(rendererOption)
            menuElement.appendChild(optionScreenElement)

            screenElements.appendChild(menuElement)
        }
    } catch {}*/
}