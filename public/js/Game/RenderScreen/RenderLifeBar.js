module.exports = (Game, Listener, materials, stateListener, state, data, router) => {
    const player = Game.state.player

    const lifeBar1 = document.getElementById('lifeBar1')
    const lifeBar2 = document.getElementById('lifeBar2')
    const lifePercentText = document.getElementById('lifePercentText')

    lifePercentText.innerText = `${player.life}%`
    lifeBar1.style.width = `${player.life}%`
    lifeBar2.style.width = `${player.life}%`

    if (player.life >= 100) player.life = 100
    if (player.life <= 0 && !player.dead) {
        document.body.style.cursor = 'default'
        document.getElementById('game').innerHTML = ''
        data.score = player.score
        player.dead = true
        router.push('/dead')
    }
}