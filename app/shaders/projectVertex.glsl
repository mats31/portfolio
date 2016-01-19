attribute float size;
attribute vec3 color;
attribute float startPosition;


varying vec3 vColor;

void main() {

  vColor = color;

  vec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );
  gl_Position = projectionMatrix * mvPosition;

}
