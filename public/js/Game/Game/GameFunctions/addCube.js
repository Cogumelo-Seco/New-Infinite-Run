import * as THREE from 'three';

module.exports = (cookie, state, materials, scene) => {
    let X = (Math.random()*9)-4.5;
    let Y = 0
    let Z = -700
    const typePercent = Math.random()*100
    let type = 'small' 
    if (typePercent >= 40) type = 'big'
    if (typePercent >= 95) type = 'special'

    let cube = null

    switch(type) {
        case 'small':
            var BoxGeometry = new THREE.BoxGeometry(1, 1)
            if (cookie.performanceMode == 'false') cube = new THREE.Mesh(BoxGeometry, materials.smallCube)
            else cube = new THREE.Mesh(BoxGeometry, materials.smallCubeLow)
            cube.position.x = X
            cube.position.y = Y-0.5
            cube.position.z = Z
            break
        case 'big':
            var BoxGeometry = new THREE.BoxGeometry(1.7, 2.5, 1.7)
            if (cookie.performanceMode == 'false') cube = new THREE.Mesh(BoxGeometry, materials.bigCube)
            else cube = new THREE.Mesh(BoxGeometry, materials.bigCubeLow)
            cube.position.x = X
            cube.position.y = Y
            cube.position.z = Z
            break
        case 'special':
            var BoxGeometry = new THREE.BoxGeometry(0.85, 0.85, 0.85)
            if (cookie.performanceMode == 'false') cube = new THREE.Mesh(BoxGeometry, materials.specialCube)
            else cube = new THREE.Mesh(BoxGeometry, materials.specialCubeLow)
            cube.position.x = X
            cube.position.y = Y-0.6
            cube.position.z = Z
            break
    }

    cube.castShadow = true
    cube.receiveShadow = false

    cube.name = Math.random().toString(36).substring(2)

    scene.add(cube)

    state.cubes.push({
        type,
        cube
    })
}