export default async (ctx, canvas, game, Listener, functions) => {
    let screenResize = Math.floor(Math.min(canvas.height*0.45, canvas.width*0.22))/150

    let screenElements = document.getElementById('screenElements')
    screenElements.style.backgroundColor = 'rgba(0, 0, 0, 0.5)'
    let notUpdate = screenElements && !screenElements.getElementsByClassName('menuElement')[0]
    //try {
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
                top: 58%;
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
                border-radius: 8px;
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

        let Y = canvas.height*0.58-((Object.keys(game.state.options.menu).length-1)*(canvas.height*0.15))
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

        let subtitleElement = document.getElementById('subtitleElement') || document.createElement('h1')
        subtitleElement.id = 'subtitleElement'
        subtitleElement.innerText = game.state.menuTextList[game.state.currentTextMenu]
        subtitleElement.style.fontSize = screenResize*11+'px'
        subtitleElement.style.margin = `${screenResize*15+'px'} auto`
        subtitleElement.style.fontWeight = 'bold'
        subtitleElement.style.width = '80%'
        menuElement.appendChild(subtitleElement)

        if (notUpdate) {
            
            //

            let optionScreenElement = document.getElementById('optionScreenElement') || document.createElement('table')
            optionScreenElement.id = 'optionScreenElement'
            optionScreenElement.style.display = game.state.firstLoading ? 'table' : 'none'
            game.state.firstLoading = false

            //

            let difficultyOption = document.getElementById('difficultyOption') || document.createElement('tr')
            difficultyOption.id = 'difficultyOption'

            let difficultyOptionText = document.getElementById('difficultyOptionText') || document.createElement('th')
            difficultyOptionText.id = 'difficultyOptionText'
            difficultyOptionText.innerText = 'Dificuldade'

            let difficultyOptionButton = document.getElementById('difficultyOptionButton') || document.createElement('th')
            difficultyOptionButton.id = 'difficultyOptionButton'
            let difficultyOptionButtonSelect = document.getElementById('difficultyOptionButtonSelect') || document.createElement('select')
            difficultyOptionButtonSelect.id = 'difficultyOptionButtonSelect'
            difficultyOptionButtonSelect.innerHTML = `
                <option value="0">Fácil</option>
                <option value="1">Médio</option>
                <option value="2">Difícil</option>
                <option value="3">Extremo</option>
            `
            difficultyOptionButtonSelect.value = game.state.settings.difficulty
            difficultyOptionButton.appendChild(difficultyOptionButtonSelect)
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
            let shadowOptionButtonSelect = document.getElementById('shadowOptionButtonSelect') || document.createElement('select')
            shadowOptionButtonSelect.id = 'shadowOptionButtonSelect'
            shadowOptionButtonSelect.innerHTML = `
                <option value="0">Sem</option>
                <option value="1">Baixo</option>
                <option value="2">Médio</option>
                <option value="3">Auto</option>
                <option value="4">Ultra</option>
            `
            shadowOptionButtonSelect.value = game.state.settings.shadowQuality
            shadowOptionButton.appendChild(shadowOptionButtonSelect)
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
            let rendererOptionButtonSelect = document.getElementById('rendererOptionButtonSelect') || document.createElement('select')
            rendererOptionButtonSelect.id = 'rendererOptionButtonSelect'
            rendererOptionButtonSelect.innerHTML = `
                <option value="0">Baixo</option>
                <option value="1">Médio</option>
                <option value="2">Auto</option>
                <option value="3">Ultra</option>
            `
            rendererOptionButtonSelect.value = game.state.settings.renderingQuality
            rendererOptionButton.appendChild(rendererOptionButtonSelect)
            rendererOption.appendChild(rendererOptionText)
            rendererOption.appendChild(rendererOptionButton)

            //

            let textureOption = document.getElementById('textureOption') || document.createElement('tr')
            textureOption.id = 'textureOption'

            let textureOptionText = document.getElementById('textureOptionText') || document.createElement('th')
            textureOptionText.id = 'textureOptionText'
            textureOptionText.innerText = 'Qualidade das Texturas'

            let textureOptionButton = document.getElementById('textureOptionButton') || document.createElement('th')
            textureOptionButton.id = 'textureOptionButton'
            let textureOptionSelect = document.getElementById('textureOptionSelect') || document.createElement('select')
            textureOptionSelect.id = 'textureOptionSelect'
            textureOptionSelect.innerHTML = `
                <option value="0">Baixo</option>
                <option value="1">Médio</option>
            `
            textureOptionSelect.value = game.state.settings.textureQuality
            textureOptionButton.appendChild(textureOptionSelect)
            textureOption.appendChild(textureOptionText)
            textureOption.appendChild(textureOptionButton)

            //

            let shadersOption = document.getElementById('shadersOption') || document.createElement('tr')
            shadersOption.id = 'shadersOption'

            let shadersOptionText = document.getElementById('shadersOptionText') || document.createElement('th')
            shadersOptionText.id = 'shadersOptionText'
            shadersOptionText.innerText = 'Shaders/Pass'

            let shadersOptionButton = document.getElementById('shadersOptionButton') || document.createElement('th')
            shadersOptionButton.id = 'shadersOptionButton'
            let shadersOptionSelect = document.getElementById('shadersOptionSelect') || document.createElement('select')
            shadersOptionSelect.id = 'shadersOptionSelect'
            shadersOptionSelect.innerHTML = `
                <option value="0">Sem</option>
            `
            for (let i in Object.keys(game.state.Shaders)) shadersOptionSelect.innerHTML += `<option value="${Number(i)+1}">${Object.keys(game.state.Shaders)[i]}</option>`
            shadersOptionSelect.value = game.state.settings.shaders
            shadersOptionButton.appendChild(shadersOptionSelect)
            shadersOption.appendChild(shadersOptionText)
            shadersOption.appendChild(shadersOptionButton)

            //

            let VSyncOption = document.getElementById('VSyncOption') || document.createElement('tr')
            VSyncOption.id = 'VSyncOption'

            let VSyncOptionText = document.getElementById('VSyncOptionText') || document.createElement('th')
            VSyncOptionText.id = 'VSyncOptionText'
            VSyncOptionText.innerText = 'VSync'

            let VSyncOptionButton = document.getElementById('VSyncOptionButton') || document.createElement('th')
            VSyncOptionButton.id = 'VSyncOptionButton'

            let VSyncOptionLabel = document.createElement('label')
            VSyncOptionLabel.className = 'switch'

            let VSyncOptionInput = document.createElement('input')
            VSyncOptionInput.type = 'checkbox'
            VSyncOptionInput.id = 'VSyncOptionInput'
            VSyncOptionLabel.appendChild(VSyncOptionInput)

            let VSyncOptionSpan = document.createElement('span')
            VSyncOptionSpan.className = 'slider'
            VSyncOptionLabel.appendChild(VSyncOptionSpan)

            VSyncOptionInput.checked = game.state.settings.VSync
            VSyncOptionButton.appendChild(VSyncOptionLabel)

            VSyncOption.appendChild(VSyncOptionText)
            VSyncOption.appendChild(VSyncOptionButton)

            //

            let VignetteOption = document.getElementById('VignetteOption') || document.createElement('tr')
            VignetteOption.id = 'VignetteOption'

            let VignetteOptionText = document.getElementById('VignetteOptionText') || document.createElement('th')
            VignetteOptionText.id = 'VignetteOptionText'
            VignetteOptionText.innerText = 'Vignette'

            let VignetteOptionButton = document.getElementById('VignetteOptionButton') || document.createElement('th')
            VignetteOptionButton.id = 'VignetteOptionButton'

            let VignetteOptionLabel = document.createElement('label')
            VignetteOptionLabel.className = 'switch'

            let VignetteOptionInput = document.createElement('input')
            VignetteOptionInput.type = 'checkbox'
            VignetteOptionInput.id = 'VignetteOptionInput'
            VignetteOptionLabel.appendChild(VignetteOptionInput)

            let VignetteOptionSpan = document.createElement('span')
            VignetteOptionSpan.className = 'slider'
            VignetteOptionLabel.appendChild(VignetteOptionSpan)

            VignetteOptionInput.checked = game.state.settings.Vignette
            VignetteOptionButton.appendChild(VignetteOptionLabel)

            VignetteOption.appendChild(VignetteOptionText)
            VignetteOption.appendChild(VignetteOptionButton)

            //

            let FXAAOption = document.getElementById('FXAAOption') || document.createElement('tr')
            FXAAOption.id = 'FXAAOption'

            let FXAAOptionText = document.getElementById('FXAAOptionText') || document.createElement('th')
            FXAAOptionText.id = 'FXAAOptionText'
            FXAAOptionText.innerText = 'FXAA'

            let FXAAOptionButton = document.getElementById('FXAAOptionButton') || document.createElement('th')
            FXAAOptionButton.id = 'FXAAOptionButton'

            let FXAAOptionLabel = document.createElement('label')
            FXAAOptionLabel.className = 'switch'

            let FXAAOptionInput = document.createElement('input')
            FXAAOptionInput.type = 'checkbox'
            FXAAOptionInput.id = 'FXAAOptionInput'
            FXAAOptionLabel.appendChild(FXAAOptionInput)

            let FXAAOptionSpan = document.createElement('span')
            FXAAOptionSpan.className = 'slider'
            FXAAOptionLabel.appendChild(FXAAOptionSpan)

            FXAAOptionInput.checked = game.state.settings.FXAA
            FXAAOptionButton.appendChild(FXAAOptionLabel)

            FXAAOption.appendChild(FXAAOptionText)
            FXAAOption.appendChild(FXAAOptionButton)

            //

            let LowOption = document.getElementById('LowOption') || document.createElement('tr')
            LowOption.id = 'LowOption'

            let LowOptionText = document.getElementById('LowOptionText') || document.createElement('th')
            LowOptionText.id = 'LowOptionText'
            LowOptionText.innerText = 'Modo desempenho'

            let LowOptionButton = document.getElementById('LowOptionButton') || document.createElement('th')
            LowOptionButton.id = 'LowOptionButton'

            let LowOptionLabel = document.createElement('label')
            LowOptionLabel.className = 'switch'

            let LowOptionInput = document.createElement('input')
            LowOptionInput.type = 'checkbox'
            LowOptionInput.id = 'LowOptionInput'
            LowOptionLabel.appendChild(LowOptionInput)

            let LowOptionSpan = document.createElement('span')
            LowOptionSpan.className = 'slider'
            LowOptionLabel.appendChild(LowOptionSpan)

            LowOptionInput.checked = game.state.settings.Low
            LowOptionButton.appendChild(LowOptionLabel)

            LowOption.appendChild(LowOptionText)
            LowOption.appendChild(LowOptionButton)

            //

            let ApplyChangesButton = document.getElementById('ApplyChangesButton') || document.createElement('button')
            ApplyChangesButton.id = 'ApplyChangesButton'
            ApplyChangesButton.innerText = 'Aplicar Alterações'

            ApplyChangesButton.onclick = () => {
                game.changeSettings({
                    shadowQuality: Number(shadowOptionButtonSelect.value), 
                    renderingQuality: Number(rendererOptionButtonSelect.value),
                    difficulty: Number(difficultyOptionButtonSelect.value),
                    shaders: Number(shadersOptionSelect.value),
                    Vignette: Boolean(VignetteOptionInput.checked),
                    FXAA: Boolean(FXAAOptionInput.checked),
                    Low: Boolean(LowOptionInput.checked),
                })

                game.state.settings.textureQuality = Number(textureOptionSelect.value)
                game.state.settings.VSync = Boolean(VSyncOptionInput.checked)

                optionScreenElement.style.display = 'none'
            }
            
            optionScreenElement.appendChild(ApplyChangesButton)

            //


            optionScreenElement.appendChild(difficultyOption)
            optionScreenElement.appendChild(shadowOption)
            optionScreenElement.appendChild(rendererOption)
            optionScreenElement.appendChild(textureOption)
            optionScreenElement.appendChild(shadersOption)
            optionScreenElement.appendChild(VignetteOption)
            optionScreenElement.appendChild(FXAAOption)
            optionScreenElement.appendChild(LowOption)
            optionScreenElement.appendChild(VSyncOption)
            menuElement.appendChild(optionScreenElement)

            screenElements.appendChild(menuElement)

            /*let VSyncOptionInput = document.getElementById('VSyncOptionInput')
            VSyncOptionInput.checked = true*/
        }
    //} catch {}
}