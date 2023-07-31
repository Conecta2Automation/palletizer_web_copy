//Importación de OrbitControls.
import { OrbitControls } from "https://threejs.org/examples/jsm/controls/OrbitControls.js";

//Creación de la escena.
const scene = new THREE.Scene();
scene.background = new THREE.Color( 0x000000 );

//Creación de las constantes de la escena.
let controls,camera,renderer,container;

//Setting de la cámara.
camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 100000);
camera.position.set(2500,-2500,3000);

//Renderizado de la escena en la 'section' llamada 'container'.
renderer = new THREE.WebGLRenderer( { antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
container = document.getElementById('scene-layer');
container.appendChild( renderer.domElement );

//Controles de la cámara.
camera.up.set( 0, 0, 1 );
controls = new OrbitControls( camera, renderer.domElement );

//Array de las cajas spawneadas.
var placedBoxes = [];
var layerValue;
var spawnInterlayer = false;

document.getElementById('interlayer-size').value = 5;

//Bloquea los inputs, ya que son de sólo lectura.
function blockInputs(){
  document.getElementById("absolute-size").readOnly = true;
  document.getElementById("absolute-mass").readOnly = true;
  document.getElementById("absolute-layers").readOnly = true;
  document.getElementById("absolute-height").readOnly = true;
  document.getElementById("absolute-area").readOnly = true;
  document.getElementById("absolute-load").readOnly = true;
  document.getElementById("absolute-size").style.backgroundColor = 'grey';
  document.getElementById("absolute-mass").style.backgroundColor = 'grey';
  document.getElementById("absolute-layers").style.backgroundColor = 'grey';
  document.getElementById("pallet-mass").style.backgroundColor = 'grey';
  document.getElementById("absolute-area").style.backgroundColor = 'grey';
  document.getElementById("absolute-load").style.backgroundColor = 'grey';
}

//#region Pallets.
  //Creación del pallet EUR1.
  function palletEUR1(){
    //Creación del material de los soportes en forma de cubo.
    var textureBoxPallet = new THREE.TextureLoader().load("pallet_textures/texture_palletCube.png", function(){ renderer.render(scene, camera);});
    var boxMaterial = new THREE.MeshBasicMaterial({map:textureBoxPallet})

    //Creación del material de los listones.
    var textureLogPallet = new THREE.TextureLoader().load("pallet_textures/texture_palletLog.png", function(){ renderer.render(scene, camera);});
    var logMaterial = new THREE.MeshBasicMaterial({map:textureLogPallet});

    //Creación del material de los soportes en forma de cubo con inscripciones.
    var textureLabel_info = new THREE.TextureLoader().load("pallet_textures/texture_palletCubeTag_info.png", function(){ renderer.render(scene, camera);});
    var label_info = new THREE.MeshBasicMaterial({map:textureLabel_info});
    var textureLabel_EPAL = new THREE.TextureLoader().load("pallet_textures/texture_palletCubeTag_EPAL.png", function(){ renderer.render(scene, camera);});
    var label_EPAL = new THREE.MeshBasicMaterial({map:textureLabel_EPAL});
    var textureLabel_EUR = new THREE.TextureLoader().load("pallet_textures/texture_palletCubeTag_EUR.png", function(){ renderer.render(scene, camera);});
    var label_EUR = new THREE.MeshBasicMaterial({map:textureLabel_EUR});
    

    //Listones transversales.
    var crossLogGeometry = new THREE.BoxGeometry(145, 800, 22); 
    var crossLog = new THREE.Mesh(crossLogGeometry,logMaterial);
    crossLog.position.set(0,0,111 - 1000);
    crossLog.name = "crossLog1";
    scene.add(crossLog);
    crossLogGeometry = new THREE.BoxGeometry(145, 800, 22);
    crossLog = new THREE.Mesh(crossLogGeometry,logMaterial);
    crossLog.position.set(527.5,0,111 - 1000);
    crossLog.name = "crossLog2";
    scene.add(crossLog);
    crossLogGeometry = new THREE.BoxGeometry(145, 800, 22);
    crossLog = new THREE.Mesh(crossLogGeometry,logMaterial);
    crossLog.position.set(-527.5,0,111 - 1000);
    crossLog.name = "crossLog3";
    scene.add(crossLog);


    //Cubos de soporte.
    var supportCubeGeometry = new THREE.BoxGeometry(145, 145, 78);
    var supportCube = new THREE.Mesh(supportCubeGeometry,boxMaterial);
    supportCube.position.set(0,0,61 - 1000);
    supportCube.name = "supportCube1";
    scene.add(supportCube);
    supportCubeGeometry = new THREE.BoxGeometry(145, 145, 78);
    supportCube = new THREE.Mesh(supportCubeGeometry,boxMaterial);
    supportCube.position.set(527.5,0,61 - 1000);
    supportCube.name = "supportCube2";
    scene.add(supportCube);
    supportCubeGeometry = new THREE.BoxGeometry(145, 145, 78);
    supportCube = new THREE.Mesh(supportCubeGeometry,boxMaterial);
    supportCube.position.set(-527.5,0,61 - 1000);
    supportCube.name = "supportCube3";
    scene.add(supportCube);
    supportCubeGeometry = new THREE.BoxGeometry(145, 100, 78);
    supportCube = new THREE.Mesh(supportCubeGeometry,boxMaterial);
    supportCube.position.set(0,-350,61 - 1000);
    supportCube.name = "supportCube4";
    scene.add(supportCube);
    supportCubeGeometry = new THREE.BoxGeometry(145, 100, 78);
    supportCube = new THREE.Mesh(supportCubeGeometry,boxMaterial);
    supportCube.position.set(527.5,-350,61 - 1000);
    supportCube.name = "supportCube5";
    scene.add(supportCube);
    supportCubeGeometry = new THREE.BoxGeometry(145, 100, 78);
    supportCube = new THREE.Mesh(supportCubeGeometry,boxMaterial);
    supportCube.position.set(-527.5,-350,61 - 1000);
    supportCube.name = "supportCube6";
    scene.add(supportCube);
    supportCubeGeometry = new THREE.BoxGeometry(145, 100, 78);
    supportCube = new THREE.Mesh(supportCubeGeometry,boxMaterial);
    supportCube.position.set(0,350,61 - 1000);
    supportCube.name = "supportCube7";
    scene.add(supportCube);
    supportCubeGeometry = new THREE.BoxGeometry(145, 100, 78);
    supportCube = new THREE.Mesh(supportCubeGeometry,boxMaterial);
    supportCube.position.set(527.5,350,61 - 1000);
    supportCube.name = "supportCube8";
    scene.add(supportCube);
    supportCubeGeometry = new THREE.BoxGeometry(145, 100, 78);
    supportCube = new THREE.Mesh(supportCubeGeometry,boxMaterial);
    supportCube.position.set(-527.5,350,61 - 1000);
    supportCube.name = "supportCube9";
    scene.add(supportCube);


    //Listones principales.
    var mainLog_Geometry = new THREE.BoxGeometry(1200, 100, 22);
    var mainLog = new THREE.Mesh(mainLog_Geometry,logMaterial);
    mainLog.position.set(0,350,11 - 1000);
    mainLog.name = "mainLog1";
    scene.add(mainLog);
    mainLog_Geometry = new THREE.BoxGeometry(1200, 145, 22);
    mainLog = new THREE.Mesh(mainLog_Geometry,logMaterial);
    mainLog.position.set(0,0,11 - 1000);
    mainLog.name = "mainLog2";
    scene.add(mainLog);
    mainLog_Geometry = new THREE.BoxGeometry(1200, 100, 22);
    mainLog = new THREE.Mesh(mainLog_Geometry,logMaterial);
    mainLog.position.set(0,-350,11 - 1000);
    mainLog.name = "mainLog3";
    scene.add(mainLog);
    mainLog_Geometry = new THREE.BoxGeometry(1200, 145, 22);
    mainLog = new THREE.Mesh(mainLog_Geometry,logMaterial);
    mainLog.position.set(0,327.5,133 - 1000);
    mainLog.name = "mainLog4";
    scene.add(mainLog);
    mainLog_Geometry = new THREE.BoxGeometry(1200, 145, 22);
    mainLog = new THREE.Mesh(mainLog_Geometry,logMaterial);
    mainLog.position.set(0,0,133 - 1000);
    mainLog.name = "mainLog5";
    scene.add(mainLog);
    mainLog_Geometry = new THREE.BoxGeometry(1200, 145, 22);
    mainLog = new THREE.Mesh(mainLog_Geometry,logMaterial);
    mainLog.position.set(0,-327.5,133 - 1000);
    mainLog.name = "mainLog6";
    scene.add(mainLog);
    mainLog_Geometry = new THREE.BoxGeometry(1200, 100, 22);
    mainLog = new THREE.Mesh(mainLog_Geometry,logMaterial);
    mainLog.position.set(0,-162.5,133 - 1000);
    mainLog.name = "mainLog7";
    scene.add(mainLog);
    mainLog_Geometry = new THREE.BoxGeometry(1200, 100, 22);
    mainLog = new THREE.Mesh(mainLog_Geometry,logMaterial);
    mainLog.position.set(0,162.5,133 - 1000);
    mainLog.name = "mainLog8";
    scene.add(mainLog);


    //Inscripciones de los cubos de soporte.
    var label_Geometry = new THREE.BoxGeometry(100, 0.1, 78);
    var label = new THREE.Mesh(label_Geometry,label_info);
    label.position.set(0,400,61 - 1000);
    label.rotation.y = 180*Math.PI / 180;
    label.name = "label1";
    scene.add(label);
    label_Geometry = new THREE.BoxGeometry(100, 0.1, 78);
    label = new THREE.Mesh(label_Geometry,label_info);
    label.position.set(0,-400,61 - 1000);
    label.rotation.y = 0*Math.PI / 180;
    label.name = "label2";
    scene.add(label);
    label_Geometry = new THREE.BoxGeometry(100, 0.1, 78);
    label = new THREE.Mesh(label_Geometry,label_EUR);
    label.position.set(-530,400,61 - 1000);
    label.rotation.y = 180*Math.PI / 180;
    label.name = "label3";
    scene.add(label);
    label_Geometry = new THREE.BoxGeometry(100, 0.1, 78);
    label = new THREE.Mesh(label_Geometry,label_EUR);
    label.position.set(530,-400,61 - 1000);
    label.rotation.y = 0*Math.PI / 180;
    label.name = "label4";
    scene.add(label);
    label_Geometry = new THREE.BoxGeometry(100, 0.1, 78);
    label = new THREE.Mesh(label_Geometry,label_EPAL);
    label.position.set(530,400,61 - 1000);
    label.rotation.y = 180*Math.PI / 180;
    label.name = "label5";
    scene.add(label);
    label_Geometry = new THREE.BoxGeometry(100, 0.1, 78);
    label = new THREE.Mesh(label_Geometry,label_EPAL);
    label.position.set(-530,-400,61 - 1000);
    label.rotation.y = 0*Math.PI / 180;
    label.name = "label6";
    scene.add(label);
  }

  //Creación del pallet EUR2.
  function palletEUR2(){
    //Creación del material de los soportes en forma de cubo.
    var textureBoxPallet = new THREE.TextureLoader().load("pallet_textures/texture_palletCube.png", function(){ renderer.render(scene, camera);});
    var boxMaterial = new THREE.MeshBasicMaterial({map:textureBoxPallet})

    //Creación del material de los listones.
    var textureLogPallet = new THREE.TextureLoader().load("pallet_textures/texture_palletLog.png", function(){ renderer.render(scene, camera);});
    var logMaterial = new THREE.MeshBasicMaterial({map:textureLogPallet});

    //Creación del material de los soportes en forma de cubo con inscripciones.
    var textureLabel_info = new THREE.TextureLoader().load("pallet_textures/texture_palletCubeTag_info.png", function(){ renderer.render(scene, camera);});
    var label_info = new THREE.MeshBasicMaterial({map:textureLabel_info});
    var textureLabel_EPAL = new THREE.TextureLoader().load("pallet_textures/texture_palletCubeTag_EPAL.png", function(){ renderer.render(scene, camera);});
    var label_EPAL = new THREE.MeshBasicMaterial({map:textureLabel_EPAL});
    var textureLabel_EUR = new THREE.TextureLoader().load("pallet_textures/texture_palletCubeTag_EUR.png", function(){ renderer.render(scene, camera);});
    var label_EUR = new THREE.MeshBasicMaterial({map:textureLabel_EUR});
    

    //Listones transversales.
    var crossLogGeometry = new THREE.BoxGeometry(100, 800, 21); 
    var crossLog = new THREE.Mesh(crossLogGeometry,logMaterial);
    crossLog.position.set(550,0,10.5 - 1000);
    crossLog.name = "crossLog1";
    scene.add(crossLog);
    crossLogGeometry = new THREE.BoxGeometry(100, 800, 21); 
    crossLog = new THREE.Mesh(crossLogGeometry,logMaterial);
    crossLog.position.set(-550,0,10.5 - 1000);
    crossLog.name = "crossLog2";
    scene.add(crossLog);
    crossLogGeometry = new THREE.BoxGeometry(1200, 100, 21);
    crossLog = new THREE.Mesh(crossLogGeometry,logMaterial);
    crossLog.position.set(0,450,10.5 - 1000);
    crossLog.name = "crossLog3";
    scene.add(crossLog);
    crossLogGeometry = new THREE.BoxGeometry(1200, 100, 21);
    crossLog = new THREE.Mesh(crossLogGeometry,logMaterial);
    crossLog.position.set(0,-450,10.5 - 1000);
    crossLog.name = "crossLog4";
    scene.add(crossLog);
    crossLogGeometry = new THREE.BoxGeometry(1200, 100, 21);
    crossLog = new THREE.Mesh(crossLogGeometry,logMaterial);
    crossLog.position.set(0,0,10.5 - 1000);
    crossLog.name = "crossLog5";
    scene.add(crossLog);
    crossLogGeometry = new THREE.BoxGeometry(1200, 100, 21);
    crossLog = new THREE.Mesh(crossLogGeometry,logMaterial);
    crossLog.position.set(0,450,131.5 - 1000);
    crossLog.name = "crossLog6";
    scene.add(crossLog);
    crossLogGeometry = new THREE.BoxGeometry(1200, 100, 21);
    crossLog = new THREE.Mesh(crossLogGeometry,logMaterial);
    crossLog.position.set(0,-450,131.5 - 1000);
    crossLog.name = "crossLog7";
    scene.add(crossLog);
    crossLogGeometry = new THREE.BoxGeometry(1200, 100, 21);
    crossLog = new THREE.Mesh(crossLogGeometry,logMaterial);
    crossLog.position.set(0,0,131.5 - 1000);
    crossLog.name = "crossLog8";
    scene.add(crossLog);
    

    //Cubos de soporte.
    var supportCubeGeometry = new THREE.BoxGeometry(100, 100, 99);
    var supportCube = new THREE.Mesh(supportCubeGeometry,boxMaterial);
    supportCube.position.set(0,0,70.5 - 1000);
    supportCube.name = "supportCube1";
    scene.add(supportCube);
    supportCubeGeometry = new THREE.BoxGeometry(145, 100, 99);
    supportCube = new THREE.Mesh(supportCubeGeometry,boxMaterial);
    supportCube.position.set(527.5,0,70.5 - 1000);
    supportCube.name = "supportCube2";
    scene.add(supportCube);
    supportCubeGeometry = new THREE.BoxGeometry(145, 100, 99);
    supportCube = new THREE.Mesh(supportCubeGeometry,boxMaterial);
    supportCube.position.set(-527.5,0,70.5 - 1000);
    supportCube.name = "supportCube3";
    scene.add(supportCube);
    var supportCubeGeometry = new THREE.BoxGeometry(100, 100, 99);
    var supportCube = new THREE.Mesh(supportCubeGeometry,boxMaterial);
    supportCube.position.set(0,450,70.5 - 1000);
    supportCube.name = "supportCube4";
    scene.add(supportCube);
    supportCubeGeometry = new THREE.BoxGeometry(145, 100, 99);
    supportCube = new THREE.Mesh(supportCubeGeometry,boxMaterial);
    supportCube.position.set(527.5,450,70.5 - 1000);
    supportCube.name = "supportCube5";
    scene.add(supportCube);
    supportCubeGeometry = new THREE.BoxGeometry(145, 100, 99);
    supportCube = new THREE.Mesh(supportCubeGeometry,boxMaterial);
    supportCube.position.set(-527.5,450,70.5 - 1000);
    supportCube.name = "supportCube6";
    scene.add(supportCube);
    var supportCubeGeometry = new THREE.BoxGeometry(100, 100, 99);
    var supportCube = new THREE.Mesh(supportCubeGeometry,boxMaterial);
    supportCube.position.set(0,-450,70.5 - 1000);
    supportCube.name = "supportCube7";
    scene.add(supportCube);
    supportCubeGeometry = new THREE.BoxGeometry(145, 100, 99);
    supportCube = new THREE.Mesh(supportCubeGeometry,boxMaterial);
    supportCube.position.set(527.5,-450,70.5 - 1000);
    supportCube.name = "supportCube8";
    scene.add(supportCube);
    supportCubeGeometry = new THREE.BoxGeometry(145, 100, 99);
    supportCube = new THREE.Mesh(supportCubeGeometry,boxMaterial);
    supportCube.position.set(-527.5,-450,70.5 - 1000);
    supportCube.name = "supportCube9";
    scene.add(supportCube);
    

    //Listones principales.
    var mainLog_Geometry = new THREE.BoxGeometry(125, 1000, 21);
    var mainLog = new THREE.Mesh(mainLog_Geometry,logMaterial);
    mainLog.position.set(0,0,151.5 - 1000);
    mainLog.name = "mainLog1";
    scene.add(mainLog);
    mainLog_Geometry = new THREE.BoxGeometry(125, 1000, 21);
    mainLog = new THREE.Mesh(mainLog_Geometry,logMaterial);
    mainLog.position.set(-537.5,0,151.5 - 1000);
    mainLog.name = "mainLog2";
    scene.add(mainLog);
    mainLog_Geometry = new THREE.BoxGeometry(125, 1000, 21);
    mainLog = new THREE.Mesh(mainLog_Geometry,logMaterial);
    mainLog.position.set(-412.5,0,151.5 - 1000);
    mainLog.name = "mainLog3";
    scene.add(mainLog);
    mainLog_Geometry = new THREE.BoxGeometry(125, 1000, 21);
    mainLog = new THREE.Mesh(mainLog_Geometry,logMaterial);
    mainLog.position.set(537.5,0,151.5 - 1000);
    mainLog.name = "mainLog4";
    scene.add(mainLog);
    mainLog_Geometry = new THREE.BoxGeometry(125, 1000, 21);
    mainLog = new THREE.Mesh(mainLog_Geometry,logMaterial);
    mainLog.position.set(412.5,0,151.5 - 1000);
    mainLog.name = "mainLog5";
    scene.add(mainLog);
    mainLog_Geometry = new THREE.BoxGeometry(125, 1000, 21);
    mainLog = new THREE.Mesh(mainLog_Geometry,logMaterial);
    mainLog.position.set(137.5,0,151.5 - 1000);
    mainLog.name = "mainLog6";
    scene.add(mainLog);
    mainLog_Geometry = new THREE.BoxGeometry(125, 1000, 21);
    mainLog = new THREE.Mesh(mainLog_Geometry,logMaterial);
    mainLog.position.set(-137.5,0,151.5 - 1000);
    mainLog.name = "mainLog7";
    scene.add(mainLog);
    mainLog_Geometry = new THREE.BoxGeometry(125, 1000, 21);
    mainLog = new THREE.Mesh(mainLog_Geometry,logMaterial);
    mainLog.position.set(-275,0,151.5 - 1000);
    mainLog.name = "mainLog8";
    scene.add(mainLog);
    mainLog_Geometry = new THREE.BoxGeometry(125, 1000, 21);
    mainLog = new THREE.Mesh(mainLog_Geometry,logMaterial);
    mainLog.position.set(275,0,151.5 - 1000);
    mainLog.name = "mainLog9";
    scene.add(mainLog);
    

    //Inscripciones de los cubos de soporte.
    var label_Geometry = new THREE.BoxGeometry(100, 0.1, 78);
    var label = new THREE.Mesh(label_Geometry,label_info);
    label.position.set(0,500,70.5 - 1000);
    label.rotation.y = 180*Math.PI / 180;
    label.name = "label1";
    scene.add(label);
    label_Geometry = new THREE.BoxGeometry(100, 0.1, 78);
    label = new THREE.Mesh(label_Geometry,label_info);
    label.position.set(0,-500,70.5 - 1000);
    label.rotation.y = 0*Math.PI / 180;
    label.name = "label2";
    scene.add(label);
    label_Geometry = new THREE.BoxGeometry(100, 0.1, 78);
    label = new THREE.Mesh(label_Geometry,label_EUR);
    label.position.set(-530,500,70.5 - 1000);
    label.rotation.y = 180*Math.PI / 180;
    label.name = "label3";
    scene.add(label);
    label_Geometry = new THREE.BoxGeometry(100, 0.1, 78);
    label = new THREE.Mesh(label_Geometry,label_EUR);
    label.position.set(530,-500,70.5 - 1000);
    label.rotation.y = 0*Math.PI / 180;
    label.name = "label4";
    scene.add(label);
    label_Geometry = new THREE.BoxGeometry(100, 0.1, 78);
    label = new THREE.Mesh(label_Geometry,label_EPAL);
    label.position.set(530,500,70.5 - 1000);
    label.rotation.y = 180*Math.PI / 180;
    label.name = "label5";
    scene.add(label);
    label_Geometry = new THREE.BoxGeometry(100, 0.1, 78);
    label = new THREE.Mesh(label_Geometry,label_EPAL);
    label.position.set(-530,-500,70.5 - 1000);
    label.rotation.y = 0*Math.PI / 180;
    label.name = "label6";
    scene.add(label);
  }

  //Creación del pallet EUR3.
  function palletEUR3(){
    //Creación del material de los soportes en forma de cubo.
    var textureBoxPallet = new THREE.TextureLoader().load("pallet_textures/texture_palletCube.png", function(){ renderer.render(scene, camera);});
    var boxMaterial = new THREE.MeshBasicMaterial({map:textureBoxPallet})

    //Creación del material de los listones.
    var textureLogPallet = new THREE.TextureLoader().load("pallet_textures/texture_palletLog.png", function(){ renderer.render(scene, camera);});
    var logMaterial = new THREE.MeshBasicMaterial({map:textureLogPallet});

    //Creación del material de los soportes en forma de cubo con inscripciones.
    var textureLabel_info = new THREE.TextureLoader().load("pallet_textures/texture_palletCubeTag_info.png", function(){ renderer.render(scene, camera);});
    var label_info = new THREE.MeshBasicMaterial({map:textureLabel_info});
    var textureLabel_EPAL = new THREE.TextureLoader().load("pallet_textures/texture_palletCubeTag_EPAL.png", function(){ renderer.render(scene, camera);});
    var label_EPAL = new THREE.MeshBasicMaterial({map:textureLabel_EPAL});
    var textureLabel_EUR = new THREE.TextureLoader().load("pallet_textures/texture_palletCubeTag_EUR.png", function(){ renderer.render(scene, camera);});
    var label_EUR = new THREE.MeshBasicMaterial({map:textureLabel_EUR});
    

    //Listones transversales.
    var crossLogGeometry = new THREE.BoxGeometry(145, 1000, 22); 
    var crossLog = new THREE.Mesh(crossLogGeometry,logMaterial);
    crossLog.position.set(0,0,112.5 - 1000);
    crossLog.name = "crossLog1";
    scene.add(crossLog);
    crossLogGeometry = new THREE.BoxGeometry(145, 1000, 22);
    crossLog = new THREE.Mesh(crossLogGeometry,logMaterial);
    crossLog.position.set(527.5,0,112.5 - 1000);
    crossLog.name = "crossLog2";
    scene.add(crossLog);
    crossLogGeometry = new THREE.BoxGeometry(145, 1000, 22);
    crossLog = new THREE.Mesh(crossLogGeometry,logMaterial);
    crossLog.position.set(-527.5,0,112.5 - 1000);
    crossLog.name = "crossLog3";
    scene.add(crossLog);
    crossLogGeometry = new THREE.BoxGeometry(1200, 145, 22);
    crossLog = new THREE.Mesh(crossLogGeometry,logMaterial);
    crossLog.position.set(0,0,11 - 1000);
    crossLog.name = "crossLog4";
    scene.add(crossLog);
    crossLogGeometry = new THREE.BoxGeometry(1200, 145, 22);
    crossLog = new THREE.Mesh(crossLogGeometry,logMaterial);
    crossLog.position.set(0,427.5,11 - 1000);
    crossLog.name = "crossLog5";
    scene.add(crossLog);
    crossLogGeometry = new THREE.BoxGeometry(1200, 145, 22);
    crossLog = new THREE.Mesh(crossLogGeometry,logMaterial);
    crossLog.position.set(0,-427.5,11 - 1000);
    crossLog.name = "crossLog6";
    scene.add(crossLog);


    //Cubos de soporte.
    var supportCubeGeometry = new THREE.BoxGeometry(145, 145, 81);
    var supportCube = new THREE.Mesh(supportCubeGeometry,boxMaterial);
    supportCube.position.set(0,0,61.5 - 1000);
    supportCube.name = "supportCube1";
    scene.add(supportCube);
    supportCubeGeometry = new THREE.BoxGeometry(145, 145, 81);
    supportCube = new THREE.Mesh(supportCubeGeometry,boxMaterial);
    supportCube.position.set(527.5,0,61.5 - 1000);
    supportCube.name = "supportCube2";
    scene.add(supportCube);
    supportCubeGeometry = new THREE.BoxGeometry(145, 145, 81);
    supportCube = new THREE.Mesh(supportCubeGeometry,boxMaterial);
    supportCube.position.set(-527.5,0,61.5 - 1000);
    supportCube.name = "supportCube3";
    scene.add(supportCube);
    supportCubeGeometry = new THREE.BoxGeometry(145, 145, 81);
    supportCube = new THREE.Mesh(supportCubeGeometry,boxMaterial);
    supportCube.position.set(0,-427.5,61.5 - 1000);
    supportCube.name = "supportCube4";
    scene.add(supportCube);
    supportCubeGeometry = new THREE.BoxGeometry(145, 145, 81);
    supportCube = new THREE.Mesh(supportCubeGeometry,boxMaterial);
    supportCube.position.set(527.5,-427.5,61.5 - 1000);
    supportCube.name = "supportCube5";
    scene.add(supportCube);
    supportCubeGeometry = new THREE.BoxGeometry(145, 145, 81);
    supportCube = new THREE.Mesh(supportCubeGeometry,boxMaterial);
    supportCube.position.set(-527.5,-427.5,61.5 - 1000);
    supportCube.name = "supportCube6";
    scene.add(supportCube);
    supportCubeGeometry = new THREE.BoxGeometry(145, 145, 81);
    supportCube = new THREE.Mesh(supportCubeGeometry,boxMaterial);
    supportCube.position.set(0,427.5,61.5 - 1000);
    supportCube.name = "supportCube7";
    scene.add(supportCube);
    supportCubeGeometry = new THREE.BoxGeometry(145, 145, 81);
    supportCube = new THREE.Mesh(supportCubeGeometry,boxMaterial);
    supportCube.position.set(527.5,427.5,61.5 - 1000);
    supportCube.name = "supportCube8";
    scene.add(supportCube);
    supportCubeGeometry = new THREE.BoxGeometry(145, 145, 81);
    supportCube = new THREE.Mesh(supportCubeGeometry,boxMaterial);
    supportCube.position.set(-527.5,427.5,61.5 - 1000);
    supportCube.name = "supportCube9";
    scene.add(supportCube);


    //Listones principales.
    var mainLog_Geometry = new THREE.BoxGeometry(1200, 145, 22);
    var mainLog = new THREE.Mesh(mainLog_Geometry,logMaterial);
    mainLog.position.set(0,427.5,133.5 - 1000);
    mainLog.name = "mainLog1";
    scene.add(mainLog);
    mainLog_Geometry = new THREE.BoxGeometry(1200, 145, 22);
    mainLog = new THREE.Mesh(mainLog_Geometry,logMaterial);
    mainLog.position.set(0,0,133.5 - 1000);
    mainLog.name = "mainLog2";
    scene.add(mainLog);
    mainLog_Geometry = new THREE.BoxGeometry(1200, 145, 22);
    mainLog = new THREE.Mesh(mainLog_Geometry,logMaterial);
    mainLog.position.set(0,-427.5,133.5 - 1000);
    mainLog.name = "mainLog3";
    scene.add(mainLog);
    mainLog_Geometry = new THREE.BoxGeometry(1200, 145, 22);
    mainLog = new THREE.Mesh(mainLog_Geometry,logMaterial);
    mainLog.position.set(0,-427.5,133.5 - 1000);
    mainLog.name = "mainLog4";
    scene.add(mainLog);
    mainLog_Geometry = new THREE.BoxGeometry(1200, 145, 22);
    mainLog = new THREE.Mesh(mainLog_Geometry,logMaterial);
    mainLog.position.set(0,427.5,133.5 - 1000);
    mainLog.name = "mainLog5";
    scene.add(mainLog);
    mainLog_Geometry = new THREE.BoxGeometry(1200, 100, 22);
    mainLog = new THREE.Mesh(mainLog_Geometry,logMaterial);
    mainLog.position.set(0,-300,133.5 - 1000);
    mainLog.name = "mainLog6";
    scene.add(mainLog);
    mainLog_Geometry = new THREE.BoxGeometry(1200, 100, 22);
    mainLog = new THREE.Mesh(mainLog_Geometry,logMaterial);
    mainLog.position.set(0,300,133.5 - 1000);
    mainLog.name = "mainLog7";
    scene.add(mainLog);
    mainLog_Geometry = new THREE.BoxGeometry(1200, 100, 22);
    mainLog = new THREE.Mesh(mainLog_Geometry,logMaterial);
    mainLog.position.set(0,-157.5,133.5 - 1000);
    mainLog.name = "mainLog8";
    scene.add(mainLog);
    mainLog_Geometry = new THREE.BoxGeometry(1200, 100, 22);
    mainLog = new THREE.Mesh(mainLog_Geometry,logMaterial);
    mainLog.position.set(0,157.5,133.5 - 1000);
    mainLog.name = "mainLog9";
    scene.add(mainLog);
    

    //Inscripciones de los cubos de soporte.
    var label_Geometry = new THREE.BoxGeometry(100, 0.1, 78);
    var label = new THREE.Mesh(label_Geometry,label_info);
    label.position.set(0,500,61 - 1000);
    label.rotation.y = 180*Math.PI / 180;
    label.name = "label1";
    scene.add(label);
    label_Geometry = new THREE.BoxGeometry(100, 0.1, 78);
    label = new THREE.Mesh(label_Geometry,label_info);
    label.position.set(0,-500,61 - 1000);
    label.rotation.y = 0*Math.PI / 180;
    label.name = "label2";
    scene.add(label);
    label_Geometry = new THREE.BoxGeometry(100, 0.1, 78);
    label = new THREE.Mesh(label_Geometry,label_EUR);
    label.position.set(-530,500,61 - 1000);
    label.rotation.y = 180*Math.PI / 180;
    label.name = "label3";
    scene.add(label);
    label_Geometry = new THREE.BoxGeometry(100, 0.1, 78);
    label = new THREE.Mesh(label_Geometry,label_EUR);
    label.position.set(530,-500,61 - 1000);
    label.rotation.y = 0*Math.PI / 180;
    label.name = "label4";
    scene.add(label);
    label_Geometry = new THREE.BoxGeometry(100, 0.1, 78);
    label = new THREE.Mesh(label_Geometry,label_EPAL);
    label.position.set(530,500,61 - 1000);
    label.rotation.y = 180*Math.PI / 180;
    label.name = "label5";
    scene.add(label);
    label_Geometry = new THREE.BoxGeometry(100, 0.1, 78);
    label = new THREE.Mesh(label_Geometry,label_EPAL);
    label.position.set(-530,-500,61 - 1000);
    label.rotation.y = 0*Math.PI / 180;
    label.name = "label6";
    scene.add(label);
  }

  //Creación del pallet EUR6.
  function palletEUR6(){
    //Creación del material de los soportes en forma de cubo.
    var textureBoxPallet = new THREE.TextureLoader().load("pallet_textures/texture_palletCube.png", function(){ renderer.render(scene, camera);});
    var boxMaterial = new THREE.MeshBasicMaterial({map:textureBoxPallet})

    //Creación del material de los listones.
    var textureLogPallet = new THREE.TextureLoader().load("pallet_textures/texture_palletLog.png", function(){ renderer.render(scene, camera);});
    var logMaterial = new THREE.MeshBasicMaterial({map:textureLogPallet});

    //Creación del material de los soportes en forma de cubo con inscripciones.
    var textureLabel_info = new THREE.TextureLoader().load("pallet_textures/texture_palletCubeTag_info.png", function(){ renderer.render(scene, camera);});
    var label_info = new THREE.MeshBasicMaterial({map:textureLabel_info});
    var textureLabel_EPAL = new THREE.TextureLoader().load("pallet_textures/texture_palletCubeTag_EPAL.png", function(){ renderer.render(scene, camera);});
    var label_EPAL = new THREE.MeshBasicMaterial({map:textureLabel_EPAL});
    var textureLabel_EUR = new THREE.TextureLoader().load("pallet_textures/texture_palletCubeTag_EUR.png", function(){ renderer.render(scene, camera);});
    var label_EUR = new THREE.MeshBasicMaterial({map:textureLabel_EUR});
    

    //Listones transversales.
    var crossLogGeometry = new THREE.BoxGeometry(100, 800, 22); 
    var crossLog = new THREE.Mesh(crossLogGeometry,logMaterial);
    crossLog.position.set(0,0,111 - 1000);
    crossLog.name = "crossLog1";
    scene.add(crossLog);
    crossLogGeometry = new THREE.BoxGeometry(100, 800, 22);
    crossLog = new THREE.Mesh(crossLogGeometry,logMaterial);
    crossLog.position.set(250,0,111 - 1000);
    crossLog.name = "crossLog2";
    scene.add(crossLog);
    crossLogGeometry = new THREE.BoxGeometry(100, 800, 22);
    crossLog = new THREE.Mesh(crossLogGeometry,logMaterial);
    crossLog.position.set(-250,0,111 - 1000);
    crossLog.name = "crossLog3";
    scene.add(crossLog);


    //Cubos de soporte.
    var supportCubeGeometry = new THREE.BoxGeometry(100, 100, 78);
    var supportCube = new THREE.Mesh(supportCubeGeometry,boxMaterial);
    supportCube.position.set(0,0,61 - 1000);
    supportCube.name = "supportCube1";
    scene.add(supportCube);
    supportCubeGeometry = new THREE.BoxGeometry(100, 100, 78);
    supportCube = new THREE.Mesh(supportCubeGeometry,boxMaterial);
    supportCube.position.set(250,0,61 - 1000);
    supportCube.name = "supportCube2";
    scene.add(supportCube);
    supportCubeGeometry = new THREE.BoxGeometry(100, 100, 78);
    supportCube = new THREE.Mesh(supportCubeGeometry,boxMaterial);
    supportCube.position.set(-250,0,61 - 1000);
    supportCube.name = "supportCube3";
    scene.add(supportCube);
    supportCubeGeometry = new THREE.BoxGeometry(100, 100, 78);
    supportCube = new THREE.Mesh(supportCubeGeometry,boxMaterial);
    supportCube.position.set(0,-350,61 - 1000);
    supportCube.name = "supportCube4";
    scene.add(supportCube);
    supportCubeGeometry = new THREE.BoxGeometry(100, 100, 78);
    supportCube = new THREE.Mesh(supportCubeGeometry,boxMaterial);
    supportCube.position.set(250,-350,61 - 1000);
    supportCube.name = "supportCube5";
    scene.add(supportCube);
    supportCubeGeometry = new THREE.BoxGeometry(100, 100, 78);
    supportCube = new THREE.Mesh(supportCubeGeometry,boxMaterial);
    supportCube.position.set(-250,-350,61 - 1000);
    supportCube.name = "supportCube6";
    scene.add(supportCube);
    supportCubeGeometry = new THREE.BoxGeometry(100, 100, 78);
    supportCube = new THREE.Mesh(supportCubeGeometry,boxMaterial);
    supportCube.position.set(0,350,61 - 1000);
    supportCube.name = "supportCube7";
    scene.add(supportCube);
    supportCubeGeometry = new THREE.BoxGeometry(100, 100, 78);
    supportCube = new THREE.Mesh(supportCubeGeometry,boxMaterial);
    supportCube.position.set(250,350,61 - 1000);
    supportCube.name = "supportCube8";
    scene.add(supportCube);
    supportCubeGeometry = new THREE.BoxGeometry(100, 100, 78);
    supportCube = new THREE.Mesh(supportCubeGeometry,boxMaterial);
    supportCube.position.set(-250,350,61 - 1000);
    supportCube.name = "supportCube9";
    scene.add(supportCube);


    //Listones principales.
    var mainLog_Geometry = new THREE.BoxGeometry(600, 100, 22);
    var mainLog = new THREE.Mesh(mainLog_Geometry,logMaterial);
    mainLog.position.set(0,350,11 - 1000);
    mainLog.name = "mainLog1";
    scene.add(mainLog);
    mainLog_Geometry = new THREE.BoxGeometry(600, 100, 22);
    mainLog = new THREE.Mesh(mainLog_Geometry,logMaterial);
    mainLog.position.set(0,0,11 - 1000);
    mainLog.name = "mainLog2";
    scene.add(mainLog);
    mainLog_Geometry = new THREE.BoxGeometry(600, 100, 22);
    mainLog = new THREE.Mesh(mainLog_Geometry,logMaterial);
    mainLog.position.set(0,-350,11 - 1000);
    mainLog.name = "mainLog3";
    scene.add(mainLog);
    mainLog_Geometry = new THREE.BoxGeometry(600, 100, 22);
    mainLog = new THREE.Mesh(mainLog_Geometry,logMaterial);
    mainLog.position.set(0,350,133 - 1000);
    mainLog.name = "mainLog4";
    scene.add(mainLog);
    mainLog_Geometry = new THREE.BoxGeometry(600, 100, 22);
    mainLog = new THREE.Mesh(mainLog_Geometry,logMaterial);
    mainLog.position.set(0,0,133 - 1000);
    mainLog.name = "mainLog5";
    scene.add(mainLog);
    mainLog_Geometry = new THREE.BoxGeometry(600, 100, 22);
    mainLog = new THREE.Mesh(mainLog_Geometry,logMaterial);
    mainLog.position.set(0,-350,133 - 1000);
    mainLog.name = "mainLog6";
    scene.add(mainLog);
    mainLog_Geometry = new THREE.BoxGeometry(600, 100, 22);
    mainLog = new THREE.Mesh(mainLog_Geometry,logMaterial);
    mainLog.position.set(0,116.67,133 - 1000);
    mainLog.name = "mainLog7";
    scene.add(mainLog);
    mainLog_Geometry = new THREE.BoxGeometry(600, 100, 22);
    mainLog = new THREE.Mesh(mainLog_Geometry,logMaterial);
    mainLog.position.set(0,233.34,133 - 1000);
    mainLog.name = "mainLog8";
    scene.add(mainLog);
    mainLog_Geometry = new THREE.BoxGeometry(600, 100, 22);
    mainLog = new THREE.Mesh(mainLog_Geometry,logMaterial);
    mainLog.position.set(0,-116.67,133 - 1000);
    mainLog.name = "mainLog9";
    scene.add(mainLog);
    mainLog_Geometry = new THREE.BoxGeometry(600, 100, 22);
    mainLog = new THREE.Mesh(mainLog_Geometry,logMaterial);
    mainLog.position.set(0,-233.34,133 - 1000);
    mainLog.name = "mainLog10";
    scene.add(mainLog);


    //Inscripciones de los cubos de soporte.
    var label_Geometry = new THREE.BoxGeometry(100, 0.1, 78);
    var label = new THREE.Mesh(label_Geometry,label_info);
    label.position.set(300,0,61 - 1000);
    label.rotation.y = 180*Math.PI / 180;
    label.rotation.z = 90*Math.PI / 180;
    label.name = "label1";
    scene.add(label);
    label_Geometry = new THREE.BoxGeometry(100, 0.1, 78);
    label = new THREE.Mesh(label_Geometry,label_info);
    label.position.set(-300,0,61 - 1000);
    label.rotation.x = 180*Math.PI / 180;
    label.rotation.z = 90*Math.PI / 180;
    label.name = "label2";
    scene.add(label);
    label_Geometry = new THREE.BoxGeometry(100, 0.1, 78);
    label = new THREE.Mesh(label_Geometry,label_EUR);
    label.position.set(300,350,61 - 1000);
    label.rotation.z = 90*Math.PI / 180;
    label.name = "label3";
    scene.add(label);
    label_Geometry = new THREE.BoxGeometry(100, 0.1, 78);
    label = new THREE.Mesh(label_Geometry,label_EUR);
    label.position.set(-300,-350,61 - 1000);
    label.rotation.x = 180*Math.PI / 180;
    label.rotation.z = 90*Math.PI / 180;
    label.name = "label4";
    scene.add(label);
    label_Geometry = new THREE.BoxGeometry(100, 0.1, 78);
    label = new THREE.Mesh(label_Geometry,label_EPAL);
    label.position.set(-300,350,61 - 1000);
    label.rotation.x = 180*Math.PI / 180;
    label.rotation.z = 90*Math.PI / 180;
    label.name = "label5";
    scene.add(label);
    label_Geometry = new THREE.BoxGeometry(100, 0.1, 78);
    label = new THREE.Mesh(label_Geometry,label_EPAL);
    label.position.set(300,-350,61 - 1000);
    label.rotation.z = 90*Math.PI / 180;
    label.name = "label6";
    scene.add(label);
  }

  //Creación del pallet USA1.
  function palletUSA1(){
    //Creación del material de los listones.
    var textureLogPallet = new THREE.TextureLoader().load("pallet_textures/texture_palletLog.png", function(){ renderer.render(scene, camera);});
    var logMaterial = new THREE.MeshBasicMaterial({map:textureLogPallet});  

    //Listones transversales.
    var crossLogGeometry = new THREE.BoxGeometry(33, 137.6, 66.80); 
    var crossLog = new THREE.Mesh(crossLogGeometry,logMaterial);
    crossLog.position.set(0,540.7,41.3 - 1000);
    crossLog.name = "crossLog1";
    scene.add(crossLog);
    crossLogGeometry = new THREE.BoxGeometry(33, 137.6, 66.80); 
    crossLog = new THREE.Mesh(crossLogGeometry,logMaterial);
    crossLog.position.set(491.5,540.7,41.3 - 1000);
    crossLog.name = "crossLog2";
    scene.add(crossLog);
    crossLogGeometry = new THREE.BoxGeometry(33, 137.6, 66.80); 
    crossLog = new THREE.Mesh(crossLogGeometry,logMaterial);
    crossLog.position.set(-491.5,540.7,41.3 - 1000);
    crossLog.name = "crossLog3";
    scene.add(crossLog);
    crossLogGeometry = new THREE.BoxGeometry(33, 137.6, 66.80); 
    crossLog = new THREE.Mesh(crossLogGeometry,logMaterial);
    crossLog.position.set(0,-540.7,41.3 - 1000);
    crossLog.name = "crossLog4";
    scene.add(crossLog);
    crossLogGeometry = new THREE.BoxGeometry(33, 137.6, 66.80); 
    crossLog = new THREE.Mesh(crossLogGeometry,logMaterial);
    crossLog.position.set(491.5,-540.7,41.3 - 1000);
    crossLog.name = "crossLog5";
    scene.add(crossLog);
    crossLogGeometry = new THREE.BoxGeometry(33, 137.6, 66.80); 
    crossLog = new THREE.Mesh(crossLogGeometry,logMaterial);
    crossLog.position.set(-491.5,-540.7,41.3 - 1000);
    crossLog.name = "crossLog6";
    scene.add(crossLog);
    crossLogGeometry = new THREE.BoxGeometry(33, 412.8, 66.80); 
    crossLog = new THREE.Mesh(crossLogGeometry,logMaterial);
    crossLog.position.set(0,0,41.3 - 1000);
    crossLog.name = "crossLog7";
    scene.add(crossLog);
    crossLogGeometry = new THREE.BoxGeometry(33, 412.8, 66.80); 
    crossLog = new THREE.Mesh(crossLogGeometry,logMaterial);
    crossLog.position.set(491.5,0,41.3 - 1000);
    crossLog.name = "crossLog8";
    scene.add(crossLog);
    crossLogGeometry = new THREE.BoxGeometry(33, 412.8, 66.80); 
    crossLog = new THREE.Mesh(crossLogGeometry,logMaterial);
    crossLog.position.set(-491.5,0,41.3 - 1000);
    crossLog.name = "crossLog9";
    scene.add(crossLog);
    crossLogGeometry = new THREE.BoxGeometry(33, 265.5, 44.75); 
    crossLog = new THREE.Mesh(crossLogGeometry,logMaterial);
    crossLog.position.set(0,339.15,52.65 - 1000);
    crossLog.name = "crossLog10";
    scene.add(crossLog);
    crossLogGeometry = new THREE.BoxGeometry(33, 265.5, 44.75); 
    crossLog = new THREE.Mesh(crossLogGeometry,logMaterial);
    crossLog.position.set(491.5,339.15,52.65 - 1000);
    crossLog.name = "crossLog11";
    scene.add(crossLog);
    crossLogGeometry = new THREE.BoxGeometry(33, 265.5, 44.75); 
    crossLog = new THREE.Mesh(crossLogGeometry,logMaterial);
    crossLog.position.set(-491.5,339.15,52.65 - 1000);
    crossLog.name = "crossLog12";
    scene.add(crossLog);
    crossLogGeometry = new THREE.BoxGeometry(33, 265.5, 44.75); 
    crossLog = new THREE.Mesh(crossLogGeometry,logMaterial);
    crossLog.position.set(0,-339.15,52.65 - 1000);
    crossLog.name = "crossLog13";
    scene.add(crossLog);
    crossLogGeometry = new THREE.BoxGeometry(33, 265.5, 44.75); 
    crossLog = new THREE.Mesh(crossLogGeometry,logMaterial);
    crossLog.position.set(491.5,-339.15,52.65 - 1000);
    crossLog.name = "crossLog14";
    scene.add(crossLog);
    crossLogGeometry = new THREE.BoxGeometry(33, 265.5, 44.75); 
    crossLog = new THREE.Mesh(crossLogGeometry,logMaterial);
    crossLog.position.set(-491.5,-339.15,52.65 - 1000);
    crossLog.name = "crossLog15";
    scene.add(crossLog);
    crossLogGeometry = new THREE.BoxGeometry(1016, 82.55, 7.9);
    crossLog = new THREE.Mesh(crossLogGeometry,logMaterial);
    crossLog.position.set(0,0,3.95 - 1000);
    crossLog.name = "crossLog16";
    scene.add(crossLog);  
    crossLogGeometry = new THREE.BoxGeometry(1016, 137.6, 7.9);
    crossLog = new THREE.Mesh(crossLogGeometry,logMaterial);
    crossLog.position.set(0,540.7,3.95 - 1000);
    crossLog.name = "crossLog17";
    scene.add(crossLog);  
    crossLogGeometry = new THREE.BoxGeometry(1016, 137.6, 7.9);
    crossLog = new THREE.Mesh(crossLogGeometry,logMaterial);
    crossLog.position.set(0,-540.7,3.95 - 1000);
    crossLog.name = "crossLog18";
    scene.add(crossLog);
    crossLogGeometry = new THREE.BoxGeometry(1016, 82.55, 7.9);
    crossLog = new THREE.Mesh(crossLogGeometry,logMaterial);
    crossLog.position.set(0,165.1,3.95 - 1000);
    crossLog.name = "crossLog19";
    scene.add(crossLog); 
    crossLogGeometry = new THREE.BoxGeometry(1016, 82.55, 7.9);
    crossLog = new THREE.Mesh(crossLogGeometry,logMaterial);
    crossLog.position.set(0,-165.1,3.95 - 1000);
    crossLog.name = "crossLog20";
    scene.add(crossLog);  


    //Listones principales.
    var mainLog_Geometry = new THREE.BoxGeometry(1016, 82.55, 7.9);
    var mainLog = new THREE.Mesh(mainLog_Geometry,logMaterial);
    mainLog.position.set(0,0,78.65 - 1000);
    mainLog.name = "mainLog1";
    scene.add(mainLog);  
    mainLog_Geometry = new THREE.BoxGeometry(1016, 137.6, 7.9);
    mainLog = new THREE.Mesh(mainLog_Geometry,logMaterial);
    mainLog.position.set(0,540.7,78.65 - 1000);
    mainLog.name = "mainLog2";
    scene.add(mainLog);
    mainLog_Geometry = new THREE.BoxGeometry(1016, 137.6, 7.9);
    mainLog = new THREE.Mesh(mainLog_Geometry,logMaterial);
    mainLog.position.set(0,-540.7,78.65 - 1000);
    mainLog.name = "mainLog3";
    scene.add(mainLog);
    mainLog_Geometry = new THREE.BoxGeometry(1016, 82.55, 7.9);
    mainLog = new THREE.Mesh(mainLog_Geometry,logMaterial);
    mainLog.position.set(0,165.1,78.65 - 1000);
    mainLog.name = "mainLog4";
    scene.add(mainLog);  
    mainLog_Geometry = new THREE.BoxGeometry(1016, 82.55, 7.9);
    mainLog = new THREE.Mesh(mainLog_Geometry,logMaterial);
    mainLog.position.set(0,330.2,78.65 - 1000);
    mainLog.name = "mainLog5";
    scene.add(mainLog);  
    mainLog_Geometry = new THREE.BoxGeometry(1016, 82.55, 7.9);
    mainLog = new THREE.Mesh(mainLog_Geometry,logMaterial);
    mainLog.position.set(0,-165.1,78.65 - 1000);
    mainLog.name = "mainLog6";
    scene.add(mainLog);  
    mainLog_Geometry = new THREE.BoxGeometry(1016, 82.55, 7.9);
    mainLog = new THREE.Mesh(mainLog_Geometry,logMaterial);
    mainLog.position.set(0,-330.2,78.65 - 1000);
    mainLog.name = "mainLog7";
    scene.add(mainLog); 
  }

  //Creación del pallet USA2.
  function palletUSA2(){
    //Creación del material de los listones.
    var textureLogPallet = new THREE.TextureLoader().load("pallet_textures/texture_palletLog.png", function(){ renderer.render(scene, camera);});
    var logMaterial = new THREE.MeshBasicMaterial({map:textureLogPallet});  

    //Listones transversales.
    var crossLogGeometry = new THREE.BoxGeometry(1067, 33, 66.80); 
    var crossLog = new THREE.Mesh(crossLogGeometry,logMaterial);
    crossLog.position.set(0,517,41.3 - 1000);
    crossLog.name = "crossLog1";
    scene.add(crossLog);
    crossLogGeometry = new THREE.BoxGeometry(1067, 33, 66.80); 
    crossLog = new THREE.Mesh(crossLogGeometry,logMaterial);
    crossLog.position.set(0,0,41.3 - 1000);
    crossLog.name = "crossLog2";
    scene.add(crossLog);
    crossLogGeometry = new THREE.BoxGeometry(1067, 33, 66.80); 
    crossLog = new THREE.Mesh(crossLogGeometry,logMaterial);
    crossLog.position.set(0,-517,41.3 - 1000);
    crossLog.name = "crossLog3";
    scene.add(crossLog);
    crossLogGeometry = new THREE.BoxGeometry(82.55, 1067, 7.9); 
    crossLog = new THREE.Mesh(crossLogGeometry,logMaterial);
    crossLog.position.set(0,0,3.95 - 1000);
    crossLog.name = "crossLog4";
    scene.add(crossLog);
    crossLogGeometry = new THREE.BoxGeometry(82.55, 1067, 7.9); 
    crossLog = new THREE.Mesh(crossLogGeometry,logMaterial);
    crossLog.position.set(492.2,0,3.95 - 1000);
    crossLog.name = "crossLog5";
    scene.add(crossLog);
    crossLogGeometry = new THREE.BoxGeometry(82.55, 1067, 7.9); 
    crossLog = new THREE.Mesh(crossLogGeometry,logMaterial);
    crossLog.position.set(-492.2,0,3.95 - 1000);
    crossLog.name = "crossLog6";
    scene.add(crossLog);
    

    //Listones principales.
    var mainLog_Geometry = new THREE.BoxGeometry(137.6, 1067, 7.9);
    var mainLog = new THREE.Mesh(mainLog_Geometry,logMaterial);
    mainLog.position.set(0,0,78.65 - 1000);
    mainLog.name = "mainLog1";
    scene.add(mainLog);  
    mainLog_Geometry = new THREE.BoxGeometry(137.6, 1067, 7.9);
    mainLog = new THREE.Mesh(mainLog_Geometry,logMaterial);
    mainLog.position.set(464.7,0,78.65 - 1000);
    mainLog.name = "mainLog2";
    scene.add(mainLog); 
    mainLog_Geometry = new THREE.BoxGeometry(137.6, 1067, 7.9);
    mainLog = new THREE.Mesh(mainLog_Geometry,logMaterial);
    mainLog.position.set(-464.7,0,78.65 - 1000);
    mainLog.name = "mainLog3";
    scene.add(mainLog); 
    mainLog_Geometry = new THREE.BoxGeometry(137.6, 1067, 7.9);
    mainLog = new THREE.Mesh(mainLog_Geometry,logMaterial);
    mainLog.position.set(-154.9,0,78.65 - 1000);
    mainLog.name = "mainLog4";
    scene.add(mainLog); 
    mainLog_Geometry = new THREE.BoxGeometry(137.6, 1067, 7.9);
    mainLog = new THREE.Mesh(mainLog_Geometry,logMaterial);
    mainLog.position.set(-309.8,0,78.65 - 1000);
    mainLog.name = "mainLog5";
    scene.add(mainLog);
    mainLog_Geometry = new THREE.BoxGeometry(137.6, 1067, 7.9);
    mainLog = new THREE.Mesh(mainLog_Geometry,logMaterial);
    mainLog.position.set(154.9,0,78.65 - 1000);
    mainLog.name = "mainLog6";
    scene.add(mainLog); 
    mainLog_Geometry = new THREE.BoxGeometry(137.6, 1067, 7.9);
    mainLog = new THREE.Mesh(mainLog_Geometry,logMaterial);
    mainLog.position.set(309.8,0,78.65 - 1000);
    mainLog.name = "mainLog7";
    scene.add(mainLog);
  }

  //Creación del pallet personalizado.
  function palletCustom(lenght, width, height){
    //Creación del material de los listones.
    var logMaterial = [];

    var textureLogPallet1 = new THREE.TextureLoader().load("pallet_textures/texture_palletLog.png", function(){ renderer.render(scene, camera);});
    var textureLogPallet2 = new THREE.TextureLoader().load("pallet_textures/texture_palletLog.png", function(){ renderer.render(scene, camera);});
    var textureLogPallet3 = new THREE.TextureLoader().load("pallet_textures/texture_palletLog.png", function(){ renderer.render(scene, camera);});
    var textureLogPallet4 = new THREE.TextureLoader().load("pallet_textures/texture_palletLog.png", function(){ renderer.render(scene, camera);});
    var textureLogPallet5 = new THREE.TextureLoader().load("pallet_textures/texture_palletCube.png", function(){ renderer.render(scene, camera);});
    var textureLogPallet6 = new THREE.TextureLoader().load("pallet_textures/texture_palletCube.png", function(){ renderer.render(scene, camera);});

    logMaterial.push(new THREE.MeshBasicMaterial({map:textureLogPallet1}));
    logMaterial.push(new THREE.MeshBasicMaterial({map:textureLogPallet2}));
    logMaterial.push(new THREE.MeshBasicMaterial({map:textureLogPallet3}));
    logMaterial.push(new THREE.MeshBasicMaterial({map:textureLogPallet4}));
    logMaterial.push(new THREE.MeshBasicMaterial({map:textureLogPallet5, color: 0x8d8e8f}));
    logMaterial.push(new THREE.MeshBasicMaterial({map:textureLogPallet6, color: 0x000f00}));

    //Pallet completo.
    var crossLogGeometry = new THREE.BoxGeometry(lenght, width, height); 
    var crossLog = new THREE.Mesh(crossLogGeometry,logMaterial);
    crossLog.position.set(0,0,0 - 1000);
    crossLog.name = "mainLog1";
    scene.add(crossLog);

  }

  //Destruye de la escena el pallet EUR1.
  function deletePallet(){
    scene.remove(scene.getObjectByName("crossLog1"));
    scene.remove(scene.getObjectByName("crossLog2"));
    scene.remove(scene.getObjectByName("crossLog3"));
    scene.remove(scene.getObjectByName("crossLog4"));
    scene.remove(scene.getObjectByName("crossLog5"));
    scene.remove(scene.getObjectByName("crossLog6"));
    scene.remove(scene.getObjectByName("crossLog7"));
    scene.remove(scene.getObjectByName("crossLog8"));
    scene.remove(scene.getObjectByName("crossLog9"));
    scene.remove(scene.getObjectByName("crossLog10"));
    scene.remove(scene.getObjectByName("crossLog11"));
    scene.remove(scene.getObjectByName("crossLog12"));
    scene.remove(scene.getObjectByName("crossLog13"));
    scene.remove(scene.getObjectByName("crossLog14"));
    scene.remove(scene.getObjectByName("crossLog15"));
    scene.remove(scene.getObjectByName("crossLog16"));
    scene.remove(scene.getObjectByName("crossLog17"));
    scene.remove(scene.getObjectByName("crossLog18"));
    scene.remove(scene.getObjectByName("crossLog19"));
    scene.remove(scene.getObjectByName("crossLog20"));


    scene.remove(scene.getObjectByName("supportCube1"));
    scene.remove(scene.getObjectByName("supportCube2"));
    scene.remove(scene.getObjectByName("supportCube3"));
    scene.remove(scene.getObjectByName("supportCube4"));
    scene.remove(scene.getObjectByName("supportCube5"));
    scene.remove(scene.getObjectByName("supportCube6"));
    scene.remove(scene.getObjectByName("supportCube7"));
    scene.remove(scene.getObjectByName("supportCube8"));
    scene.remove(scene.getObjectByName("supportCube9"));
    scene.remove(scene.getObjectByName("supportCube10"));

    scene.remove(scene.getObjectByName("mainLog1"));
    scene.remove(scene.getObjectByName("mainLog2"));
    scene.remove(scene.getObjectByName("mainLog3"));
    scene.remove(scene.getObjectByName("mainLog4"));
    scene.remove(scene.getObjectByName("mainLog5"));
    scene.remove(scene.getObjectByName("mainLog6"));
    scene.remove(scene.getObjectByName("mainLog7"));
    scene.remove(scene.getObjectByName("mainLog8"));
    scene.remove(scene.getObjectByName("mainLog9"));
    scene.remove(scene.getObjectByName("mainLog10"));

    scene.remove(scene.getObjectByName("label1"));
    scene.remove(scene.getObjectByName("label2"));
    scene.remove(scene.getObjectByName("label3"));
    scene.remove(scene.getObjectByName("label4"));
    scene.remove(scene.getObjectByName("label5"));
    scene.remove(scene.getObjectByName("label6"));
    scene.remove(scene.getObjectByName("label7"));
    scene.remove(scene.getObjectByName("label8"));
    scene.remove(scene.getObjectByName("label9"));
    scene.remove(scene.getObjectByName("label10"));
  }

//#endregion

//Pone las cajas en el pallet (posiciones impar/par; rotaciones impar/par; etiquetas impar/par; pisos totales; altura de caja; altura de pallet; máxima altura del pallet con cajas).
function placeBoxes(oddBoxes,evenBoxes,frontLabel,rightLabel,leftLabel,backLabel,totalLayers,boxLenght,boxWidth,boxHeight,palletHeight){
  blockInputs();
  deleteLayers();

  var textureBox1 = new THREE.TextureLoader().load("box_texture/cardboard.png", function(){ renderer.render(scene, camera);});
  var textureBox2 = new THREE.TextureLoader().load("box_texture/cardboard.png", function(){ renderer.render(scene, camera);});
  var textureBox3 = new THREE.TextureLoader().load("box_texture/cardboard.png", function(){ renderer.render(scene, camera);});
  var textureBox4 = new THREE.TextureLoader().load("box_texture/cardboard.png", function(){ renderer.render(scene, camera);});
  var textureBox5 = new THREE.TextureLoader().load("box_texture/0000.png", function(){ renderer.render(scene, camera);});
  var textureBox6 = new THREE.TextureLoader().load("box_texture/cardboard.png", function(){ renderer.render(scene, camera);});
  var textureInterlayer = new THREE.TextureLoader().load("box_texture/interlayer_texture.png", function(){ renderer.render(scene, camera);});

  //Etiqueta frontal.
  if(frontLabel == true){
    textureBox4 = new THREE.TextureLoader().load("box_texture/cardboard_label_front.png", function(){ renderer.render(scene, camera);});
  }
  else{
    textureBox4 = new THREE.TextureLoader().load("box_texture/cardboard.png", function(){ renderer.render(scene, camera);});
  }
  //Etiqueta derecha.
  if(rightLabel == true){
    textureBox2 = new THREE.TextureLoader().load("box_texture/cardboard_label_right.png", function(){ renderer.render(scene, camera);});
  }
  else{
    textureBox2 = new THREE.TextureLoader().load("box_texture/cardboard.png", function(){ renderer.render(scene, camera);});
  }
  //Etiqueta izquierda.
  if(leftLabel == true){
    textureBox1 = new THREE.TextureLoader().load("box_texture/cardboard_label_left.png", function(){ renderer.render(scene, camera);});
  }
  else{
    textureBox1 = new THREE.TextureLoader().load("box_texture/cardboard.png", function(){ renderer.render(scene, camera);});
  }
  //Etiqueta trasera.
  if(backLabel == true){
    textureBox3 = new THREE.TextureLoader().load("box_texture/cardboard_label_back.png", function(){ renderer.render(scene, camera);});
  }
  else{
    textureBox3 = new THREE.TextureLoader().load("box_texture/cardboard.png", function(){ renderer.render(scene, camera);});
  }

  //Comprueva si hay activo o no el interlayer.
  var interlayer = document.getElementById("interlayer-check").checked;
  var interlayerWidth = document.getElementById("interlayer-size").value;

  if(interlayerWidth == ""){
    interlayerWidth = 0;
  }

  if (interlayer == true){
    if(interlayerWidth > 4 && interlayerWidth < 11){
        spawnInterlayer = true;
    }
  }
  else{
    spawnInterlayer = false;
  }

  //Spawn de los pisos pares e impares.
  for(var i = 1; i <= totalLayers; i++){

  //Cálculo de la altura de posicionamiento de las cajas.
    if(spawnInterlayer == false || i == 1){
      var actualHeight = palletHeight + boxHeight*(i-0.5) - 1000;
    }
    else{
      var actualHeight = palletHeight + parseInt(interlayerWidth)*(i-0.5) + boxHeight*(i-0.5) - 1000;
    }

    //Caso piso impar.
    if(i % 2 == 1){
      
      for(var j = 0; j < oddBoxes.length; j++){
                
        //Creación del material de la caja.
        var boxMaterial = [];
        boxMaterial.push(new THREE.MeshBasicMaterial({map:textureBox1}));
        boxMaterial.push(new THREE.MeshBasicMaterial({map:textureBox2}));
        boxMaterial.push(new THREE.MeshBasicMaterial({map:textureBox3}));
        boxMaterial.push(new THREE.MeshBasicMaterial({map:textureBox4}));
        boxMaterial.push(new THREE.MeshBasicMaterial({map:textureBox5}));
        boxMaterial.push(new THREE.MeshBasicMaterial({map:textureBox6}));

        //Definición de las medidas de la caja.
        var boxGeometry = new THREE.BoxGeometry(boxLenght, boxWidth, boxHeight); 
        var boxMesh = new THREE.Mesh(boxGeometry,boxMaterial);
        boxMesh.name = "placedBox";

        //Definición de la ubicación y rotación de la caja.
        boxMesh.position.set(oddBoxes[j].position.x,oddBoxes[j].position.y,actualHeight);
        boxMesh.rotation.z = oddBoxes[j].rotation.z;

        //Añadir la caja a la escena.
        scene.add(boxMesh);
        placedBoxes.push(boxMesh);
      }
      if(spawnInterlayer == true){
        //Creación del material del interlayer.
        var interlayerMaterial = [];
        interlayerMaterial.push(new THREE.MeshBasicMaterial({map:textureInterlayer}));
        interlayerMaterial.push(new THREE.MeshBasicMaterial({map:textureInterlayer}));
        interlayerMaterial.push(new THREE.MeshBasicMaterial({map:textureInterlayer}));
        interlayerMaterial.push(new THREE.MeshBasicMaterial({map:textureInterlayer}));
        interlayerMaterial.push(new THREE.MeshBasicMaterial({map:textureInterlayer}));
        interlayerMaterial.push(new THREE.MeshBasicMaterial({map:textureInterlayer}));

        //Definición de las medidas del interlayer.
        var boxGeometry = new THREE.BoxGeometry(palletLenght*0.75, palletWidth*0.75, interlayerWidth); 
        var boxMesh = new THREE.Mesh(boxGeometry,interlayerMaterial);
        boxMesh.name = "placedBox";

        //Definición de la ubicación y rotación del interlayer.
        boxMesh.position.set(0,0,actualHeight + initialBoxHeight / 2 + interlayerWidth / 2);

        //Añadir la caja a la escena.
        scene.add(boxMesh);
        placedBoxes.push(boxMesh);
      }
    }
    
    //Caso piso par.
    else{

      for(var k = 0; k < evenBoxes.length; k++){

        //Creación del material de la caja.
        var boxMaterial = [];
        boxMaterial.push(new THREE.MeshBasicMaterial({map:textureBox1}));
        boxMaterial.push(new THREE.MeshBasicMaterial({map:textureBox2}));
        boxMaterial.push(new THREE.MeshBasicMaterial({map:textureBox3}));
        boxMaterial.push(new THREE.MeshBasicMaterial({map:textureBox4}));
        boxMaterial.push(new THREE.MeshBasicMaterial({map:textureBox5}));
        boxMaterial.push(new THREE.MeshBasicMaterial({map:textureBox6}));

        //Definición de las medidas de la caja.
        var boxGeometry = new THREE.BoxGeometry(boxLenght, boxWidth, boxHeight); 
        var boxMesh = new THREE.Mesh(boxGeometry,boxMaterial);
        boxMesh.name = "placedBox";

        //Definición de la ubicación y rotación de la caja.
        boxMesh.position.set(evenBoxes[k].position.x,evenBoxes[k].position.y,actualHeight);
        boxMesh.rotation.z = evenBoxes[k].rotation.z;

        //Añadir la caja a la escena.
        scene.add(boxMesh);
        placedBoxes.push(boxMesh);
      }
      
      if(evenBoxes.length == 0){
        for(var j = 0; j < oddBoxes.length; j++){
                
          //Creación del material de la caja.
          var boxMaterial = [];
          boxMaterial.push(new THREE.MeshBasicMaterial({map:textureBox1}));
          boxMaterial.push(new THREE.MeshBasicMaterial({map:textureBox2}));
          boxMaterial.push(new THREE.MeshBasicMaterial({map:textureBox3}));
          boxMaterial.push(new THREE.MeshBasicMaterial({map:textureBox4}));
          boxMaterial.push(new THREE.MeshBasicMaterial({map:textureBox5}));
          boxMaterial.push(new THREE.MeshBasicMaterial({map:textureBox6}));
  
          //Definición de las medidas de la caja.
          var boxGeometry = new THREE.BoxGeometry(boxLenght, boxWidth, boxHeight); 
          var boxMesh = new THREE.Mesh(boxGeometry,boxMaterial);
          boxMesh.name = "placedBox";
  
          //Definición de la ubicación y rotación de la caja.
          boxMesh.position.set(oddBoxes[j].position.x,oddBoxes[j].position.y,actualHeight);
          boxMesh.rotation.z = oddBoxes[j].rotation.z;
  
          //Añadir la caja a la escena.
          scene.add(boxMesh);
          placedBoxes.push(boxMesh);
        }
      }
      if(spawnInterlayer == true){
        //Creación del material del interlayer.
        var interlayerMaterial = [];
        interlayerMaterial.push(new THREE.MeshBasicMaterial({map:textureInterlayer, color: 0x858585}));
        interlayerMaterial.push(new THREE.MeshBasicMaterial({map:textureInterlayer, color: 0x858585}));
        interlayerMaterial.push(new THREE.MeshBasicMaterial({map:textureInterlayer, color: 0x858585}));
        interlayerMaterial.push(new THREE.MeshBasicMaterial({map:textureInterlayer, color: 0x858585}));
        interlayerMaterial.push(new THREE.MeshBasicMaterial({map:textureInterlayer}));
        interlayerMaterial.push(new THREE.MeshBasicMaterial({map:textureInterlayer}));

        //Definición de las medidas del interlayer.
        var boxGeometry = new THREE.BoxGeometry(palletLenght*0.75, palletWidth*0.75, interlayerWidth); 
        var boxMesh = new THREE.Mesh(boxGeometry,interlayerMaterial);
        boxMesh.name = "placedBox";

        //Definición de la ubicación y rotación del interlayer.
        boxMesh.position.set(0,0,actualHeight + initialBoxHeight / 2 );

        //Añadir la caja a la escena.
        scene.add(boxMesh);
        placedBoxes.push(boxMesh);
      }
    }
  }
}

//Calcula la altura máxima del pallet.
function maxHeight(){
  //Comprueva si hay activo o no el interlayer.
  var interlayer = document.getElementById("interlayer-check").checked;
  var interlayerWidth = document.getElementById("interlayer-size").value;

  var previousLayerValue = document.getElementById("slider-layer").value;
  var maxPalletHeight;

  //Pone a cero el ancho del interlayer si no hay valor introducido.
  if(interlayerWidth == ""){
    interlayerWidth = "0";
  }

  //Gestión de la altura máxima.
  if(interlayer == true && interlayerWidth < 20){
    maxPalletHeight = Math.trunc(((1600-palletHeight)/(initialBoxHeight + parseInt(interlayerWidth))));
    document.getElementById("slider-layer").max = maxPalletHeight;
    layerValue = maxPalletHeight; 
  }
  else{
    maxPalletHeight = Math.trunc((1600-palletHeight)/(initialBoxHeight));
    document.getElementById("slider-layer").max = maxPalletHeight;
    layerValue = maxPalletHeight; 
  }

  //Asignación de la altura anterior.
  if(maxPalletHeight < previousLayerValue)
    layerValue = maxPalletHeight;
  else{
    layerValue = previousLayerValue;
  }

  document.getElementById("slider-layer").value = layerValue;
}

function updateSliderValue(){
  maxHeight();

  //Comprueva si hay activo o no el interlayer.
  var interlayer = document.getElementById("interlayer-check").checked;
  var interlayerWidth = document.getElementById("interlayer-size").value;

  layerValue = document.getElementById("slider-layer").value;


  //Pone a cero el ancho del interlayer si no hay valor introducido.
  if(interlayerWidth == ""){
    interlayerWidth = "0";
  }

  //Dimensiones del pallet.
  var loadSize = palletLenght + "x" + palletWidth + "x" + (palletHeight+layerValue*initialBoxHeight);

  //Peso total del pallet.
  var oddBoxCount = oddBoxes.length;
  var evenBoxCount;
  initialBoxMass = 2;

  if(evenBoxes.length == 0){
    evenBoxCount = oddBoxes.length;
  }
  else{
    evenBoxCount = evenBoxes.length;
  }

  var totalMass = palletMass + oddBoxCount*initialBoxMass*Math.round(layerValue/2) + evenBoxCount*initialBoxMass*Math.trunc(layerValue/2) + "kg";

  //Layers.
  var layers = layerValue;

  //Altura del pallet.
  var maxHeightValue;
  if(interlayer == false){
    maxHeightValue = palletHeight+layerValue*initialBoxHeight+ "mm";
  }
  else{
    maxHeightValue = palletHeight+layerValue*(initialBoxHeight+parseInt(interlayerWidth)) + "mm";
  }


  
  var effectiveArea = (((initialBoxLenght/1000*initialBoxWidth/1000)*oddBoxes.length)/(palletWidth/1000*palletLenght/1000)*100).toFixed(2);
  var effectiveLoad = (((palletMass + oddBoxCount*initialBoxMass*Math.round(layerValue/2) + evenBoxCount*initialBoxMass*Math.trunc(layerValue/2))/palletLoad)*100).toFixed(2);

  document.getElementById("absolute-size").value = loadSize;
  document.getElementById("absolute-mass").value = totalMass;
  document.getElementById("absolute-layers").value = layers;
  document.getElementById("absolute-height").value = maxHeightValue;
  document.getElementById("absolute-area").value = effectiveArea + "%"
  document.getElementById("absolute-load").value = String(effectiveLoad) + "%";

  deleteLayers();
  showLayers();
}

//Borra las cajas y el pallet anterior.
function deleteLayers(){
	for(var i = 0; i < placedBoxes.length; i++){
		scene.remove(placedBoxes[i]);
	}
}


//Reajuste de la escena.
function animate() {
	requestAnimationFrame( animate );
	renderer.render(scene, camera);
}

document.getElementById("next-button-layers").addEventListener('click', updateSliderValue);
document.getElementById("slider-layer").addEventListener('input', updateSliderValue);
document.getElementById("slider-layer").addEventListener('change', updateSliderValue);
document.getElementById("layers-nav-button").addEventListener('click', updateSliderValue);
document.getElementById("interlayer-check").addEventListener('click', updateSliderValue);
document.getElementById("interlayer-size").addEventListener('change', updateSliderValue);

window.addEventListener('resize', function() {
	renderer.setSize(window.innerWidth, window.innerHeight);
	camera.aspect = window.innerWidth/window.innerHeight;
	camera.updateProjectionMatrix();
	animate();
});

animate();

function showLayers(){
  document.getElementById("absolute-size").readOnly = true;
  document.getElementById("absolute-mass").readOnly = true;
  document.getElementById("absolute-layers").readOnly = true;
  document.getElementById("absolute-height").readOnly = true;
  document.getElementById("absolute-area").readOnly = true;
  document.getElementById("absolute-load").readOnly = true;

  deletePallet();
  maxHeight();

  //Spawn del pallet correspondiente.
		var palletType = document.getElementById("pallet-selection").value;
		var measurementUnits = document.getElementById("pallet-measurement").value;
		var measurementWeight = document.getElementById("pallet-weight").value;

		switch (palletType){
			case "1":
				palletLenght = 1200;
				palletWidth = 800;
				palletHeight = 144;
				palletMass = 25;
				palletLoad = 1500;
			  palletEUR1();
			  break;
		  case "2":
				palletLenght = 1200;
				palletWidth = 1000;
				palletHeight = 162;	
				palletMass = 35;
				palletLoad = 1250;			  
			  palletEUR2();
			  break;      
		  case "3":
				palletLenght = 1200;
				palletWidth = 1000;
				palletHeight = 144;
				palletMass = 30;
				palletLoad = 1500;
			  palletEUR3();
			  break;    
		  case "4":
				palletLenght = 600;
				palletWidth = 800;
				palletHeight = 144;		
				palletMass = 10;
				palletLoad = 500;
				palletEUR6();
			  break;     
		  case "5":
				palletLenght = 1016;
				palletWidth = 1219.2;
				palletHeight = 121;
				palletMass = 17;
				palletLoad = 2086;			  
				palletUSA1();
			  break;
		  case "6":
				palletLenght = 1066.8;
				palletWidth = 1066.8;
				palletHeight = 140;			  
				palletMass = 14;
				palletLoad = 1134;
			  palletUSA2();
			  break;
		  case "7":
				if(measurementUnits == 1){
					palletLenght = document.getElementById("pallet-lenght").value;
					palletWidth = document.getElementById("pallet-width").value;
					palletHeight = document.getElementById("pallet-height").value;
				}
				else{
					palletLenght = document.getElementById("pallet-lenght").value / 0.04;
					palletWidth = document.getElementById("pallet-width").value / 0.04;
					palletHeight = document.getElementById("pallet-height").value / 0.04;
				}

				if(measurementWeight == 1){
					palletMass = document.getElementById("pallet-mass").value;
					palletLoad = document.getElementById("pallet-load").value;
				}
				else{
					palletMass = document.getElementById("pallet-mass").value / 2.2;
					palletLoad = document.getElementById("pallet-load").value / 2.2;
				}

			  	palletCustom(palletLenght, palletWidth, palletHeight);
			  break;
		  default:
	  
		  break;
		}
  placeBoxes(oddBoxes, evenBoxes,initialLabelFront,initialLabelRight,initialLabelLeft,initialLabelBack,layerValue,initialBoxLenght,initialBoxWidth,initialBoxHeight,parseInt(palletHeight));
}
