//uniform mat4 projectionMatrix;
//uniform mat4 viewMatrix;
//uniform mat4 modelMatrix;

//attribute vec3 position;
//attribute vec3 normal;

uniform mediump float uTime;
uniform float uMovementRadius;

varying vec3 vNormal;
varying vec3 vEyeDir;

void main() {
    vec4 modelPos = vec4(position, 1.0);
    vec4 worldPos = modelMatrix * modelPos;

    // euler integration
    float acceleration = abs(cos(uTime * 0.5)); //0.5 dec number of stops to 1
    float angularSpeed = 15.0 + acceleration; 
    float angle = uTime + angularSpeed * 1.99 ; 

    // moving sphere closer to octahedron when in front of it
    if (abs(sin(uTime * 0.5 + 0.5)) >= 0.85) {
        float t = smoothstep(0.80, 1.0, abs(sin(uTime * 0.5 + 0.5)));
        worldPos.z = mix(worldPos.z, worldPos.z - (uMovementRadius*0.5), t* 0.5);
        worldPos.y = mix(worldPos.y, worldPos.y + (uMovementRadius * 0.15), t* 0.5);
    }

    // sphere moving along polar coordinates
    worldPos.x += uMovementRadius * 1.2 * cos(angle);
    worldPos.z += uMovementRadius * 1.0 * sin(angle);
    worldPos.y -= 15.0 * sin(angle);

  gl_Position = projectionMatrix * viewMatrix * worldPos;

//https://stackoverflow.com/questions/11794277/glsl-shader-for-glossy-specular-reflections-on-an-cubemapped-surface
    vNormal = normalMatrix * normal;
    vEyeDir = vec3(viewMatrix * modelMatrix * vec4(position, 1.0));
}
