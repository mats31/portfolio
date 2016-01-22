uniform sampler2D texture;
uniform sampler2D map;
uniform vec3 color;

varying vec3 vColor;
varying vec2 particlePosition;
varying vec2 vUv;

void main() {

  gl_FragColor = vec4(vUv.x,vUv.y,0.0,1.0);
  //gl_FragColor = vec4( color, 1.0 );
  // gl_FragColor = texture2D( map, vUv );
  // gl_FragColor = texture2D( map, vec2(particlePosition.x, particlePosition.y) );
  // if(dist(particlePosition,vec2(0,0)) > 5 {
  //   gl_FragColor = vec4( vec3(0.1, 0.3, 0.5), 1.0 );
  // }
}
