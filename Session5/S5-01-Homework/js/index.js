var renderer, scene, camera;
var cubes = [];
var rot = 0;
var rotX = [];//随机速度
var rotY = [];//随机速度
var scaleX = [];
var scaleY = [];
var scaleZ = [];
var scaleCube = [];
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

  renderer = new THREE.WebGLRenderer({antialias:true});
  renderer.setClearColor(0x17293a);
  renderer.setSize(W, H);
  //renderer.shadowMapEnabled = true;

  controls = new THREE.OrbitControls(camera, renderer.domElement);

  //Create a two dimensional grid of objects, and position them accordingly
  for (var x = -10; x <= 10; x += 5) { // Start from -35 and sequentially add one every 5 pixels
    for (var y = -10; y <= 10; y += 5) {
      var boxGeometry = new THREE.RingBufferGeometry(10, 5, 32);
//The color of the material is assigned a random color
      var boxMaterial = new THREE.MeshNormalMaterial({color: 0xFFFFFF});
/*
      if (x==-5 && y==-5){
        boxMaterial = new THREE.MeshLambertMaterial({color: 0xFF00FF});
      }else if (x==5 && y==5){
        boxMaterial = new THREE.MeshLambertMaterial({color: 0xFFFF00});
      }else{
        boxMaterial = new THREE.MeshLambertMaterial({color: 0xFFFFFF});
      }*/
      var mesh = new THREE.Mesh(boxGeometry, boxMaterial);
      //mesh.castShadow = true;

      mesh.position.x = x;
      mesh.position.z = y;
      mesh.scale.y = 0.5;
      mesh.scale.x = 100;

      //rotValue = Math.random() * 2 * Math.PI;//随机旋转方向

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
//随机速度值-0.05到0.05randomspeed from -0.05 to 0.05
//var randomValueX = (Math.random() * 0.1) - 0.05;
//将值给随机速度push the value on the randomspeed
//randomSpeedX.push(randomValueX);

      scene.add(mesh);
      cubes.push(mesh);
    }
  }

  var boxGeometry1 = new THREE.BoxBufferGeometry(3, 3, 3);
  var boxMaterial1 = new THREE.MeshNormalMaterial({color: 0xFFFFFF});
  var mesh1 = new THREE.Mesh(boxGeometry1, boxMaterial1);

  mesh1.position.x = x;
  mesh1.position.z = y;
  mesh1.scale.y = 0.5;
  mesh1.scale.x = 100;

  //rotValue = Math.random() * 2 * Math.PI;//随机旋转方向rotate randomly

  mesh1.rotation.x = Math.random() * 2 * Math.PI;;
  mesh1.rotation.y = Math.random() * 2 * Math.PI;;
  mesh1.rotation.z = Math.random() * 2 * Math.PI;;

  var rotValX = (Math.random() * 0.05) - 0.025;
  var rotValY = (Math.random() * 0.05) - 0.025;
  var scValX = Math.random() * 20;
  var scValZ = Math.random();
  var scValY = Math.random();

  rotX.push(rotValX);
  rotY.push(rotValY);
  scaleX.push(scValX);
  scaleY.push(scValY);
  scaleZ.push(scValZ);

  scaleCube.push(-scValX);

  scene.add(mesh1);
  cubes.push(mesh1);

  console.log( cubes)

  document.body.appendChild(renderer.domElement);
}

//var scaleCube = -3;

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

//c.position.z = 1000;
/*cubes[6].rotation.x += randomSpeedX[6];
cubes[6].scale.x = scaleCube;
cubes[6].material = new THREE.MeshLambertMaterial( {color: 0xff00ff});*/
//cubes[18].rotation.x += randomSpeedX[18];


});

  renderer.render(scene, camera);
}

init();
drawFrame();
