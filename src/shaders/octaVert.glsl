//uniform mat4 projectionMatrix;
//uniform mat4 viewMatrix;
//uniform mat4 modelMatrix;

//attribute vec3 position;
//attribute vec3 normal;

uniform mediump float uTime;
uniform float uBounceSpeed;
uniform float uBounceHeight;

varying vec3 vNormal;


//rotating mesh
//https://godotshaders.com/shader/vertex-mesh-rotator/
mat3 rotateY(float angle)
{
	float cosA = cos(angle);
	float sinA = sin(angle);

	mat3 rotate_y  = mat3(
	   vec3(cosA, 0.0, sinA),
	   vec3(0.0, 1.0, 0.0),
	   vec3(-sinA, 0.0, cosA)
	);
	return rotate_y;
}

void main() {
  vec4 modelPos = vec4(position, 1.0);

  //bounce
  float bouncePos = abs(sin(uTime * uBounceSpeed)) * uBounceHeight;
  modelPos.y += bouncePos;

  //rotation: 1 360 degree revolution when y is between 9 and 14 and unwinds when drops back down
  float l = smoothstep((uBounceHeight*0.6), uBounceHeight, modelPos.y);
  float rotationAngle = 0.0;

  if (modelPos.y >= uBounceHeight-5.0 && modelPos.y <= uBounceHeight) {
    rotationAngle = radians(360.0) * l ;
  }

  mat3 rotationMatrix = rotateY(rotationAngle); 
  vec3 rotatedPosition = rotationMatrix * modelPos.xyz;

  gl_Position = projectionMatrix * viewMatrix * modelMatrix * vec4(rotatedPosition, 1.0);

//nidorx/matcaps - applying matcap in opengl
//https://github.com/nidorx/matcaps 
  vNormal = normalize(mat3(modelMatrix) * normal);
}
