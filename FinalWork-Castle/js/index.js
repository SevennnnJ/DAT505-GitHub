    if (WEBGL.isWebGLAvailable() === false) {
        document.body.appendChild(WEBGL.getWebGLErrorMessage());
    }
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

    init();
    animate();

    function init() {

        var container = document.getElementById('container');
        camera = new THREE.PerspectiveCamera(90, window.innerWidth / window.innerHeight, 1, 500000000);
        camera.position.set(0, -700, 1400);
        // camera.lookAt(0,0,0);
        scene = new THREE.Scene();

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

        //Normal light
        hemiLight = new THREE.HemisphereLight(0xE3E3E3, 0xE3E3E3, 0.6);
        hemiLight.color.setHSL(0.6, 1, 0.6);
        hemiLight.groundColor.setHSL(0.095, 1, 0.75);
        hemiLight.position.set(0, 0, 0);
        scene.add(hemiLight);

        //Two directional lights
        dirLight = new THREE.DirectionalLight(0xE3E3E3, 1);
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

        var onProgress = function (xhr) {
                    if (xhr.lengthComputable) {
                        var percentCompvare = xhr.loaded / xhr.total * 100;
                        console.log(Math.round(percentCompvare, 2) + '% downloaded');
                    }
                };

                var onError = function () { };

//Add the texture to the Fountain
        var textureLoader = new THREE.TextureLoader();
        var texture = textureLoader.load('textures/penquan.jpg');
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

//Loop the LuminousSphere
        for (var i = 0; i < 1000; i++) { //Put 1000 LuminousSpheres in the scene
            draw();
        }


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

//夜空星星绘制Draw starS in night sky
    function draw() {
        var LuminousSphere = new THREE.Mesh(sphere, materialLuminous);//创造一个球体Creat a LuminousSphere
        LuminousSphere.material.side = THREE.BackSide;//赋予材质Add the texture on them
        LuminousSphere.material.transparent = true;
        //大小变成原来球体的0.5倍 0.5 times the size of the original sphere
        LuminousSphere.scale.x = LuminousSphere.scale.y = LuminousSphere.scale.z = 0.05;
        //随机位置change the position randomly
        LuminousSphere.position.x = Math.round(Math.random()*(3000-(-6000)+1)+(-6000));
        LuminousSphere.position.y = Math.round(Math.random()*(3000-(-6000)+1)+(-6000));
        LuminousSphere.position.z = Math.round(Math.random()*(3000-(-6000)+1)+(-6000));
        LuminousGroup.add(LuminousSphere);
        scene.add(LuminousGroup);

    }


//construct the Three-dimensional coordinate system in window
    function onWindowResize() {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);

    }

//Control the mouse click down
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

    //Coordinate axis of mouse movement
    function getIntersects(x, y) {
        x = (x / window.innerWidth) * 2 - 1;
        y = - (y / window.innerHeight) * 2 + 1;
        mouseVector.set(x, y, 0.5);
        raycaster.setFromCamera(mouseVector, camera);
        return raycaster.intersectObject(GROUP, true);
    }


//The mouse always click the Fountain can play the music
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
