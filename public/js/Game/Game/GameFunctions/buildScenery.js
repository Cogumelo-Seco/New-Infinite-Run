import * as THREE from 'three';

module.exports = (data, state, materials, scene) => {
    const light = new THREE.PointLight(0xFFFFFF, 3);
    light.castShadow = true
    light.shadow.mapSize.width = 512;
    light.shadow.mapSize.height = 612;
    light.shadow.camera.near = 0.5;
    light.shadow.camera.far = 500;
    light.position.x = 30
    light.position.y = 30
    light.position.z = -85
    scene.add(light);

    const BoxGeometryAsphalt = new THREE.BoxGeometry(10, 0.1, 120)
    const BoxGeometrySidewalk = new THREE.BoxGeometry(2, 0.3, 120)
    const BoxGeometrySand = new THREE.BoxGeometry(220, 0, 120)
    
    const sand = new THREE.Mesh(BoxGeometrySand, materials.sand)
    sand.position.z = -40
    sand.position.y = -1

    let asphalt = new THREE.Mesh(BoxGeometryAsphalt, materials.asphaltLow)
    let sidewalk1 = new THREE.Mesh(BoxGeometrySidewalk, materials.sidewalkLow)
    let sidewalk2 = new THREE.Mesh(BoxGeometrySidewalk, materials.sidewalkLow)

    switch(data.graphic) {
        case 2:
            asphalt = new THREE.Mesh(BoxGeometryAsphalt, materials.asphalt)
            sidewalk1 = new THREE.Mesh(BoxGeometrySidewalk, materials.sidewalk)
            sidewalk2 = new THREE.Mesh(BoxGeometrySidewalk, materials.sidewalk)
            break
    }
    if (data.shadow) {
        asphalt.receiveShadow = true;
        sidewalk1.receiveShadow = true;
        sidewalk2.receiveShadow = true;
    }
    
    asphalt.position.z = -40
    asphalt.position.y = -0.85

    sidewalk1.position.z = -40
    sidewalk1.position.y = -1
    sidewalk1.position.x = -6

    sidewalk2.position.z = -40
    sidewalk2.position.y = -1
    sidewalk2.position.x = 6

    scene.add(sand)
    scene.add(sidewalk1)
    scene.add(asphalt)
    scene.add(sidewalk2)
}