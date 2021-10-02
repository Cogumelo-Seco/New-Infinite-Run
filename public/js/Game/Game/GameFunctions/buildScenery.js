import * as THREE from 'three';

module.exports = (command, state, materials, scene) => {
    const BoxGeometrySand = new THREE.BoxGeometry(140, 0, 85)
    const sand = new THREE.Mesh(BoxGeometrySand, materials.sand)
    sand.position.z = -41
    sand.position.y = -1

    const BoxGeometryAsphalt = new THREE.BoxGeometry(10, 0.1, 85)
    const asphalt = new THREE.Mesh(BoxGeometryAsphalt, materials.asphalt)
    asphalt.position.z = -41
    asphalt.position.y = -1

    const BoxGeometrySidewalk = new THREE.BoxGeometry(2, 0.3, 85)
    const sidewalk1 = new THREE.Mesh(BoxGeometrySidewalk, materials.sidewalk)
    sidewalk1.position.z = -41
    sidewalk1.position.y = -1
    sidewalk1.position.x = -6

    const sidewalk2 = new THREE.Mesh(BoxGeometrySidewalk, materials.sidewalk)
    sidewalk2.position.z = -41
    sidewalk2.position.y = -1
    sidewalk2.position.x = 6

    scene.add(sand)
    scene.add(sidewalk1)
    scene.add(asphalt)
    scene.add(sidewalk2)
}