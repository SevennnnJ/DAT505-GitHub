Session6
========
#### S6-01-CityScape ####
The aim of the S6-01 is to use geometries to simulate city.

#### Description ####
In the Session6(S6-01),I changed the model that teacher shared with us in the class.I added the texture on cubes and changed the scale,position of the cubes randomly and all cubes float and rotate automatically.But I also use the OrbitControls to make the cubes ratate with the mouse.

### Usage ###
```html
<script src="build/three.min.js"></script>
<script src="js/FirstPersonControls.js"></script>
<script src="js/index.js"></script>
<script src="js/OrbitControls.js"></script>
```

### Code ###
This code define a scene, a camera, cubes and add a floor.
```javascript
var camera, scene, renderer, controls, clock;
var INV_MAX_FPS = 1 / 100, frameDelta = 0;
var floor;

function setup() {
  document.body.style.backgroundColor = '#d7f0f7';
  setupThreeJS();
  setupWorld();

  requestAnimationFrame(function animate() {
    draw();

    frameDelta += clock.getDelta();
    while (frameDelta >= INV_MAX_FPS) {
      update(INV_MAX_FPS);
      frameDelta -= INV_MAX_FPS;
    }

    requestAnimationFrame( animate );
  });
}
```
```javascript
function setupThreeJS() {
  scene = new THREE.Scene();
  scene.fog = new THREE.FogExp2(0x9db3b5, 0.002);

  camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 1, 10000 );
  camera.position.y = 400;
  camera.position.z = 100;
  camera.rotation.x = 45 * Math.PI / 180;

  renderer = new THREE.WebGLRenderer({antialias: true});
  renderer.setSize( window.innerWidth, window.innerHeight );
  renderer.shadowMapEnabled = true;
  renderer.setClearColor(0x17293a, 1);

  document.body.appendChild( renderer.domElement );

  clock = new THREE.Clock();
  controls = new THREE.FirstPersonControls(camera);
  controls.movementSpeed = 10;
  controls.lookSpeed = 0.1;
}
```
Create the geometry for the floor
Geometry to store all buildings of the city.Settings for models and material.Randomize position and scale of the buildings
```javascript
function setupWorld() {
  var geo = new THREE.PlaneGeometry(2000, 2000, 40, 40);
  var mat = new THREE.MeshPhongMaterial({color: 0x9db3b5, overdraw: true});
  floor = new THREE.Mesh(geo, mat);
  floor.rotation.x = -0.5 * Math.PI;
  floor.receiveShadow = true;
  //scene.add(floor);
  //scene.add( border );
  var geometry = new THREE.CubeGeometry( 1, 1, 1 );
  var material = new THREE.MeshPhongMaterial({overdraw: true, color: 0xffffff, wireframe: true});
  var texture = new THREE.TextureLoader().load( 'wood.jpg');
  material = new THREE.MeshBasicMaterial( { map: texture } )

  var cityGeometry = new THREE.Geometry();
  for (var i = 0; i < 300; i++) {
    //Create geometry as a clone
    var building = new THREE.Mesh(geometry.clone());
    //Randomize position and scale of the buildings
    building.position.x = Math.floor( Math.random() * 200 - 100 ) * 2;
    building.position.y = Math.floor( Math.random() * 200 - 100 ) * 2;
    building.position.z = Math.floor( Math.random() * 300 - 100 ) * 4;
    building.scale.x  = Math.pow(Math.random(), 2) * 30 + 10;
    building.scale.y  = Math.pow(Math.random(), 3) * building.scale.x * 8 + 8;
    building.scale.z  = building.scale.x;

    THREE.GeometryUtils.merge(cityGeometry, building);
  }
  //Merge all buildings to one model - cityGeometry
  var city = new THREE.Mesh(cityGeometry, material);
  scene.add(city);
  //Create the lighting system and add to the scene
//add light in the scene
  var light = new THREE.DirectionalLight(0xf9f1c2, 1);
  light.position.set(500, 1500, 1000);
  light.castShadow = true;

  var spotLight = new THREE.SpotLight(0xFFFFFF);
  spotLight.position.set(500, 1000, 1000);
  scene.add(spotLight);

  var d = 1000;
  scene.add(light);
}
```
Add function in the end.
```javascript
function draw() {
  renderer.render( scene, camera );
}

function update(delta) {
  controls.update(delta);
  if(controls.object.position.y < floor.position.y + 10){//change the number of geometries
//controls.object.position.y = 10;
  }
}
setup();
```
![image](https://github.com/SevennnnJ/DAT505-GitHub/blob/master/Pictures/wood.jpg)
