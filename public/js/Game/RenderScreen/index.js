module.exports = function RenderScreen(Game, Listener, materials, router, cookie) {    
    let graphic = 1
    if (cookie.graphic == 1) graphic = 2.5
    if (cookie.graphic == 2) graphic = 1.9
    if (cookie.graphic == 3) graphic = 1.3
    
    const fps = Number(Game.state.fps.split('-')[0])
    Game.state.fps = `${fps + 1}-${Game.state.fps.split('-')[1]}`

    const canvas = document.getElementById('canvas');
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
    const ctx = canvas.getContext('2d')
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    Game.state.camera.aspect = window.innerWidth / window.innerHeight;
    Game.state.camera.updateProjectionMatrix();
    Game.state.renderer.setSize(window.innerWidth, window.innerHeight)

    if (!Listener.state.paused && Game.state.gameState == 'game') {
        require('./RenderPlayer')(Game, Listener, materials, cookie, ctx)
        require('./RenderLifeBar')(Game, Listener, materials, cookie, router, ctx)
    } else if (Game.state.gameState == 'menu') {
        require('./RenderMenu')(Game, Listener, materials, cookie, router, ctx) 
    } else if (Game.state.gameState == 'dead') {
        require('./RenderDeathScreen')(Game, Listener, materials, cookie, router, ctx) 
    }


    require('./RenderInformationTexts')(Game, Listener, materials, cookie, ctx) 

    Game.state.renderer.setSize(window.innerWidth, window.innerHeight)
    Game.state.composer.setSize(window.innerWidth/graphic, window.innerHeight/graphic)

    Game.state.composer.render();

    let rAF = window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.requestAnimationFrame;

    rAF(() => {
        RenderScreen(Game, Listener, materials, router, cookie)
    })
}