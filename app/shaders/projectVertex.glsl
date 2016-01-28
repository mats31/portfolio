float M_PI = 3.1415926535897932384626433832795;

uniform float time;

attribute float size;
attribute float velocity;
attribute float customTime;

varying vec2 particlePosition;

void main() {

  vec3 newPosition = vec3(
                        position.x + cos(time * customTime) * velocity * ( 15.0 * M_PI ) + sin(time * customTime) * velocity * ( 30.0 * M_PI ),
                        position.y + cos(time * customTime) * velocity * ( 15.0 * M_PI ) + cos(time * customTime) * velocity * ( 30.0 * M_PI ),
                        position.z
                      );
  vec4 mvPosition = modelViewMatrix * vec4(
                                        newPosition,
                                        1.0
                                      );
  particlePosition = newPosition.xy;


  gl_PointSize = size * ( 50.0 / length( mvPosition.xyz ) );
  gl_Position = projectionMatrix * mvPosition;

}
