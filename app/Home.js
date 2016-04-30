export default class Home {
  constructor( datas ) {
    this.datas = datas;
    this.projectListElement = document.querySelector( '.project-list ul' );
    this.experimentListElement = document.querySelector( '.experiment-list ul' );
    this.friendsList = document.querySelector( '.friends-list span' );

    this.setInterface();
  }

  animFriend( display ) {
    const friends = document.querySelector( '.friends-list' );
    friends.className = display ? 'friends-list active' : 'friends-list';
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

      this.setDescription( index, true );
    }
  }

  setDescription( index, isProject ) {
    const descriptionElement = document.querySelector( '.description-container' );
    descriptionElement.innerHTML = '';

    /** Title **/
    const title = document.createElement( 'h2' );
    title.textContent = isProject ? this.datas.projects[index].name : this.datas.friends[index].fullname;
    descriptionElement.appendChild( title );

    /** Description **/
    const description = document.createElement( 'p' );
    description.textContent = isProject ? this.datas.projects[index].description : this.datas.friends[index].description;
    descriptionElement.appendChild( description );

    /** Technos **/
    if ( isProject ) {
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
    }

    /** Link **/
    if (
      ( isProject && typeof this.datas.projects[index].url !== 'undefined' && typeof this.datas.projects[index].target !== 'undefined' ) ||
      ( !isProject && typeof this.datas.friends[index].url !== 'undefined' && typeof this.datas.friends[index].target !== 'undefined' )
    ) {
      const link = document.createElement( 'a' );
      link.href = isProject ? this.datas.projects[index].url : this.datas.friends[index].url;
      link.target = '_blank';
      link.textContent = isProject ? this.datas.projects[index].target : this.datas.friends[index].target;
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
    this.setDescription( 0, true );

    for ( let i = 0; i < this.datas.projects.length; i++ ) {
      if ( this.datas.projects[i].type === 'project' ) {
        const li = document.createElement( 'li' );
        const br = document.createElement( 'br' );

        li.setAttribute( 'data-index', i );
        li.textContent = this.datas.projects[i].name;

        if ( i === 0 ) { li.className = 'width'; }

        this.projectListElement.appendChild( li );
        this.projectListElement.appendChild( br );
      } else {
        const li = document.createElement( 'li' );
        const br = document.createElement( 'br' );

        li.setAttribute( 'data-index', i );
        li.textContent = this.datas.projects[i].name;

        if ( i === 0 ) { li.className = 'width'; }

        this.experimentListElement.appendChild( li );
        this.experimentListElement.appendChild( br );
      }
    }

    for ( let i = 0; i < this.datas.friends.length; i++ ) {
      const a = document.createElement( 'a' );
      const symbol = document.createTextNode( '•' );

      a.setAttribute( 'data-index', i );
      a.setAttribute( 'href', 'javascript:void(0)' );
      a.textContent = this.datas.friends[i].name;

      this.friendsList.appendChild( a );
      if ( i !== this.datas.friends.length - 1 ) {
        this.friendsList.appendChild( symbol );
      }
    }

  }
}
