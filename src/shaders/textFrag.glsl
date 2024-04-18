precision mediump float;

uniform sampler2D uMatCapText;
uniform mediump float uTime;

varying vec3 vNormal;

void main()
{
//nidorx/matcaps - applying matcap in opengl
//https://github.com/nidorx/matcaps
  highp vec2 muv = vec2(viewMatrix * vec4(normalize(vNormal), 0)) * 0.5 + vec2(0.5,0.5);
  
  vec4 matcap = texture2D(uMatCapText, vec2(muv.x, muv.y)); 
  vec4 backgroundColor = vec4(0.933, 0.933, 0.933, 1.0); 

  //fading text in and out 
  float t = smoothstep(0.80, 1.0, abs(sin(uTime * 0.5 + 0.5)));
  gl_FragColor = vec4(mix(backgroundColor, matcap, t));


}
