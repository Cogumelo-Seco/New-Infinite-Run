module.exports = (type, command, state) => {
    let sound = state.sounds[type]
    if (!sound) return

    sound.currentTime = 0
    sound.loop = command?.loop ? true : false
    sound.volume = Number(command?.volume) || 1
    sound.playbackRate = Number(command?.playbackRate) || 1
    sound.play()
}