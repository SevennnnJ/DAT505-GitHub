//Global variables
var scene, camera, renderer;
var geometry1, material1, mesh1,border1;
var geometry2, material2, mesh2;
var geometry3, material3, mesh3,border3;
var geometry4, material4, mesh4,border4;

function init(){
  // Create an empty scene --------------------------
  scene = new THREE.Scene();

  // Create a basic perspective camera --------------
  camera = new THREE.PerspectiveCamera(35, window.innerWidth/window.innerHeight, 300, 10000 );

  // Create a renderer with Antialiasing ------------
  renderer = new THREE.WebGLRenderer({antialias:true});

  // Configure renderer clear color
  renderer.setClearColor("#EED2EE");

  // Configure renderer size
  renderer.setSize( window.innerWidth, window.innerHeight );

  // Append Renderer to DOM
  document.body.appendChild( renderer.domElement );
//灯光
  var light1 = new THREE.AmbientLight("#FAFAD2", 1);
  scene.add(light1);

  var light2 = new THREE.PointLight("#FAFAD2", 1);
  scene.add(light2);
/*
  var light = new THREE.DirectionalLight( 0xffffff );
				light.position.set( 0, 0, 1 );
				scene.add( light );
				// shadow
				var canvas = document.createElement( 'canvas' );
				canvas.width = 128;
				canvas.height = 128;
				var context = canvas.getContext( '2d' );
				var gradient = context.createRadialGradient( canvas.width / 2, canvas.height / 2, 0, canvas.width / 2, canvas.height / 2, canvas.width / 2 );
				gradient.addColorStop( 0.1, 'rgba(210,210,210,1)' );
				gradient.addColorStop( 1, 'rgba(255,255,255,1)' );
				context.fillStyle = gradient;
				context.fillRect( 0, 0, canvas.width, canvas.height );
				var shadowTexture = new THREE.CanvasTexture( canvas );
				var shadowMaterial = new THREE.MeshBasicMaterial( { map: shadowTexture } );
				var shadowGeo = new THREE.PlaneBufferGeometry( 300, 300, 1, 1 );
				var shadowMesh;
				shadowMesh = new THREE.Mesh( shadowGeo, shadowMaterial );
				shadowMesh.position.y = - 250;
				shadowMesh.rotation.x = - Math.PI / 2;
				scene.add( shadowMesh );
				shadowMesh = new THREE.Mesh( shadowGeo, shadowMaterial );
				shadowMesh.position.y = - 250;
				shadowMesh.position.x = - 400;
				shadowMesh.rotation.x = - Math.PI / 2;
				scene.add( shadowMesh );
				shadowMesh = new THREE.Mesh( shadowGeo, shadowMaterial );
				shadowMesh.position.y = - 250;
				shadowMesh.position.x = 400;
				shadowMesh.rotation.x = - Math.PI / 2;
				scene.add( shadowMesh );
*/

  //ambientLight.color=new THREE.Color(e);

  //ambientLight = new THREE.AmbientLight(ambiColor);
  //spotLight0 = new THREE.SpotLight(0xcccccc);

  //spotLight0.lookAt(geometry);
      //scene.add(spotLight0);

 spotLight = new THREE.SpotLight({color:"#fffff0"});



}

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
/*
  var material = new THREE.MeshLambertMaterial({
    color: '#D2BE82',
    lightMap: null,
    lightMapIntensity: 1,
    emissive: 0x000000,
    emissiveMap: null,
    emissiveIntensity: 1,
    specularMap: null
  });
*/

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
/*
function spotlight(){

  spotLight.intensity=10;
  spotLight.target=geometry;
  spotLight.castShadow=true;
  spotLight.position.set(-40, 30, -10);
  spotLight.shadowCameraVisible=true;
  scene.add(spotLight);

  spotLight.shadowCameraNear=2;
  spotLight.shadowCameraFar=200;
  spotLight.shadowCameraFov=30;

}

/*function color(){
var controls=new function () {
        this.ambi_Color=ambiColor;
    };

//var gui=new dat.GUI();
    //gui.addColor(controls,'ambi_Color').onChange(function (e) { ambientLight.color=new THREE.Color(e);});

var ambiColor = "#990000";
   scene.add(ambientLight);
}*/

// Render Loop
var render = function () {
  requestAnimationFrame( render );

  mesh1.rotation.x += 0.01; //Continuously rotate the mesh
  mesh1.rotation.y += 0.01;

  mesh2.rotation.x += 0.005; //Continuously rotate the mesh
  mesh2.rotation.y += 0.005;

  mesh3.rotation.x += 0.01; //Continuously rotate the mesh
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
