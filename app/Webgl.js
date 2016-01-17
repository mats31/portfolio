import THREE from 'three';
window.THREE = THREE;
import Project from './objects/Project';

export default class Webgl {
  constructor(width, height) {
    this.params = {
      usePostprocessing: false,
    };

    this.scene = new THREE.Scene();

    this.camera = new THREE.PerspectiveCamera(50, width / height, 1, 1000000);
    this.camera.position.z = 1000;

    this.renderer = new THREE.WebGLRenderer();
    this.renderer.setSize(width, height);
    this.renderer.setClearColor(0x000000);

    this.composer = null;
    this.initPostprocessing();

    this.project = new Project();
    this.project.position.set(0, 0, 800);
    this.scene.add(this.project);

    var light = new THREE.AmbientLight( 0x404040 ); // soft white light
    this.scene.add( light );
  }

  initPostprocessing() {
    if (!this.params.usePostprocessing) { return; }

    /* Add the effect composer of your choice */
  }

  resize(width, height) {
    if (this.composer) {
      this.composer.setSize(width, height);
    }

    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();

    this.renderer.setSize(width, height);
  }

  render() {
    if (this.params.usePostprocessing) {
      console.warn('WebGL - No effect composer set.');
    } else {
      this.renderer.render(this.scene, this.camera);
    }

    this.project.update();
  }
}
