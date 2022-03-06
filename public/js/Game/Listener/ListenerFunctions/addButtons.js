module.exports = (state, cookie) => {
    state.buttons['PlayGame'] = {
        minX: 406,
        maxX: 593,
        minY: 415,
        maxY: 492,
        pointer: true,
        over: false,
        gameState: [ 'menu', 'dead' ],
        onOver: () => state.Game.playSoundEffect('coin', { playbackRate: 15 }),
        onClick: () => {
            if (document.getElementById('options').style.display == 'block') return

            const { ShaderPass } = require('three/examples/jsm/postprocessing/ShaderPass.js')
            const { FXAAShader } = require('three/examples/jsm/shaders/FXAAShader.js')
            const { CopyShader } = require('three/examples/jsm/shaders/CopyShader.js')

            const fxaaPass = new ShaderPass(FXAAShader);
            fxaaPass.material.uniforms['resolution'].value.x = 0.5 / (window.innerWidth * window.devicePixelRatio);
            fxaaPass.material.uniforms['resolution'].value.y = 0.5 / (window.innerHeight * window.devicePixelRatio);

            if (cookie.FXAA == 'true') state.Game.state.composer.addPass(fxaaPass);
            else state.Game.state.composer.addPass(new ShaderPass(CopyShader));

            state.Game.state.gameState = 'game'
            state.Game.run()
        }
    }

    state.buttons['Options'] = {
        minX: 406,
        maxX: 593,
        minY: 536,
        maxY: 613,
        pointer: true,
        over: false,
        gameState: [ 'menu' ],
        onOver: () => state.Game.playSoundEffect('coin', { playbackRate: 15 }),
        onClick: () => {
            if (document.getElementById('options').style.display == 'block') return
            document.getElementById('options').style.display = 'block'
        }
    }

    state.buttons['ComeBackHome'] = {
        minX: 406,
        maxX: 593,
        minY: 536,
        maxY: 613,
        pointer: true,
        over: false,
        gameState: [ 'dead' ],
        onOver: () => state.Game.playSoundEffect('coin', { playbackRate: 15 }),
        onClick: () => {
            state.Game.state.gameState = 'menu'
        }
    }
}