export default async function renderGame(canvas, game, Listener, THREE) {
    if (+new Date()-game.state.fps.split('-')[1] > 1000) {
        game.state.changeRenderTypeCount += 1
        game.state.fpsDisplay = game.state.fps.split('-')[0]
        game.state.fps = `0-${+new Date()}`
    }
    game.state.fps = `${Number(game.state.fps.split('-')[0]) + 1}-${game.state.fps.split('-')[1]}`

    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
    const ctx = canvas.getContext('2d')
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    const functions = require('./functions').default(ctx, canvas, game.state, Listener)
    
    require('./RenderScreenInformation').default(ctx, canvas, game, Listener, functions)

    if (game.state.camera) {
        game.state.camera.aspect = window.innerWidth / window.innerHeight;
        game.state.camera.updateProjectionMatrix();
        
        game.state.renderer.setSize(window.innerWidth, window.innerHeight)
        game.state.composer.setSize(window.innerWidth*game.state.settings.renderingQuality, window.innerHeight*game.state.settings.renderingQuality)
        game.state.composer.render();
    }

    if (((game.state.paused && game.state.gameStage == 'game') || game.state.gameStage == 'menu') && game.state.options) {
        require('./RenderPauseAndMenuScreen').default(ctx, canvas, game, Listener, functions)
    } else if (game.state.gameStage == 'end') {
        require('./RenderEndScreen').default(ctx, canvas, game, Listener, functions)
    } else {
        let screenElements = document.getElementById('screenElements')
        screenElements.innerHTML = ''
        screenElements.style.backgroundColor = 'rgba(0, 0, 0, 0)'
    }

    game.gameLoop()

    let rAF = window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.requestAnimationFrame;

    if (!game.state.settings.VSync) setTimeout(() => renderGame(canvas, game, Listener, THREE), 0)
    else rAF(() => renderGame(canvas, game, Listener, THREE))
}
/*
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
}*/