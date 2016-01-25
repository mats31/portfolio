import Webgl from './Webgl';
import Home from './Home';
import raf from 'raf';
import dat from 'dat-gui';
import insertCss from 'insert-css';
import 'gsap';

let webgl;
let home;

function resizeHandler() {
  webgl.resize( window.innerWidth, window.innerHeight );
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
  document.body.appendChild( webgl.renderer.domElement );

  // GUI settings
  window.gui = new dat.GUI();
  window.gui.add( webgl.params, 'usePostprocessing' );

  // Set interface
  home = new Home( datas );

  // Let's play !
  animate();
});

// Handle resize
window.addEventListener( 'resize', resizeHandler );

//

// Insert our stylus css into our app
insertCss( require( '../public/stylus/app.styl' ) );
