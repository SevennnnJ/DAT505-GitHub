var renderer, scene, camera;
var controls;
var cube = [];//cube可改名
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
//内循环forloop
   for (var x = -30; x <= 30; x += 5) {
   for (var z = -30; z <= 30; z += 5) {
   for (var y = -30; y <= 30; y += 5) {
    // Start from -45 and sequentially add one every 5 pixels
    //管理器页面x,y，z坐标检测
    //console.log("x:" +x,"y:" +y,"z:" +z);

    var boxGeometry1 = new THREE.BoxGeometry(3, 3, 3);
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


  function drawFrame(){
  requestAnimationFrame(drawFrame);
 //物体旋转
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
