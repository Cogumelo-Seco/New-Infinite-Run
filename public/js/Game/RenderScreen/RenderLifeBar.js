import data from '../../data.js';

module.exports = (Game, Listener, materials, stateListener, state, router) => {
    const player = Game.state.player

    const lifeBar = document.getElementById('lifeBar2')
    const lifePercentText = document.getElementById('lifePercentText')

    lifePercentText.innerText = `${player.life}%`
    lifeBar.style.width = `${player.life}%`

    if (player.life >= 100) player.life = 100
    if (player.life <= 0 && !player.dead) {
        document.body.style.cursor = 'default'
        document.getElementById('game').innerHTML = ''
        data.score = player.score
        player.dead = true
        router.push('/dead')
    }
}