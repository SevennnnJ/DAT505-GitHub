if ( WEBGL.isWebGLAvailable() === false ) {
  document.body.appendChild( WEBGL.getWebGLErrorMessage() );
}
var camera, scene, renderer, clock, group;
var composer1, composer2, fxaaPass;
//init();
//animate();
function init() {
  var container = document.getElementById( 'container' );
  camera = new THREE.PerspectiveCamera( 45, ( window.innerWidth * 0.5 ) / window.innerHeight, 1, 2000 );
  camera.position.z = 500;
  scene = new THREE.Scene();
  scene.background = new THREE.Color( 0xffffff );
  scene.fog = new THREE.Fog( 0xcccccc, 100, 1500 );
  clock = new THREE.Clock();
  //
  var hemiLight = new THREE.HemisphereLight( 0xffffff, 0x444444 );
  hemiLight.position.set( 0, 1000, 0 );
  scene.add( hemiLight );
  var dirLight = new THREE.DirectionalLight( 0xffffff, 0.8 );
  dirLight.position.set( - 3000, 1000, - 1000 );
  scene.add( dirLight );
  //
  group = new THREE.Group();
  var geometry = new THREE.TetrahedronBufferGeometry( 10 );
  var material = new THREE.MeshStandardMaterial( { color: 0xee0808, flatShading: true } );
  for ( var i = 0; i < 100; i ++ ) {
    var mesh = new THREE.Mesh( geometry, material );
    mesh.position.x = Math.random() * 500 - 250;
    mesh.position.y = Math.random() * 500 - 250;
    mesh.position.z = Math.random() * 500 - 250;
    mesh.scale.setScalar( Math.random() * 2 + 1 );
    mesh.rotation.x = Math.random() * Math.PI;
    mesh.rotation.y = Math.random() * Math.PI;
    mesh.rotation.z = Math.random() * Math.PI;
    group.add( mesh );
  }
  scene.add( group );
  //
  renderer = new THREE.WebGLRenderer();
  renderer.autoClear = false;
  renderer.setPixelRatio( window.devicePixelRatio );
  renderer.setSize( window.innerWidth, window.innerHeight );
  container.appendChild( renderer.domElement );
  //
  var renderPass = new THREE.RenderPass( scene, camera );
  //
  fxaaPass = new THREE.ShaderPass( THREE.FXAAShader );
  fxaaPass.renderToScreen = true;
  var pixelRatio = renderer.getPixelRatio();
  fxaaPass.material.uniforms[ 'resolution' ].value.x = 1 / ( window.innerWidth * pixelRatio );
  fxaaPass.material.uniforms[ 'resolution' ].value.y = 1 / ( window.innerHeight * pixelRatio );
  composer1 = new THREE.EffectComposer( renderer );
  composer1.addPass( renderPass );
  composer1.addPass( fxaaPass );
  //
  var copyPass = new THREE.ShaderPass( THREE.CopyShader );
  copyPass.renderToScreen = true;
  composer2 = new THREE.EffectComposer( renderer );
  composer2.addPass( renderPass );
  composer2.addPass( copyPass );
  //
  window.addEventListener( 'resize', onWindowResize, false );
}
function onWindowResize() {
  camera.aspect = ( window.innerWidth * 0.5 ) / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize( window.innerWidth, window.innerHeight );
  composer1.setSize( window.innerWidth, window.innerHeight );
  composer2.setSize( window.innerWidth, window.innerHeight );
  var pixelRatio = renderer.getPixelRatio();
  fxaaPass.material.uniforms[ 'resolution' ].value.x = 1 / ( window.innerWidth * pixelRatio );
  fxaaPass.material.uniforms[ 'resolution' ].value.y = 1 / ( window.innerHeight * pixelRatio );
}
function animate() {
  requestAnimationFrame( animate );
  var halfWidth = window.innerWidth / 2;
  group.rotation.y += clock.getDelta() * 0.1;
  renderer.setViewport( 0, 0, halfWidth, window.innerHeight );
  composer1.render();
  renderer.setViewport( halfWidth, 0, halfWidth, window.innerHeight );
  composer2.render();
}
