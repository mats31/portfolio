import THREE from 'three';

export default class Ground extends THREE.Object3D {
  constructor() {
    super();

    this.geometry = new THREE.PlaneGeometry( 100, 100, 10 );
    this.material = new THREE.MeshPhongMaterial({
      color: 0x555555,
      transparent: true,
      shininess: 5,
    });
    this.material.color.offsetHSL( 0.45, 0.15, 0.9 );

    this.ground = new THREE.Mesh( this.geometry, this.material );
    this.ground.castShadow = false;
    this.ground.receiveShadow = true;
    this.ground.position.set( 0, -250, 0 );
    this.ground.rotation.x = -1.57;
    this.ground.scale.set( 100, 100, 100 );

    this.add( this.ground );
  }

  update() {

  }
}
