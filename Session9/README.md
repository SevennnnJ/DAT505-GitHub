Session9
========
#### S9-01-PostProcessing-Glitch ####
The aim of the S9-01 is to use geometry to creat special effect.

#### Description ####
In the Session9(S9-01),I tried to change the Sprite's color when I used the mouse to click the Sprite.
In the Session8(S8-02),I
In the Session8(S8-03),I imported the 3D models into the code and then they could change color and voice when I used mouse to click them.


### Usage ###
```html
<div id="canvas"></div>
<script src="build/three.js"></script>
<script src="shaders/CopyShader.js"></script>
<script src="shaders/DotScreenShader.js"></script>
<script src="shaders/RGBShiftShader.js"></script>
<script src="shaders/PixelShader.js"></script>
<script src="shaders/DigitalGlitch.js"></script>
<script src="shaders/AfterimageShader.js"></script>
<script src="shaders/BlendShader.js"></script>
<script src="shaders/BokehShader.js"></script>
<script src="shaders/ColorifyShader.js"></script>
<script src="shaders/FilmShader.js"></script>
<script src="shaders/FocusShader.js"></script>
<script src="shaders/FXAAShader.js"></script>
<script src="shaders/KaleidoShader.js"></script>
<script src="shaders/GammaCorrectionShader.js"></script>
<script src="shaders/HorizontalBlurShader.js"></script>
<script src="shaders/HueSaturationShader.js"></script>
<script src="shaders/ToneMapShader.js"></script>
<script src="EffectComposer/EffectComposer.js"></script>
<script src="postprocessing/EffectComposer.js"></script>
<script src="postprocessing/RenderPass.js"></script>
<script src="postprocessing/MaskPass.js"></script>
<script src="postprocessing/ShaderPass.js"></script>
<script src="postprocessing/GlitchPass.js"></script>
<script src="js/index.js"></script>
```

### Code ###
This code define a scene, a camera, cubes and other variables.
```javascript
var renderer, scene, camera, composer, planetMesh, skeletonMesh, particleMesh;
var effectGlitch, effectRGB, motion1, motion2;
var kaleidoParams, kaleidoPass;
var rgbPass, rgbParams;
var t1 = 0;
var t2 = 0;
var t3 = 0;
var glitchPass;
window.onload = function() {
  init();
  animate();
}
```
Initial render and add geometries in the scene.
```javascript
function init() {
  renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setPixelRatio((window.devicePixelRatio) ? window.devicePixelRatio : 1);
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.autoClear = false;
  renderer.setClearColor(0xff00ff, 0.0);
  document.getElementById('canvas').appendChild(renderer.domElement);

  scene = new THREE.Scene();
//PerspectiveCamera
  camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 1000);
  camera.position.z = 400;
  scene.add(camera);

  planetObject = new THREE.Object3D();
  skeletonObject = new THREE.Object3D();
  particlesObject = new THREE.Object3D();

  scene.add(planetObject);
  scene.add(skeletonObject);
  scene.add(particlesObject);

  var particlesGeometry = new THREE.TetrahedronGeometry(2, 0);
  var planetGeometry = new THREE.IcosahedronGeometry(7, 1);
  var skeletonGeometry = new THREE.IcosahedronGeometry(15, 1);

  var particlesMaterial = new THREE.MeshPhongMaterial({
    color: 0xff00ff,
    shading: THREE.FlatShading
  });
```
Loop the geometries and change the materials in the scene.Add the lights to present the effect.
```javascript
for (var i = 0; i < 1500; i++) {
  var particlesMesh = new THREE.Mesh(particlesGeometry, particlesMaterial);
  particlesMesh.position.set(Math.random() - 0.5, Math.random() - 0.5, Math.random() - 0.5).normalize();
  particlesMesh.position.multiplyScalar(1 + (Math.random() * 700));
  particlesMesh.rotation.set(Math.random() * 2, Math.random() * 2, Math.random() * 2);
  var randScale = Math.random() * 5;
  particlesMesh.scale.set(randScale, randScale, randScale);
  particlesObject.add(particlesMesh);
}
//middle geometry material

var planetMaterial = new THREE.MeshPhongMaterial({
  color: 0xff00ff,
  shading: THREE.FlatShading
});

var planetMesh = new THREE.Mesh(planetGeometry, planetMaterial);
planetMesh.scale.x = planetMesh.scale.y = planetMesh.scale.z = 16;
planetObject.add(planetMesh);

var skeletonMaterial = new THREE.MeshPhongMaterial({
  color: 0xffff00,
  wireframe: true,
  side: THREE.DoubleSide
});

var skeletonMesh = new THREE.Mesh(skeletonGeometry, skeletonMaterial);
skeletonMesh.scale.x = skeletonMesh.scale.y = skeletonMesh.scale.z = 10;
skeletonObject.add(skeletonMesh);

var ambientLight = new THREE.AmbientLight(0x999999 );
scene.add(ambientLight);

var lights = [];
lights[0] = new THREE.DirectionalLight( 0xffffff, 0.2 );
lights[0].position.set( 1, 2, -0.5);
lights[1] = new THREE.DirectionalLight( 0x11E8BB, 0.3 );
lights[1].position.set( 1, -1, 0.5 );
lights[2] = new THREE.DirectionalLight( 0x8200C9, 0.7 );
lights[2].position.set( -1., -1, -0.1 );
lights[3] = new THREE.DirectionalLight( 0x8200C9, 0.8 );
lights[3].position.set( -1., 2, -1 );
scene.add( lights[0] );
scene.add( lights[1] );
scene.add( lights[2] );
scene.add( lights[3] );
```
Change the postprocessing and value to change the effect.
```javascript
// postprocessing
composer = new THREE.EffectComposer( renderer );
//composer.addPass( new THREE.RenderPass( scene, camera ) );
var renderPass = new THREE.RenderPass(scene, camera);

rgbPass = new THREE.ShaderPass( THREE.ColorifyShader);
//rgbPass.uniforms[ 'amount' ].value = 0.005;
//rgbPass.renderToScreen = true;
composer.addPass ( renderPass );
composer.addPass ( rgbPass );

kaleidoPass = new THREE.ShaderPass (THREE.FilmShader);
composer.addPass ( kaleidoPass );

var glitchPass = new THREE.GlitchPass();
glitchPass.renderToScreen = true;
composer.addPass( glitchPass );

rgbParams = {
  amount: 4,
  angle: 0.8
}

kaleidoParams = {
  sides: 5,
  angle: 4
}
window.addEventListener('resize', onWindowResize, false);
};
```
Add the function to render in the scene and adjust the rotation.
```javascript
function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
  composer.setSize( window.innerWidth, window.innerHeight );
}
var reset = 0;

function animate(ts) {
  requestAnimationFrame(animate);
  //var delta = clock.getDelta()
  particlesObject.rotation.x += 0.0000;
  particlesObject.rotation.y -= 0.0040;
  planetObject.rotation.x -= 0.0020;
  planetObject.rotation.y -= 0.0030;
  skeletonObject.rotation.x -= 0.0010;
  skeletonObject.rotation.y += 0.0020;
  //renderer.clear();
  //renderer.render( scene, camera )
  composer.render(0.1);
};
```
