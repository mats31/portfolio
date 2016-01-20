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
    this.density = 4;

    this.loadJson().then((result) => {
      this.datas = JSON.parse(result);
      console.log(this.datas);

      this.loadImage(this.datas.projects[this.step].images[0]).then((loadState) => {
        console.log(loadState);
        this.createPoints();
      });
    });

    // this.texture = THREE.ImageUtils.loadTexture('textures/project1.png');

    // this.modelGeom = new THREE.CylinderGeometry(40, 40, 12, 10, 2, true, 1, 1);
    // this.modelMat = new THREE.MeshBasicMaterial({
    //   color: 'white',
    // });
    // this.geometry = new THREE.BufferGeometry().fromGeometry(this.modelGeom);

    // this.uniforms = {};
    // this.material = new THREE.ShaderMaterial({
    //   uniforms: this.uniforms,
    //   vertexShader: glslify('../shaders/projectVertex.glsl'),
    //   fragmentShader: glslify('../shaders/projectFragment.glsl'),
    // });

    // this.mesh = new THREE.Mesh(this.modelGeom, this.modelMat);
    // this.mesh = new THREE.Mesh(this.geometry, this.material);
    // console.log(this.mesh);
    //
    // this.mesh.rotation.x = -1.5708;
    // this.mesh.rotation.y = 1.5708;
    // this.mesh.rotation.z = 1.5708;
    //
    // this.add(this.mesh);
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
    const positions = new Float32Array(19678);
    const colors = new Float32Array(19678);
    const sizes = new Float32Array(19678 / 3);
    let x = 0;
    let y = this.currentImg.height;
    let i3 = 0;
    let i = 0;

    for (x = 0; x <= this.currentImg.width * 4; x += step) {

      for (y = this.currentImg.height; y >= 0; y -= this.density) {
        const p = (y * this.currentImg.width * 4) + x;

        if (pixels.data[p + 3] > 0) {
          const pixelCol = (pixels.data[p] << 16) + (pixels.data[p + 1] << 8) + pixels.data[p + 2];
          const color = new THREE.Color(pixelCol);
          const vector = new THREE.Vector3(-this.currentImg.width / 2 + x / 4, -y, 0);

          positions[i3 + 0] = vector.x;
          positions[i3 + 1] = vector.y;
          positions[i3 + 2] = vector.z;

          colors[i3 + 0] = color.r;
          colors[i3 + 1] = color.g;
          colors[i3 + 2] = color.b;

          sizes[i] = 10;

          i3 += 3;
          i++;
        }
      }

    }

    console.log(positions);
    console.log(colors);

    this.particles.addAttribute('position', new THREE.BufferAttribute(positions, 3));
    this.particles.addAttribute('customColor', new THREE.BufferAttribute(colors, 3));
    this.particles.addAttribute('size', new THREE.BufferAttribute(sizes, 1));

    this.uniforms = {};
    this.pMaterial = new THREE.ShaderMaterial({
      uniforms: this.uniforms,
      vertexShader: glslify('../shaders/projectVertex.glsl'),
      fragmentShader: glslify('../shaders/projectFragment.glsl'),
      blending: THREE.AdditiveBlending,
      depthTest: false,
      transparent: true,
    });

    this.particleSystem = new THREE.Points(this.particles, this.pMaterial);
    this.add(this.particleSystem);
  }

  update() {
    this.rotation.x += 0.01;
    this.rotation.z += 0.01;
  }
}
