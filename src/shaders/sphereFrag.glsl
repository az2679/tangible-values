precision mediump float;

uniform samplerCube uEnvMap;

varying vec3 vNormal;
varying vec3 vEyeDir;

void main()
{
//https://stackoverflow.com/questions/11794277/glsl-shader-for-glossy-specular-reflections-on-an-cubemapped-surface
    vec3 reflectedDirection = normalize(reflect(vEyeDir, normalize(vNormal)));
    reflectedDirection.z = reflectedDirection.z*1.5;
    reflectedDirection.x = -reflectedDirection.x;

    vec4 fragColor = textureCube(uEnvMap, reflectedDirection);
    gl_FragColor = fragColor * vec4(0.55);
}
