Session4
========
#### S4-01-DifferentRotation ####

This is a project that adjust the rotation directions.

#### Description ####
In the Session4(S4-01),I made all cubes rotate in different directions.

### Usage ###
```html
<script src="build/three.min.js"></script>
<script src="js/OrbitControls.js"></script>
<!--  Our code  -->
<script src="js/index.js"></script>
```

### Code ###
This code value the variable and add the OrbitControls to the screen.
```javascript
var renderer, scene, camera;
var controls;
var cubes = [];
var rot = 0;

function init() {
  scene = new THREE.Scene();

  var W = window.innerWidth,
      H = window.innerHeight;

  camera = new THREE.PerspectiveCamera(45, W / H, .1, 1000);
  camera.position.set(50, 60, 45);
  camera.lookAt(scene.position);

  var spotLight = new THREE.SpotLight(0xFFFFFF);
  spotLight.position.set(0, 1000, 0);
  scene.add(spotLight);
  //spotLight.castShadow = true;

  renderer = new THREE.WebGLRenderer({antialias:true});
  renderer.setClearColor(0x17293a);
  renderer.setSize(W, H);
  //Control mouse
  controls = new THREE.OrbitControls(camera,renderer.domElement);
```
Render loop the cubes and add the material.In the end increase the mesh in the scene.
```javascript
//Create a two dimensional grid of objects, and position them accordingly
for (var x = -50; x < 50; x += 5){ // Start from -50 and sequentially add one every 5 pixels
for (var y = -50; y < 50; y += 5){
//Concatenation of the x and y
//console.log("X: " +x+ ",Y: " +y+ );
var boxGeometry = new THREE.BoxGeometry(3, 6, 3);
//The color of the material is assigned a random color
var boxMaterial = new THREE.MeshLambertMaterial({color: 0xffff00});
var mesh = new THREE.Mesh(boxGeometry, boxMaterial);
//mesh.castShadow = true;
mesh.rotation.x = 360*Math.random();
mesh.position.z = y;
mesh.position.x = x;

mesh.scale.y = 0.5;
scene.add(mesh);
cubes.push(mesh);
//console.log(cubes);
}
}
document.body.appendChild(renderer.domElement);
}

```
Render each cube rotate in different directions.
```javascript
function drawFrame(){
  requestAnimationFrame(drawFrame);
  rot += 0.1;

  cubes.forEach(function(c,i){
    c.rotation.z = rot;
    //c.rotation.y = rot;

  });
  renderer.render(scene, camera);
}

init();
drawFrame();
```

#### S4-02-DifferentSpeedRotationColor ####
This is a project that adjust the rotation directions and rotation speed.

#### Description ####
In the (S4-02),all cubes are different colors and rotate in different directions and different speeds.

### Usage ###
```html
<script src="build/three.min.js"></script>
<script src="js/OrbitControls.js"></script>
<!--  Our code  -->
<script src="js/index.js"></script>
```

### Code ###
This code value the variable especially give the randomValueX and randomSpeedX
assignment space.
```javascript
var renderer, scene, camera;
var cubes = [];
var rot = 0;
var randomValueX;
var randomSpeedX = [];
```
Define the initial value.
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
  //spotLight.castShadow = true;

  var ambLight = new THREE.AmbientLight(0xFFFFFF);
  ambLight.position.set(0, 1000, 0);
  ambLight.add(spotLight);
  scene.add(ambLight);

  renderer = new THREE.WebGLRenderer({antialias:true});
  renderer.setClearColor(0x17293a);
  renderer.setSize(W, H);
  //renderer.shadowMapEnabled = true;
  controls = new THREE.OrbitControls(camera, renderer.domElement);
```
Create cubes loop and set up random value.
```javascript
for (var x = -10; x <= 10; x += 5) { // Start from -35 and sequentially add one every 5 pixels
  for (var y = -10; y <= 10; y += 5) {
    var boxGeometry = new THREE.BoxGeometry(3, 3, 3);
    //The color of the material is assigned a random color
    var boxMaterial = new THREE.MeshLambertMaterial({color: Math.random() * 0xFFFFFF});
    var mesh = new THREE.Mesh(boxGeometry, boxMaterial);

    mesh.position.x = x;
    mesh.position.y = y;
    mesh.rotation.x = 90*Math.random();
    scene.add(mesh);
    cubes.push(mesh);
    //randomspeed from -0.1 to 0.05
    var randomValueX = (Math.random() * 0.1) - 0.05;
    //push the value on the randomspeed
    randomSpeedX.push(randomValueX);
  }
}

document.body.appendChild(renderer.domElement);
}
```
For each takes all the array entries and passes the c as the object, and i is keeping track of the index for each cube.
```javascript
function drawFrame(){
  requestAnimationFrame(drawFrame);

  rot += 0.05 ;//Rotate randomly
  cubes.forEach(function(c, i) {
    cubes[i].rotation.x += randomSpeedX[i];
    //cubes[i].rotation.z = rot;
    //cubes[6].scale.x = scaleCube;
    //cubes[5].material = new THREE.MeshLambertMaterial( {color: 0xff00ff});
    //cubes[8].rotation.x += randomSpeedX[8];
});

  renderer.render(scene, camera);
}

init();
drawFrame();
```

#### S4-03-BigRubik'sCube ####
The aim of the project is to use small cubes to consitute a bigger cube and divides into four colors.

#### Description ####
In the (S4-03),I used 13*13*13 cubes to make up a bigger cube that like a Rubik's Cube.It divides into four regions on average an each region has its own color.

### Usage ###
```html
<script src="build/three.min.js"></script>
<script src="js/OrbitControls.js"></script>
<!--  Our code  -->
<script src="js/index.js"></script>
```

### Code ###
This code value the variable and give each variable assignment space.
```javascript
//all variables can change name
var renderer, scene, camera;
var controls;
var cube = [];
var rotX = [];
var rotY = [];
var scaleX = [];
var scaleY = [];
var scaleZ = [];
var rotValX = [];
var rotValY = [];
var scaleCube = [];
var rot = 0;
var randomSpeedX = [];
```
Define the initial value.
```javascript
function init() {
  scene = new THREE.Scene();

  var W = window.innerWidth;
      H = window.innerHeight;

  camera = new THREE.PerspectiveCamera(45, W / H, .1, 1000);
  camera.position.set(0, 55, 85);
  camera.lookAt(scene.position);

  var spotLight = new THREE.SpotLight(0xFFFFFF);
  spotLight.position.set(-500, 0, 800);
  scene.add(spotLight);

  spotLight.castShadow = true;
  spotLight.shadow.mapSize.width = 1024;
  spotLight.shadow.mapSize.height = 1024;

  spotLight.shadow.camera.near = 500;
  spotLight.shadow.camera.far = 4000;
  spotLight.shadow.camera.fov = 30;

  renderer = new THREE.WebGLRenderer({antialias:true});
  renderer.setClearColor(0x17293a);
  renderer.setSize(W, H);
controls = new THREE.OrbitControls(camera,renderer.domElement);
```
loop the cubes to become a Rubik's Cube.
```javascript
 for (var x = -30; x <= 30; x += 5) {
 for (var z = -30; z <= 30; z += 5) {
 for (var y = -30; y <= 30; y += 5) {
// Start from -30 and sequentially add one every 5 pixels
var boxGeometry1 = new THREE.BoxGeometry(3, 3, 3);
```
Divide the cubes into four region and set up four colors
```javascript
//change forloop color
    if (x >= 0 && z >= 0 && y >= 0){
  var boxMaterial1 = new THREE.MeshLambertMaterial({color:0x76EEC6});
} else if (x <= 0 && z >= 0 && y >= 0) {
  var boxMaterial1 = new THREE.MeshLambertMaterial({color:0xFF6347});
}else if (x <= 0 && z <= 0 && y >= 0) {
  var boxMaterial1 = new THREE.MeshLambertMaterial({color:0xFFFF00});
}else if (x <= 0 && z >= 0 && y <= 0) {
  var boxMaterial1 = new THREE.MeshLambertMaterial({color:0x9370DB});
}else if (x >= 0 && z >= 0 && y <= 0) {
  var boxMaterial1 = new THREE.MeshLambertMaterial({color:0x00FFFF});
}else if (x >= 0 && z <= 0 && y <= 0) {
  var boxMaterial1 = new THREE.MeshLambertMaterial({color:0xFFC125});
}else if (x >= 0 && z <= 0 && y >= 0) {
  var boxMaterial1 = new THREE.MeshLambertMaterial({color:0xDB7093});
}else {
  var boxMaterial1 = new THREE.MeshLambertMaterial({color: 0xFFFFFF});
}
  var mesh1 = new THREE.Mesh(boxGeometry1, boxMaterial1);
    //mesh.castShadow = true;
    mesh1.rotation.x = 360*Math.random();
    mesh1.position.z = y;
    mesh1.position.x = x;
    mesh1.position.y = z;
    mesh1.scale.y = 0.5;
    scene.add(mesh1);
    cube.push(mesh1);
    console.log(mesh1);

  }
  }
  }
  document.body.appendChild(renderer.domElement);
}
```
For each takes all the array entries and passes the c as the object, and i is keeping track of the index for each cube.
```javascript
function drawFrame(){
requestAnimationFrame(drawFrame);
rot += 0.01;
//scaleCube += 0.1;

cube.forEach(function(c,i){
c.rotation.x = rot;
c.rotation.y = rot;
//c.scale.x = scaleCube[i];
});

renderer.render(scene, camera);
}

init();
drawFrame();
```
