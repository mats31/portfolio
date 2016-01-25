export default class Home {
  constructor( datas ) {
    this.datas = datas;

    this.setInterface();

    // document.querySelector('.project-list h2').addEventListener( 'mouseover',  this.);
  }

  setInterface() {
    for ( let i = 0; i < this.datas.projects.length; i++ ) {
      if ( this.datas.projects[i].type === 'project' ) {
        const li = document.createElement( 'li' );
        li.textContent = this.datas.projects[i].name;
        document.querySelector( '.project-list ul' ).appendChild( li );
      } else {
        const li = document.createElement( 'li' );
        li.textContent = this.datas.projects[i].name;
        document.querySelector( '.experiment-list ul' ).appendChild( li );
      }
    }
  }
}
