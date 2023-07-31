//Importación de OrbitControls.
import { OrbitControls } from "https://threejs.org/examples/jsm/controls/OrbitControls.js";

//Creación de la escena.
const scene = new THREE.Scene();
scene.background = new THREE.Color( 0x000000 );

//Creación de las constantes de la escena.
let controls,camera,renderer,container;

//Setting de la cámara.
camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 100000);
camera.position.set(2000,-2000,2000);

//Renderizado de la escena en la 'section' llamada 'container'.
renderer = new THREE.WebGLRenderer( { antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
container = document.getElementById("scene-pallet-selection");
container.appendChild( renderer.domElement );

//Controles de la cámara.
camera.up.set( 0, 0, 1 );
controls = new OrbitControls( camera, renderer.domElement );

//#region Variables de los inputs.
var palletType;
var palletLenght;
var palletWidth;
var palletHeight;
var palletMass;
var palletLoad;

var measurementWeight = 1;
var measurementUnits = 1;
//#endregion

//#region Pallets
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
    crossLog.position.set(0,0,111);
    crossLog.name = "crossLog1";
    scene.add(crossLog);
    crossLogGeometry = new THREE.BoxGeometry(145, 800, 22);
    crossLog = new THREE.Mesh(crossLogGeometry,logMaterial);
    crossLog.position.set(527.5,0,111);
    crossLog.name = "crossLog2";
    scene.add(crossLog);
    crossLogGeometry = new THREE.BoxGeometry(145, 800, 22);
    crossLog = new THREE.Mesh(crossLogGeometry,logMaterial);
    crossLog.position.set(-527.5,0,111);
    crossLog.name = "crossLog3";
    scene.add(crossLog);
  
  
    //Cubos de soporte.
    var supportCubeGeometry = new THREE.BoxGeometry(145, 145, 78);
    var supportCube = new THREE.Mesh(supportCubeGeometry,boxMaterial);
    supportCube.position.set(0,0,61);
    supportCube.name = "supportCube1";
    scene.add(supportCube);
    supportCubeGeometry = new THREE.BoxGeometry(145, 145, 78);
    supportCube = new THREE.Mesh(supportCubeGeometry,boxMaterial);
    supportCube.position.set(527.5,0,61);
    supportCube.name = "supportCube2";
    scene.add(supportCube);
    supportCubeGeometry = new THREE.BoxGeometry(145, 145, 78);
    supportCube = new THREE.Mesh(supportCubeGeometry,boxMaterial);
    supportCube.position.set(-527.5,0,61);
    supportCube.name = "supportCube3";
    scene.add(supportCube);
    supportCubeGeometry = new THREE.BoxGeometry(145, 100, 78);
    supportCube = new THREE.Mesh(supportCubeGeometry,boxMaterial);
    supportCube.position.set(0,-350,61);
    supportCube.name = "supportCube4";
    scene.add(supportCube);
    supportCubeGeometry = new THREE.BoxGeometry(145, 100, 78);
    supportCube = new THREE.Mesh(supportCubeGeometry,boxMaterial);
    supportCube.position.set(527.5,-350,61);
    supportCube.name = "supportCube5";
    scene.add(supportCube);
    supportCubeGeometry = new THREE.BoxGeometry(145, 100, 78);
    supportCube = new THREE.Mesh(supportCubeGeometry,boxMaterial);
    supportCube.position.set(-527.5,-350,61);
    supportCube.name = "supportCube6";
    scene.add(supportCube);
    supportCubeGeometry = new THREE.BoxGeometry(145, 100, 78);
    supportCube = new THREE.Mesh(supportCubeGeometry,boxMaterial);
    supportCube.position.set(0,350,61);
    supportCube.name = "supportCube7";
    scene.add(supportCube);
    supportCubeGeometry = new THREE.BoxGeometry(145, 100, 78);
    supportCube = new THREE.Mesh(supportCubeGeometry,boxMaterial);
    supportCube.position.set(527.5,350,61);
    supportCube.name = "supportCube8";
    scene.add(supportCube);
    supportCubeGeometry = new THREE.BoxGeometry(145, 100, 78);
    supportCube = new THREE.Mesh(supportCubeGeometry,boxMaterial);
    supportCube.position.set(-527.5,350,61);
    supportCube.name = "supportCube9";
    scene.add(supportCube);
  
  
    //Listones principales.
    var mainLog_Geometry = new THREE.BoxGeometry(1200, 100, 22);
    var mainLog = new THREE.Mesh(mainLog_Geometry,logMaterial);
    mainLog.position.set(0,350,11);
    mainLog.name = "mainLog1";
    scene.add(mainLog);
    mainLog_Geometry = new THREE.BoxGeometry(1200, 145, 22);
    mainLog = new THREE.Mesh(mainLog_Geometry,logMaterial);
    mainLog.position.set(0,0,11);
    mainLog.name = "mainLog2";
    scene.add(mainLog);
    mainLog_Geometry = new THREE.BoxGeometry(1200, 100, 22);
    mainLog = new THREE.Mesh(mainLog_Geometry,logMaterial);
    mainLog.position.set(0,-350,11);
    mainLog.name = "mainLog3";
    scene.add(mainLog);
    mainLog_Geometry = new THREE.BoxGeometry(1200, 145, 22);
    mainLog = new THREE.Mesh(mainLog_Geometry,logMaterial);
    mainLog.position.set(0,327.5,133);
    mainLog.name = "mainLog4";
    scene.add(mainLog);
    mainLog_Geometry = new THREE.BoxGeometry(1200, 145, 22);
    mainLog = new THREE.Mesh(mainLog_Geometry,logMaterial);
    mainLog.position.set(0,0,133);
    mainLog.name = "mainLog5";
    scene.add(mainLog);
    mainLog_Geometry = new THREE.BoxGeometry(1200, 145, 22);
    mainLog = new THREE.Mesh(mainLog_Geometry,logMaterial);
    mainLog.position.set(0,-327.5,133);
    mainLog.name = "mainLog6";
    scene.add(mainLog);
    mainLog_Geometry = new THREE.BoxGeometry(1200, 100, 22);
    mainLog = new THREE.Mesh(mainLog_Geometry,logMaterial);
    mainLog.position.set(0,-162.5,133);
    mainLog.name = "mainLog7";
    scene.add(mainLog);
    mainLog_Geometry = new THREE.BoxGeometry(1200, 100, 22);
    mainLog = new THREE.Mesh(mainLog_Geometry,logMaterial);
    mainLog.position.set(0,162.5,133);
    mainLog.name = "mainLog8";
    scene.add(mainLog);
  
  
    //Inscripciones de los cubos de soporte.
    var label_Geometry = new THREE.BoxGeometry(100, 0.1, 78);
    var label = new THREE.Mesh(label_Geometry,label_info);
    label.position.set(0,400,61);
    label.rotation.y = 180*Math.PI / 180;
    label.name = "label1";
    scene.add(label);
    label_Geometry = new THREE.BoxGeometry(100, 0.1, 78);
    label = new THREE.Mesh(label_Geometry,label_info);
    label.position.set(0,-400,61);
    label.rotation.y = 0*Math.PI / 180;
    label.name = "label2";
    scene.add(label);
    label_Geometry = new THREE.BoxGeometry(100, 0.1, 78);
    label = new THREE.Mesh(label_Geometry,label_EUR);
    label.position.set(-530,400,61);
    label.rotation.y = 180*Math.PI / 180;
    label.name = "label3";
    scene.add(label);
    label_Geometry = new THREE.BoxGeometry(100, 0.1, 78);
    label = new THREE.Mesh(label_Geometry,label_EUR);
    label.position.set(530,-400,61);
    label.rotation.y = 0*Math.PI / 180;
    label.name = "label4";
    scene.add(label);
    label_Geometry = new THREE.BoxGeometry(100, 0.1, 78);
    label = new THREE.Mesh(label_Geometry,label_EPAL);
    label.position.set(530,400,61);
    label.rotation.y = 180*Math.PI / 180;
    label.name = "label5";
    scene.add(label);
    label_Geometry = new THREE.BoxGeometry(100, 0.1, 78);
    label = new THREE.Mesh(label_Geometry,label_EPAL);
    label.position.set(-530,-400,61);
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
    crossLog.position.set(550,0,10.5);
    crossLog.name = "crossLog1";
    scene.add(crossLog);
    crossLogGeometry = new THREE.BoxGeometry(100, 800, 21); 
    crossLog = new THREE.Mesh(crossLogGeometry,logMaterial);
    crossLog.position.set(-550,0,10.5);
    crossLog.name = "crossLog2";
    scene.add(crossLog);
    crossLogGeometry = new THREE.BoxGeometry(1200, 100, 21);
    crossLog = new THREE.Mesh(crossLogGeometry,logMaterial);
    crossLog.position.set(0,450,10.5);
    crossLog.name = "crossLog3";
    scene.add(crossLog);
    crossLogGeometry = new THREE.BoxGeometry(1200, 100, 21);
    crossLog = new THREE.Mesh(crossLogGeometry,logMaterial);
    crossLog.position.set(0,-450,10.5);
    crossLog.name = "crossLog4";
    scene.add(crossLog);
    crossLogGeometry = new THREE.BoxGeometry(1200, 100, 21);
    crossLog = new THREE.Mesh(crossLogGeometry,logMaterial);
    crossLog.position.set(0,0,10.5);
    crossLog.name = "crossLog5";
    scene.add(crossLog);
    crossLogGeometry = new THREE.BoxGeometry(1200, 100, 21);
    crossLog = new THREE.Mesh(crossLogGeometry,logMaterial);
    crossLog.position.set(0,450,131.5);
    crossLog.name = "crossLog6";
    scene.add(crossLog);
    crossLogGeometry = new THREE.BoxGeometry(1200, 100, 21);
    crossLog = new THREE.Mesh(crossLogGeometry,logMaterial);
    crossLog.position.set(0,-450,131.5);
    crossLog.name = "crossLog7";
    scene.add(crossLog);
    crossLogGeometry = new THREE.BoxGeometry(1200, 100, 21);
    crossLog = new THREE.Mesh(crossLogGeometry,logMaterial);
    crossLog.position.set(0,0,131.5);
    crossLog.name = "crossLog8";
    scene.add(crossLog);
    
  
    //Cubos de soporte.
    var supportCubeGeometry = new THREE.BoxGeometry(100, 100, 99);
    var supportCube = new THREE.Mesh(supportCubeGeometry,boxMaterial);
    supportCube.position.set(0,0,70.5);
    supportCube.name = "supportCube1";
    scene.add(supportCube);
    supportCubeGeometry = new THREE.BoxGeometry(145, 100, 99);
    supportCube = new THREE.Mesh(supportCubeGeometry,boxMaterial);
    supportCube.position.set(527.5,0,70.5);
    supportCube.name = "supportCube2";
    scene.add(supportCube);
    supportCubeGeometry = new THREE.BoxGeometry(145, 100, 99);
    supportCube = new THREE.Mesh(supportCubeGeometry,boxMaterial);
    supportCube.position.set(-527.5,0,70.5);
    supportCube.name = "supportCube3";
    scene.add(supportCube);
    var supportCubeGeometry = new THREE.BoxGeometry(100, 100, 99);
    var supportCube = new THREE.Mesh(supportCubeGeometry,boxMaterial);
    supportCube.position.set(0,450,70.5);
    supportCube.name = "supportCube4";
    scene.add(supportCube);
    supportCubeGeometry = new THREE.BoxGeometry(145, 100, 99);
    supportCube = new THREE.Mesh(supportCubeGeometry,boxMaterial);
    supportCube.position.set(527.5,450,70.5);
    supportCube.name = "supportCube5";
    scene.add(supportCube);
    supportCubeGeometry = new THREE.BoxGeometry(145, 100, 99);
    supportCube = new THREE.Mesh(supportCubeGeometry,boxMaterial);
    supportCube.position.set(-527.5,450,70.5);
    supportCube.name = "supportCube6";
    scene.add(supportCube);
    var supportCubeGeometry = new THREE.BoxGeometry(100, 100, 99);
    var supportCube = new THREE.Mesh(supportCubeGeometry,boxMaterial);
    supportCube.position.set(0,-450,70.5);
    supportCube.name = "supportCube7";
    scene.add(supportCube);
    supportCubeGeometry = new THREE.BoxGeometry(145, 100, 99);
    supportCube = new THREE.Mesh(supportCubeGeometry,boxMaterial);
    supportCube.position.set(527.5,-450,70.5);
    supportCube.name = "supportCube8";
    scene.add(supportCube);
    supportCubeGeometry = new THREE.BoxGeometry(145, 100, 99);
    supportCube = new THREE.Mesh(supportCubeGeometry,boxMaterial);
    supportCube.position.set(-527.5,-450,70.5);
    supportCube.name = "supportCube9";
    scene.add(supportCube);
    
  
    //Listones principales.
    var mainLog_Geometry = new THREE.BoxGeometry(125, 1000, 21);
    var mainLog = new THREE.Mesh(mainLog_Geometry,logMaterial);
    mainLog.position.set(0,0,151.5);
    mainLog.name = "mainLog1";
    scene.add(mainLog);
    mainLog_Geometry = new THREE.BoxGeometry(125, 1000, 21);
    mainLog = new THREE.Mesh(mainLog_Geometry,logMaterial);
    mainLog.position.set(-537.5,0,151.5);
    mainLog.name = "mainLog2";
    scene.add(mainLog);
    mainLog_Geometry = new THREE.BoxGeometry(125, 1000, 21);
    mainLog = new THREE.Mesh(mainLog_Geometry,logMaterial);
    mainLog.position.set(-412.5,0,151.5);
    mainLog.name = "mainLog3";
    scene.add(mainLog);
    mainLog_Geometry = new THREE.BoxGeometry(125, 1000, 21);
    mainLog = new THREE.Mesh(mainLog_Geometry,logMaterial);
    mainLog.position.set(537.5,0,151.5);
    mainLog.name = "mainLog4";
    scene.add(mainLog);
    mainLog_Geometry = new THREE.BoxGeometry(125, 1000, 21);
    mainLog = new THREE.Mesh(mainLog_Geometry,logMaterial);
    mainLog.position.set(412.5,0,151.5);
    mainLog.name = "mainLog5";
    scene.add(mainLog);
    mainLog_Geometry = new THREE.BoxGeometry(125, 1000, 21);
    mainLog = new THREE.Mesh(mainLog_Geometry,logMaterial);
    mainLog.position.set(137.5,0,151.5);
    mainLog.name = "mainLog6";
    scene.add(mainLog);
    mainLog_Geometry = new THREE.BoxGeometry(125, 1000, 21);
    mainLog = new THREE.Mesh(mainLog_Geometry,logMaterial);
    mainLog.position.set(-137.5,0,151.5);
    mainLog.name = "mainLog7";
    scene.add(mainLog);
    mainLog_Geometry = new THREE.BoxGeometry(125, 1000, 21);
    mainLog = new THREE.Mesh(mainLog_Geometry,logMaterial);
    mainLog.position.set(-275,0,151.5);
    mainLog.name = "mainLog8";
    scene.add(mainLog);
    mainLog_Geometry = new THREE.BoxGeometry(125, 1000, 21);
    mainLog = new THREE.Mesh(mainLog_Geometry,logMaterial);
    mainLog.position.set(275,0,151.5);
    mainLog.name = "mainLog9";
    scene.add(mainLog);
    
  
    //Inscripciones de los cubos de soporte.
    var label_Geometry = new THREE.BoxGeometry(100, 0.1, 78);
    var label = new THREE.Mesh(label_Geometry,label_info);
    label.position.set(0,500,70.5);
    label.rotation.y = 180*Math.PI / 180;
    label.name = "label1";
    scene.add(label);
    label_Geometry = new THREE.BoxGeometry(100, 0.1, 78);
    label = new THREE.Mesh(label_Geometry,label_info);
    label.position.set(0,-500,70.5);
    label.rotation.y = 0*Math.PI / 180;
    label.name = "label2";
    scene.add(label);
    label_Geometry = new THREE.BoxGeometry(100, 0.1, 78);
    label = new THREE.Mesh(label_Geometry,label_EUR);
    label.position.set(-530,500,70.5);
    label.rotation.y = 180*Math.PI / 180;
    label.name = "label3";
    scene.add(label);
    label_Geometry = new THREE.BoxGeometry(100, 0.1, 78);
    label = new THREE.Mesh(label_Geometry,label_EUR);
    label.position.set(530,-500,70.5);
    label.rotation.y = 0*Math.PI / 180;
    label.name = "label4";
    scene.add(label);
    label_Geometry = new THREE.BoxGeometry(100, 0.1, 78);
    label = new THREE.Mesh(label_Geometry,label_EPAL);
    label.position.set(530,500,70.5);
    label.rotation.y = 180*Math.PI / 180;
    label.name = "label5";
    scene.add(label);
    label_Geometry = new THREE.BoxGeometry(100, 0.1, 78);
    label = new THREE.Mesh(label_Geometry,label_EPAL);
    label.position.set(-530,-500,70.5);
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
    crossLog.position.set(0,0,112.5);
    crossLog.name = "crossLog1";
    scene.add(crossLog);
    crossLogGeometry = new THREE.BoxGeometry(145, 1000, 22);
    crossLog = new THREE.Mesh(crossLogGeometry,logMaterial);
    crossLog.position.set(527.5,0,112.5);
    crossLog.name = "crossLog2";
    scene.add(crossLog);
    crossLogGeometry = new THREE.BoxGeometry(145, 1000, 22);
    crossLog = new THREE.Mesh(crossLogGeometry,logMaterial);
    crossLog.position.set(-527.5,0,112.5);
    crossLog.name = "crossLog3";
    scene.add(crossLog);
    crossLogGeometry = new THREE.BoxGeometry(1200, 145, 22);
    crossLog = new THREE.Mesh(crossLogGeometry,logMaterial);
    crossLog.position.set(0,0,11);
    crossLog.name = "crossLog4";
    scene.add(crossLog);
    crossLogGeometry = new THREE.BoxGeometry(1200, 145, 22);
    crossLog = new THREE.Mesh(crossLogGeometry,logMaterial);
    crossLog.position.set(0,427.5,11);
    crossLog.name = "crossLog5";
    scene.add(crossLog);
    crossLogGeometry = new THREE.BoxGeometry(1200, 145, 22);
    crossLog = new THREE.Mesh(crossLogGeometry,logMaterial);
    crossLog.position.set(0,-427.5,11);
    crossLog.name = "crossLog6";
    scene.add(crossLog);
  
  
    //Cubos de soporte.
    var supportCubeGeometry = new THREE.BoxGeometry(145, 145, 81);
    var supportCube = new THREE.Mesh(supportCubeGeometry,boxMaterial);
    supportCube.position.set(0,0,61.5);
    supportCube.name = "supportCube1";
    scene.add(supportCube);
    supportCubeGeometry = new THREE.BoxGeometry(145, 145, 81);
    supportCube = new THREE.Mesh(supportCubeGeometry,boxMaterial);
    supportCube.position.set(527.5,0,61.5);
    supportCube.name = "supportCube2";
    scene.add(supportCube);
    supportCubeGeometry = new THREE.BoxGeometry(145, 145, 81);
    supportCube = new THREE.Mesh(supportCubeGeometry,boxMaterial);
    supportCube.position.set(-527.5,0,61.5);
    supportCube.name = "supportCube3";
    scene.add(supportCube);
    supportCubeGeometry = new THREE.BoxGeometry(145, 145, 81);
    supportCube = new THREE.Mesh(supportCubeGeometry,boxMaterial);
    supportCube.position.set(0,-427.5,61.5);
    supportCube.name = "supportCube4";
    scene.add(supportCube);
    supportCubeGeometry = new THREE.BoxGeometry(145, 145, 81);
    supportCube = new THREE.Mesh(supportCubeGeometry,boxMaterial);
    supportCube.position.set(527.5,-427.5,61.5);
    supportCube.name = "supportCube5";
    scene.add(supportCube);
    supportCubeGeometry = new THREE.BoxGeometry(145, 145, 81);
    supportCube = new THREE.Mesh(supportCubeGeometry,boxMaterial);
    supportCube.position.set(-527.5,-427.5,61.5);
    supportCube.name = "supportCube6";
    scene.add(supportCube);
    supportCubeGeometry = new THREE.BoxGeometry(145, 145, 81);
    supportCube = new THREE.Mesh(supportCubeGeometry,boxMaterial);
    supportCube.position.set(0,427.5,61.5);
    supportCube.name = "supportCube7";
    scene.add(supportCube);
    supportCubeGeometry = new THREE.BoxGeometry(145, 145, 81);
    supportCube = new THREE.Mesh(supportCubeGeometry,boxMaterial);
    supportCube.position.set(527.5,427.5,61.5);
    supportCube.name = "supportCube8";
    scene.add(supportCube);
    supportCubeGeometry = new THREE.BoxGeometry(145, 145, 81);
    supportCube = new THREE.Mesh(supportCubeGeometry,boxMaterial);
    supportCube.position.set(-527.5,427.5,61.5);
    supportCube.name = "supportCube9";
    scene.add(supportCube);
  
  
    //Listones principales.
    var mainLog_Geometry = new THREE.BoxGeometry(1200, 145, 22);
    var mainLog = new THREE.Mesh(mainLog_Geometry,logMaterial);
    mainLog.position.set(0,427.5,133.5);
    mainLog.name = "mainLog1";
    scene.add(mainLog);
    mainLog_Geometry = new THREE.BoxGeometry(1200, 145, 22);
    mainLog = new THREE.Mesh(mainLog_Geometry,logMaterial);
    mainLog.position.set(0,0,133.5);
    mainLog.name = "mainLog2";
    scene.add(mainLog);
    mainLog_Geometry = new THREE.BoxGeometry(1200, 145, 22);
    mainLog = new THREE.Mesh(mainLog_Geometry,logMaterial);
    mainLog.position.set(0,-427.5,133.5);
    mainLog.name = "mainLog3";
    scene.add(mainLog);
    mainLog_Geometry = new THREE.BoxGeometry(1200, 145, 22);
    mainLog = new THREE.Mesh(mainLog_Geometry,logMaterial);
    mainLog.position.set(0,-427.5,133.5);
    mainLog.name = "mainLog4";
    scene.add(mainLog);
    mainLog_Geometry = new THREE.BoxGeometry(1200, 145, 22);
    mainLog = new THREE.Mesh(mainLog_Geometry,logMaterial);
    mainLog.position.set(0,427.5,133.5);
    mainLog.name = "mainLog5";
    scene.add(mainLog);
    mainLog_Geometry = new THREE.BoxGeometry(1200, 100, 22);
    mainLog = new THREE.Mesh(mainLog_Geometry,logMaterial);
    mainLog.position.set(0,-300,133.5);
    mainLog.name = "mainLog6";
    scene.add(mainLog);
    mainLog_Geometry = new THREE.BoxGeometry(1200, 100, 22);
    mainLog = new THREE.Mesh(mainLog_Geometry,logMaterial);
    mainLog.position.set(0,300,133.5);
    mainLog.name = "mainLog7";
    scene.add(mainLog);
    mainLog_Geometry = new THREE.BoxGeometry(1200, 100, 22);
    mainLog = new THREE.Mesh(mainLog_Geometry,logMaterial);
    mainLog.position.set(0,-157.5,133.5);
    mainLog.name = "mainLog8";
    scene.add(mainLog);
    mainLog_Geometry = new THREE.BoxGeometry(1200, 100, 22);
    mainLog = new THREE.Mesh(mainLog_Geometry,logMaterial);
    mainLog.position.set(0,157.5,133.5);
    mainLog.name = "mainLog9";
    scene.add(mainLog);
    
  
    //Inscripciones de los cubos de soporte.
    var label_Geometry = new THREE.BoxGeometry(100, 0.1, 78);
    var label = new THREE.Mesh(label_Geometry,label_info);
    label.position.set(0,500,61);
    label.rotation.y = 180*Math.PI / 180;
    label.name = "label1";
    scene.add(label);
    label_Geometry = new THREE.BoxGeometry(100, 0.1, 78);
    label = new THREE.Mesh(label_Geometry,label_info);
    label.position.set(0,-500,61);
    label.rotation.y = 0*Math.PI / 180;
    label.name = "label2";
    scene.add(label);
    label_Geometry = new THREE.BoxGeometry(100, 0.1, 78);
    label = new THREE.Mesh(label_Geometry,label_EUR);
    label.position.set(-530,500,61);
    label.rotation.y = 180*Math.PI / 180;
    label.name = "label3";
    scene.add(label);
    label_Geometry = new THREE.BoxGeometry(100, 0.1, 78);
    label = new THREE.Mesh(label_Geometry,label_EUR);
    label.position.set(530,-500,61);
    label.rotation.y = 0*Math.PI / 180;
    label.name = "label4";
    scene.add(label);
    label_Geometry = new THREE.BoxGeometry(100, 0.1, 78);
    label = new THREE.Mesh(label_Geometry,label_EPAL);
    label.position.set(530,500,61);
    label.rotation.y = 180*Math.PI / 180;
    label.name = "label5";
    scene.add(label);
    label_Geometry = new THREE.BoxGeometry(100, 0.1, 78);
    label = new THREE.Mesh(label_Geometry,label_EPAL);
    label.position.set(-530,-500,61);
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
    crossLog.position.set(0,0,111);
    crossLog.name = "crossLog1";
    scene.add(crossLog);
    crossLogGeometry = new THREE.BoxGeometry(100, 800, 22);
    crossLog = new THREE.Mesh(crossLogGeometry,logMaterial);
    crossLog.position.set(250,0,111);
    crossLog.name = "crossLog2";
    scene.add(crossLog);
    crossLogGeometry = new THREE.BoxGeometry(100, 800, 22);
    crossLog = new THREE.Mesh(crossLogGeometry,logMaterial);
    crossLog.position.set(-250,0,111);
    crossLog.name = "crossLog3";
    scene.add(crossLog);
  
  
    //Cubos de soporte.
    var supportCubeGeometry = new THREE.BoxGeometry(100, 100, 78);
    var supportCube = new THREE.Mesh(supportCubeGeometry,boxMaterial);
    supportCube.position.set(0,0,61);
    supportCube.name = "supportCube1";
    scene.add(supportCube);
    supportCubeGeometry = new THREE.BoxGeometry(100, 100, 78);
    supportCube = new THREE.Mesh(supportCubeGeometry,boxMaterial);
    supportCube.position.set(250,0,61);
    supportCube.name = "supportCube2";
    scene.add(supportCube);
    supportCubeGeometry = new THREE.BoxGeometry(100, 100, 78);
    supportCube = new THREE.Mesh(supportCubeGeometry,boxMaterial);
    supportCube.position.set(-250,0,61);
    supportCube.name = "supportCube3";
    scene.add(supportCube);
    supportCubeGeometry = new THREE.BoxGeometry(100, 100, 78);
    supportCube = new THREE.Mesh(supportCubeGeometry,boxMaterial);
    supportCube.position.set(0,-350,61);
    supportCube.name = "supportCube4";
    scene.add(supportCube);
    supportCubeGeometry = new THREE.BoxGeometry(100, 100, 78);
    supportCube = new THREE.Mesh(supportCubeGeometry,boxMaterial);
    supportCube.position.set(250,-350,61);
    supportCube.name = "supportCube5";
    scene.add(supportCube);
    supportCubeGeometry = new THREE.BoxGeometry(100, 100, 78);
    supportCube = new THREE.Mesh(supportCubeGeometry,boxMaterial);
    supportCube.position.set(-250,-350,61);
    supportCube.name = "supportCube6";
    scene.add(supportCube);
    supportCubeGeometry = new THREE.BoxGeometry(100, 100, 78);
    supportCube = new THREE.Mesh(supportCubeGeometry,boxMaterial);
    supportCube.position.set(0,350,61);
    supportCube.name = "supportCube7";
    scene.add(supportCube);
    supportCubeGeometry = new THREE.BoxGeometry(100, 100, 78);
    supportCube = new THREE.Mesh(supportCubeGeometry,boxMaterial);
    supportCube.position.set(250,350,61);
    supportCube.name = "supportCube8";
    scene.add(supportCube);
    supportCubeGeometry = new THREE.BoxGeometry(100, 100, 78);
    supportCube = new THREE.Mesh(supportCubeGeometry,boxMaterial);
    supportCube.position.set(-250,350,61);
    supportCube.name = "supportCube9";
    scene.add(supportCube);
  
  
    //Listones principales.
    var mainLog_Geometry = new THREE.BoxGeometry(600, 100, 22);
    var mainLog = new THREE.Mesh(mainLog_Geometry,logMaterial);
    mainLog.position.set(0,350,11);
    mainLog.name = "mainLog1";
    scene.add(mainLog);
    mainLog_Geometry = new THREE.BoxGeometry(600, 100, 22);
    mainLog = new THREE.Mesh(mainLog_Geometry,logMaterial);
    mainLog.position.set(0,0,11);
    mainLog.name = "mainLog2";
    scene.add(mainLog);
    mainLog_Geometry = new THREE.BoxGeometry(600, 100, 22);
    mainLog = new THREE.Mesh(mainLog_Geometry,logMaterial);
    mainLog.position.set(0,-350,11);
    mainLog.name = "mainLog3";
    scene.add(mainLog);
    mainLog_Geometry = new THREE.BoxGeometry(600, 100, 22);
    mainLog = new THREE.Mesh(mainLog_Geometry,logMaterial);
    mainLog.position.set(0,350,133);
    mainLog.name = "mainLog4";
    scene.add(mainLog);
    mainLog_Geometry = new THREE.BoxGeometry(600, 100, 22);
    mainLog = new THREE.Mesh(mainLog_Geometry,logMaterial);
    mainLog.position.set(0,0,133);
    mainLog.name = "mainLog5";
    scene.add(mainLog);
    mainLog_Geometry = new THREE.BoxGeometry(600, 100, 22);
    mainLog = new THREE.Mesh(mainLog_Geometry,logMaterial);
    mainLog.position.set(0,-350,133);
    mainLog.name = "mainLog6";
    scene.add(mainLog);
    mainLog_Geometry = new THREE.BoxGeometry(600, 100, 22);
    mainLog = new THREE.Mesh(mainLog_Geometry,logMaterial);
    mainLog.position.set(0,116.67,133);
    mainLog.name = "mainLog7";
    scene.add(mainLog);
    mainLog_Geometry = new THREE.BoxGeometry(600, 100, 22);
    mainLog = new THREE.Mesh(mainLog_Geometry,logMaterial);
    mainLog.position.set(0,233.34,133);
    mainLog.name = "mainLog8";
    scene.add(mainLog);
    mainLog_Geometry = new THREE.BoxGeometry(600, 100, 22);
    mainLog = new THREE.Mesh(mainLog_Geometry,logMaterial);
    mainLog.position.set(0,-116.67,133);
    mainLog.name = "mainLog9";
    scene.add(mainLog);
    mainLog_Geometry = new THREE.BoxGeometry(600, 100, 22);
    mainLog = new THREE.Mesh(mainLog_Geometry,logMaterial);
    mainLog.position.set(0,-233.34,133);
    mainLog.name = "mainLog10";
    scene.add(mainLog);
  
  
    //Inscripciones de los cubos de soporte.
    var label_Geometry = new THREE.BoxGeometry(100, 0.1, 78);
    var label = new THREE.Mesh(label_Geometry,label_info);
    label.position.set(300,0,61);
    label.rotation.y = 180*Math.PI / 180;
    label.rotation.z = 90*Math.PI / 180;
    label.name = "label1";
    scene.add(label);
    label_Geometry = new THREE.BoxGeometry(100, 0.1, 78);
    label = new THREE.Mesh(label_Geometry,label_info);
    label.position.set(-300,0,61);
    label.rotation.x = 180*Math.PI / 180;
    label.rotation.z = 90*Math.PI / 180;
    label.name = "label2";
    scene.add(label);
    label_Geometry = new THREE.BoxGeometry(100, 0.1, 78);
    label = new THREE.Mesh(label_Geometry,label_EUR);
    label.position.set(300,350,61);
    label.rotation.z = 90*Math.PI / 180;
    label.name = "label3";
    scene.add(label);
    label_Geometry = new THREE.BoxGeometry(100, 0.1, 78);
    label = new THREE.Mesh(label_Geometry,label_EUR);
    label.position.set(-300,-350,61);
    label.rotation.x = 180*Math.PI / 180;
    label.rotation.z = 90*Math.PI / 180;
    label.name = "label4";
    scene.add(label);
    label_Geometry = new THREE.BoxGeometry(100, 0.1, 78);
    label = new THREE.Mesh(label_Geometry,label_EPAL);
    label.position.set(-300,350,61);
    label.rotation.x = 180*Math.PI / 180;
    label.rotation.z = 90*Math.PI / 180;
    label.name = "label5";
    scene.add(label);
    label_Geometry = new THREE.BoxGeometry(100, 0.1, 78);
    label = new THREE.Mesh(label_Geometry,label_EPAL);
    label.position.set(300,-350,61);
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
    crossLog.position.set(0,540.7,41.3);
    crossLog.name = "crossLog1";
    scene.add(crossLog);
    crossLogGeometry = new THREE.BoxGeometry(33, 137.6, 66.80); 
    crossLog = new THREE.Mesh(crossLogGeometry,logMaterial);
    crossLog.position.set(491.5,540.7,41.3);
    crossLog.name = "crossLog2";
    scene.add(crossLog);
    crossLogGeometry = new THREE.BoxGeometry(33, 137.6, 66.80); 
    crossLog = new THREE.Mesh(crossLogGeometry,logMaterial);
    crossLog.position.set(-491.5,540.7,41.3);
    crossLog.name = "crossLog3";
    scene.add(crossLog);
    crossLogGeometry = new THREE.BoxGeometry(33, 137.6, 66.80); 
    crossLog = new THREE.Mesh(crossLogGeometry,logMaterial);
    crossLog.position.set(0,-540.7,41.3);
    crossLog.name = "crossLog4";
    scene.add(crossLog);
    crossLogGeometry = new THREE.BoxGeometry(33, 137.6, 66.80); 
    crossLog = new THREE.Mesh(crossLogGeometry,logMaterial);
    crossLog.position.set(491.5,-540.7,41.3);
    crossLog.name = "crossLog5";
    scene.add(crossLog);
    crossLogGeometry = new THREE.BoxGeometry(33, 137.6, 66.80); 
    crossLog = new THREE.Mesh(crossLogGeometry,logMaterial);
    crossLog.position.set(-491.5,-540.7,41.3);
    crossLog.name = "crossLog6";
    scene.add(crossLog);
    crossLogGeometry = new THREE.BoxGeometry(33, 412.8, 66.80); 
    crossLog = new THREE.Mesh(crossLogGeometry,logMaterial);
    crossLog.position.set(0,0,41.3);
    crossLog.name = "crossLog7";
    scene.add(crossLog);
    crossLogGeometry = new THREE.BoxGeometry(33, 412.8, 66.80); 
    crossLog = new THREE.Mesh(crossLogGeometry,logMaterial);
    crossLog.position.set(491.5,0,41.3);
    crossLog.name = "crossLog8";
    scene.add(crossLog);
    crossLogGeometry = new THREE.BoxGeometry(33, 412.8, 66.80); 
    crossLog = new THREE.Mesh(crossLogGeometry,logMaterial);
    crossLog.position.set(-491.5,0,41.3);
    crossLog.name = "crossLog9";
    scene.add(crossLog);
    crossLogGeometry = new THREE.BoxGeometry(33, 265.5, 44.75); 
    crossLog = new THREE.Mesh(crossLogGeometry,logMaterial);
    crossLog.position.set(0,339.15,52.65);
    crossLog.name = "crossLog10";
    scene.add(crossLog);
    crossLogGeometry = new THREE.BoxGeometry(33, 265.5, 44.75); 
    crossLog = new THREE.Mesh(crossLogGeometry,logMaterial);
    crossLog.position.set(491.5,339.15,52.65);
    crossLog.name = "crossLog11";
    scene.add(crossLog);
    crossLogGeometry = new THREE.BoxGeometry(33, 265.5, 44.75); 
    crossLog = new THREE.Mesh(crossLogGeometry,logMaterial);
    crossLog.position.set(-491.5,339.15,52.65);
    crossLog.name = "crossLog12";
    scene.add(crossLog);
    crossLogGeometry = new THREE.BoxGeometry(33, 265.5, 44.75); 
    crossLog = new THREE.Mesh(crossLogGeometry,logMaterial);
    crossLog.position.set(0,-339.15,52.65);
    crossLog.name = "crossLog13";
    scene.add(crossLog);
    crossLogGeometry = new THREE.BoxGeometry(33, 265.5, 44.75); 
    crossLog = new THREE.Mesh(crossLogGeometry,logMaterial);
    crossLog.position.set(491.5,-339.15,52.65);
    crossLog.name = "crossLog14";
    scene.add(crossLog);
    crossLogGeometry = new THREE.BoxGeometry(33, 265.5, 44.75); 
    crossLog = new THREE.Mesh(crossLogGeometry,logMaterial);
    crossLog.position.set(-491.5,-339.15,52.65);
    crossLog.name = "crossLog15";
    scene.add(crossLog);
    crossLogGeometry = new THREE.BoxGeometry(1016, 82.55, 7.9);
    crossLog = new THREE.Mesh(crossLogGeometry,logMaterial);
    crossLog.position.set(0,0,3.95);
    crossLog.name = "crossLog16";
    scene.add(crossLog);  
    crossLogGeometry = new THREE.BoxGeometry(1016, 137.6, 7.9);
    crossLog = new THREE.Mesh(crossLogGeometry,logMaterial);
    crossLog.position.set(0,540.7,3.95);
    crossLog.name = "crossLog17";
    scene.add(crossLog);  
    crossLogGeometry = new THREE.BoxGeometry(1016, 137.6, 7.9);
    crossLog = new THREE.Mesh(crossLogGeometry,logMaterial);
    crossLog.position.set(0,-540.7,3.95);
    crossLog.name = "crossLog18";
    scene.add(crossLog);
    crossLogGeometry = new THREE.BoxGeometry(1016, 82.55, 7.9);
    crossLog = new THREE.Mesh(crossLogGeometry,logMaterial);
    crossLog.position.set(0,165.1,3.95);
    crossLog.name = "crossLog19";
    scene.add(crossLog); 
    crossLogGeometry = new THREE.BoxGeometry(1016, 82.55, 7.9);
    crossLog = new THREE.Mesh(crossLogGeometry,logMaterial);
    crossLog.position.set(0,-165.1,3.95);
    crossLog.name = "crossLog20";
    scene.add(crossLog);  
  
  
    //Listones principales.
    var mainLog_Geometry = new THREE.BoxGeometry(1016, 82.55, 7.9);
    var mainLog = new THREE.Mesh(mainLog_Geometry,logMaterial);
    mainLog.position.set(0,0,78.65);
    mainLog.name = "mainLog1";
    scene.add(mainLog);  
    mainLog_Geometry = new THREE.BoxGeometry(1016, 137.6, 7.9);
    mainLog = new THREE.Mesh(mainLog_Geometry,logMaterial);
    mainLog.position.set(0,540.7,78.65);
    mainLog.name = "mainLog2";
    scene.add(mainLog);
    mainLog_Geometry = new THREE.BoxGeometry(1016, 137.6, 7.9);
    mainLog = new THREE.Mesh(mainLog_Geometry,logMaterial);
    mainLog.position.set(0,-540.7,78.65);
    mainLog.name = "mainLog3";
    scene.add(mainLog);
    mainLog_Geometry = new THREE.BoxGeometry(1016, 82.55, 7.9);
    mainLog = new THREE.Mesh(mainLog_Geometry,logMaterial);
    mainLog.position.set(0,165.1,78.65);
    mainLog.name = "mainLog4";
    scene.add(mainLog);  
    mainLog_Geometry = new THREE.BoxGeometry(1016, 82.55, 7.9);
    mainLog = new THREE.Mesh(mainLog_Geometry,logMaterial);
    mainLog.position.set(0,330.2,78.65);
    mainLog.name = "mainLog5";
    scene.add(mainLog);  
    mainLog_Geometry = new THREE.BoxGeometry(1016, 82.55, 7.9);
    mainLog = new THREE.Mesh(mainLog_Geometry,logMaterial);
    mainLog.position.set(0,-165.1,78.65);
    mainLog.name = "mainLog6";
    scene.add(mainLog);  
    mainLog_Geometry = new THREE.BoxGeometry(1016, 82.55, 7.9);
    mainLog = new THREE.Mesh(mainLog_Geometry,logMaterial);
    mainLog.position.set(0,-330.2,78.65);
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
    crossLog.position.set(0,517,41.3);
    crossLog.name = "crossLog1";
    scene.add(crossLog);
    crossLogGeometry = new THREE.BoxGeometry(1067, 33, 66.80); 
    crossLog = new THREE.Mesh(crossLogGeometry,logMaterial);
    crossLog.position.set(0,0,41.3);
    crossLog.name = "crossLog2";
    scene.add(crossLog);
    crossLogGeometry = new THREE.BoxGeometry(1067, 33, 66.80); 
    crossLog = new THREE.Mesh(crossLogGeometry,logMaterial);
    crossLog.position.set(0,-517,41.3);
    crossLog.name = "crossLog3";
    scene.add(crossLog);
    crossLogGeometry = new THREE.BoxGeometry(82.55, 1067, 7.9); 
    crossLog = new THREE.Mesh(crossLogGeometry,logMaterial);
    crossLog.position.set(0,0,3.95);
    crossLog.name = "crossLog4";
    scene.add(crossLog);
    crossLogGeometry = new THREE.BoxGeometry(82.55, 1067, 7.9); 
    crossLog = new THREE.Mesh(crossLogGeometry,logMaterial);
    crossLog.position.set(492.2,0,3.95);
    crossLog.name = "crossLog5";
    scene.add(crossLog);
    crossLogGeometry = new THREE.BoxGeometry(82.55, 1067, 7.9); 
    crossLog = new THREE.Mesh(crossLogGeometry,logMaterial);
    crossLog.position.set(-492.2,0,3.95);
    crossLog.name = "crossLog6";
    scene.add(crossLog);
    
  
    //Listones principales.
    var mainLog_Geometry = new THREE.BoxGeometry(137.6, 1067, 7.9);
    var mainLog = new THREE.Mesh(mainLog_Geometry,logMaterial);
    mainLog.position.set(0,0,78.65);
    mainLog.name = "mainLog1";
    scene.add(mainLog);  
    mainLog_Geometry = new THREE.BoxGeometry(137.6, 1067, 7.9);
    mainLog = new THREE.Mesh(mainLog_Geometry,logMaterial);
    mainLog.position.set(464.7,0,78.65);
    mainLog.name = "mainLog2";
    scene.add(mainLog); 
    mainLog_Geometry = new THREE.BoxGeometry(137.6, 1067, 7.9);
    mainLog = new THREE.Mesh(mainLog_Geometry,logMaterial);
    mainLog.position.set(-464.7,0,78.65);
    mainLog.name = "mainLog3";
    scene.add(mainLog); 
    mainLog_Geometry = new THREE.BoxGeometry(137.6, 1067, 7.9);
    mainLog = new THREE.Mesh(mainLog_Geometry,logMaterial);
    mainLog.position.set(-154.9,0,78.65);
    mainLog.name = "mainLog4";
    scene.add(mainLog); 
    mainLog_Geometry = new THREE.BoxGeometry(137.6, 1067, 7.9);
    mainLog = new THREE.Mesh(mainLog_Geometry,logMaterial);
    mainLog.position.set(-309.8,0,78.65);
    mainLog.name = "mainLog5";
    scene.add(mainLog);
    mainLog_Geometry = new THREE.BoxGeometry(137.6, 1067, 7.9);
    mainLog = new THREE.Mesh(mainLog_Geometry,logMaterial);
    mainLog.position.set(154.9,0,78.65);
    mainLog.name = "mainLog6";
    scene.add(mainLog); 
    mainLog_Geometry = new THREE.BoxGeometry(137.6, 1067, 7.9);
    mainLog = new THREE.Mesh(mainLog_Geometry,logMaterial);
    mainLog.position.set(309.8,0,78.65);
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
    crossLog.position.set(0,0,0);
    crossLog.name = "mainLog1";
    scene.add(crossLog);
  
  }
  
  //Destruye de la escena el pallet.
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
    scene.remove(scene.getObjectByName("crossLog21"));
    scene.remove(scene.getObjectByName("crossLog22"));
    scene.remove(scene.getObjectByName("crossLog23"));
    scene.remove(scene.getObjectByName("crossLog24"));
    scene.remove(scene.getObjectByName("crossLog25"));
    scene.remove(scene.getObjectByName("crossLog26"));
    scene.remove(scene.getObjectByName("crossLog27"));
    scene.remove(scene.getObjectByName("crossLog28"));
    scene.remove(scene.getObjectByName("crossLog29"));
    scene.remove(scene.getObjectByName("crossLog30"));
  
  
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
    scene.remove(scene.getObjectByName("mainLog11"));
    scene.remove(scene.getObjectByName("mainLog12"));
    scene.remove(scene.getObjectByName("mainLog13"));
    scene.remove(scene.getObjectByName("mainLog14"));
    scene.remove(scene.getObjectByName("mainLog15"));
    scene.remove(scene.getObjectByName("mainLog16"));
    scene.remove(scene.getObjectByName("mainLog17"));
    scene.remove(scene.getObjectByName("mainLog18"));
    scene.remove(scene.getObjectByName("mainLog19"));
    scene.remove(scene.getObjectByName("mainLog20"));
  
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

//Valores iniciales en los inputs de la caja.
function inputInitialization(){
  document.getElementById("pallet-lenght").readOnly = true;
  document.getElementById("pallet-width").readOnly = true;
  document.getElementById("pallet-height").readOnly = true;
  document.getElementById("pallet-mass").readOnly = true;
  document.getElementById("pallet-load").readOnly = true;
  document.getElementById("pallet-lenght").style.backgroundColor = 'grey';
  document.getElementById("pallet-width").style.backgroundColor = 'grey';
  document.getElementById("pallet-height").style.backgroundColor = 'grey';
  document.getElementById("pallet-mass").style.backgroundColor = 'grey';
  document.getElementById("pallet-load").style.backgroundColor = 'grey';

  document.getElementById("pallet-selection").value = 1;
	document.getElementById("pallet-lenght").value = 800;
	document.getElementById("pallet-width").value = 1200;
	document.getElementById("pallet-height").value = 144;
	document.getElementById("pallet-mass").value = 25;
  document.getElementById("pallet-load").value = 1500;

  palletEUR1();
}

//#region Lectura de los datos del pallet.

document.getElementById("pallet-selection").addEventListener('change', updateValues);

document.getElementById("pallet-lenght").addEventListener('input', updateValues);
document.getElementById("pallet-width").addEventListener('input', updateValues);
document.getElementById("pallet-height").addEventListener('input', updateValues);

document.getElementById("pallet-weight").addEventListener('input', changeWeightUnits);
document.getElementById("pallet-measurement").addEventListener('input', changeMeasurementUnits);

//Actualiza los valores del pallet.
function updateValues(){
	deletePallet();
  
  document.getElementById("pallet-lenght").readOnly = true;
  document.getElementById("pallet-width").readOnly = true;
  document.getElementById("pallet-height").readOnly = true;
  document.getElementById("pallet-mass").readOnly = true;
  document.getElementById("pallet-load").readOnly = true;
  document.getElementById("pallet-lenght").style.backgroundColor = 'grey';
  document.getElementById("pallet-width").style.backgroundColor = 'grey';
  document.getElementById("pallet-height").style.backgroundColor = 'grey';
  document.getElementById("pallet-mass").style.backgroundColor = 'grey';
  document.getElementById("pallet-load").style.backgroundColor = 'grey';
  
	palletType = document.getElementById("pallet-selection").value;
  
  switch (palletType){
    case "1":
        if(measurementUnits == 1){
          document.getElementById("pallet-lenght").value = 800;
          document.getElementById("pallet-width").value = 1200;
          document.getElementById("pallet-height").value = 144;
        }
        else{
          document.getElementById("pallet-lenght").value = 800*0.04;
          document.getElementById("pallet-width").value = 1200*0.04;
          document.getElementById("pallet-height").value = 144*0.04;
        }

        if(measurementWeight == 1){
          document.getElementById("pallet-mass").value = 25;
          document.getElementById("pallet-load").value = 1500;
        }
        else{
          document.getElementById("pallet-mass").value = Math.round(25*2.2*100)/100;
          document.getElementById("pallet-load").value = Math.round(1500*2.2*100)/100;
        }
        palletEUR1();
        break;
    case "2":
        if(measurementUnits == 1){
          document.getElementById("pallet-lenght").value = 1200;
          document.getElementById("pallet-width").value = 1000;
          document.getElementById("pallet-height").value = 162;
        }
        else{
          document.getElementById("pallet-lenght").value = 1200*0.04;
          document.getElementById("pallet-width").value = 1000*0.04;
          document.getElementById("pallet-height").value = 162*0.04;
        }
        
        if(measurementWeight == 1){
          document.getElementById("pallet-mass").value = 35;
          document.getElementById("pallet-load").value = 1250;
        }
        else{
          document.getElementById("pallet-mass").value = Math.round(35*2.2*100)/100;
          document.getElementById("pallet-load").value = Math.round(1250*2.2*100)/100;
        }
        palletEUR2();
        break;      
    case "3":
        if(measurementUnits == 1){
          document.getElementById("pallet-lenght").value = 1000;
          document.getElementById("pallet-width").value = 1200;
          document.getElementById("pallet-height").value = 144;
        }
        else{
          document.getElementById("pallet-lenght").value = 1000*0.04;
          document.getElementById("pallet-width").value = 1200*0.04;
          document.getElementById("pallet-height").value = 144*0.04;
        }

        if(measurementWeight == 1){
          document.getElementById("pallet-mass").value = 30;
          document.getElementById("pallet-load").value = 1500;
        }
        else{
          document.getElementById("pallet-mass").value = Math.round(30*2.2*100)/100;
          document.getElementById("pallet-load").value = Math.round(1500*2.2*100)/100;
        }
        palletEUR3();
        break;    
    case "4":
        if(measurementUnits == 1){
          document.getElementById("pallet-lenght").value = 800;
          document.getElementById("pallet-width").value = 600;
          document.getElementById("pallet-height").value = 144;
        }
        else{
          document.getElementById("pallet-lenght").value = 800*0.04;
          document.getElementById("pallet-width").value = 600*0.04;
          document.getElementById("pallet-height").value = 144*0.04;
        }

        if(measurementWeight == 1){
          document.getElementById("pallet-mass").value = 10;
          document.getElementById("pallet-load").value = 500;
        }
        else{
          document.getElementById("pallet-mass").value = Math.round(10*2.2*100)/100;
          document.getElementById("pallet-load").value = Math.round(500*2.2*100)/100;
        }
        palletEUR6();
        break;     
    case "5":
        if(measurementUnits == 1){
          document.getElementById("pallet-lenght").value = 1219.2;
          document.getElementById("pallet-width").value = 1016;
          document.getElementById("pallet-height").value = 121;
        }
        else{
          document.getElementById("pallet-lenght").value = 48;
          document.getElementById("pallet-width").value = 40;
          document.getElementById("pallet-height").value = 4.76;
        }

        if(measurementWeight == 1){
          document.getElementById("pallet-mass").value = 17;
          document.getElementById("pallet-load").value = 2086;
        }
        else{
          document.getElementById("pallet-mass").value = Math.round(17*2.2*100)/100;
          document.getElementById("pallet-load").value = Math.round(2086*2.2*100)/100;
        }
        palletUSA1();
        break;
    case "6":
        if(measurementUnits == 1){
          document.getElementById("pallet-lenght").value = 1066.8;
          document.getElementById("pallet-width").value = 1066.8;
          document.getElementById("pallet-height").value = 140;
        }
        else{
          document.getElementById("pallet-lenght").value = 42;
          document.getElementById("pallet-width").value = 42;
          document.getElementById("pallet-height").value = 5.6;
        }

        if(measurementWeight == 1){
          document.getElementById("pallet-mass").value = 14;
          document.getElementById("pallet-load").value = 1134;
        }
        else{
          document.getElementById("pallet-mass").value = Math.round(14*2.2*100)/100;
          document.getElementById("pallet-load").value = Math.round(1134*2.2*100)/100;
        }
        palletUSA2();
        break;
    case "7":
        document.getElementById("pallet-lenght").readOnly = false;
        document.getElementById("pallet-lenght").style.backgroundColor = 'white';
        document.getElementById("pallet-width").readOnly = false;
        document.getElementById("pallet-width").style.backgroundColor = 'white';
        document.getElementById("pallet-height").readOnly = false;
        document.getElementById("pallet-height").style.backgroundColor = 'white';
        document.getElementById("pallet-mass").readOnly = false;
        document.getElementById("pallet-mass").style.backgroundColor = 'white';
        document.getElementById("pallet-load").readOnly = false;
        document.getElementById("pallet-load").style.backgroundColor = 'white';

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

  document.getElementById("pallet-lenght").value = palletLenght;
	document.getElementById("pallet-width").value = palletWidth;
	document.getElementById("pallet-height").value = palletHeight;
	document.getElementById("pallet-mass").value = palletMass;
  document.getElementById("pallet-load").value = palletLoad;
}

//Cambia las unidades de medida del pallet.
function changeMeasurementUnits(){

  measurementUnits = document.getElementById("pallet-measurement").value;

	if (measurementUnits == 1){
		palletLenght = document.getElementById("pallet-lenght").value / 0.04;
    palletWidth = document.getElementById("pallet-width").value / 0.04;
    palletHeight = document.getElementById("pallet-height").value / 0.04;
	}
	else{
    palletLenght = document.getElementById("pallet-lenght").value * 0.04;
    palletWidth = document.getElementById("pallet-width").value * 0.04;
    palletHeight = document.getElementById("pallet-height").value * 0.04;
	}

	document.getElementById("pallet-lenght").value = Math.round(palletLenght*100)/100;
  document.getElementById("pallet-width").value = Math.round(palletWidth*100)/100;
  document.getElementById("pallet-height").value = Math.round(palletHeight*100)/100;

}
//Cambia las unidades de peso del pallet.
function changeWeightUnits(){

	measurementWeight = document.getElementById("pallet-weight").value;

	if (measurementWeight == 1){
		palletMass = document.getElementById("pallet-mass").value / 2.2;
    palletLoad = document.getElementById("pallet-load").value / 2.2;
	}
	else{
		palletMass = document.getElementById("pallet-mass").value * 2.2;
    palletLoad = document.getElementById("pallet-load").value * 2.2;
	}

	document.getElementById("pallet-mass").value = Math.round(palletMass*100)/100;
  document.getElementById("pallet-load").value = Math.round(palletLoad*100)/100;
}

//#endregion


//Reajuste de la escena.
function animate() {
	requestAnimationFrame( animate );
	renderer.render(scene, camera);
}

window.addEventListener('resize', function() {
	renderer.setSize(window.innerWidth, window.innerHeight);
	camera.aspect = window.innerWidth/window.innerHeight;
	camera.updateProjectionMatrix();
	animate();
});

animate();
inputInitialization();

