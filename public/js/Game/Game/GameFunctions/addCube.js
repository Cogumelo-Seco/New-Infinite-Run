export default async (state, THREE) => {
    let scene = state.scene

    let X = (Math.random()*9)-4.5;
    let Y = 0
    let Z = -300
    const typePercent = Math.random()*100
    let type = 'small' 
    if (typePercent >= state.cubesPercent[0]) type = 'big'
    if (typePercent >= state.cubesPercent[1]) type = 'wall'
    if (typePercent >= state.cubesPercent[2]) type = 'death'
    if (typePercent >= state.cubesPercent[3]) type = 'special'
    //type = 'death'

    let cube = null
    let cubeData = { type, scale: 1 }

    switch(type) {
        case 'small':
            var BoxGeometry = new THREE.BoxGeometry(1, 1)
            //cube = new THREE.Mesh(BoxGeometry, materials.smallCube)
            cube = new THREE.Mesh(BoxGeometry, state.settings.textureQuality == 0 ? new THREE.MeshBasicMaterial({ color: 'hsl(0, 100%, 30%)' }) : new THREE.MeshPhongMaterial({ color: 'hsl(0, 100%, 50%)', emissive: 0x000000 }))
            cube.position.x = X
            cube.position.y = Y+0.5
            cube.position.z = Z
            cubeData.color = 0
            break
        case 'big':
            var BoxGeometry = new THREE.BoxGeometry(1.7, 2.5, 1.7)
            //cube = new THREE.Mesh(BoxGeometry, materials.bigCube)
            cube = new THREE.Mesh(BoxGeometry, state.settings.textureQuality == 0 ? new THREE.MeshBasicMaterial({ color: 'hsl(270, 100%, 30%)' }) : new THREE.MeshPhongMaterial({ color: 'hsl(270, 100%, 50%)', emissive: 0x000000 }))
            
            cube.position.x = X
            cube.position.y = Y+1.25
            cube.position.z = Z
            cubeData.color = 270
            break
        case 'wall':
            var BoxGeometry = new THREE.BoxGeometry(4, 6, 0.5)
            //cube = new THREE.Mesh(BoxGeometry, materials.bigCube)
            cube = new THREE.Mesh(BoxGeometry, state.settings.textureQuality == 0 ? new THREE.MeshBasicMaterial({ color: 'hsl(174, 100%, 30%)' }) : new THREE.MeshPhongMaterial({ color: 'hsl(174, 100%, 50%)', emissive: 0x000000 }))
            
            cube.position.x = X
            cube.position.y = Y+(5/2)
            cube.position.z = Z
            cubeData.color = 174
            break
        case 'death':
            var BoxGeometry = new THREE.BoxGeometry(0.5, 2.6, 0.5)
            cube = new THREE.Mesh(BoxGeometry, state.settings.textureQuality == 0 ? new THREE.MeshBasicMaterial({ color: 'hsl(0, 0%, 0%)' }) : new THREE.MeshPhongMaterial({ color: 'hsl(0, 0%, 0%)', emissive: 0x000000 }))
            cube.position.x = X
            cube.position.y = Y+1.25
            cube.position.z = Z
            cubeData.color = 0
            break
        case 'special':
            var BoxGeometry = new THREE.BoxGeometry(0.20, 0.85, 0.85)
            //cube = new THREE.Mesh(BoxGeometry, materials.specialCube)
            cube = new THREE.Mesh(BoxGeometry, state.settings.textureQuality == 0 ? new THREE.MeshBasicMaterial({ color: 'hsl(50, 100%, 30%)' }) : new THREE.MeshPhongMaterial({ color: 'hsl(50, 100%, 50%)', emissive: 0x000000 }))
            cube.position.x = X
            cube.position.y = Y+0.75//+0.425
            cube.position.z = Z
            cubeData.color = 50
            break
    }

    cube.castShadow = true
    cube.receiveShadow = state.settings.shadowQuality >= 3 ? true : false

    cube.name = Math.random().toString(36).substring(2)+Math.random().toString(36).substring(2)

    scene.add(cube)

    cubeData.speed = (1.5-(Math.min(state.difficultyMultiplier/2, 0.5)))*0.84//Math.min(2, (Math.max(1-state.difficultyMultiplier, 0.4)*1.5))
    console.log(cubeData.speed)
    cubeData.cube = cube
    state.cubes[cube.name] = cubeData
}