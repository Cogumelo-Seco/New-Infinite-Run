module.exports = (cookie) => {
    const state = {
        keys: {},
        mousePosition: {
            x: window.innerWidth/2,
            y: window.innerHeight/2,
        },
        buttons: {},
        paused: false,
    }

    require('./ListenerFunctions/addButtons').default(state, cookie)

    document.onmousemove = (event) => {
        state.mousePosition.x = Math.floor(event.pageX/window.innerWidth*1000)
        state.mousePosition.y = Math.floor(event.pageY/window.window.innerHeight*1000)

        let X = Math.floor(event.pageX/window.innerWidth*1000)
        let Y = Math.floor(event.pageY/window.window.innerHeight*1000)
        
        let onAButton = false
        if (state.Game) for (let i in state.buttons) {
            let button = state.buttons[i]
            if (X > button.minX && X < button.maxX && Y > button.minY && Y < button.maxY && button.gameState.includes(state.Game.state.gameState)) {                
                if (!button.over && button.onOver) button.onOver()
                button.over = true
                if (button.pointer) {
                    onAButton = true                    
                    document.body.style.cursor = 'pointer'
                }
            } else button.over = false
        }
        if (!onAButton) document.body.style.cursor = 'default'
    }

    document.addEventListener('click', (event) => {
        let X = Math.floor(event.pageX/window.innerWidth*1000)
        let Y = Math.floor(event.pageY/window.window.innerHeight*1000)

        if (state.Game) for (let i in state.buttons) {
            let button = state.buttons[i]
            if (X > button.minX && X < button.maxX && Y > button.minY && Y < button.maxY && button.onClick && button.gameState.includes(state.Game.state.gameState)) button.onClick()
        }
    })

    document.addEventListener('keydown', (event) => {
        state.keys[event.code] = true
        handleKeys(event)
    })
    document.addEventListener('keyup', (event) => {
        state.keys[event.code] = false
    })

    function handleKeys(event) {
        if (event.key == 'Escape' || event.key == 'p') state.game.state.paused = state.game.state.paused ? false : true


        if (event.code == 'KeyP') state.game.changeSettings({ shadowQuality: 0 })
        if (event.code == 'KeyO') state.game.changeSettings({ shadowQuality: 1 })
        if (event.code == 'KeyI') state.game.changeSettings({ shadowQuality: 2 })
        if (event.code == 'KeyU') state.game.changeSettings({ shadowQuality: 3 })

        if (event.code == 'KeyL') state.game.changeSettings({ renderingQuality: 0 })
        if (event.code == 'KeyK') state.game.changeSettings({ renderingQuality: 1 })
        if (event.code == 'KeyJ') state.game.changeSettings({ renderingQuality: 2 })
        if (event.code == 'KeyH') state.game.changeSettings({ renderingQuality: 3 })
    }

    return {
        state
    }
}