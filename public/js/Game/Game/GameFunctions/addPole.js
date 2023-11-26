export default async (state, THREE) => {
    let scene = state.scene

    let poleMaterial = state.settings.textureQuality == 0 ? new THREE.MeshBasicMaterial({ color: 'hsl(0, 0%, 20%)' }) : new THREE.MeshPhongMaterial({ color: 'hsl(0, 0%, 50%)', emissive: 0x222222 })
    let poleBoxGeometry1 = new THREE.BoxGeometry(0.2, 6, 0.2)
    let poleBoxGeometry2 = new THREE.BoxGeometry(3, 0.2, 0.2)
    let poleBoxGeometry3 = new THREE.BoxGeometry(0.8, 0.3, 0.5)

    const poleCube1 = new THREE.Mesh(poleBoxGeometry1, poleMaterial);
    poleCube1.position.set(6, 6/2, -300);
    poleCube1.castShadow = state.settings.shadowQuality >= 2 ? true : false

    const poleCube2 = new THREE.Mesh(poleBoxGeometry2, poleMaterial);
    poleCube2.position.set(6-(1.1), 6-0.1, -300);
    poleCube2.rotation.z = -Math.PI/4
    poleCube2.castShadow = state.settings.shadowQuality >= 2 ? true : false

    const poleCube3 = new THREE.Mesh(poleBoxGeometry3, state.settings.textureQuality == 0 ? new THREE.MeshBasicMaterial({ color: 'hsl(0, 0%, 80%)' }) : new THREE.MeshPhongMaterial({ color: 'hsl(0, 0%, 80%)', emissive: 0x999999 }));
    poleCube3.position.set(6-2.4, 6+1.05, -300);
    poleCube3.rotation.z = -Math.PI/7
    poleCube3.castShadow = state.settings.shadowQuality >= 2 ? true : false

    const poleGroup = new THREE.Group();
    poleGroup.add(poleCube1);
    poleGroup.add(poleCube2);
    poleGroup.add(poleCube3);

    scene.add(poleGroup);

    let name = Math.random().toString(36).substring(2)+Math.random().toString(36).substring(2)
    state.poles[name] = {
        speed: (1.5-(Math.min(state.difficultyMultiplier/2, 0.5)))*0.84,//Math.min(2, (Math.max(state.difficultyMultiplier, 0.4)*1.5)),
        pole: poleGroup,
        name
    }
}