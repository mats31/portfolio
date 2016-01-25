const glslify = require( 'glslify' );
import THREE from 'three';

export default class Project extends THREE.Object3D {
  constructor() {
    super();

    this.geometry = new THREE.BufferGeometry().fromGeometry( new THREE.PlaneGeometry( 1000, 700, 20, 20 ) );

    this.uniforms = {
      color: { type: 'c', value: new THREE.Color( 'black' ) },
      map: { type: 't', value: THREE.ImageUtils.loadTexture( './img/touaregs-1.png' ) },
    };
    this.material = new THREE.ShaderMaterial({
      side: THREE.DoubleSide,
      wireframe: true,
      uniforms: this.uniforms,
      vertexShader: glslify( '../shaders/projectVertex.glsl' ),
      fragmentShader: glslify( '../shaders/projectFragment.glsl' ),
    });

    this.plane = new THREE.Mesh( this.geometry, this.material );
    this.add( this.plane );
  }

  startAnim( index ) {

  }

  update() {

  }
}
