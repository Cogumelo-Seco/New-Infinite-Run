export default ({ THREE, scene }, state) => {
    let hemiLight = new THREE.HemisphereLight(0xD1BA8D, 0xD1BA8D, 0.4);
    hemiLight.position.set(20, 500, -100);
    scene.add(hemiLight);

    //

    const light = new THREE.DirectionalLight(0xACA586, 15);
    light.position.set(20, 55, -100)
    light.target.position.set(0, 0, -50)
    //const light = new THREE.PointLight(0xB5A672, 2);
    light.castShadow = true
    light.shadow.camera.left = -70;
    light.shadow.camera.right = 70;
    light.shadow.camera.top = 120;
    light.shadow.camera.bottom = -70;
    
    light.shadow.mapSize.x = 2048*8
    light.shadow.mapSize.y = 2048*8

    light.name = 'sunLight'
    light.target.name = 'sunLightTarget'
    state.sceneObjs['light'] = light
    scene.add(light);
    scene.add(light.target);

    // ASPHALT

    const geometryAsphalt = new THREE.PlaneGeometry(10, 300)
    let asphalt = new THREE.Mesh(geometryAsphalt, new THREE.MeshPhongMaterial({ color: 'hsl(0, 0%, 20%)', emissive: 'hsl(0, 0%, 10%)' }))
    asphalt.receiveShadow = true;
    asphalt.position.z = -150
    asphalt.position.y = 0
    asphalt.rotation.x = -Math.PI/2
    scene.add(asphalt)

    const BoxGeometrySidewalk = new THREE.BoxGeometry(2, 0.5, 300)

    let sidewalk1 = new THREE.Mesh(BoxGeometrySidewalk, new THREE.MeshPhongMaterial({ color: 'hsl(0, 0%, 50%)', emissive: 'hsl(0, 0%, 10%)' }))
    sidewalk1.receiveShadow = true;
    sidewalk1.castShadow = true
    sidewalk1.position.z = -150
    sidewalk1.position.y = 0
    sidewalk1.position.x = -6
    scene.add(sidewalk1)

    let sidewalk2 = new THREE.Mesh(BoxGeometrySidewalk, new THREE.MeshPhongMaterial({ color: 'hsl(0, 0%, 50%)', emissive: 'hsl(0, 0%, 10%)' }))
    sidewalk2.receiveShadow = true;
    sidewalk2.castShadow = true
    sidewalk2.position.z = -150
    sidewalk2.position.y = 0
    sidewalk2.position.x = 6
    scene.add(sidewalk2)

    // PLAYER

    let BoxGeometry = new THREE.BoxGeometry(1, 1.5, 1)
    let cubePlayer = null
    if (state.player.cubePlayer) cubePlayer = state.player.cubePlayer
    else cubePlayer = new THREE.Mesh(BoxGeometry, new THREE.MeshPhongMaterial({ color: 'hsl(115, 100%, 50%)', emissive: 'hsl(0, 0%, 0%)' }))
    cubePlayer.castShadow = true
    cubePlayer.receiveShadow = true;
    cubePlayer.position.z = -5
    cubePlayer.position.y = 0.75
    scene.add(cubePlayer)
    state.player.cubePlayer = cubePlayer
    state.player.zeroPointY = cubePlayer.position.y

/*
    const geometrySand = new THREE.PlaneGeometry(1000, 700)
    let sand = new THREE.Mesh(geometrySand, new THREE.MeshPhongMaterial({ color: 0xFFE995, emissive: 'hsl(0, 0%, 0%)' }))
    sand.receiveShadow = true;
    sand.position.z = -330
    sand.rotation.x = -Math.PI/2
    sand.position.y = -0.89

    scene.add(sand)*/

    // BACKGROUND

    const color = new THREE.Color(0xECD680);
    scene.background = color

/*
    let poleMaterial = new THREE.MeshPhongMaterial({ color: 'hsl(0, 0%, 50%)', emissive: 0x000000 })
    let poleBoxGeometry1 = new THREE.BoxGeometry(0.2, 6, 0.2)
    let poleBoxGeometry2 = new THREE.BoxGeometry(3, 0.2, 0.2)
    let poleBoxGeometry3 = new THREE.BoxGeometry(0.8, 0.3, 0.5)

    const poleCube1 = new THREE.Mesh(poleBoxGeometry1, poleMaterial);
    poleCube1.position.set(6, 6/2, -6);
    poleCube1.castShadow = true

    const poleCube2 = new THREE.Mesh(poleBoxGeometry2, poleMaterial);
    poleCube2.position.set(6-(1.1), 6-0.1, -6);
    poleCube2.rotation.z = -Math.PI/4
    poleCube2.castShadow = true

    const poleCube3 = new THREE.Mesh(poleBoxGeometry3, new THREE.MeshPhongMaterial({ color: 'hsl(0, 0%, 80%)', emissive: 0x999999 }));
    poleCube3.position.set(6-2.4, 6+1.05, -6);
    poleCube3.rotation.z = -Math.PI/7
    poleCube3.castShadow = true

    const poleGroup = new THREE.Group();
    poleGroup.add(poleCube1);
    poleGroup.add(poleCube2);
    poleGroup.add(poleCube3);

    scene.add(poleGroup);
*/
}