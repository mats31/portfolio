float M_PI = 3.1415926535897932384626433832795;
uniform sampler2D texture;
uniform sampler2D map;
uniform vec3 color;
uniform vec3 lightPosition;

varying vec3 vColor;
varying vec2 particlePosition;
varying vec2 vUv;

void main() {

  // gl_FragColor = vec4( particlePosition.x / 800.0, 0., 0., 1. );
  // gl_FragColor = vec4(vUv.x,vUv.y,0.0,1.0);
  //gl_FragColor = vec4( color, 1.0 );
  // gl_FragColor = vec4( color, 1.0) * texture2D( texture, vUv );
  // gl_FragColor = texture2D( map, vec2( normalize( particlePosition.x ), normalize( particlePosition.y ) ) );
  if (particlePosition.x < 0.0 || particlePosition.x > 400.0 || particlePosition.y < 0.0 || particlePosition.y > 400.0) {
    gl_FragColor = vec4(1.0, 1.0, 1.0, 0.1);
  } else {
    float opacity = sin(M_PI * particlePosition.x / 400.0) * sin(M_PI * particlePosition.y / 400.0) + 0.15;
    vec4 colorOpacity = vec4( 1.0, 1.0, 1.0, opacity );
    gl_FragColor = colorOpacity * texture2D( map, vec2(particlePosition.x / 400.0, particlePosition.y / 400.0) );
  }
  // gl_FragColor = texture2D( map, normalize( vec2( particlePosition.x, particlePosition.y ) ) );
  // if(dist(particlePosition,vec2(0,0)) > 5 {
  //   gl_FragColor = vec4( vec3(0.1, 0.3, 0.5), 1.0 );
  // }
}
