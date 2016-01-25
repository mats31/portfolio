export default class Home {
  constructor( datas ) {
    this.datas = datas;
    this.projectListElement = document.querySelector( '.project-list ul' );
    this.experimentListElement = document.querySelector( '.experiment-list ul' );

    this.setInterface();
  }

  mouseMove( e ) {
    if ( e.clientX < window.innerWidth * 0.15 ) {
      this.projectListElement.className = 'active';
    } else {
      this.projectListElement.className = '';
    }

    if ( e.clientX > window.innerWidth * 0.85 ) {
      this.experimentListElement.className = 'active';
    } else {
      this.experimentListElement.className = '';
    }
  }

  setInterface() {
    for ( let i = 0; i < this.datas.projects.length; i++ ) {
      if ( this.datas.projects[i].type === 'project' ) {
        const li = document.createElement( 'li' );
        li.setAttribute( 'data-index', i );
        li.textContent = this.datas.projects[i].name;
        this.projectListElement.appendChild( li );
      } else {
        const li = document.createElement( 'li' );
        li.setAttribute( 'data-index', i );
        li.textContent = this.datas.projects[i].name;
        this.experimentListElement.appendChild( li );
      }
    }
  }
}
