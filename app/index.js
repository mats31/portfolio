import Webgl from './Webgl';
import raf from 'raf';
import dat from 'dat-gui';
import 'gsap';

let webgl;

// webgl settings
webgl = new Webgl(window.innerWidth, window.innerHeight);
document.body.appendChild(webgl.renderer.domElement);

// GUI settings
window.gui = new dat.GUI();
window.gui.add(webgl.params, 'usePostprocessing');
// gui.add(webgl.params, 'projectPositionX');
// gui.add(webgl.params, 'projectPositionY');
// gui.add(webgl.params, 'projectPositionZ');
// gui.add(webgl.params, 'projectRotationX');
// gui.add(webgl.params, 'projectRotationY');
// gui.add(webgl.params, 'projectRotationZ');

// handle resize
window.addEventListener('resize', resizeHandler);

// let's play !
animate();

function resizeHandler() {
  webgl.resize(window.innerWidth, window.innerHeight);
}

function animate() {
  raf(animate);

  webgl.render();
}
