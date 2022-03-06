import * as THREE from 'three';

module.exports = (data, state, materials, scene, cookie) => {
    if (cookie.performanceMode == 'false') {
        var hemiLight = new THREE.HemisphereLight(0xB5A672, 0xB5A672, 0.5);
        hemiLight.position.set(20, 500, -100);
        scene.add(hemiLight);

        const light = new THREE.DirectionalLight(0xB5A672, 2, 100);
        light.position.set(20, 50, -100)
        light.target.position.set(0, 0, -60)
        //const light = new THREE.PointLight(0xB5A672, 2);
        light.castShadow = true

        light.shadow.camera.left = -50;
        light.shadow.camera.right = 50;
        light.shadow.camera.top = 50;
        light.shadow.camera.bottom = -50;
        switch(cookie.shadowQuality) {
            case 2:
                light.shadow.mapSize.width = 1024
                light.shadow.mapSize.height = 1024
                break
            case 3:
                light.shadow.mapSize.width = 2500
                light.shadow.mapSize.height = 2500
            break
        }
        scene.add(light);
        scene.add(light.target);
    }

    const geometryAsphalt = new THREE.PlaneGeometry(10, 700)
    const BoxGeometrySidewalk = new THREE.BoxGeometry(2, 0.6, 700)
    /*const geometrySand = new THREE.PlaneGeometry(1000, 700)
    
    let sand = new THREE.Mesh(geometrySand, materials.sand)
    sand.position.z = -40
    sand.position.y = -1*/
    
    let asphalt = new THREE.Mesh(geometryAsphalt, materials.asphalt)
    let sidewalk1 = new THREE.Mesh(BoxGeometrySidewalk, materials.sidewalk)
    let sidewalk2 = new THREE.Mesh(BoxGeometrySidewalk, materials.sidewalk)

    if (cookie.performanceMode == 'true') {
        asphalt = new THREE.Mesh(geometryAsphalt, materials.asphaltLow)
        sidewalk1 = new THREE.Mesh(BoxGeometrySidewalk, materials.sidewalkLow)
        sidewalk2 = new THREE.Mesh(BoxGeometrySidewalk, materials.sidewalkLow)
    }
    
    asphalt.receiveShadow = true;
    sidewalk1.receiveShadow = true;
    sidewalk2.receiveShadow = true;

    /*sand.position.z = -330
    sand.rotation.x = -Math.PI/2
    sand.position.y = -0.89*/
    
    asphalt.position.z = -330
    asphalt.position.y = -0.85
    asphalt.rotation.x = -Math.PI/2

    sidewalk1.position.z = -330
    sidewalk1.position.y = -0.9
    sidewalk1.position.x = -6

    sidewalk2.position.z = -330
    sidewalk2.position.y = -0.9
    sidewalk2.position.x = 6

    //scene.add(sand)
    scene.add(sidewalk1)
    scene.add(asphalt)
    scene.add(sidewalk2)

    state.buildScenery = false
}