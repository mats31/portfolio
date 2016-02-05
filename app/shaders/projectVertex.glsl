float M_PI = 3.1415926535897932384626433832795;

uniform float time;
uniform float leave;
uniform sampler2D secondMap;

attribute float size;
attribute float velocity;
attribute float customTime;

varying vec2 particlePosition;

void main() {

  vec3 newPosition = vec3(
                        position.x + cos(time * customTime) * velocity * ( 35.0 * M_PI ) + sin(time * customTime) * velocity * ( 50.0 * M_PI ),
                        position.y + cos(time * customTime) * velocity * ( 35.0 * M_PI ) + cos(time * customTime) * velocity * ( 50.0 * M_PI ),
                        position.z
                      );
  newPosition.z = newPosition.z + ( ( leave - newPosition.z ) * ( velocity + 0.4 ) );
  particlePosition = newPosition.xy;
  vec4 texture = texture2D( secondMap, vec2(particlePosition.x / 800.0, particlePosition.y / 800.0) );
  float gray = dot(texture.rgb, vec3(0.299, 0.587, 0.114));
  newPosition.z += gray * 60.0;
  // newPosition.z += texture.r * 60.;

  vec4 mvPosition = modelViewMatrix * vec4(
                                        newPosition,
                                        1.0
                                      );




  gl_PointSize = size * ( 10.0 / length( mvPosition.xyz ) );
  gl_Position = projectionMatrix * mvPosition;

}
