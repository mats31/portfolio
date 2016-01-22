attribute float size;
attribute vec3 customColor;
uniform float time;

varying vec3 vColor;
varying vec2 vUv;
varying vec2 particlePosition;

void main() {

  vColor = customColor;
  vUv = uv;

  vec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );
  particlePosition = vec2(position.x / 800.0, position.y / 400.0);
  gl_PointSize = size * ( 50.0 / length( mvPosition.xyz ) );
  gl_Position = projectionMatrix * mvPosition;

}
