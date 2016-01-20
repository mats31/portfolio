import THREE from 'three';
window.THREE = THREE;
import Project from './objects/Project';
import Ground from './objects/Ground';

export default class Webgl {
  constructor(width, height) {
    this.params = {
      usePostprocessing: false,
      // projectPositionX: this.project.position.x,
      // projectPositionY: this.project.position.y,
      // projectPositionZ: this.project.position.z,
      // projectRotationX: this.project.position.x,
      // projectRotationY: this.project.position.y,
      // projectRotationZ: this.project.position.z,
    };

    this.camera = new THREE.PerspectiveCamera( 50, width / height, 1, 10000 );
    this.camera.position.z = 1000;

    this.scene = new THREE.Scene();
    // this.scene.fog = new THREE.Fog( 0xffaa55, 1000, this.camera.far );

    const ambient = new THREE.AmbientLight( 0x444444 );
    this.scene.add( ambient );

    this.light = new THREE.SpotLight( 0xffffff );
    this.light.position.set( 0, 1500, 1000 );
    this.light.target.position.set( 0, 0, 0 );
    this.light.castShadow = true;
    // this.scene.add( this.light );

    this.renderer = new THREE.WebGLRenderer();
    this.renderer.setSize( width, height );
    this.renderer.setClearColor( 0xfaf4eb );
    // this.renderer.setClearColor( this.scene.fog.color, 1 );

    // this.renderer.shadowCameraNear = 3;
    // this.renderer.shadowCameraFar = this.camera.far;
    // this.renderer.shadowCameraFov = 70;
    //
    // this.renderer.shadowMapBias = 0.0039;
    // this.renderer.shadowMapDarkness = 0.5;
    // this.renderer.shadowMapWidth = 1024;
    // this.renderer.shadowMapHeight = 1024;
    // this.renderer.shadowMap.enabled = true;

    this.composer = null;
    this.initPostprocessing();

    this.project = new Project();
    this.project.position.set( 0, 0, 800 );
    this.scene.add( this.project );

    this.ground = new Ground();
    this.ground.position.set( 0, 0, 800 );
    this.scene.add( this.ground );
  }

  initPostprocessing() {
    if ( !this.params.usePostprocessing ) { return; }

    /* Add the effect composer of your choice */
  }

  resize( width, height ) {
    if ( this.composer ) {
      this.composer.setSize( width, height );
    }

    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();

    this.renderer.setSize( width, height );
  }

  render() {
    if ( this.params.usePostprocessing ) {
      console.warn( 'WebGL - No effect composer set.' );
    } else {
      this.renderer.render( this.scene, this.camera );
    }

    this.project.update();
  }
}
