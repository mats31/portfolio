float M_PI = 3.1415926535897932384626433832795;
uniform sampler2D texture;
uniform sampler2D firstMap;
uniform sampler2D secondMap;
uniform float easingColor;
uniform float easingFirstColor;
uniform float radius;
uniform vec3 color;

varying vec2 particlePosition;

void main() {

  float opacity = abs(clamp(distance(particlePosition, vec2(400, 400)) / radius, 0.0, 1.0) - 1.0);

  vec4 oldColor = vec4( 1.0, 1.0, 1.0, opacity ) * texture2D( firstMap, vec2(particlePosition.x / 800.0, particlePosition.y / 800.0) );


  vec4 texture = texture2D( secondMap, vec2(particlePosition.x / 800.0, particlePosition.y / 800.0) );
  vec4 targetColor = opacity * texture;
  float distanceToCenter = distance(particlePosition, vec2(400, 400)) / 400.0 - 1.0;
  targetColor.r = (1.0 - targetColor.r) * ( clamp(distanceToCenter, 0.0, 1.0) * 1.5) + targetColor.r;
  targetColor.g = (1.0 - targetColor.g) * ( clamp(distanceToCenter, 0.0, 1.0) * 1.5) + targetColor.g;
  targetColor.b = (1.0 - targetColor.b) * ( clamp(distanceToCenter, 0.0, 1.0) * 1.5) + targetColor.b;

  gl_FragColor = oldColor * easingFirstColor + ( ( targetColor - oldColor * easingFirstColor ) * easingColor );
}
