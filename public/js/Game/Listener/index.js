module.exports = (Game) => {
    const state = {
        keys: {},
        paused: false,
    }

    document.addEventListener('keydown', (event) => {
        state.keys[event.code] = true
        handleKeys(event)
    })
    document.addEventListener('keyup', (event) => {
        state.keys[event.code] = false
    })

    function handleKeys(event) {
        if (state.paused && event.key == 'Escape' || state.paused && event.key == 'p') {
            document.body.style.cursor = 'none'
            document.getElementById('pauseObfuscation').style.display = 'none'
            state.paused = false
        } else if (event.key == 'Escape' || event.key == 'p') {
            document.body.style.cursor = 'default'
            document.getElementById('pauseObfuscation').style.display = 'block'            
            state.paused = true
        }
    }

    return {
        state
    }
}