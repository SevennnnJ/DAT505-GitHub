Session1
========
#### S1-01-Geometry Homework ####
The aim of the S1-01 is to use geometries that in three.js library to form a specific geometry that teacher share with us in the class.

#### Description ####
Arrange the basic geometries to a regular and specific geometry.

### Usage ###
```html
<script src="build/three.js"></script>
<script src="js/index.js"></script>
```

### Code ###
This code define a scene, a camera, and geometry,material and mesh that add in the scene.
```javascript
var scene, camera, renderer;
var geometry1, material1, mesh1,border1;
var geometry2, material2, mesh2;
var geometry3, material3, mesh3,border3;
var geometry4, material4, mesh4,border4;
```
It then creates a `WebGL` renderer for the scene and camera, and it adds that viewport to the document.body element.Meanwhile I add the lights in the scene.
```javascript
function init(){
  // Create an empty scene
  scene = new THREE.Scene();
  // Create a basic perspective camera
  camera = new THREE.PerspectiveCamera(35, window.innerWidth/window.innerHeight, 300, 10000 );
  // Create a renderer with Antialiasing
  renderer = new THREE.WebGLRenderer({antialias:true});
  // Configure renderer clear color
  renderer.setClearColor("#EED2EE");
  // Configure renderer size
  renderer.setSize( window.innerWidth, window.innerHeight );
  // Append Renderer to DOM
  document.body.appendChild( renderer.domElement );
//light
  var light1 = new THREE.AmbientLight("#FAFAD2", 1);
  scene.add(light1);
  var light2 = new THREE.PointLight("#FAFAD2", 1);
  scene.add(light2);
  spotLight = new THREE.SpotLight({color:"#fffff0"});
 }
```
Add the geometries and change the materials in the scene.
```javascript
 function geometry(){
    // Create a Cube Mesh with basic material ---------
    geometry1 = new THREE.IcosahedronBufferGeometry( 200,0 );
    material1 = new THREE.MeshBasicMaterial( {wireframe : true,color: "#EEE9E9"});
    mesh1 = new THREE.Mesh( geometry1,material1 );
    border1 = new THREE.EdgesHelper( mesh1,0xffff00);
    mesh1.position.z = -1000;
    mesh1.position.y = -10;
    // Add mesh to scene
    scene.add( mesh1 );
    scene.add( border1 );

    geometry2 = new THREE.SphereBufferGeometry( 150, 10 );
    var materiaL2 = new THREE.MeshPhongMaterial({shininess: 6});
    mesh2 = new THREE.Mesh( geometry2, material2 );
    mesh2.position.z = -1000;
    mesh2.position.y = -10
    // Add mesh to scene
    scene.add( mesh2 );

    geometry4 = new THREE.SphereBufferGeometry( 150, 10 );
    material4 = new THREE.MeshBasicMaterial( { wireframe : true,color: "#0d0d0d" } );
    mesh4 = new THREE.Mesh( geometry4, material4 );
    border4 = new THREE.EdgesHelper( mesh4,0xffff00);
    mesh4.position.z = -1000;
    mesh4.position.y = -10;
    // Add mesh to scene
    scene.add( mesh4 );
    scene.add( border4 );

    geometry3 = new THREE.IcosahedronBufferGeometry( 200,0 );
    material3 = new THREE.MeshBasicMaterial( {wireframe : true,color: "#EEE9E9"});
    mesh3 = new THREE.Mesh( geometry3,material3 );
    border3 = new THREE.EdgesHelper( mesh3,0xffff00);
    mesh3.position.z = -1000;
    mesh3.position.y = -10;
    mesh3.position.x = 20;
    // Add mesh to scene
    scene.add( mesh3 );
    scene.add( border3 );
  }
  ```
  Add the function to control the rotation of the geometries independengtly.
```javascript
  var render = function () {
    requestAnimationFrame( render );

    mesh1.rotation.x += 0.01;
    mesh1.rotation.y += 0.01;

    mesh2.rotation.x += 0.005;
    mesh2.rotation.y += 0.005;

    mesh3.rotation.x += 0.01;
    mesh3.rotation.z += 0.01;

    mesh4.rotation.x += 0; //Continuously rotate the mesh
    mesh4.rotation.z += 0;

    renderer.setClearColor("#EED2EE");

    // Render the scene
    renderer.render(scene, camera);
  };

  init();
  geometry();
  render();
  ```
