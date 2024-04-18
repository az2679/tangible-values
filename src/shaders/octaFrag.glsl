precision mediump float;

uniform sampler2D uMatCap;

varying vec3 vNormal;

void main()
{
//nidorx/matcaps - applying matcap in opengl
//https://github.com/nidorx/matcaps
  highp vec2 muv = vec2(viewMatrix * vec4(normalize(vNormal), 0)) * 0.5 + vec2(0.5,0.5);

  gl_FragColor = texture2D(uMatCap, vec2(muv.x, muv.y)); //opting not to invert y (1.0 - muv.y)
}
