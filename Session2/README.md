Session2
========
#### S2-01-Add Texture Homework ####
This project aims to  added different textures on different geometries.

#### Description ####
In the Session2 (S2-01),I arrayed six geometries and added different textures on different geometries.I also tried to add the light in the scene.

### Usage ###
```html
<script src="build/three.js"></script>
</head>
<body>
<script src="js/index.js"></script>
</body>
```

### Code ###
Here code define a scene, a camera, and geometry,material and mesh that add in the scene.It then creates a `WebGL` renderer for the scene and camera, and it adds that viewport to the document.body element.
```javascript
var scene, camera, renderer;
var geometry1, material1, mesh1,border1;
var geometry2, material2, mesh2;
var geometry3, material3, mesh3,border3;
var geometry4, material4, mesh4;
var geometry5, material5, mesh5;
var geometry6, material6, mesh6;


function init(){
  scene = new THREE.Scene();

  camera = new THREE.PerspectiveCamera(35, window.innerWidth/window.innerHeight, 300, 10000 );

  renderer = new THREE.WebGLRenderer({antialias:true});

  renderer.setClearColor("#DBDBDB");

  renderer.setSize( window.innerWidth, window.innerHeight );

  document.body.appendChild( renderer.domElement );

  var light1 = new THREE.AmbientLight("#FAFAD2", 1);
  scene.add(light1);

  var light2 = new THREE.PointLight("#FAFAD2", 1);
  scene.add(light2);
}
```
I add different textures on the geometries in this part of code.
```javascript
function geometry(){
geometry1 = new THREE.IcosahedronBufferGeometry( 200,0 );
  material1 = new THREE.MeshBasicMaterial( {wireframe : true,color: "#EEE9E9"});
  mesh1 = new THREE.Mesh( geometry1,material1 );
  border1 = new THREE.EdgesHelper( mesh1,0xffff00);
  mesh1.position.z = -1000;
  mesh1.position.y = -10
  mesh1.position.x = 100

  // Add mesh to scene
  scene.add( mesh1 );
  scene.add( border1 );

  geometry2 = new THREE.SphereBufferGeometry( 150, 10 );
  var texture = new THREE.TextureLoader().load( 'earth_specular_2048.jpg');
  material2 = new THREE.MeshBasicMaterial( { map: texture } )
  mesh2 = new THREE.Mesh( geometry2, material2 );
  mesh2.position.z = -1000;
  mesh2.position.y = -10
  mesh2.position.x = 100

  scene.add( mesh2 );

  geometry4 = new THREE.TorusBufferGeometry( 200, 2, 16, 100 );
  var texture1 = new THREE.TextureLoader().load( 'roughness_map.jpg');
  material4 = new THREE.MeshBasicMaterial( { map : texture1} );
  mesh4 = new THREE.Mesh( geometry4, material4 );
  mesh4.position.z = -1000;
  mesh4.position.y = -10;
  mesh4.position.x = 100;

  scene.add( mesh4 );

  geometry3 = new THREE.IcosahedronBufferGeometry( 200,0 );
  material3 = new THREE.MeshBasicMaterial( {wireframe : true,color: "#EEE9E9"});
  mesh3 = new THREE.Mesh( geometry3,material3 );
  border3 = new THREE.EdgesHelper( mesh3,0xffff00);
  mesh3.position.z = -1000;
  mesh3.position.y = -10
  mesh3.position.x = 120

  scene.add( mesh3 );
  scene.add( border3 );

  geometry5 = new THREE.RingBufferGeometry(100, 200,32 );
  var texture2 = new THREE.TextureLoader().load( 'transition4.png');
  var material5 = new THREE.MeshBasicMaterial({map: texture2});
  mesh5 = new THREE.Mesh( geometry5,material5 );
  mesh5.position.z = -1000;
  mesh5.position.y = -10
  mesh5.position.x = -500

  scene.add( mesh5 );

  geometry6 = new THREE.OctahedronBufferGeometry( 100, 0 );
  var texture3 = new THREE.TextureLoader().load( 'transition1.png');
  material6 = new THREE.MeshBasicMaterial( { map: texture3 } )
  mesh6 = new THREE.Mesh( geometry6, material6 );
  mesh6.position.z = -1000;
  mesh6.position.y = -10
  mesh6.position.x = -500

  scene.add( mesh6 );
}
```
Add the function to control the rotation of each geometry and render the scene.
```javascript
var render = function () {
  requestAnimationFrame( render );

  mesh1.rotation.x += 0.01;
  mesh1.rotation.y += 0.01;

  mesh2.rotation.x += 0.005;
  mesh2.rotation.y += 0.005;

  mesh3.rotation.x += 0.01;
  mesh3.rotation.z += 0.01;

  mesh4.rotation.x += 0.05;
  mesh4.rotation.y += 0.05;

  mesh5.rotation.x += 0.05;
  mesh5.rotation.y += 0.05;

  mesh6.rotation.x += 0.05;
  mesh6.rotation.y += 0.05;
  renderer.setClearColor("#DBDBDB");
  // Render the scene
  renderer.render(scene, camera);
};

init();
geometry();
render();
```
![image](https://github.com/SevennnnJ/DAT505-GitHub/blob/master/Pictures/earth_specular_2048.jpg)
![image](https://github.com/SevennnnJ/DAT505-GitHub/blob/master/Pictures/roughness_map.jpg)
![image](https://github.com/SevennnnJ/DAT505-GitHub/blob/master/Pictures/transition1.png)
![image](https://github.com/SevennnnJ/DAT505-GitHub/blob/master/Pictures/transition4.png)
#### S2-02-GeometriesAndMaterialsExercise ####
The aim of the S2-02 is to array 12 cubes and add special texture.
#### Description ####
In the S2-02,I added one specific texture to twelve cubes and controled its rotation speed.

### Usage ###
```html
<script src="build/three.min.js"></script>
<script src="js/index.js"></script>
```
### Code ###
Creat a new scene and add camera,light to the scene.
```javascript
var scene = new THREE.Scene();

camera = new THREE.PerspectiveCamera(35, window.innerWidth / window.innerHeight, 300, 10000 );

var renderer = new THREE.WebGLRenderer({antialias:true});

renderer.setClearColor("#5A8296");
// Configure renderer size
renderer.setSize( window.innerWidth, window.innerHeight );
// Append Renderer to DOM
document.body.appendChild( renderer.domElement );

var light1 = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(light1);

var light2 = new THREE.PointLight(0xffffff, 0.5);
scene.add(light2);
```
Here is main content and create cube mesh with different materials and change the value of different materials.
```javascript
var geometry = new THREE.BoxGeometry(100, 100, 100);

var texture = new THREE.TextureLoader().load( 'texture.gif');
// MATERIAL 1:
var material6 = new THREE.MeshBasicMaterial( { map: texture } );

var material2 = new THREE.MeshPhongMaterial({shininess: 1});

var material1 = new THREE.MeshNormalMaterial();

var material = new THREE.MeshLambertMaterial({
  color: '#DB7093',
  lightMap: null,
  lightMapIntensity: 1,
  emissive: 0x000000,
  emissiveMap: null,
  emissiveIntensity: 1,
  specularMap: null
});

var material3 = new THREE.MeshPhongMaterial({
  color: 0xF3FFE2,
  specular: 0xffffff,
  shininess: 1000,
  lightMap: null,
  lightMapIntensity: 1,
  bumpMap: null,
  bumpScale: 1,
  normalMap: null,
  normalScale: 1,
  displacementMap: null,
  displacementScale: 1,
  displacementBias: 0,
  specularMap: null
});

var material5 = new THREE.MeshStandardMaterial({
  color: 	0xB03060,
  roughness: 0.5,
  metalness: 0.5
});

var material4 = new THREE.MeshPhysicalMaterial({
  color: 0xF3FFE2,
  roughness: 0,
  metalness: 0.5,
  reflectivity: 0.5,
  clearCoat: 0,
  claerCoatRoughness: 0
});
```
Change the position of each mesh and add meshes to scene.
```javascript
var mesh1 = new THREE.Mesh( geometry, material3 );
mesh1.position.z = -1000;
mesh1.position.y = 100;

var mesh2 = new THREE.Mesh( geometry, material2 );
mesh2.position.z = -1000;
mesh2.position.x = -100;
mesh2.position.y = 200;

var mesh3 = new THREE.Mesh( geometry, material3 );
mesh3.position.z = -1000;
mesh3.position.x = -200;
mesh3.position.y = 100;

var mesh4 = new THREE.Mesh( geometry, material2 );
mesh4.position.z = -1000;
mesh4.position.x = 100;
mesh4.position.y = 200;

var mesh5 = new THREE.Mesh( geometry, material4 );
mesh5.position.z = -1000;
mesh5.position.x = 200;
mesh5.position.y = 100;

var mesh6 = new THREE.Mesh( geometry, material6 );
mesh6.position.z = -1000;
mesh6.position.x = 0;
mesh6.position.y = -100;

var mesh7 = new THREE.Mesh( geometry, material4 );
mesh7.position.z = -1000;
mesh7.position.x = -100;
mesh7.position.y = 0;

var mesh8 = new THREE.Mesh( geometry, material3 );
mesh8.position.z = -1000;
mesh8.position.x = -200;
mesh8.position.y = -100;

var mesh9 = new THREE.Mesh( geometry, material6 );
mesh9.position.z = -1000;
mesh9.position.x = 100;
mesh9.position.y = 0;

var mesh10 = new THREE.Mesh( geometry, material1 );
mesh10.position.z = -1000;
mesh10.position.x = 200;
mesh10.position.y = -100;

var mesh11 = new THREE.Mesh( geometry, material );
mesh11.position.z = -1000;
mesh11.position.x = -100;
mesh11.position.y = -200;
var material11 = new THREE.MeshNormalMaterial();

var mesh12 = new THREE.Mesh( geometry, material );
mesh12.position.z = -1000;
mesh12.position.x = 100;
mesh12.position.y = -200;

scene.add( mesh1 );
scene.add( mesh2 );
scene.add( mesh3 );
scene.add( mesh4 );
scene.add( mesh5 );
scene.add( mesh6 );
scene.add( mesh7 );
scene.add( mesh8 );
scene.add( mesh9 );
scene.add( mesh10 );
scene.add( mesh11 );
scene.add( mesh12 );
```
Firstly render Loop.I value different mesh different rot.Secondly  rotate the mesh continuously. In the end I render the scene and run the function render.
```javascript
var rot = 0;
var render = function () {
  requestAnimationFrame( render );
  rot += 0.01;
  mesh1.rotation.x = rot+1;
  mesh1.rotation.y = rot+1;

  mesh2.rotation.x = rot;
  mesh2.rotation.y = rot;

  mesh3.rotation.x = rot+2;
  mesh3.rotation.y = rot+2;

  mesh4.rotation.x = rot;
  mesh4.rotation.y = rot;

  mesh5.rotation.x = rot+2;
  mesh5.rotation.y = rot+2;

  mesh6.rotation.x = rot+1;
  mesh6.rotation.y = rot+1;

  mesh7.rotation.x = rot;
  mesh7.rotation.y = rot;

  mesh8.rotation.x = rot+2;
  mesh8.rotation.y = rot+2;

  mesh9.rotation.x = rot;
  mesh9.rotation.y = rot;

  mesh10.rotation.x = rot+2;
  mesh10.rotation.y = rot+2;

  mesh11.rotation.x = rot;
  mesh11.rotation.y = rot;

  mesh12.rotation.x = rot;
  mesh12.rotation.y = rot;

  renderer.render(scene, camera);
};

render();
```
![image](https://github.com/SevennnnJ/DAT505-GitHub/blob/master/Pictures/texture.gif)
#### S2-03-S2-03-Material Exercise ####
The aim of the S2-03 is to array 12 cubes and add different materials.

#### Description ####
In the S2-03),I arrayed twelve cubes and used different materials and textures.

### Usage ###
```html
<script src="build/three.min.js"></script>
<!--  Our code  -->
<script src="js/index.js"></script>
```

### Code ###
Creat a new scene and add camera,light to the scene.
```javascript
var scene = new THREE.Scene();

camera = new THREE.PerspectiveCamera(35, window.innerWidth / window.innerHeight, 300, 10000 );

var renderer = new THREE.WebGLRenderer({antialias:true});

renderer.setClearColor("#5A8296");
// Configure renderer size
renderer.setSize( window.innerWidth, window.innerHeight );
// Append Renderer to DOM
document.body.appendChild( renderer.domElement );

var light1 = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(light1);

var light2 = new THREE.PointLight(0xffffff, 0.5);
scene.add(light2);
```
Change the position and material of each mesh and add meshes to scene.
```javascript
// Main Content
var geometry = new THREE.BoxGeometry(100, 100, 100);

var material3 = new THREE.MeshNormalMaterial();

var material2 = new THREE.MeshPhongMaterial({shininess: 1});

var material1 = new THREE.MeshNormalMaterial();

var material = new THREE.MeshLambertMaterial({
  color: '#DB7093',
  lightMap: null,
  lightMapIntensity: 1,
  emissive: 0x000000,
  emissiveMap: null,
  emissiveIntensity: 1,
  specularMap: null
});

var material5 = new THREE.MeshStandardMaterial({
  color: 	0xB03060,
  roughness: 0.5,
  metalness: 0.5
});

var material4 = new THREE.MeshPhysicalMaterial({
  color: 0xF3FFE2,
  roughness: 0,
  metalness: 0.5,
  reflectivity: 0.5,
  clearCoat: 0,
  claerCoatRoughness: 0
});

var mesh1 = new THREE.Mesh( geometry, material3 );
mesh1.position.z = -1000;
mesh1.position.y = 100;

var mesh2 = new THREE.Mesh( geometry, material2 );
mesh2.position.z = -1000;
mesh2.position.x = -100;
mesh2.position.y = 200;

var mesh3 = new THREE.Mesh( geometry, material3 );
mesh3.position.z = -1000;
mesh3.position.x = -200;
mesh3.position.y = 100;

var mesh4 = new THREE.Mesh( geometry, material2 );
mesh4.position.z = -1000;
mesh4.position.x = 100;
mesh4.position.y = 200;

var mesh5 = new THREE.Mesh( geometry, material1 );
mesh5.position.z = -1000;
mesh5.position.x = 200;
mesh5.position.y = 100;

var mesh6 = new THREE.Mesh( geometry, material5 );
mesh6.position.z = -1000;
mesh6.position.x = 0;
mesh6.position.y = -100;

var mesh7 = new THREE.Mesh( geometry, material4 );
mesh7.position.z = -1000;
mesh7.position.x = -100;
mesh7.position.y = 0;

var mesh8 = new THREE.Mesh( geometry, material3 );
mesh8.position.z = -1000;
mesh8.position.x = -200;
mesh8.position.y = -100;

var mesh9 = new THREE.Mesh( geometry, material4 );
mesh9.position.z = -1000;
mesh9.position.x = 100;
mesh9.position.y = 0;

var mesh10 = new THREE.Mesh( geometry, material1 );
mesh10.position.z = -1000;
mesh10.position.x = 200;
mesh10.position.y = -100;

var mesh11 = new THREE.Mesh( geometry, material );
mesh11.position.z = -1000;
mesh11.position.x = -100;
mesh11.position.y = -200;
var material11 = new THREE.MeshNormalMaterial();

var mesh12 = new THREE.Mesh( geometry, material );
mesh12.position.z = -1000;
mesh12.position.x = 100;
mesh12.position.y = -200;

scene.add( mesh1 );
scene.add( mesh2 );
scene.add( mesh3 );
scene.add( mesh4 );
scene.add( mesh5 );
scene.add( mesh6 );
scene.add( mesh7 );
scene.add( mesh8 );
scene.add( mesh9 );
scene.add( mesh10 );
scene.add( mesh11 );
scene.add( mesh12 );
```
Firstly render Loop.Secondly  rotate the mesh continuously. In the end I render the scene and run the function render.
```javascript
var rot = 0;
// Render Loop
var render = function () {
  requestAnimationFrame( render );
  rot += 0.01;
  mesh1.rotation.x = rot+1;
  mesh1.rotation.y = rot+1;

  mesh2.rotation.x = rot; //Continuously rotate the mesh
  mesh2.rotation.y = rot;

  mesh3.rotation.x = rot+2;
  mesh3.rotation.y = rot+2;

  mesh4.rotation.x = rot;
  mesh4.rotation.y = rot;

  mesh5.rotation.x = rot+2;
  mesh5.rotation.y = rot+2;

  mesh6.rotation.x = rot+1;
  mesh6.rotation.y = rot+1;

  mesh7.rotation.x = rot;
  mesh7.rotation.y = rot;

  mesh8.rotation.x = rot+2;
  mesh8.rotation.y = rot+2;

  mesh9.rotation.x = rot;
  mesh9.rotation.y = rot;

  mesh10.rotation.x = rot+2;
  mesh10.rotation.y = rot+2;

  mesh11.rotation.x = rot;
  mesh11.rotation.y = rot;

  mesh12.rotation.x = rot;
  mesh12.rotation.y = rot;
  renderer.render(scene, camera);
};
render();
```
