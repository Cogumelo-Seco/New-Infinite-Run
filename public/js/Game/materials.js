import * as THREE from 'three';

module.exports = () => {
    return {
        purple: new THREE.MeshBasicMaterial({ color: 0x8e44ad }),
        blue: new THREE.MeshBasicMaterial({ color: 0x2980b9 }),
        green: new THREE.MeshBasicMaterial({ color: 0x4cd137 }),
        gold: new THREE.MeshBasicMaterial({ color: 0xFFC312 }),
        sand: new THREE.MeshBasicMaterial({ color: 0xf6e58d }),
        asphalt: new THREE.MeshBasicMaterial({ color: 0x34495e  }),
        sidewalk: new THREE.MeshBasicMaterial({ color: 0x7f8c8d }),
    }
}