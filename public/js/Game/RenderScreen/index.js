import * as THREE from 'three';

module.exports = function RenderScreen(Game, Listener, materials, router, data) {    
    const stateListener = Listener.state
    const state = Game.state
    const renderer = state.renderer
    const camera = state.camera
    
    const fps = Number(state.fps.split('-')[0])
    state.fps = `${fps + 1}-${state.fps.split('-')[1]}`

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    state.renderer.setSize(window.innerWidth, window.innerHeight)

    if (!stateListener.paused && !state.player.dead) {
        require('./RenderCubes')(Game, Listener, materials, stateListener, state, data)
        require('./RenderPlayer')(Game, Listener, materials, stateListener, state, data)
        require('./RenderInformationTexts')(Game, Listener, materials, stateListener, state, data)
        require('./RenderLifeBar')(Game, Listener, materials, stateListener, state, data, router) 
    }   
    
    renderer.render(state.scene, camera);

    let rAF = window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.requestAnimationFrame;

    if (!state.player.dead) rAF(() => {
        RenderScreen(Game, Listener, materials, router, data)
    })
}