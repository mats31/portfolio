attribute float size;
attribute vec3 customColor;
attribute float startPosition;


varying vec3 vColor;

void main() {

  vColor = customColor;

  vec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );
  gl_Position = projectionMatrix * mvPosition;

}
