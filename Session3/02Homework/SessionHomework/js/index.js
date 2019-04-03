//Global variables
var scene, camera, renderer;
var geometry, material, mesh;
var geometry1, material1, mesh1;
var geometry2, material2, mesh2;
var geometry3, material3, mesh3;
var geometry4, material4, mesh4;
var geometry5, material5, mesh5;
var geometry6, material6, mesh6;
var geometry7, material7, mesh7;
var geometry8, material8, mesh8;
var geometry9, material9, mesh9;
var geometry10, material10, mesh10;
var geometry11, material11, mesh11;
var geometry12, material12, mesh12;
var geometry13, material13, mesh13;
var geometry14, material14, mesh14;

//var color;

//Rotation converter
var de2ra = function(degree) {
  return degree*(Math.PI/180);
};



function init(){
  // Create an empty scene --------------------------
  scene = new THREE.Scene();

  // Create a basic perspective camera --------------
  camera = new THREE.PerspectiveCamera(35, window.innerWidth/window.innerHeight, 300, 20000 );

  // Create a renderer with Antialiasing ------------
  renderer = new THREE.WebGLRenderer({antialias:true});

  // Configure renderer clear color
  renderer.setClearColor("#000000");

  // Configure renderer size
  renderer.setSize( window.innerWidth, window.innerHeight );

  // Append Renderer to DOM
  document.body.appendChild( renderer.domElement );

  var texture = new THREE.TextureLoader().load( 'transition1.png');
  material = new THREE.MeshBasicMaterial( { map: texture } )
  material1 = new THREE.MeshBasicMaterial( { map: texture } )
  material2 = new THREE.MeshBasicMaterial( { map: texture } )
  material3 = new THREE.MeshBasicMaterial( { map: texture } )
  material4 = new THREE.MeshBasicMaterial( { map: texture } )
  material5 = new THREE.MeshBasicMaterial( { map: texture } )
  material6 = new THREE.MeshBasicMaterial( { map: texture } )
  material7 = new THREE.MeshBasicMaterial( { map: texture } )
  material8 = new THREE.MeshBasicMaterial( { map: texture } )
  material9 = new THREE.MeshBasicMaterial( { map: texture } )
  material10 = new THREE.MeshBasicMaterial( { map: texture } )
  material11 = new THREE.MeshBasicMaterial( { map: texture } )
  material12 = new THREE.MeshBasicMaterial( { map: texture } )
  material13 = new THREE.MeshBasicMaterial( { map: texture } )
  material14 = new THREE.MeshBasicMaterial( { map: texture } )

  // Create a Cube Mesh with basic material ---------
  geometry = new THREE.BoxGeometry(100, 100, 100);
  material = new THREE.MeshBasicMaterial({ color:	"#FFDAB9" });
  mesh = new THREE.Mesh( geometry, material );
  mesh.position.z = -1000;
  mesh = new THREE.Mesh( geometry, material );
  mesh.position.z = -1000;
  mesh.position.x = -388;
  mesh.position.y = 170;
  mesh.scale.x = 3.5;
  mesh.scale.y = 0.5;
  mesh.scale.z = 0.3;
  mesh.rotation.x = -78;
  mesh.rotation.y = 500;
  mesh.rotation.x = 1000;
  // Add mesh to scene
  scene.add( mesh );

  geometry1 = new THREE.BoxGeometry(100, 100, 100);
  material1 = new THREE.MeshBasicMaterial({ color: "#FFDAB9" });
  mesh1 = new THREE.Mesh( geometry1, material1 );
  mesh1.position.z = -1000;
  mesh1.position.x = -388;
  mesh1.position.y = -180;
  mesh1.scale.x = 3.5;
  mesh1.scale.y = 0.5;
  mesh1.scale.z = 0.3;
  mesh1.rotation.x = -78;
  mesh1.rotation.y = 500;
  mesh1.rotation.x = -1000;
// Add mesh to scene
  scene.add( mesh1 );

  geometry2 = new THREE.BoxGeometry(100, 100, 100);
  material2 = new THREE.MeshBasicMaterial({ color: "#FFDAB9" });
  mesh2 = new THREE.Mesh( geometry2, material2 );
  mesh2.position.z = -1000;
  mesh2.position.x = 388;
  mesh2.position.y = 170;
  mesh2.scale.x = 3.5;
  mesh2.scale.y = 0.5;
  mesh2.scale.z = 0.3;
  mesh2.rotation.x = -88;
  mesh2.rotation.y = 500;
  mesh2.rotation.x = -1000;
// Add mesh to scene
  scene.add( mesh2 );

  geometry3 = new THREE.BoxGeometry(100, 100, 100);
  material3 = new THREE.MeshBasicMaterial({ color: "#FFDAB9" });
  mesh3 = new THREE.Mesh( geometry3, material3 );
  mesh3.position.z = -1000;
  mesh3.position.x = 388;
  mesh3.position.y = -180;
  mesh3.scale.x = 3.5;
  mesh3.scale.y = 0.5;
  mesh3.scale.z = 0.3;
  mesh3.rotation.x = -88;
  mesh3.rotation.y = 500;
  mesh3.rotation.x = 1000;
// Add mesh to scene
  scene.add( mesh3 );

  geometry4 = new THREE.TorusBufferGeometry(200, 20, 160, 1000);
  material4 = new THREE.MeshBasicMaterial({ color : "#FFDAB9" });
  mesh4 = new THREE.Mesh( geometry4, material4 );
  mesh4.position.z = -1000;
  mesh4.position.x = 0;
  mesh4.position.y = 0;

  scene.add( mesh4 );

  geometry5 = new THREE.CylinderBufferGeometry( 100, 50, 20,2 );
  material5 = new THREE.MeshBasicMaterial({ color : "#FFDAB9" });
  mesh5 = new THREE.Mesh( geometry5, material5 );
  mesh5.position.z = -400;
  mesh5.position.x = 100;
  mesh5.position.y = 66;
  mesh5.scale.x = 50;
  mesh5.scale.y = 2;
  mesh5.scale.z = 2;
  mesh5.rotationX = 50;
  mesh5.rotationY = 50;
  mesh5.rotationZ = 50;

  scene.add( mesh5 );

  geometry6 = new THREE.CylinderBufferGeometry( 100, 50, 20,2 );
  material6 = new THREE.MeshBasicMaterial({ color : "#FFDAB9" });
  mesh6 = new THREE.Mesh( geometry6, material6 );
  mesh6.position.z = -400;
  mesh6.position.x = -100;
  mesh6.position.y = 66;
  mesh6.scale.x = 50;
  mesh6.scale.y = 2;
  mesh6.scale.z = 2;
  mesh6.rotationX = -50;
  mesh6.rotationY = -50;
  mesh6.rotationZ = -50;

  scene.add( mesh6 );

  geometry7 = new THREE.CylinderBufferGeometry( 100, 50, 20,2 );
  material7 = new THREE.MeshBasicMaterial({ color : "#FFDAB9" });
  mesh7 = new THREE.Mesh( geometry7, material7 );
  mesh7.position.z = -400;
  mesh7.position.x = 100;
  mesh7.position.y = -66;
  mesh7.scale.x = 50;
  mesh7.scale.y = 2;
  mesh7.scale.z = 2;
  mesh7.rotationX = 50;
  mesh7.rotationY = 50;
  mesh7.rotationZ = 50;

  scene.add( mesh7 );

  geometry8 = new THREE.CylinderBufferGeometry( 100, 50, 20,2 );
  material8 = new THREE.MeshBasicMaterial({ color : "#FFDAB9" });
  mesh8 = new THREE.Mesh( geometry8, material8 );
  mesh8.position.z = -400;
  mesh8.position.x = -100;
  mesh8.position.y = -66;
  mesh8.scale.x = 50;
  mesh8.scale.y = 2;
  mesh8.scale.z = 2;
  mesh8.rotationX = 50;
  mesh8.rotationY = 50;
  mesh8.rotationZ = 50;

  scene.add( mesh8 );

  geometry9 = new THREE.IcosahedronBufferGeometry( 200,0 );
  material9 = new THREE.MeshBasicMaterial( {wireframe : true,color: "#FFDAB9"});
  mesh9 = new THREE.Mesh( geometry9,material9 );
  border9 = new THREE.EdgesHelper( mesh1,0xffff00);
  mesh9.position.z = -1000;
  mesh9.position.y = -10;

  // Add mesh to scene
  scene.add( mesh9 );
  scene.add( border9 );

  geometry10 = new THREE.OctahedronBufferGeometry( 20,0 );
  material10 = new THREE.MeshBasicMaterial({ color : "#FFDAB9" });
  mesh10 = new THREE.Mesh( geometry10, material10 );
  mesh10.position.z = -400;
  mesh10.position.x = -220;
  mesh10.position.y = -3;
  mesh10.scale.x = 1;
  mesh10.scale.y = 2;
  mesh10.scale.z = 2;
  mesh10.rotationX = 50;
  mesh10.rotationY = 50;
  mesh10.rotationZ = 50;

  scene.add( mesh10 );

  geometry11 = new THREE.OctahedronBufferGeometry( 20,0 );
  material11 = new THREE.MeshBasicMaterial({ color : "#FFDAB9" });
  mesh11 = new THREE.Mesh( geometry11, material11 );
  mesh11.position.z = -400;
  mesh11.position.x = 212;
  mesh11.position.y = -3;
  mesh11.scale.x = 1;
  mesh11.scale.y = 2;
  mesh11.scale.z = 2;
  mesh11.rotationX = 50;
  mesh11.rotationY = 50;
  mesh11.rotationZ = 50;

  scene.add( mesh11 );

 geometry12 = new THREE.OctahedronBufferGeometry( 500, 0 );
 material12 = new THREE.MeshBasicMaterial( {color: "#FFDAB9" } );
 mesh12 = new THREE.Mesh( geometry12, material12 );
 mesh12.position.x = 0;
 mesh12.position.y = 0;
 mesh12.position.z = -1000;
 mesh12.scale.x = 1;
 mesh12.scale.y = 0.8;
 mesh12.scale.z = 1.8;
  scene.add( mesh12 );

  geometry13 = new THREE.RingBufferGeometry( 550,600,12 );
  material13 = new THREE.MeshBasicMaterial( {color: "#FFDAB9" } );
  mesh13 = new THREE.Mesh( geometry13, material13 );
  mesh13.position.x = 0;
  mesh13.position.y = 0;
  mesh13.position.z = -2000;

   scene.add( mesh13 );

   geometry14 = new THREE.IcosahedronBufferGeometry( 50,0 );
   material14 = new THREE.MeshBasicMaterial( {wireframe : true,color: "#FFDAB9"});
   mesh14 = new THREE.Mesh( geometry14,material14 );
   border14 = new THREE.EdgesHelper( mesh14,0xffff00);
   mesh14.position.z = -1000;
   mesh14.position.y = -213;
   mesh14.position.x = -600;
   // Add mesh to scene
   scene.add( mesh14 );
   scene.add( border14 );

   geometry15 = new THREE.IcosahedronBufferGeometry( 50,0 );
   material15 = new THREE.MeshBasicMaterial( {wireframe : true,color: "#FFDAB9"});
   mesh15 = new THREE.Mesh( geometry15,material14 );
   border15 = new THREE.EdgesHelper( mesh15,0xffff00);
   mesh15.position.z = -1000;
   mesh15.position.y = -213;
   mesh15.position.x = 600;
   // Add mesh to scene
   scene.add( mesh15 );
   scene.add( border15 );

   geometry16 = new THREE.IcosahedronBufferGeometry( 50,0 );
   material16 = new THREE.MeshBasicMaterial( {wireframe : true,color: "#FFDAB9"});
   mesh16 = new THREE.Mesh( geometry16,material16 );
   border16 = new THREE.EdgesHelper( mesh16,0xffff00);
   mesh16.position.z = -1000;
   mesh16.position.y = 213;
   mesh16.position.x = -600;
   // Add mesh to scene
   scene.add( mesh16 );
   scene.add( border16 );

   geometry17 = new THREE.IcosahedronBufferGeometry( 50,0 );
   material17 = new THREE.MeshBasicMaterial( {wireframe : true,color: "#FFDAB9"});
   mesh17 = new THREE.Mesh( geometry17,material17 );
   border17 = new THREE.EdgesHelper( mesh17,0xffff00);
   mesh17.position.z = -1000;
   mesh17.position.y = 213;
   mesh17.position.x = 600;
   // Add mesh to scene
   scene.add( mesh17 );
   scene.add( border17 );
/*
//Creat a background
   geometry18 = new THREE.PlaneBufferGeometry( 800,400,32 );
   var texture = new THREE.TextureLoader().load( 'timg1.jpg');
   material18 = new THREE.MeshBasicMaterial( { map: texture } )
   //material17 = new THREE.MeshBasicMaterial( {wireframe : true,color: "#FFDAB9"});
   mesh18 = new THREE.Mesh( geometry18,material18 );
   mesh18.position.z = -400;
   mesh18.position.y = 0;
   mesh18.position.x = 0;
   // Add mesh to scene
   scene.add( mesh18 );
*/
  // Create a sine-like wave
var curve = new THREE.SplineCurve( [
	new THREE.Vector2( -100, 0 ),
	new THREE.Vector2( -500, 0 ),
	new THREE.Vector2( -300, 0 ),
	new THREE.Vector2( 0, -500 ),
	new THREE.Vector2( -200, 0 )
] );

var points = curve.getPoints( 50 );
var geometry10 = new THREE.BufferGeometry().setFromPoints( points );

var material10 = new THREE.LineBasicMaterial( { color : "#EED2EE" } );

// Create the final object to add to the scene
var splineObject = new THREE.Line( geometry10, material10 );
//scene.add( SplineCurve );


  //Add controller values for GUI
  //Set preset values for controllers
  var controller = new function() {
    this.scaleX = 1;
    this.scaleY = 1;
    this.scaleZ = 1;

    this.positionX = 0;
    this.positionY = 0;
    this.positionZ = -400;

    this.rotationX = 0.;
    this.rotationY = 0.;
    this.rotationZ = 0.;

    //this.boxColor = color;
    //this.boxOpacity = 1;
  }

  lightingSystem();

  //Create a new DAT.GUI
  var gui = new dat.GUI();

  //Define the folders' names
  var f1 = gui.addFolder('Scale');
  var f2 = gui.addFolder('Position');
  var f3 = gui.addFolder('Rotation');

  //Add controller for scale X
  f1.add(controller, 'scaleX', 0.1, 5).onChange( function() {
    //mesh.scale.x = (controller.scaleX);
    mesh12.scale.x = (controller.scaleX);
  });
  f1.add(controller, 'scaleY', 0.1, 5).onChange( function() {
    //mesh.scale.y = (controller.scaleY);
    mesh12.scale.y = (controller.scaleY);
});
  f1.add(controller, 'scaleZ', 0.1, 5).onChange( function() {
    //mesh.scale.z = (controller.scaleZ);
    mesh12.scale.z = (controller.scaleZ);
});

  f2.add(controller, 'positionX', -500, 500).onChange( function() {
    //mesh.position.x = (controller.positionX);
    mesh12.position.x = (controller.positionX);
});
  f2.add(controller, 'positionY', -500, 500).onChange( function() {
    //mesh.position.y = (controller.positionY);
    mesh12.position.y = (controller.positionY);
});
  f2.add(controller, 'positionZ', -5000, 100).onChange( function() {
    //mesh.position.z = (controller.positionZ);
    mesh12.position.z = (controller.positionZ);
});

  f3.add(controller, 'rotationX', -180, 180).onChange( function() {
    //mesh.rotation.x = de2ra(controller.rotationX);
    mesh12.rotation.x = de2ra(controller.rotationX);
});
  f3.add(controller, 'rotationY', -180, 180).onChange( function() {
    //mesh.rotation.y = de2ra(controller.rotationY);
    mesh12.rotation.y = de2ra(controller.rotationY);
});
  f3.add(controller, 'rotationZ', -180, 180).onChange( function() {
    //mesh.rotation.z = de2ra(controller.rotationZ);
    mesh12.rotation.z = de2ra(controller.rotationZ);
});

/*
  gui.addColor( controller, 'boxColor', color ).onChange( function() {
    mesh.material.color.setHex( dec2hex(controller.boxColor) );
    //mesh1.material.color.setHex( dec2hex(controller.boxColor) );
});

  gui.add( controller, 'boxOpacity', 0.1, 3 ).onChange( function() {
    material.opacity = (controller.boxOpacity);
  });*/
}

// Render Loop
var render = function () {
  requestAnimationFrame( render );

  mesh14.rotation.x += 0.01; //Continuously rotate the mesh
  mesh14.rotation.y += 0.01;
  mesh15.rotation.z += 0.01; //Continuously rotate the mesh
  mesh15.rotation.y += 0.01;
  mesh16.rotation.x += 0.01; //Continuously rotate the mesh
  mesh16.rotation.y += 0.01;
  mesh17.rotation.z += 0.01; //Continuously rotate the mesh
  mesh17.rotation.y += 0.01;

  renderer.setClearColor("#000000");

  // Render the scene
  renderer.render(scene, camera);
};

//Color converter
/*
function dec2hex(i) {
  var result = "0x000000";
  if (i >= 0 && i <= 15) { result = "0x00000" + i.toString(16); }
  else if (i >= 16 && i <= 255) { result = "0x0000" + i.toString(16); }
  else if (i >= 256 && i <= 4095) { result = "0x000" + i.toString(16); }
  else if (i >= 4096 && i <= 65535) { result = "0x00" + i.toString(16); }
  else if (i >= 65535 && i <= 1048575) { result = "0x0" + i.toString(16); }
  else if (i >= 1048575 ) { result = '0x' + i.toString(16); }
  if (result.length == 8){return result;}
}
*/
function lightingSystem(){
  var object3d  = new THREE.DirectionalLight('white', 0.15);
  object3d.position.set(6,3,9);
  object3d.name = 'Back light';
  scene.add(object3d);

  object3d = new THREE.DirectionalLight('white', 0.35);
  object3d.position.set(-6, -3, 0);
  object3d.name   = 'Key light';
  scene.add(object3d);

  object3d = new THREE.DirectionalLight('white', 0.55);
  object3d.position.set(9, 9, 6);
  object3d.name = 'Fill light';
  scene.add(object3d);

  var spotLight = new THREE.SpotLight( 0xffffff );
  spotLight.position.set( 3, 30, 3 );
  spotLight.castShadow = true;
  spotLight.shadow.mapSize.width = 2048;
  spotLight.shadow.mapSize.height = 2048;
  spotLight.shadow.camera.near = 1;
  spotLight.shadow.camera.far = 4000;
  spotLight.shadow.camera.fov = 45;
  scene.add( spotLight );
}

init();
render();
