import * as THREE from 'three';

module.exports = function RenderScreen(Game, Listener, materials, router) {    
    const stateListener = Listener.state
    const state = Game.state
    const renderer = state.renderer
    
    const camera = state.camera
    
    const fps = Number(state.fps.split('-')[0])
    state.fps = `${fps + 1}-${state.fps.split('-')[1]}`

    state.renderer.setSize(window.innerWidth, window.innerHeight)

    if (!stateListener.paused && !state.player.dead) {
        require('./RenderCubes')(Game, Listener, materials, stateListener, state)
        require('./RenderPlayer')(Game, Listener, materials, stateListener, state)
        require('./RenderInformationTexts')(Game, Listener, materials, stateListener, state)
        require('./RenderLifeBar')(Game, Listener, materials, stateListener, state, router) 
    }   
    
    renderer.render(state.scene, camera);

    let rAF = window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.requestAnimationFrame;

    rAF(() => {
        RenderScreen(Game, Listener, materials, router)
    })
}