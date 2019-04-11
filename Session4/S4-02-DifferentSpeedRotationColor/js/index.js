var renderer, scene, camera;
var cubes = [];
var rot = 0;
var randomValueX;
var randomSpeedX = [];

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

  //Create a two dimensional grid of objects, and position them accordingly
  for (var x = -10; x <= 10; x += 5) { // Start from -35 and sequentially add one every 5 pixels
    for (var y = -10; y <= 10; y += 5) {
      var boxGeometry = new THREE.BoxGeometry(3, 3, 3);
      //The color of the material is assigned a random color
      var boxMaterial = new THREE.MeshLambertMaterial({color: Math.random() * 0xFFFFFF});
      var mesh = new THREE.Mesh(boxGeometry, boxMaterial);
      //mesh.castShadow = true;

      mesh.position.x = x;
      mesh.position.y = y;
      mesh.rotation.x = 90*Math.random();
      scene.add(mesh);
      cubes.push(mesh);

      //随机速度值-0.05到0.05randomspeed from -0.1 to 0.05
      var randomValueX = (Math.random() * 0.1) - 0.05;
      //将值给随机速度push the value on the randomspeed
      randomSpeedX.push(randomValueX);
    }
  }

  document.body.appendChild(renderer.domElement);
}


function drawFrame(){
  requestAnimationFrame(drawFrame);

  rot += 0.05 ;//Rotate randomly
  //forEach takes all the array entries and passes the c as the object, and i is keeping track of the index for each cube
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
