const glslify = require('glslify');
import THREE from 'three';

export default class Project extends THREE.Object3D {
  constructor() {
    super();

    this.pathImg = 'img/';
    this.canvas = document.createElement('canvas');
    this.context = this.canvas.getContext('2d');
    this.step = 0;
    this.particles = new THREE.BufferGeometry();

    this.loadJson().then((result) => {
      this.datas = JSON.parse(result);
      console.log(this.datas);

      this.loadImage(this.datas.projects[this.step].images[0]).then((loadState) => {
        console.log(loadState);
        this.createPoints();
      });
    });

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

  loadJson() {
    return new Promise((resolve, reject) => {
      const req = new XMLHttpRequest();
      req.open('GET', './datas.json');

      req.onload = () => {
        if (req.status === 200) {
          resolve(req.response);
        } else {
          reject(Error(req.statusText));
        }
      };

      req.onerror = () => {
        reject(Error('Erreur réseau'));
      };

      req.send();
    });
  }

  loadImage(image) {
    return new Promise((resolve, reject) => {
      this.currentImg = new Image();
      this.currentImg.src = this.pathImg + image;

      this.currentImg.onload = () => {
        if (this.currentImg.complete) {
          this.canvas.width = this.currentImg.width;
          this.canvas.height = this.currentImg.height;

          this.context.clearRect(0, 0, 1000, 1000);
          this.context.drawImage(this.currentImg,
                                 0,
                                 0,
                                 this.currentImg.width,
                                 this.currentImg.height);

          resolve('Image loaded !');
        } else {
          reject(Error('Image not loaded :( !'));
        }
      };

      this.currentImg.onerror = () => {
        reject(Error('Erreur réseau'));
      };
    });
  }

  createPoints() {
    const pixels = this.context.getImageData(0, 0, this.currentImg.width, this.currentImg.height);
    const step = this.density * 4;

    this.particleSystem = new THREE.Points(
        this.particles,
        this.pMaterial);
  }

  update() {
    this.rotation.x += 0.01;
    this.rotation.z += 0.01;
  }
}
