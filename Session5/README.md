Session5
========
#### S5-01-Homework ####
The aim of the S5-01 is to make geometry change scale,rotation directions and speed,colors randomly.

#### Description ####
In the Session5(S5-01),I looped ten RingGeometries.Each RingGeometry change the scale, color and rotation directions randomly, and the rotation speed randomly from 0.05 - 0.025.

### Usage ###
```html
<script src="build/three.min.js"></script>
<script src="js/OrbitControls.js"></script>
<!--  Our code  -->
<script src="js/index.js"></script>
```

### Code ###
This code define a scene, a camera, cubes and other variables.
```javascript
var renderer, scene, camera;
var cubes = [];
var rot = 0;
var rotX = [];//随机速度
var rotY = [];//随机速度
var scaleX = [];
var scaleY = [];
var scaleZ = [];
var scaleCube = [];
```
Creat initial function.
```javascript
function init() {
  scene = new THREE.Scene();

  var W = window.innerWidth,
  H = window.innerHeight;

  camera = new THREE.PerspectiveCamera(45, W / H, .1, 1000);
  camera.position.set(0, 55, 85);
  camera.lookAt(scene.position);

  var spotLight = new THREE.SpotLight(0xFFFFFF);
  spotLight.position.set(0, 1000, 0);
  scene.add(spotLight);

  renderer = new THREE.WebGLRenderer({antialias:true});
  renderer.setClearColor(0x17293a);
  renderer.setSize(W, H);
  //renderer.shadowMapEnabled = true;
controls = new THREE.OrbitControls(camera, renderer.domElement);
```
Create a two dimensional grid of objects, and position them accordingly.Loop the geometries and value rotation speed and colors randomly.In the end,add them to the scene.
```javascript
for (var x = -10; x <= 10; x += 5) { // Start from -10 and sequentially add one every 5 pixels
  for (var y = -10; y <= 10; y += 5) {
    var boxGeometry = new THREE.RingBufferGeometry(10, 5, 32);
//The color of the material is assigned a random color
    var boxMaterial = new THREE.MeshNormalMaterial({color: 0xFFFFFF});

    var mesh = new THREE.Mesh(boxGeometry, boxMaterial);
    //mesh.castShadow = true;
    mesh.position.x = x;
    mesh.position.z = y;

    mesh.scale.y = 0.5;
    mesh.scale.x = 100;

    mesh.rotation.x = Math.random() * 0.1 * Math.PI;;
    mesh.rotation.y = Math.random() * 0.1 * Math.PI;;
    mesh.rotation.z = Math.random() * 0.1 * Math.PI;;

    var rotValX = (Math.random() * 0.05) - 0.025;
    var rotValY = (Math.random() * 0.05) - 0.025;
    var scValX = Math.random();
    var scValZ = Math.random();
    var scValY = Math.random();

rotX.push(rotValX);
rotY.push(rotValY);
scaleX.push(scValX);
scaleY.push(scValY);
scaleZ.push(scValZ);
scaleCube.push(-scValX);
// randomspeed from -0.05 to 0.025
//var randomValueX = (Math.random() * 0.1) - 0.05;
//push the value on the randomspeed
//randomSpeedX.push(randomValueX);
    scene.add(mesh);
    cubes.push(mesh);
  }
}
```
Add drawFrame function and value each geometry different rot.
```javascript
function drawFrame(){
  requestAnimationFrame(drawFrame);

  console.log( scaleCube);
  //rot += Math.random() * 0.05 ;//Rotate randomly
//scaleCube += 0.02;
  //forEach takes all the array entries and passes the c as the object, and i as the index
  cubes.forEach(function(c, i) {
    c.rotation.x += rotX[i];
    c.rotation.y += rotY[i];

    scaleCube[i] += 0.1;
    if (scaleCube[i] > 20) scaleCube[i] = -20;
    c.scale.x = scaleCube[i];

});
  renderer.render(scene, camera);
}

init();
drawFrame();
```
