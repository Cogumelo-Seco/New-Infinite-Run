module.exports = (Game, Listener, materials, cookie, router, ctx) => {
    const player = Game.state.player

    const lifeBar1 = document.getElementById('lifeBar1')
    const lifeBar2 = document.getElementById('lifeBar2')
    const lifePercentText = document.getElementById('lifePercentText')

    lifePercentText.innerText = `${Number.parseInt(player.life)}%`
    lifeBar1.style.width = `${player.life}%`
    lifeBar2.style.width = `${player.life}%`

    if (player.life >= 100) player.life = 100
}