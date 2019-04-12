Session7
========
#### S7-01-DropCubes ####
The aim of the S7-01 is to make geometries drop randomly.

#### Description ####
In the Session7(S7-01),the cubes droped from the top of screen.I generated a random nuamber from 0 to 9 (according to the image file) and loaded a texture,add texture file and edit number.

### Usage ###
```html
<script src="build/three.min.js"></script>
<!--  Our code  -->
<script src="js/index.js"></script>
```

### Code ###
Setup the global variables
```javascript
var camera, scene, renderer, geometry, material, mesh;
var texture;
var cubesNum = 10;
var cubes = [];
var speed = [];
```
Create geometry, scene and camera.Add the texture file in the scene the file include 9 pictures.
```javascript
function init() {
	// Create a scene
	scene = new THREE.Scene();
	// Create a geometry
	// 	Create a box (cube) of 10 width, length, and height
	geometry = new THREE.BoxGeometry( 10, 10, 10 );
  for (var i=0; i<cubesNum; i++){
	var randomValue = Math.random() * 0.5;
	speed.push(randomValue);
	//Generate a random nuamber from 0 to 9 (according to the image file)
	var randomSelection = Math.round(Math.random()*9);//define random texture
	// Load a texture,add texture file and edit number
	texture = new THREE.TextureLoader().load( "textures/texture" + randomSelection + ".jpg" );
	// Create a MeshBasicMaterial with a loaded texture
	material = new THREE.MeshBasicMaterial( { map: texture} );
	// Combine the geometry and material into a mesh
	mesh = new THREE.Mesh( geometry, material );

// Add the mesh to the scene
	scene.add( mesh );
  cubes.push(mesh);
}
	// Create a camera
	// 	Set a Field of View (FOV) of 75 degrees
	// 	Set an Apsect Ratio of the inner width divided by the inner height of the window
	//	Set the 'Near' distance at which the camera will start rendering scene objects to 2
	//	Set the 'Far' (draw distance) at which objects will not be rendered to 1000
	camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 2, 1000 );
	// Move the camera 'out' by 30
	camera.position.z = 30;
	// Create a WebGL Rendered
	renderer = new THREE.WebGLRenderer();
	// Set the size of the rendered to the inner width and inner height of the window
	renderer.setSize( window.innerWidth, window.innerHeight );
	// Add in the created DOM element to the body of the document
	document.body.appendChild( renderer.domElement );
}
```
Call the requestAnimationFrame function on the animate function
```javascript
function animate() {
	requestAnimationFrame( animate );
//thus creating an infinite loop
	for (var i=0; i<cubesNum; i++){
	// Rotate the x position of the mesh by 0.03
cubes[i].rotation.x += 0.02;
cubes[i].rotation.y += 0.02;
cubes[i].position.y -= speed[i];

	if (cubes[i].position.y <- 30){
		cubes[i].position.y = 35;
		cubes[i].position.x = (Math.random() * -40) +20;
		cubes[i].scale.y = (Math.random()* -2)+1;
		cubes[i].scale.x = (Math.random()* -2)+1;
		cubes[i].scale.z = (Math.random()* -2)+1;
	}
}
	// Render everything using the created renderer, scene, and camera
	renderer.render( scene, camera );
}

init();
animate();
```

#### S7-02-Texture-Eyes-Exercise1 ####
The aim of the S7-02 is to control the eyes follow the mouse.

#### Description ####
In the Session7(S7-02),just some of the eyes follow the mouse but some of the eye s cannot see the mouse and just see the direction of the mouse.


### Usage ###
```html
<script src="build/three.min.js"></script>
<script src="js/libs/stats.min.js"></script>
<!--  Our code  -->
<script src="js/index.js"></script>
```

### Code ###
MatCap-style image rendered on a sphere and modify sphere UVs instead of using a ShaderMaterial
```javascript
var camera, scene, renderer;
var image;
var mouseX = 0, mouseY = 0;
var container, stats;
var group = [];
var speed = [];
var cubesNum = 10;
var windowHalfX = window.innerWidth / 2;
var windowHalfY = window.innerHeight / 2;
var rotX = [];
var rotY = [];
```
Add and loop geometry.
```javascript
init();
animate();

function init() {
	container = document.createElement( 'div' );
	document.body.appendChild( container );

	scene = new THREE.Scene();

	camera = new THREE.PerspectiveCamera( 40, window.innerWidth / window.innerHeight, 1, 1000 );
	camera.position.set( 0, 0, 150 );
  scene.add( camera ); // since light is child of camera

	scene.add( new THREE.AmbientLight( 0xffffff, 0.2 ) );
	var light = new THREE.PointLight( 0xffffff, 1 );
	camera.add( light );

for(a=0;a<15;a++){//for loop
	var material = new THREE.MeshPhongMaterial( {
		color: 0xffffff,
		specular: 0x050505,
		shininess: 50,
		map: THREE.ImageUtils.loadTexture('images/eye.png'),
	});

	var geometry = new THREE.SphereGeometry( 30, 32, 16 );
```
Modify UVs to accommodate MatCap texture and position the eyes randomly.
```javascript
var faceVertexUvs = geometry.faceVertexUvs[ 0 ];
for ( i = 0; i < faceVertexUvs.length; i ++ ) {
  var uvs = faceVertexUvs[ i ];
  var face = geometry.faces[ i ];
  for ( var j = 0; j < 3; j ++ ) {
    uvs[ j ].x = face.vertexNormals[ j ].x * 0.5 + 0.5;
    uvs[ j ].y = face.vertexNormals[ j ].y * 0.5 + 0.5;
  }
}
var groupscale = (Math.random() * -2) +1;//define random scale
mesh = new THREE.Mesh( geometry, material );
  // for ( var i = 0; i < 1000; i ++ ) {
            var mesh = new THREE.Mesh( geometry, material );
            mesh.position.x = (Math.random() * -200)+30;
            mesh.position.y = (Math.random() * -50)+50;
            //mesh.position.z = (Math.random() * 100);
            mesh.scale.x = groupscale;//give the random scale to mesh
            mesh.scale.y = groupscale;
            mesh.scale.z = groupscale;
            //rotValue = Math.random() * 2 * Math.PI;
            var rotValX = (Math.random() * 0.1) - 0.25;
            var rotValY = (Math.random() * 0.1) - 0.25;
            //var rotValZ = (Math.random() * 0.1) - 0.25;
          rotX.push(rotValX);
          rotY.push(rotValY);
            //rotZ.push(rotValZ);
            scene.add( mesh );
            group.push( mesh );
          }
```
Add the function of the mouse.
```javascript
renderer = new THREE.WebGLRenderer();
renderer.setPixelRatio( window.devicePixelRatio );
renderer.setSize( window.innerWidth, window.innerHeight );
container.appendChild( renderer.domElement );

document.addEventListener( 'mousemove', onDocumentMouseMove, false );
window.addEventListener( 'resize', onWindowResize, false );
}

function animate() {
requestAnimationFrame( animate );

render();
}
```
Render each eye's rotation and control the mouse move.
```javascript
function render() {
	console.log(window.innerHeight)
	group.forEach(function(c, i) {//deifine the value to the each geometry
    group[i].rotation.x += rotX;
    group[i].rotation.y += rotY;
		//group[i].rotation.z += rotZ;
	group[i].rotation.x = mouseY/window.innerHeight*2;
	group[i].rotation.y = mouseX/window.innerWidth*2;});

	renderer.render( scene, camera );
}
```
