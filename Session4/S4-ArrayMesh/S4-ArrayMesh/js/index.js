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
  //renderer.shadowMapEnabled = true;
  //Control mouse
  controls = new THREE.OrbitControls(camera,renderer.domElement);

  //Create a two dimensional grid of objects, and position them accordingly
  for (var x = -50; x < 50; x += 5){ // Start from -45 and sequentially add one every 5 pixels
  for (var y = -50; y < 50; y += 5){
  //for (var z = -50; z < 50; z += 5){

  //Concatenation of the x and y
  //console.log("X: " +x+ ",Y: " +y+ );
      var boxGeometry = new THREE.BoxGeometry(3, 6, 3);
      //The color of the material is assigned a random color


        var boxMaterial = new THREE.MeshLambertMaterial({color: 0xffff00});

      /*
      else if (x <= 0 &&  y >=0){
        var boxMaterial = new THREE.MeshLambertMaterial({color: 0xCD950C});//tuhuangse
      }
      else if (x >= 0 &&  y <=0){
        var boxMaterial = new THREE.MeshLambertMaterial({color: 0xEED5D2});//粉红色
      }
      else if (x <=0 &&  y <= 0){
        var boxMaterial = new THREE.MeshLambertMaterial({color: 0xff00FF});//zise
      }
      else if (x >=0 &&  y >= 0){
        var boxMaterial = new THREE.MeshLambertMaterial({color: 0xBA55D3});//liangzise
      }
      else if (x <=0 &&  y >= 0){
        var boxMaterial = new THREE.MeshLambertMaterial({color: 0xB0E0E6});
      }
      else if (x >=0 &&  y <= 0){
        var boxMaterial = new THREE.MeshLambertMaterial({color: 0xB3EE3A});
      }
      else {
        var boxMaterial = new THREE.MeshLambertMaterial({color: 0x8B0000});
      }*/
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
