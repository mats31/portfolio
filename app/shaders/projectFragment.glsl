float M_PI = 3.1415926535897932384626433832795;
uniform sampler2D texture;
uniform sampler2D firstMap;
uniform sampler2D secondMap;
uniform float easingColor;
uniform float easingFirstColor;
uniform float height;
uniform float radius;
uniform float width;
uniform vec3 color;

varying vec3 vColor;
varying vec2 particlePosition;
varying vec2 vUv;

void main() {

  // gl_FragColor = vec4( particlePosition.x / 800.0, 0., 0., 1. );
  // gl_FragColor = vec4(vUv.x,vUv.y,0.0,1.0);
  //gl_FragColor = vec4( color, 1.0 );
  // gl_FragColor = vec4( color, 1.0) * texture2D( texture, vUv );
  // gl_FragColor = texture2D( map, vec2( normalize( particlePosition.x ), normalize( particlePosition.y ) ) );
  // if (particlePosition.x < 0.0 || particlePosition.x > 800.0 || particlePosition.y < 0.0 || particlePosition.y > 800.0) {
  //   gl_FragColor = vec4(1.0, 1.0, 1.0, 0.1);
  // } else {
    // float opacity = sin(M_PI * particlePosition.x / 800.0) * sin(M_PI * particlePosition.y / 800.0);
    //float opacity = sin(M_PI * ( ( particlePosition.x * width ) / 800.0 ) / width) * sin(M_PI * ( ( particlePosition.y * height ) / 800.0 ) / height);
    float opacity = abs(clamp(distance(particlePosition, vec2(400, 400)) / 800.0, 0.0, 1.0) - 1.0);
    float secondOpacity = abs(clamp(distance(particlePosition, vec2(400, 400)) / radius, 0.0, 1.0) - 1.0);
    // float opacity = sin(M_PI * clamp(particlePosition.x, 200.0, 600.0) / 600.0) * sin(M_PI * clamp(particlePosition.y, 200.0, 600.0) / 600.0);
    vec4 colorOpacity = vec4( 1.0, 1.0, 1.0, opacity );
    vec4 oldColor = colorOpacity * texture2D( firstMap, vec2(particlePosition.x / 800.0, particlePosition.y / 800.0) );

    // texture.a = opacity;
    //vec4 targetColor = vec4( 1.0, 1.0, 1.0, 1.0 );

    // vec4 targetColor = opacity * texture2D( secondMap, vec2(particlePosition.x / 800.0, particlePosition.y / 800.0) );
    vec4 texture = texture2D( secondMap, vec2(particlePosition.x / 800.0, particlePosition.y / 800.0) );
    // texture.a = 1.0;
    vec4 test = vec4(1.0,1.0,1.0,1.0);
    vec4 targetColor = secondOpacity * texture;
    // targetColor.a = 1.0 * opacity;
    // if ( targetColor.r == 0.0 &&  targetColor.g == 0.0 && targetColor.b == 0.0 ) {
    //   gl_FragColor = vec4(1.0, 1.0, 1.0, 0.1);
    // } else {
    //   gl_FragColor = oldColor * easingFirstColor + ( ( targetColor - oldColor * easingFirstColor ) * easingColor );
    // }
    gl_FragColor = oldColor * easingFirstColor + ( ( targetColor - oldColor * easingFirstColor ) * easingColor );
    // gl_FragColor = vec4( vColor, 1) + ( ( targetColor - vec4( vColor, 1) ) * 0.001 );
  // }
  // gl_FragColor = texture2D( map, normalize( vec2( particlePosition.x, particlePosition.y ) ) );
  // if(dist(particlePosition,vec2(0,0)) > 5 {
  //   gl_FragColor = vec4( vec3(0.1, 0.3, 0.5), 1.0 );
  // }
  // if (particlePosition.x > dot(vec4(1.0, 1.0, 1.0, 0.1), texture)) {
  //   gl_FragColor = vec4(1.0, 0.0, 0.0, opacity);
  // } else {
  //   gl_FragColor = vec4(0.0, 1.0, 0.0, opacity);
  // }
}


// oujesuis + ( (oujeveuxaller - oujesuis) * easing )
