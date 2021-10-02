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
        if (event.key == 'Escape' && state.paused) {
            document.body.style.cursor = 'none'
            document.getElementById('pauseScreen').style.display = 'none'
            state.paused = false
        } else if (event.key == 'Escape') {
            document.body.style.cursor = 'default'
            document.getElementById('pauseScreen').style.display = 'block'
            state.paused = true
        }
    }

    return {
        state
    }
}