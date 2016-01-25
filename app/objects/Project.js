const glslify = require( 'glslify' );
import THREE from 'three';

export default class Project extends THREE.Object3D {
  constructor( datas ) {
    super();

    this.pathImg = 'img/';
    this.canvas = document.createElement( 'canvas' );
    this.context = this.canvas.getContext( '2d' );
    this.step = 0;
    this.particles = new THREE.BufferGeometry();
    this.density = 2;
    this.clock = new THREE.Clock();
    this.datas = datas;

    this.loadImage( this.datas.projects[this.step].images[0]).then( ( loadState ) => {
      console.log( loadState );
      this.createTexture();
      this.createPoints();
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
    return new Promise( ( resolve, reject ) => {
      const req = new XMLHttpRequest();
      req.open( 'GET', './datas.json' );

      req.onload = () => {
        if ( req.status === 200 ) {
          resolve( req.response );
        } else {
          reject( Error( req.statusText ) );
        }
      };

      req.onerror = () => {
        reject( Error( 'Erreur réseau' ) );
      };

      req.send();
    });
  }

  loadImage( image ) {
    return new Promise( ( resolve, reject ) => {
      this.currentImg = new Image();
      this.currentImg.src = this.pathImg + image;

      this.currentImg.onload = () => {
        if ( this.currentImg.complete ) {
          this.canvas.width = this.currentImg.width;
          this.canvas.height = this.currentImg.height;

          this.context.clearRect( 0, 0, 1000, 1000 );
          this.context.drawImage( this.currentImg,
                                 0,
                                 0,
                                 this.currentImg.width,
                                 this.currentImg.height );

          resolve( 'Image loaded !' );
        } else {
          reject( Error( 'Image not loaded :( !' ) );
        }
      };

      this.currentImg.onerror = () => {
        reject( Error( 'Erreur réseau' ) );
      };
    });
  }

  createTexture() {
    this.planeModelGeometry = new THREE.PlaneGeometry( 750, 750, 1 );
    this.planeGeometry = new THREE.BufferGeometry().fromGeometry( this.planeModelGeometry );

    this.planeUniforms = {
      color: { type: 'c', value: new THREE.Color( 'white' ) },
      map: { type: 't', value: THREE.ImageUtils.loadTexture( 'textures/uv.jpg' ) },
    };
    this.planeMaterial = new THREE.ShaderMaterial({
      uniforms: this.planeUniforms,
      vertexShader: glslify( '../shaders/textureVertex.glsl' ),
      fragmentShader: glslify( '../shaders/textureFragment.glsl' ),
    });

    this.planeTexture = new THREE.Mesh( this.planeGeometry, this.planeMaterial );
    this.planeTexture.position.set( 0, 0, 0 );
    this.planeTexture.visible = true;
    // this.add( this.planeTexture );
  }

  createPoints() {
    const pixels = this.context.getImageData( 0, 0, this.currentImg.width, this.currentImg.height );
    console.log(pixels);
    const step = this.density * 4;
    const positions = new Float32Array( 599997 );
    const noisePositions = new Float32Array( 599997 );
    const colors = new Float32Array( 599997 );
    const sizes = new Float32Array( parseInt( 599997 / 3, 10 ) );
    const velocities = new Float32Array( parseInt( 599997 / 3, 10 ) );
    const customTimes = new Float32Array( parseInt( 599997 / 3, 10 ) );
    let x = 0;
    let y = this.currentImg.height;
    let i3 = 0;
    let i = 0;

    for ( let j = 0; i < 400000; i++ ) {
      const color = new THREE.Color( 'red' );

      // positions[i3 + 0] = Math.floor( Math.random() * ( 400 - ( -400 ) + 1 ) ) + ( -400 );
      // positions[i3 + 1] = Math.floor( Math.random() * ( 0 - ( -400 ) + 1 ) ) + ( -400 );
      positions[i3 + 0] = Math.random() * 400;
      positions[i3 + 1] = Math.random() * 400;
      positions[i3 + 2] = 0;

      noisePositions[i3 + 0] = positions[i3 + 0];
      noisePositions[i3 + 1] = positions[i3 + 0];
      noisePositions[i3 + 2] = 0;

      colors[i3 + 0] = color.r;
      colors[i3 + 1] = color.g;
      colors[i3 + 2] = color.b;

      sizes[i] = 35;
      velocities[i] = Math.random() * 3;
      customTimes[i] = (Math.random() * (0.5 - 0.1) + 0.1).toFixed(4);

      i3 += 3;
      i++;

      if (i == 400000 - 1) {
        console.log(i3);
      }
    }

    // for ( x = 0; x <= this.currentImg.width * 4; x += step ) {
    //
    //   for ( y = this.currentImg.height; y >= 0; y -= this.density ) {
    //     const p = ( y * this.currentImg.width * 4 ) + x;
    //
    //     if ( pixels.data[p + 3] > 0 ) {
    //       const pixelCol = ( pixels.data[p] << 16 ) + ( pixels.data[p + 1] << 8 ) + pixels.data[p + 2];
    //       const color = new THREE.Color( pixelCol );
    //       const vector = new THREE.Vector3( -this.currentImg.width / 2 + x / 4, -y, 100 );
    //
    //       positions[i3 + 0] = vector.x;
    //       positions[i3 + 1] = vector.y;
    //       positions[i3 + 2] = vector.z;
    //
    //       colors[i3 + 0] = color.r;
    //       colors[i3 + 1] = color.g;
    //       colors[i3 + 2] = color.b;
    //
    //       sizes[i] = 50;
    //       i3 += 3;
    //       i++;
    //       if (y == 0 && x == this.currentImg.width * 4) {
    //         // console.log(i3);
    //       }
    //     }
    //   }
    // }

    this.particles.addAttribute( 'position', new THREE.BufferAttribute( positions, 3 ) );
    this.particles.addAttribute( 'customColor', new THREE.BufferAttribute( colors, 3 ) );
    this.particles.addAttribute( 'noisePosition', new THREE.BufferAttribute( noisePositions, 3 ) );
    this.particles.addAttribute( 'size', new THREE.BufferAttribute( sizes, 1 ) );
    this.particles.addAttribute( 'velocity', new THREE.BufferAttribute( velocities, 1 ) );
    this.particles.addAttribute( 'customTime', new THREE.BufferAttribute( customTimes, 1 ) );
    // this.particles.center();

    this.uniforms = {
      time: { type: 'f', value: Date.now() * 0.005 },
      color: { type: 'c', value: new THREE.Color( 0xffffff ) },
      texture: { type: 't', value: THREE.ImageUtils.loadTexture( './textures/particle.png' ) },
      map: { type: 't', value: THREE.ImageUtils.loadTexture( this.currentImg.src ) },
      lightPosition: { type: 'v3', value: new THREE.Vector3( 750, 1000, -500 ) },
    };
    this.pMaterial = new THREE.ShaderMaterial({
      uniforms: this.uniforms,
      vertexShader: glslify( '../shaders/projectVertex.glsl' ),
      fragmentShader: glslify( '../shaders/projectFragment.glsl' ),
      blending: THREE.CustomBlending,
      depthTest: true,
      transparent: true,
    });

    this.particleSystem = new THREE.Points( this.particles, this.pMaterial );
    this.particleSystem.position.set( 0, 0, 0 );
    this.particleSystem.castShadow = false;
    this.particleSystem.receiveShadow = false;
    this.initialPosition = positions.slice( 0 );
    this.particleSystem.sortParticles = false;
    // this.particleSystem.rotation.set( 0, 0.35, 0 );
    this.add( this.particleSystem );

    // this.params = {
    //   projectPositionX: -230,
    //   projectPositionY: 300,
    //   projectPositionZ: -1050,
    //   projectRotationX: 0,
    //   projectRotationY: 0.35,
    //   projectRotationZ: 0,
    // };
    // window.gui.add( this.params, 'projectPositionX', -5000, 5000 );
    // window.gui.add( this.params, 'projectPositionY', -5000, 5000 );
    // window.gui.add( this.params, 'projectPositionZ', -5000, 5000 );
    // window.gui.add( this.params, 'projectRotationX', -1, 1, 0.05 );
    // window.gui.add( this.params, 'projectRotationY', -1, 1, 0.05 );
    // window.gui.add( this.params, 'projectRotationZ', -1, 1, 0.05 );

    const bbox = new THREE.Box3().setFromObject( this.particleSystem );
    console.log( bbox );
  }

  update() {
    if ( typeof this.particles.attributes.position !== 'undefined' ) {
      // this.particles.attributes.time.needsUpdate = true;
      // for ( let i = 0; i < this.particles.attributes.time.array.length; i++ ) {
      //   this.particles.attributes.time.array[i] = this.clock.getElapsedTime() * Math.random();
      // }
      this.uniforms.time.value = this.clock.getElapsedTime() * 0.5;
      // this.particleSystem.rotation.z = 0.01 * this.uniforms.time.value;
      // this.particles.attributes.noisePosition.needsUpdate = true;
      // for ( let i3 = 0; i3 < this.particles.attributes.position.array.length; i3 += 3 ) {
      //   // let xPos = this.initialPosition[i3 + 0] - ( Math.random() * 51 - 25 );
      //   // let yPos = this.initialPosition[i3 + 1] - ( Math.random() * 51 - 25 );
      //   //
      //   // if ( xPos > 800 ) { xPos = 800; }
      //   // if ( xPos < 0 ) { xPos = 0; }
      //   // if ( yPos > 400 ) { yPos = 400; }
      //   // if ( yPos < 0 ) { yPos = 0; }
      //   //
      //   // this.particles.attributes.position.array[i3 + 0] += ( xPos - this.particles.attributes.position.array[i3 + 0]) * 0.002;
      //   // this.particles.attributes.position.array[i3 + 1] += ( yPos - this.particles.attributes.position.array[i3 + 1]) * 0.002;
      //   this.particles.attributes.noisePosition.array[i3 + 0] = this.initialPosition[i3 + 0] - ( Math.random() * 101 - 50 );
      //   this.particles.attributes.noisePosition.array[i3 + 1] = this.initialPosition[i3 + 1] - ( Math.random() * 101 - 50 );
      //   this.particles.attributes.noisePosition.array[i3 + 2] = this.initialPosition[i3 + 2] - ( Math.random() * 101 - 50 );
      // }
    }
  }
}
