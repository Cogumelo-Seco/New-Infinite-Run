module.exports = (type) => {
    switch(type) {
        case 'specialCube':
            var song = new Audio('/songs/special.mp3');
            song.play()
            break
        case 'damage':
            var song = new Audio('/songs/damage.mp3');
            song.play()
            break
    }
}