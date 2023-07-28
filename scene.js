import { OrbitControls } from "https://threejs.org/examples/jsm/controls/OrbitControls.js";

//Creación de la escena.
var scene = new THREE.Scene();
scene.background = new THREE.Color( 0x1d1d1d );

//Creación de la variable de control de cámara.
var controls;
var camera;
var container;
var midCenterLog;
var topCenterLog;
var bottomCenterLog;

//Creación de la cámara.
camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 10000);
camera.position.set(2500,-2500,900);
camera.rotation.x = 90 * Math.PI / 180;
camera.rotation.y = 45 * Math.PI / 180;

//Renderizado de la escena en la section 'container'.
var renderer = new THREE.WebGLRenderer( { antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
container = document.getElementById('scene');
container.appendChild( renderer.domElement );

//Creación de la iluminación
scene.add( new THREE.AmbientLight( 0x0f0f0f ) );
var light1 = new THREE.SpotLight( 0xffffff, 1.5 );
light1.position.set( 100, 500, 2000 );
scene.add(light1);
var light2 = new THREE.SpotLight( 0xffffff, 1.5 );
light2.position.set(2500,-2500,900);;
scene.add(light2);

//Controles de la cámara.
controls = new OrbitControls( camera, renderer.domElement );
controls.addEventListener( 'change', renderer );


//Pallet EUR1.
function EUR1_Pallet(){
  //Etiquetas iniciales del pallet.
  var texturePallet1 = new THREE.TextureLoader().load("pallet_texture.png", function(){ renderer.render(scene, camera);});
  var texturePallet2 = new THREE.TextureLoader().load("pallet_texture.png", function(){ renderer.render(scene, camera);});
  var texturePallet3 = new THREE.TextureLoader().load("pallet_texture.png", function(){ renderer.render(scene, camera);});
  var texturePallet4 = new THREE.TextureLoader().load("pallet_texture.png", function(){ renderer.render(scene, camera);});
  var texturePallet5 = new THREE.TextureLoader().load("pallet_texture.png", function(){ renderer.render(scene, camera);});
  var texturePallet6 = new THREE.TextureLoader().load("pallet_texture.png", function(){ renderer.render(scene, camera);});


  //Mid center log.
  var midCenterLog_Geometry = new THREE.BoxGeometry(145, 800, 22);
  var midCenterLog_Texture = new THREE.MeshPhongMaterial({
      color: 0x8a622b, 
      flatShading: true,
    });
  midCenterLog = new THREE.Mesh(midCenterLog_Geometry,midCenterLog_Texture);
  midCenterLog.position.set(0,0,111);
  midCenterLog.name = "midCenterLog";
  scene.add(midCenterLog);
  //Top center log.
  var topCenterLog_Geometry = new THREE.BoxGeometry(145, 800, 22);
  var topCenterLog_Texture = new THREE.MeshPhongMaterial({
      color: 0x8a622b, 
      flatShading: true,
    });
  topCenterLog = new THREE.Mesh(topCenterLog_Geometry,topCenterLog_Texture);
  topCenterLog.position.set(527.5,0,111);
  topCenterLog.name = "topCenterLog";
  scene.add(topCenterLog);
  //Bottom center log.
  var bottomCenterLog_Geometry = new THREE.BoxGeometry(145, 800, 22);
  var bottomCenterLog_Texture = new THREE.MeshPhongMaterial({
      color: 0x8a622b, 
      flatShading: true,
    });
  bottomCenterLog = new THREE.Mesh(bottomCenterLog_Geometry,bottomCenterLog_Texture);
  bottomCenterLog.position.set(-527.5,0,111);
  bottomCenterLog.name = "bottomCenterLog";
  scene.add(bottomCenterLog);






  //Box center 1.
  var bottomCenterLog_Geometry = new THREE.BoxGeometry(145, 145, 78);
  var bottomCenterLog_Texture = new THREE.MeshPhongMaterial({
      color: 0x8a622b, 
      flatShading: true,
    });
  bottomCenterLog = new THREE.Mesh(bottomCenterLog_Geometry,bottomCenterLog_Texture);
  bottomCenterLog.position.set(0,0,61);
  bottomCenterLog.name = "bottomCenterLog";
  scene.add(bottomCenterLog);
  //Box center 2.
  var bottomCenterLog_Geometry = new THREE.BoxGeometry(145, 145, 78);
  var bottomCenterLog_Texture = new THREE.MeshPhongMaterial({
      color: 0x8a622b, 
      flatShading: true,
    });
  bottomCenterLog = new THREE.Mesh(bottomCenterLog_Geometry,bottomCenterLog_Texture);
  bottomCenterLog.position.set(527.5,0,61);
  bottomCenterLog.name = "bottomCenterLog";
  scene.add(bottomCenterLog);
  //Box center 3.
  var bottomCenterLog_Geometry = new THREE.BoxGeometry(145, 145, 78);
  var bottomCenterLog_Texture = new THREE.MeshPhongMaterial({
      color: 0x8a622b, 
      flatShading: true,
    });
  bottomCenterLog = new THREE.Mesh(bottomCenterLog_Geometry,bottomCenterLog_Texture);
  bottomCenterLog.position.set(-527.5,0,61);
  bottomCenterLog.name = "bottomCenterLog";
  scene.add(bottomCenterLog);

  //Box left 1.
  var bottomCenterLog_Geometry = new THREE.BoxGeometry(145, 100, 78);
  var bottomCenterLog_Texture = new THREE.MeshPhongMaterial({
      color: 0x8a622b, 
      flatShading: true,
    });
  bottomCenterLog = new THREE.Mesh(bottomCenterLog_Geometry,bottomCenterLog_Texture);
  bottomCenterLog.position.set(0,-350,61);
  bottomCenterLog.name = "bottomCenterLog";
  scene.add(bottomCenterLog);
  //Box left 2.
  var bottomCenterLog_Geometry = new THREE.BoxGeometry(145, 100, 78);
  var bottomCenterLog_Texture = new THREE.MeshPhongMaterial({
      color: 0x8a622b, 
      flatShading: true,
    });
  bottomCenterLog = new THREE.Mesh(bottomCenterLog_Geometry,bottomCenterLog_Texture);
  bottomCenterLog.position.set(527.5,-350,61);
  bottomCenterLog.name = "bottomCenterLog";
  scene.add(bottomCenterLog);
  //Box left 3.
  var bottomCenterLog_Geometry = new THREE.BoxGeometry(145, 100, 78);
  var bottomCenterLog_Texture = new THREE.MeshPhongMaterial({
      color: 0x8a622b, 
      flatShading: true,
    });
  bottomCenterLog = new THREE.Mesh(bottomCenterLog_Geometry,bottomCenterLog_Texture);
  bottomCenterLog.position.set(-527.5,-350,61);
  bottomCenterLog.name = "bottomCenterLog";
  scene.add(bottomCenterLog);


  //Box right 1.
  var bottomCenterLog_Geometry = new THREE.BoxGeometry(145, 100, 78);
  var bottomCenterLog_Texture = new THREE.MeshPhongMaterial({
      color: 0x8a622b, 
      flatShading: true,
    });
  bottomCenterLog = new THREE.Mesh(bottomCenterLog_Geometry,bottomCenterLog_Texture);
  bottomCenterLog.position.set(0,350,61);
  bottomCenterLog.name = "bottomCenterLog";
  scene.add(bottomCenterLog);
  //Box right 2.
  var bottomCenterLog_Geometry = new THREE.BoxGeometry(145, 100, 78);
  var bottomCenterLog_Texture = new THREE.MeshPhongMaterial({
      color: 0x8a622b, 
      flatShading: true,
    });
  bottomCenterLog = new THREE.Mesh(bottomCenterLog_Geometry,bottomCenterLog_Texture);
  bottomCenterLog.position.set(527.5,350,61);
  bottomCenterLog.name = "bottomCenterLog";
  scene.add(bottomCenterLog);
  //Box right 3.
  var bottomCenterLog_Geometry = new THREE.BoxGeometry(145, 100, 78);
  var bottomCenterLog_Texture = new THREE.MeshPhongMaterial({
      color: 0x8a622b, 
      flatShading: true,
    });
  bottomCenterLog = new THREE.Mesh(bottomCenterLog_Geometry,bottomCenterLog_Texture);
  bottomCenterLog.position.set(-527.5,350,61);
  bottomCenterLog.name = "bottomCenterLog";
  scene.add(bottomCenterLog);




  //Log inferior 1.
  var bottomCenterLog_Geometry = new THREE.BoxGeometry(1200, 100, 22);
  var bottomCenterLog_Texture = new THREE.MeshPhongMaterial({
      color: 0x8a622b, 
      flatShading: true,
    });
  bottomCenterLog = new THREE.Mesh(bottomCenterLog_Geometry,bottomCenterLog_Texture);
  bottomCenterLog.position.set(0,350,11);
  bottomCenterLog.name = "bottomCenterLog";
  scene.add(bottomCenterLog);
  //Log inferior 2.
  var bottomCenterLog_Geometry = new THREE.BoxGeometry(1200, 145, 22);
  var bottomCenterLog_Texture = new THREE.MeshPhongMaterial({
      color: 0x8a622b, 
      flatShading: true,
    });
  bottomCenterLog = new THREE.Mesh(bottomCenterLog_Geometry,bottomCenterLog_Texture);
  bottomCenterLog.position.set(0,0,11);
  bottomCenterLog.name = "bottomCenterLog";
  scene.add(bottomCenterLog);
  //Log inferior 3.
  var bottomCenterLog_Geometry = new THREE.BoxGeometry(1200, 100, 22);
  var bottomCenterLog_Texture = new THREE.MeshPhongMaterial({
      color: 0x8a622b, 
      flatShading: true,
    });
  bottomCenterLog = new THREE.Mesh(bottomCenterLog_Geometry,bottomCenterLog_Texture);
  bottomCenterLog.position.set(0,-350,11);
  bottomCenterLog.name = "bottomCenterLog";
  scene.add(bottomCenterLog);



  //Log superior 1.
  var bottomCenterLog_Geometry = new THREE.BoxGeometry(1200, 145, 22);
  var bottomCenterLog_Texture = new THREE.MeshPhongMaterial({
      color: 0x8a622b, 
      flatShading: true,
    });
  bottomCenterLog = new THREE.Mesh(bottomCenterLog_Geometry,bottomCenterLog_Texture);
  bottomCenterLog.position.set(0,327.5,133);
  bottomCenterLog.name = "bottomCenterLog";
  scene.add(bottomCenterLog);
  //Log superior 2.
  var bottomCenterLog_Geometry = new THREE.BoxGeometry(1200, 145, 22);
  var bottomCenterLog_Texture = new THREE.MeshPhongMaterial({
      color: 0x8a622b, 
      flatShading: true,
    });
  bottomCenterLog = new THREE.Mesh(bottomCenterLog_Geometry,bottomCenterLog_Texture);
  bottomCenterLog.position.set(0,0,133);
  bottomCenterLog.name = "bottomCenterLog";
  scene.add(bottomCenterLog);
  //Log superior 3.
  var bottomCenterLog_Geometry = new THREE.BoxGeometry(1200, 145, 22);
  var bottomCenterLog_Texture = new THREE.MeshPhongMaterial({
      color: 0x8a622b, 
      flatShading: true,
    });
  bottomCenterLog = new THREE.Mesh(bottomCenterLog_Geometry,bottomCenterLog_Texture);
  bottomCenterLog.position.set(0,-327.5,133);
  bottomCenterLog.name = "bottomCenterLog";
  scene.add(bottomCenterLog);
  //Log superior 4.
  var bottomCenterLog_Geometry = new THREE.BoxGeometry(1200, 100, 22);
  var bottomCenterLog_Texture = new THREE.MeshPhongMaterial({
      color: 0x8a622b, 
      flatShading: true,
    });
  bottomCenterLog = new THREE.Mesh(bottomCenterLog_Geometry,bottomCenterLog_Texture);
  bottomCenterLog.position.set(0,-162.5,133);
  bottomCenterLog.name = "bottomCenterLog";
  scene.add(bottomCenterLog);
  //Log superior 5.
  var bottomCenterLog_Geometry = new THREE.BoxGeometry(1200, 100, 22);
  var bottomCenterLog_Texture = new THREE.MeshPhongMaterial({
      color: 0x8a622b, 
      flatShading: true,
    });
  bottomCenterLog = new THREE.Mesh(bottomCenterLog_Geometry,bottomCenterLog_Texture);
  bottomCenterLog.position.set(0,162.5,133);
  bottomCenterLog.name = "bottomCenterLog";
  scene.add(bottomCenterLog);
}


//Reajuste de la escena
function animate() {
	requestAnimationFrame( animate );
	renderer.render(scene, camera);
  controls.autoRotate = true;
}

EUR1_Pallet();
animate();