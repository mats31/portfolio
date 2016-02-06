export default class Home {
  constructor( datas ) {
    this.datas = datas;
    this.projectListElement = document.querySelector( '.project-list ul' );
    this.experimentListElement = document.querySelector( '.experiment-list ul' );

    this.setInterface();
  }

  animItem( e ) {
    const li = e;
    const lis = document.querySelectorAll( '.project-container li' );
    const index = e.target.attributes[0].value;

    if ( li.target.className !== ' width' ) {
      for ( let i = 0; i < lis.length; i++ ) {
        lis[i].className = '';
      }
      li.target.className = e.target.className + ' width';

      this.setDescription( index );
    }
  }

  setDescription( index ) {
    const descriptionElement = document.querySelector( '.description-container' );
    descriptionElement.innerHTML = '';

    /** Title **/
    const title = document.createElement( 'h2' );
    title.textContent = this.datas.projects[index].name;
    descriptionElement.appendChild( title );

    /** Description **/
    const description = document.createElement( 'p' );
    description.textContent = this.datas.projects[index].description;
    descriptionElement.appendChild( description );

    /** Technos **/
    const technoContainer = document.createElement( 'div' );
    for ( let i = 0; i < this.datas.projects[index].intervention.length; i++ ) {
      const span = document.createElement( 'span' );
      span.textContent = this.datas.projects[index].intervention[i];
      if ( i === this.datas.projects[index].intervention.length - 1 ) {
        span.className = 'last';
      }
      technoContainer.appendChild( span );
    }
    descriptionElement.appendChild( technoContainer );

    /** Link **/
    if ( typeof this.datas.projects[index].url !== 'undefined' && typeof this.datas.projects[index].target !== 'undefined' ) {
      const link = document.createElement( 'a' );
      link.href = this.datas.projects[index].url;
      link.target = '_blank';
      link.textContent = this.datas.projects[index].target;
      descriptionElement.appendChild( link );
    }

    descriptionElement.className = 'description-container';
    setTimeout( () => {
      descriptionElement.className = 'description-container active';
    }, 450 );
  }

  mouseMove( e ) {
    if ( e.clientX < window.innerWidth * 0.38 ) {
      document.querySelector( '.project-list' ).className = 'project-list project-container active';
      this.projectListElement.className = 'active';
    } else {
      document.querySelector( '.project-list' ).className = 'project-list project-container';
      this.projectListElement.className = '';
    }

    if ( e.clientX > window.innerWidth * 0.62 ) {
      document.querySelector( '.experiment-list' ).className = 'experiment-list project-container active';
      this.experimentListElement.className = 'active';
    } else {
      document.querySelector( '.experiment-list' ).className = 'experiment-list project-container';
      this.experimentListElement.className = '';
    }
  }

  setInterface() {
    this.setDescription( 0 );
    for ( let i = 0; i < this.datas.projects.length; i++ ) {
      if ( this.datas.projects[i].type === 'project' ) {
        const li = document.createElement( 'li' );
        const br = document.createElement( 'br' );
        li.setAttribute( 'data-index', i );
        li.textContent = this.datas.projects[i].name;
        // for ( let j = 0; j < this.datas.projects[i].intervention.length; j++ ) {
        //   const span = document.createElement( 'span' );
        //   span.textContent = this.datas.projects[i].intervention[j];
        //   li.appendChild( span );
        // }
        this.projectListElement.appendChild( li );
        this.projectListElement.appendChild( br );
      } else {
        const li = document.createElement( 'li' );
        const br = document.createElement( 'br' );
        li.setAttribute( 'data-index', i );
        li.textContent = this.datas.projects[i].name;
        // for ( let j = 0; j < this.datas.projects[i].intervention.length; j++ ) {
        //   const span = document.createElement( 'span' );
        //   span.textContent = this.datas.projects[i].intervention[j];
        //   li.appendChild( span );
        // }
        this.experimentListElement.appendChild( li );
        this.experimentListElement.appendChild( br );
      }
    }
  }
}
