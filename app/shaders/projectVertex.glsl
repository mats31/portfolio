float M_PI = 3.1415926535897932384626433832795;

attribute float size;
attribute float velocity;
attribute vec3 customColor;
attribute vec3 noisePosition;
uniform float time;

varying vec3 vColor;
varying vec2 vUv;
varying vec2 particlePosition;

void main() {

  vColor = customColor;
  vUv = uv;

  // position.x = position.x * cos( time );
  // vec3 newPosition = vec3(position.x + ( (noisePosition.x - position.x) * 0.0009),
  //                         position.y + ( (noisePosition.y - position.y) * 0.0009),
  //                         position.z + ( (noisePosition.z - position.z) * 0.0009));
  vec4 mvPosition = modelViewMatrix * vec4(
                                        vec3(
                                          position.x + cos(time) * velocity * ( 6.0 * M_PI ) + sin(time) * velocity * ( 6.0 * M_PI ),
                                          position.y + cos(time) * velocity * ( 6.0 * M_PI ) + cos(time) * velocity * ( 6.0 * M_PI ),
                                          position.z
                                        )
                                      , 1.0 );
particlePosition = vec2(position.x + cos(time) * velocity * ( 6.0 * M_PI ) + sin(time) * velocity * ( 6.0 * M_PI ), position.y + cos(time) * velocity * ( 6.0 * M_PI ) + cos(time) * velocity * ( 6.0 * M_PI ));


  gl_PointSize = size * ( 50.0 / length( mvPosition.xyz ) );
  gl_Position = projectionMatrix * mvPosition;

}
