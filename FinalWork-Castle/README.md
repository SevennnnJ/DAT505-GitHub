# Final Work -《The carnival》
# Name: XU JIE
# Student number:B161006097
# 《The carnival》
This is final homework that code project for DAT505 module.

### GitHub link ###
https://github.com/SevennnnJ/DAT505-GitHub/tree/master/FinalWork-Castle

#### Idea's description ####
My creative idea comes from the Disneyland light phantom show , the castle under the fireworks at night. Every girl has a princess dream in her heart, and she lives in a castle on the sea. There is a music fountain in front of the door. At night, under the starry sky, she listens to beautiful songs and enjoys beautiful fireworks.

#### Description ####
On the basis of my idea, I built a model of a castle and a fountain with 3dmax, and pasted the map on it and successfully imported it into the scene of three.js. Later, in the official website of three.js, I learned about flowing water and luminous spheres, and built luminous stars and flowing sea in the scene. Then we added music on the fountain model and keep clicking on the fountain with the mouse to play music. Finally, keep adjusting the position of each object to show the best scene.

#### Assignment show ####
![Assignment show](/FinalWork-Castle/Final/1.png)

![Assignment show](/FinalWork-Castle/Final/2.png)
### A castle model built with 3dmax ###
![Assignment show](/FinalWork-Castle/Final/3.png)
### A fountain model ###
![Assignment show](/FinalWork-Castle/Final/4.png)

### Catalogue ###
FinalWork-Castle

    build
      jquery.fireworks.js
      MTLLoader.js
      OBJLoader.js
      three.js
      WebGL.js
    Final
      1.png
      2.png
      3.png
      4.png
    js
      libs
        dat.gui.min.js
      objects
        Reflector.js
        Refractor.js
        Water2.js
      index.js
      jquery-3.3.1.min.js
      OrbitControls.js
    models
      Fireworks
      Castle.mtl
      Castle.mobj
      fountain.mtl
      fountain.obj
    music
      Let It Go.mp3
    textures
       water
        Water_1_M_Flow.jpg
        Water_1_M_Normal.jpg
        Water_2_M_Normal.jpg
      marble.jpg
      penquan.jpg

### Usage ###
```html
<script src="js/jquery-3.3.1.min.js"></script>
<script src="build/three.js"></script>
<script src="build/MTLLoader.js"></script>
<script src="build/OBJLoader.js"></script>
<script src="build/jquery.fireworks.js"></script>
<script src="build/WebGL.js"></script>
<script src="js/OrbitControls.js"></script>
<script src="js/objects/Reflector.js"></script>
<script src="js/objects/Refractor.js"></script>
<script src="js/objects/Water2.js"></script>
<script src="js/libs/dat.gui.min.js"></script>
<script src="js/index.js"></script>
```

### Code ###
This code defines the values I need, the lighting, the camera that I need for the basic scene. The model and the music I want to import. I also learned from the three.js website how to add materials to the light ball.

```javascript
//Definie all values that use in the scene
var camera, scene, renderer, dirLight, dirLightHeper, hemiLight, hemiLightHelper;//add light definition
var controls;
var Fountain, castle;
var water;
var GROUP = new THREE.Group();
var LuminousGroup = new THREE.Group();

var vertexShader = ['varying vec3 vNormal;', 'void main() {', 'vNormal = normalize( normalMatrix * normal );', 'gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );', '}'].join('\n');
var fragmentShader = ['uniform float c;', 'uniform float p;', 'varying vec3 vNormal;', 'void main() {', 'float intensity = pow( c - dot( vNormal, vec3( 0.0, 0.0, 1.0 ) ), p );', 'gl_FragColor = vec4( 0.2, 0.58, 0.9, 0.3 ) * intensity;', '}'].join('\n');

var sphere = new THREE.SphereGeometry(200, 40, 40)
var materialLuminous = new THREE.ShaderMaterial({
    uniforms: {
        'c': { type: 'f', value: 0.34 },
        'p': { type: 'f', value: 9.17 }
    },
    vertexShader,
    fragmentShader
});

// Add music
var worldMusic = document.querySelector('.music');
var btnMusic = document.querySelector('.btn-music');

var raycaster = new THREE.Raycaster();
var mouseVector = new THREE.Vector3();
var selectedObject = null;
var playMusic = false;

```
I set up the position of the camera in the scene.

```javascript
init();
animate();

function init() {

    var container = document.getElementById('container');
    camera = new THREE.PerspectiveCamera(90, window.innerWidth / window.innerHeight, 1, 500000000);
    camera.position.set(0, -700, 1400);
    // camera.lookAt(0,0,0);
    scene = new THREE.Scene();

```

In this section, I want to add a water surface under the model of the castle to create the feeling of a floating castle. At the same time, this code shows a flowing water surface.

```javascript
    //Add water floor
    var groundGeometry = new THREE.PlaneBufferGeometry( 8000, 10000, 1000, 1000 );//Set up the scale of the ground
    var groundMaterial = new THREE.MeshBasicMaterial( { color: 0xE3E3E3 } );
    var ground = new THREE.Mesh( groundGeometry, groundMaterial );
    ground.rotation.x = Math.PI * - 0.5;
    scene.add( ground );
    ground.position.set(-390,-1020,101);//put the ground under the water

//add texture to the ground
   var textureLoader = new THREE.TextureLoader();
    /*textureLoader.load( 'textures/shuimian.jpg', function ( map ) {//add the ground texture
      map.wrapS = THREE.RepeatWrapping;
      map.wrapT = THREE.RepeatWrapping;
      map.anisotropy = 16;
      map.repeat.set( 4, 4 );
      groundMaterial.map = map;
      groundMaterial.needsUpdate = true;
    } );*/

    // add water
    var waterGeometry = new THREE.PlaneBufferGeometry( 8000, 10000 );//set up the scale of the water
    var flowMap = textureLoader.load( 'textures/water/Water_2_M_Normal.jpg' );//add water texture
    water = new THREE.Water( waterGeometry, {
//change the float
      scale: 16,
      textureWidth: 1224,
      textureHeight: 1224,
      flowMap: flowMap
    } );
    water.position.set(-390,-1020,101);//set up water position under the castle
    water.rotation.x = Math.PI * - 0.5;
    scene.add( water );

    // flow map helper
    var helperGeometry = new THREE.PlaneBufferGeometry( 4000, 4000 );
    var helperMaterial = new THREE.MeshBasicMaterial( { map: flowMap } );
    var helper = new THREE.Mesh( helperGeometry, helperMaterial );
    helper.position.set(-390,-1020,101);
    helper.rotation.x = Math.PI * - 0.5;
    helper.visible = false;
    scene.add( helper );

    //render
    renderer = new THREE.WebGLRenderer( { antialias: true } );
    renderer.setSize( window.innerWidth, window.innerHeight );
    renderer.setPixelRatio( window.devicePixelRatio );
    document.body.appendChild( renderer.domElement );

```

Two lights were added to this segment, one normal light and two directional lights, to adjust the intensity of the directional light.

```javascript
//Normal light
hemiLight = new THREE.HemisphereLight(0xffffff, 0xffffff, 0.6);
hemiLight.color.setHSL(0.6, 1, 0.6);
hemiLight.groundColor.setHSL(0.095, 1, 0.75);
hemiLight.position.set(0, 0, 0);
scene.add(hemiLight);

//Two directional lights
dirLight = new THREE.DirectionalLight(0xffffff, 1);
dirLight.color.setHSL(0.1, 1, 0.95);
dirLight.position.set(- 1, 1.75, 1);
dirLight.position.multiplyScalar(30);
dirLight.castShadow = true;
dirLight.shadow.mapSize.width = 2048;
dirLight.shadow.mapSize.height = 2048;
var d = 1000;
dirLight.shadow.camera.left = - d;
dirLight.shadow.camera.right = d;
dirLight.shadow.camera.top = d;
dirLight.shadow.camera.bottom = - d;
dirLight.shadow.camera.far = 3500;
dirLight.shadow.bias = - 0.0001;
scene.add(dirLight);

```
This section imported the obj model of the castle and fountain, added the MTL texture and added the material to the fountain.

```javascript
//Add the texture to the Fountain
        var textureLoader = new THREE.TextureLoader();
        var texture = textureLoader.load('textures/marble.jpg');
        // Model and material loading
        var objLoader = new THREE.OBJLoader().setPath('models/')
            objLoader.load('fountain.obj', function (object) {
                Fountain = object;
                // Scale and position of the Fountain
                Fountain.scale.set(0.05, 0.05, 0.05);
                Fountain.position.set(-58,-1010,38);
//Import the model and material
                Fountain.traverse(function (node) {
                    if (node.isMesh) node.material.map = texture;
                });
                scene.add(Fountain);
            }, onProgress, onError
          );

//Add model decals to the castle
        var mtlLoader = new THREE.MTLLoader();
        mtlLoader.load('models/Castle.mtl',function (materials) {
        materials.preload();
//Import Castle model
          var objLoader = new THREE.OBJLoader().setMaterials(materials).setPath('models/')
              objLoader.load('Castle.obj', function (object) {
                   castle = object;
                    // scale and position of the castle
                    castle.scale.set(0.025, 0.025, 0.025);
                    castle.position.set(-684,-1050,101);
                    // toWer.position.set(-300, 0, -300);
                    scene.add(castle);
                    // GROUP.add(object);
                }, onProgress, onError
              );
        });

```

This cycle creates a sense of the night sky with 1,000 glowing spheres.

```javascript
for (var i = 0; i < 1000; i++) { //Put 1000 LuminousSpheres in the scene
    draw();
}
```
This scene rendered the fireworks effect, set the size of window, and added OrbitControl to control the mouse. Added the effect of mouse movement and click, to achieve interactive effect.

```javascript
// Render fireworks particles
renderer = new THREE.WebGLRenderer({
    antialias: true, //Open anti-aliasing
    alpha: true //Open background transparency
});
//Render and resize the window
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
container.appendChild(renderer.domElement);
renderer.gammaInput = true;
renderer.gammaOutput = true;
renderer.shadowMap.enabled = true;

//OrbitControls controller
controls = new THREE.OrbitControls(camera, renderer.domElement);

console.log(scene, GROUP);

//Control the mouse move and click
window.addEventListener('resize', onWindowResize, false);
document.addEventListener("mousedown", onDocumentMouseDown, false);
document.addEventListener("mouseup", onDocumentmouseUp, false);
}

```
This section creates the glowing sphere, making the sphere in the scene 0.5 times the size of the basic sphere and setting the random position.

```javascript
function draw() {
    var LuminousSphere = new THREE.Mesh(sphere, materialLuminous);//Creat a LuminousSphere
    LuminousSphere.material.side = THREE.BackSide;//Add the texture on them
    LuminousSphere.material.transparent = true;
    //0.5 times the size of the original sphere
    LuminousSphere.scale.x = LuminousSphere.scale.y = LuminousSphere.scale.z = 0.05;
    //Change the position randomly
    LuminousSphere.position.x = Math.round(Math.random()*(3000-(-6000)+1)+(-6000));
    LuminousSphere.position.y = Math.round(Math.random()*(3000-(-6000)+1)+(-6000));
    LuminousSphere.position.z = Math.round(Math.random()*(3000-(-6000)+1)+(-6000));
    LuminousGroup.add(LuminousSphere);
    scene.add(LuminousGroup);

}

```
This scene is set to play music by clicking on the fountain all the time in the scene, as well as 3d coordinates and rays in Windows.

```javascript
function onDocumentMouseDown(event) {
    event.preventDefault();
    if (selectedObject) {
        selectedObject = null;
    }

//Radiographic testing
    var intersects = getIntersects(event.layerX, event.layerY);//construct Three-dimensional coordinate system
    if (intersects.length > 0) {
        var res = intersects.filter(function (res) {
            return res && res.object;
        })[0];
        if (res && res.object) {
            selectedObject = res.object;
            console.log(selectedObject);

            playMusic = false;
            btnMusic.classList.toggle('music-off');
            worldMusic.play();
        }
    }
}
//Control the mouse move
function onDocumentmouseUp(event) {
    event.preventDefault();
    playMusic = true;
    btnMusic.classList.toggle('music-off');
    worldMusic.pause();
}

```
The last section sets some music changeable quantity, as well as the intersection of mouse movable coordinate system and scene coordinate system. Finally renders the animation and scene.

```javascript
//Coordinate axis of mouse movement
function getIntersects(x, y) {
    x = (x / window.innerWidth) * 2 - 1;
    y = - (y / window.innerHeight) * 2 + 1;
    mouseVector.set(x, y, 0.5);
    raycaster.setFromCamera(mouseVector, camera);
    return raycaster.intersectObject(GROUP, true);
}

//The mouse always click the fountain can play the music
btnMusic.addEventListener('click', () => {//Control mouse click
    playMusic = !playMusic;
    btnMusic.classList.toggle('music-off');
    playMusic ? worldMusic.play() : worldMusic.pause();//Play and stop the music
});

worldMusic.volume = 0.3;//change the muisc volum
worldMusic.loop = true;//loop the music

function animate() {
    requestAnimationFrame(animate);//Render the animation
    render();
}

function render() {
    renderer.render(scene, camera);//Render all objects in the scene
}

```
