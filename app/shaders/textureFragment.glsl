uniform vec3 color;
uniform sampler2D map;

varying vec2 vUv;

void main() {

  gl_FragColor = texture2D( map, vUv );
  //gl_FragColor = vec4( color, 1.0 );

}
