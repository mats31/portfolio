const glslify = require('glslify');
import THREE from 'three';
import path from 'path';

export default class Project extends THREE.Object3D {
  constructor() {
    super();

    this.texture = THREE.ImageUtils.loadTexture('textures/project1.png');

    this.modelGeom = new THREE.CylinderGeometry(40, 40, 12, 10, 2, true, 1, 1);
    this.geometry = new THREE.BufferGeometry();
    console.log(this.modelGeom);
    const positions = new Float32Array(this.modelGeom.vertices * 3);
    const colors = new Float32Array(this.modelGeom.vertices * 3);
    const whiteColor = new THREE.Color('white');

    for (let i = 0, i3 = 0; i < this.modelGeom.vertices; i ++, i3 += 3) {
      positions[i3 + 0] = this.modelGeom.vertices[i].x;
      positions[i3 + 1] = this.modelGeom.vertices[i].y;
      positions[i3 + 2] = this.modelGeom.vertices[i].z;

      colors[i3 + 0] = whiteColor;
      colors[i3 + 1] = whiteColor;
      colors[i3 + 2] = whiteColor;
    }

    this.geometry.addAttribute('position', new THREE.BufferAttribute(positions, 3));
    this.geometry.addAttribute('customColor', new THREE.BufferAttribute(colors, 3));

    this.uniforms = {};
    this.mat = new THREE.ShaderMaterial({
      uniforms: this.uniforms,
      vertexShader: glslify(path.join(__dirname, '../', 'projectVertext.glsl')),
      fragmentShader: glslify(path.join(__dirname, '../', 'projectFragment.glsl')),
      blending: THREE.AdditiveBlending,
      depthTest: true,
      transparent: false,
    });
    // this.mat = new THREE.MeshBasicMaterial({
    //   color: 'red',
    //   wireframe: false,
    //   map: this.texture,
    // });
    this.mesh = new THREE.Mesh(this.geometry, this.mat);
    //
    // this.mesh.rotation.x = -1.5708;
    // this.mesh.rotation.y = 1.5708;
    // this.mesh.rotation.z = 1.5708;
    //
    this.add(this.mesh);
  }

  update() {
    this.rotation.x += 0.01;
    this.rotation.z += 0.01;
  }
}
