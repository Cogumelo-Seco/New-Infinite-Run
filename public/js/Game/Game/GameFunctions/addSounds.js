export default (state) => {
    state.sounds = [
        { dir: 'specialCube.mp3' },
        { dir: 'damage.mp3' },
        { dir: 'coin.mp3' }
    ]

    return state.sounds.length
}