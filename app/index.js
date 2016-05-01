import Webgl from './Webgl';
import Home from './Home';
import raf from 'raf';
import dat from 'dat-gui';
import insertCss from 'insert-css';

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
  home.animItem( e );
  webgl.project.changeProject( e.target.attributes[0].value );
  webgl.updateMouse( e );
}

function onFriendEnter( e ) {
  home.setDescription( e.target.attributes[0].value, false );
  webgl.project.displayFriend( e.target.attributes[0].value );
}

function onFriendContainerEnter( e ) {
  home.animFriend( true );
}

function onFriendContainerLeave( e ) {
  home.animFriend( false );
}

function onDeviceMotion( e ) {
  webgl.updateDeviceMotion( e );
}

function animate() {
  raf( animate );
  webgl.render();
}

function loadJson( url ) {
  return new Promise( ( resolve, reject ) => {
    const req = new XMLHttpRequest();
    req.open( 'GET', url );

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

function loadAllPictures( datas ) {
  const imgs = [];
  const loader = document.querySelector( '.loader .container' );
  let loads = 1;
  loader.style.width = loads / ( datas.projects.length + datas.friends.length ) * 100 + '%';

  for ( let i = 0; i < datas.projects.length; i++ ) {
    imgs.push( 'img/' + datas.projects[i].image );
  }

  for ( let i = 0; i < datas.friends.length; i++ ) {
    imgs.push( 'img/friends/' + datas.friends[i].image );
  }

  return new Promise( ( resolve, reject ) => {
    for ( let i = 0; i < imgs.length; i++ ) {
      const img = new Image();
      img.src = imgs[i];
      img.onload = () => {
        loads++;
        loader.style.width = loads / ( datas.projects.length + datas.friends.length ) * 100 + '%';
        if ( loads === imgs.length ) {
          resolve();
        }
      };
    }
  });
}

// Handle resize
window.addEventListener( 'resize', resizeHandler );

/* *** insert our stylus css into our app *** */
insertCss( require( '../public/stylus/app.styl' ) );

// Load datas
loadJson( './datas.json' ).then( ( result ) => {
  // Webgl settings
  const datas = JSON.parse( result );
  loadAllPictures( datas ).then( () => {
    // Set Webgl
    webgl = new Webgl( window.innerWidth, window.innerHeight, datas );
    document.getElementById( 'wrapper' ).appendChild( webgl.renderer.domElement );

    // Set interface
    home = new Home( datas );

    // Toggle mousemove projects / experiments
    document.getElementById( 'wrapper' ).addEventListener( 'mousemove', onCanvasMouseMove );

    // Toggle friends pages
    document.querySelector( '.friends' ).addEventListener( 'mouseenter', onFriendContainerEnter );
    const friends = document.querySelectorAll( '.friends-list a' );
    for ( let i = 0; i < friends.length; i++ ) {
      friends[i].addEventListener( 'mouseenter', onFriendEnter );
    }
    document.querySelector( '.links' ).addEventListener( 'mouseleave', onFriendContainerLeave );

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
  })
});
