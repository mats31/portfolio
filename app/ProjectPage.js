export default class ProjectPage {
  constructor() {
    this.path = 'img/';
  }

  setPage( project ) {
    /** Title **/
    const title = document.createElement( 'h2' );
    title.textContent = project.name;

    /** Description **/
    const description = document.createElement( 'p' );
    description.textContent = project.description;

    /** Interventions **/
    const listIntervention = document.createElement( 'ul' );
    for ( let i = 0; i < project.intervention.length; i++ ) {
      const intervention = document.createElement( 'li' );
      intervention.textContent = project.intervention[i];
      listIntervention.appendChild( intervention );
    }

    /** Images **/
    const images = {
      image: [],
      images: [],
    };
    for ( let i = 1; i < project.images.length; i++ ) {
      if ( i === 1 ) {
        images.image.push( project.images[i]);
      } else {
        images.images.push( project.images[i]);
      }
    }

    const target = document.querySelector( ' #projectWrapper .container ' );
    target.innerHTML = '';
    target.appendChild( title );
    const image = document.createElement( 'img' );
    image.src = this.path + images.image[0].src;
    target.appendChild( image );
    target.appendChild( description );
    target.appendChild( listIntervention );
    for ( let i = 0; i < images.images.length; i++ ) {
      const currentImg = document.createElement( 'img' );
      const currentText = document.createElement( 'p' );
      currentImg.src = this.path + images.images[i].src;
      currentText.textContent = this.path + images.images[i].text;
      target.appendChild( currentImg );
      target.appendChild( currentText );
    }
  }
}
