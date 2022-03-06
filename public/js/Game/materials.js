import * as THREE from 'three';

module.exports = () => {
    return {
        bigCube: new THREE.MeshPhongMaterial({ color: 0x6700B1, emissive: 0x000000 }),
        bigCubeLow: new THREE.MeshBasicMaterial({ color: 0x6700B1 }),
        player: new THREE.MeshPhongMaterial({ color: 0x00E75A, emissive: 0x000000 }),
        playerLow: new THREE.MeshBasicMaterial({ color: 0x00E75A }),
        smallCube: new THREE.MeshPhongMaterial({ color: 0x750007, emissive: 0x000000 }),
        smallCubeLow: new THREE.MeshBasicMaterial({ color: 0x750007 }),
        specialCube: new THREE.MeshPhongMaterial({ color: 0xFFB100, emissive: 0x000000 }),
        specialCubeLow: new THREE.MeshBasicMaterial({ color: 0xFFB100 }),
        asphalt: new THREE.MeshPhongMaterial({ color: 0x292929, emissive: 0x292929 }),
        asphaltLow: new THREE.MeshBasicMaterial({ color: 0x292929 }),
        sidewalk: new THREE.MeshPhongMaterial({ color: 0x616161, emissive: 0x616161 }),
        sidewalkLow: new THREE.MeshBasicMaterial({ color: 0x616161 }),
        sand: new THREE.MeshBasicMaterial({ color: 0xFFE995 }),
    }
}