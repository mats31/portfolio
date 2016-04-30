const glslify = require( 'glslify' );
import THREE from 'three';
import clone from 'clone';

export default class Project extends THREE.Object3D {
  constructor( width, height, datas ) {
    super();

    this.pathImg = 'img/';
    this.pathFriend = 'img/friends/';
    this.canvas = document.createElement( 'canvas' );
    this.context = this.canvas.getContext( '2d' );
    this.step = 0;
    this.particles = new THREE.BufferGeometry();
    this.density = 2;
    this.clock = new THREE.Clock();
    this.width = width;
    this.height = height;
    this.datas = datas;
    this.radius = 800;

    this.loadImage( this.datas.projects[this.step].image, true ).then( ( loadState ) => {
      this.createPoints();
    });
  }

  loadImage( image, isProject ) {
    return new Promise( ( resolve, reject ) => {
      this.currentImg = new Image();
      this.currentImg.src = isProject ? this.pathImg + image : this.pathFriend + image;

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

  createPoints() {
    const pixels = this.context.getImageData( 0, 0, this.currentImg.width, this.currentImg.height );
    const step = this.density * 4;
    const positions = new Float32Array( 599997 );
    const colors = new Float32Array( 599997 );
    const sizes = new Float32Array( parseInt( 599997 / 3, 10 ) );
    const velocities = new Float32Array( parseInt( 599997 / 3, 10 ) );
    const customTimes = new Float32Array( parseInt( 599997 / 3, 10 ) );
    let i3 = 0;
    let i = 0;

    for ( let j = 0; i < 400000; i++ ) {
      const color = new THREE.Color( 'white' );

      positions[i3 + 0] = Math.random() * 800;
      positions[i3 + 1] = Math.random() * 800;
      positions[i3 + 2] = 0;

      sizes[i] = 10;
      velocities[i] = Math.random() * 1.5;
      customTimes[i] = ( Math.random() * ( 0.5 - 0.1 ) + 0.1 ).toFixed( 4 );

      i3 += 3;
      i++;

      // if (i == 400000 - 1) {
      //   console.log(i3);
      // }
    }

    this.particles.addAttribute( 'position', new THREE.BufferAttribute( positions, 3 ) );
    this.particles.addAttribute( 'size', new THREE.BufferAttribute( sizes, 1 ) );
    this.particles.addAttribute( 'velocity', new THREE.BufferAttribute( velocities, 1 ) );
    this.particles.addAttribute( 'customTime', new THREE.BufferAttribute( customTimes, 1 ) );

    this.particleTexture = THREE.ImageUtils.loadTexture( './textures/particle.png' );
    this.particleTexture.minFilter = THREE.LinearFilter;
    this.imageTexture = THREE.ImageUtils.loadTexture( this.currentImg.src );
    this.imageTexture.minFilter = THREE.LinearFilter;

    this.uniforms = {
      time: { type: 'f', value: Date.now() * 0.005 },
      color: { type: 'c', value: new THREE.Color( 0xffffff ) },
      texture: { type: 't', value: this.particleTexture },
      firstMap: { type: 't', value: this.imageTexture },
      secondMap: { type: 't', value: this.imageTexture },
      easingColor: { type: 'f', value: 1 },
      easingFirstColor: { type: 'f', value: 1 },
      opacityValue: { type: 'f', value: 0 },
      radius: { type: 'f', value: this.radius },
      leave: { type: 'f', value: 0 },
    };
    this.material = new THREE.ShaderMaterial({
      uniforms: this.uniforms,
      vertexShader: glslify( '../shaders/projectVertex.glsl' ),
      fragmentShader: glslify( '../shaders/projectFragment.glsl' ),
      blending: THREE.CustomBlending,
      depthTest: true,
      transparent: true,
    });

    this.particleSystem = new THREE.Points( this.particles, this.material );
    this.particleSystem.position.set( 0, 0, 0 );
    this.particleSystem.castShadow = false;
    this.particleSystem.receiveShadow = false;

    /** We can do this too, but doesn't work on Safari (I don't know why) **/
    /** this.initialPosition = positions.slice( 0 ); **/
    /** **** **/
    this.initialPosition = clone( positions );
    this.particleSystem.sortParticles = false;
    this.add( this.particleSystem );
  }

  changeProject( i ) {
    const image = this.datas.projects[i].image;
    this.loadImage( image, true ).then( ( loadState ) => {
      if ( this.uniforms.secondMap.value.sourceFile !== this.pathImg + image ) {
        const newTexture = THREE.ImageUtils.loadTexture( this.pathImg + image );
        this.uniforms.easingColor.value = 0.1;
        this.uniforms.easingFirstColor.value = 1;
        this.uniforms.firstMap.value = this.uniforms.secondMap.value;
        newTexture.minFilter = THREE.LinearFilter;
        this.uniforms.secondMap.value = newTexture;
      }
    });
  }

  displayFriend( i ) {
    const image = this.datas.friends[i].image;
    this.loadImage( image, false ).then( ( loadState ) => {
      if ( this.uniforms.secondMap.value.sourceFile !== this.pathFriend + image ) {
        const newTexture = THREE.ImageUtils.loadTexture( this.pathFriend + image );
        this.uniforms.easingColor.value = 0.1;
        this.uniforms.easingFirstColor.value = 1;
        this.uniforms.firstMap.value = this.uniforms.secondMap.value;
        newTexture.minFilter = THREE.LinearFilter;
        this.uniforms.secondMap.value = newTexture;
      }
    });
  }

  update() {
    if ( typeof this.particles.attributes.position !== 'undefined' ) {
      this.uniforms.time.value = this.clock.getElapsedTime() * 0.5;

      if ( this.uniforms.opacityValue.value < 1 ) {
        document.querySelector( '.loader' ).className = 'loader';
        this.uniforms.opacityValue.value += 0.01;
      }
      if ( this.uniforms.easingColor.value <= 1 ) {
        this.uniforms.easingColor.value += 0.09;
      }
      if ( this.uniforms.easingFirstColor.value >= 0.1 ) {
        this.uniforms.easingFirstColor.value -= 0.09;
      }
    }
  }
}
