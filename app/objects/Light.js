import THREE from 'three';

export default class Light extends THREE.Object3D {
  constructor() {
    super();

    this.ambient = new THREE.AmbientLight( 0xffffff );
    this.add( this.ambient );

    this.spot = new THREE.SpotLight( 0xffffff, 1, 0, Math.PI / 2, 1 );
    this.spot.position.set( 800, 1000, -500 );
    this.spot.target.position.set( 0, 0, 0 );

    this.spot.castShadow = true;

    this.spot.shadowCameraNear = 100;
    this.spot.shadowCameraFar = 2500;
    this.spot.shadowCameraFov = 120;

    this.spot.shadowBias = 0.0003;
    this.spot.shadowDarkness = 1;

    this.spot.shadowMapWidth = 1024;
    this.spot.shadowMapHeight = 2048;

    this.add( this.spot );
  }

  update() {

  }
}
