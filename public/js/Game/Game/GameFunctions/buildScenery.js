import * as THREE from 'three';

module.exports = (data, state, materials, scene) => {
    const light = new THREE.PointLight(0xB5A672, 3);
    light.castShadow = true
    light.shadow.camera.near = 0.5;
    light.shadow.camera.far = 500;
    light.position.x = 50
    light.position.y = 90
    light.position.z = -195
    light.shadow.mapSize.width = 2600
    light.shadow.mapSize.height = 2600
    //light.shadowMapWidth = 2600; // default is 512
    //light.shadowMapHeight = 2600; // default is 512
    scene.add(light);

    const geometryAsphalt = new THREE.PlaneGeometry(10, 700)
    const BoxGeometrySidewalk = new THREE.BoxGeometry(2, 0.6, 700)
    /*const geometrySand = new THREE.PlaneGeometry(1000, 700)
    
    let sand = new THREE.Mesh(geometrySand, materials.sand)
    sand.position.z = -40
    sand.position.y = -1*/

    let asphalt = new THREE.Mesh(geometryAsphalt, materials.asphaltLow)
    let sidewalk1 = new THREE.Mesh(BoxGeometrySidewalk, materials.sidewalkLow)
    let sidewalk2 = new THREE.Mesh(BoxGeometrySidewalk, materials.sidewalkLow)

    switch(data.graphic) {
        case 2:
            asphalt = new THREE.Mesh(geometryAsphalt, materials.asphalt)
            sidewalk1 = new THREE.Mesh(BoxGeometrySidewalk, materials.sidewalk)
            sidewalk2 = new THREE.Mesh(BoxGeometrySidewalk, materials.sidewalk)
            break
    }
    if (data.shadow) {
        asphalt.receiveShadow = true;
        sidewalk1.receiveShadow = true;
        sidewalk2.receiveShadow = true;
    }

   /* sand.position.z = -330
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
}