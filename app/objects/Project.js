const glslify = require('glslify');
import THREE from 'three';

export default class Project extends THREE.Object3D {
  constructor() {
    super();

    this.texture = THREE.ImageUtils.loadTexture('textures/project1.png');

    this.modelGeom = new THREE.CylinderGeometry(40, 40, 12, 10, 2, true, 1, 1);
    this.modelMat = new THREE.MeshBasicMaterial({
      color: 'white',
    });
    this.geometry = new THREE.BufferGeometry().fromGeometry(this.modelGeom);

    this.uniforms = {};
    this.material = new THREE.ShaderMaterial({
      uniforms: this.uniforms,
      vertexShader: glslify('../shaders/projectVertex.glsl'),
      fragmentShader: glslify('../shaders/projectFragment.glsl'),
    });

    // this.mesh = new THREE.Mesh(this.modelGeom, this.modelMat);
    this.mesh = new THREE.Mesh(this.geometry, this.material);
    console.log(this.mesh);
    //
    // this.mesh.rotation.x = -1.5708;
    // this.mesh.rotation.y = 1.5708;
    // this.mesh.rotation.z = 1.5708;
    //
    this.add(this.mesh);
  }

  update() {
    this.geometry.attributes.color.needsUpdate = true;
    this.geometry.attributes.normal.needsUpdate = true;
    this.geometry.attributes.position.needsUpdate = true;
    this.geometry.attributes.uv.needsUpdate = true;

    this.rotation.x += 0.01;
    this.rotation.z += 0.01;
  }
}
