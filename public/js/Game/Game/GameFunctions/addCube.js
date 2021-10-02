import * as THREE from 'three';

module.exports = (command, state, materials, scene) => {
    let X = (Math.random()*10)-5;
    let Y = 0
    let Z = -90
    const typePercent = Math.floor(Math.random()*100);
    let type = 'small' 
    if (typePercent >= 60) type = 'big'
    if (typePercent >= 95) type = 'special'

    let cube = null

    switch(type) {
        case 'small':
            var BoxGeometry = new THREE.BoxGeometry(1, 1)
            cube = new THREE.Mesh(BoxGeometry, materials.green)
            cube.position.x = X
            cube.position.y = Y-0.5
            cube.position.z = Z
            break
        case 'big':
            var BoxGeometry = new THREE.BoxGeometry(1.7, 4, 1.7)
            cube = new THREE.Mesh(BoxGeometry, materials.purple)
            cube.position.x = X
            cube.position.y = Y-0.5
            cube.position.z = Z
            break
        case 'special':
            var BoxGeometry = new THREE.BoxGeometry(0.85, 0.85, 0.85)
            cube = new THREE.Mesh(BoxGeometry, materials.gold)
            cube.position.x = X
            cube.position.y = Y-0.6
            cube.position.z = Z
            break
    }

    cube.name = Math.random().toString(36).substring(2)

    scene.add(cube)

    state.cubes.push({
        type,
        cube
    })
}