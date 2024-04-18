//uniform mat4 projectionMatrix;
//uniform mat4 viewMatrix;
//uniform mat4 modelMatrix;

//attribute vec3 position;
//attribute vec3 normal;

varying vec3 vNormal;

void main() {
  vec4 modelPos = vec4(position, 1.0);
  gl_Position = projectionMatrix * viewMatrix * modelMatrix * modelPos;

//nidorx/matcaps - applying matcap in opengl
//https://github.com/nidorx/matcaps 
  vNormal = normalize(mat3(modelMatrix) * normal);
}
