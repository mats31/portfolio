import Webgl from './Webgl';
import Home from './Home';
import raf from 'raf';
import dat from 'dat-gui';
// import insertCss from 'insert-css';

let webgl;
let home;

function resizeHandler() {
  webgl.resize( window.innerWidth, window.innerHeight );
}

function onCanvasMouseMove( e ) {
  home.mouseMove( e );
  webgl.updateMouse( e );
}

function onItemEnter( e ) {
  console.log( e );
  home.animItem( e );
  webgl.project.changeProject( e.target.attributes[0].value );
  webgl.updateMouse( e );
}

function onDeviceMotion( e ) {
  webgl.updateDeviceMotion( e );
}

function animate() {
  raf( animate );
  webgl.render();
}

function loadJson() {
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

// Load datas
loadJson().then( ( result ) => {
  // Webgl settings
  const datas = JSON.parse( result );
  webgl = new Webgl( window.innerWidth, window.innerHeight, datas );
  document.getElementById( 'wrapper' ).appendChild( webgl.renderer.domElement );

  // Set interface
  home = new Home( datas );

  // Toggle mousemove projects / experiments
  document.getElementById( 'wrapper' ).addEventListener( 'mousemove', onCanvasMouseMove );

  // Toggle animation texture event
  const items = document.querySelectorAll( 'nav li' );
  for ( let i = 0; i < items.length; i++ ) {
    items[i].addEventListener( 'mouseenter', onItemEnter );
  }

  if ( window.DeviceMotionEvent ) {
    window.addEventListener( 'deviceorientation', onDeviceMotion, false );
  }

  // Let's play !
  animate();
});

// Handle resize
window.addEventListener( 'resize', resizeHandler );

/* *** insert our stylus css into our app *** */
// insertCss(require('./stylus/app.styl'));
