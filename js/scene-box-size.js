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
container = document.getElementById("scene-box-size");
container.appendChild( renderer.domElement );

//Controles de la cámara.
camera.up.set( 0, 0, 1 );
controls = new OrbitControls( camera, renderer.domElement );

//#region Variables de los inputs.
var boxLenght = 400;
var boxWidth = 400;
var boxHeight = 400;
var boxMass = 2.5;
var labelFront = false;
var labelRight = false;
var labelLeft = false;
var labelBack = false;
var measurementUnits = "mm";
var measurementWeight = "kg";
//#endregion

//Etiquetas iniciales de la caja.
var textureBox1 = new THREE.TextureLoader().load("box_texture/cardboard.png", function(){ renderer.render(scene, camera);});
var textureBox2 = new THREE.TextureLoader().load("box_texture/cardboard.png", function(){ renderer.render(scene, camera);});
var textureBox3 = new THREE.TextureLoader().load("box_texture/cardboard.png", function(){ renderer.render(scene, camera);});
var textureBox4 = new THREE.TextureLoader().load("box_texture/cardboard.png", function(){ renderer.render(scene, camera);});
var textureBox5 = new THREE.TextureLoader().load("box_texture/0000.png", function(){ renderer.render(scene, camera);});
var textureBox6 = new THREE.TextureLoader().load("box_texture/cardboard.png", function(){ renderer.render(scene, camera);});

//Variable para añadir caja a la escena.
var newBoxSize = undefined;

//Valores iniciales en los inputs de la caja.
function inputInitialization(){
	document.getElementById("box-lenght").value = 400;
	document.getElementById("box-width").value = 400;
	document.getElementById("box-height").value = 400;
	document.getElementById("box-mass").value = 2.5;

	document.getElementById("front-label").checked = false;
	document.getElementById("right-label").checked = false;
	document.getElementById("left-label").checked = false;
	document.getElementById("back-label").checked = false;

	showBoxSize(400,400,400);
}


//#region Tamaño de caja.
function showBoxSize(boxLenght,boxWidth,boxHeight){

  //Definición de la geometría y la textura de la caja.
	var boxGeometry = new THREE.BoxGeometry(boxLenght, boxWidth, boxHeight);
	var boxTexture = [];

	boxTexture.push(new THREE.MeshBasicMaterial({map:textureBox1}));
	boxTexture.push(new THREE.MeshBasicMaterial({map:textureBox2}));
	boxTexture.push(new THREE.MeshBasicMaterial({map:textureBox3}));
	boxTexture.push(new THREE.MeshBasicMaterial({map:textureBox4}));
	boxTexture.push(new THREE.MeshBasicMaterial({map:textureBox5}));
	boxTexture.push(new THREE.MeshBasicMaterial({map:textureBox6}));

	newBoxSize = new THREE.Mesh(boxGeometry,boxTexture);
	newBoxSize.position.set(0,0,0);
	newBoxSize.rotation.z = 90 * Math.PI / 180;

	newBoxSize.name = "newBoxSize";
	scene.add(newBoxSize);
}
//#endregion


//#region Lectura de los datos de caja.

document.getElementById("box-lenght").addEventListener('keypress', updateValues);
document.getElementById("box-width").addEventListener('keypress', updateValues);
document.getElementById("box-height").addEventListener('keypress', updateValues);
document.getElementById("box-mass").addEventListener('keypress', updateValues);

document.getElementById("front-label").addEventListener('change', updateLabels);
document.getElementById("right-label").addEventListener('change', updateLabels);
document.getElementById("left-label").addEventListener('change', updateLabels);
document.getElementById("back-label").addEventListener('change', updateLabels);

document.getElementById("unit-measurement").addEventListener('change', changeMeasurementUnits);
document.getElementById("weight-measurement").addEventListener('change', changeWeightUnits);

//Actualiza los valores de la caja.
function updateValues(){
	scene.remove(newBoxSize);

	measurementUnits = document.getElementById("unit-measurement").value;

	if (measurementUnits == 1){
			boxLenght = document.getElementById("box-lenght").value;
			boxWidth = document.getElementById("box-width").value;
			boxHeight = document.getElementById("box-height").value;
	}
	else{
		boxLenght = document.getElementById("box-lenght").value/0.04;
		boxWidth = document.getElementById("box-width").value/0.04;	
		boxHeight = document.getElementById("box-height").value/0.04;	
	}

	measurementWeight = document.getElementById("weight-measurement").value;

	if (measurementWeight == 1){
		boxMass = document.getElementById("box-mass").value;
	}
	else{
		boxMass = document.getElementById("box-mass").value / 2.2;
	}
	
	showBoxSize(boxLenght, boxWidth, boxHeight);
}

//Actualiza las etiquetas de la caja.
function updateLabels(){
	labelFront = document.getElementById("front-label").checked;
	labelRight = document.getElementById("right-label").checked;
	labelLeft = document.getElementById("left-label").checked;
	labelBack = document.getElementById("back-label").checked;

	//Etiqueta frontal.
	if(labelFront == true){
		textureBox4 = new THREE.TextureLoader().load("box_texture/cardboard_label_front.png", function(){ renderer.render(scene, camera);});
	}
	else{
		textureBox4 = new THREE.TextureLoader().load("box_texture/cardboard.png", function(){ renderer.render(scene, camera);});
	}

	//Etiqueta derecha.
	if(labelRight == true){
		textureBox2 = new THREE.TextureLoader().load("box_texture/cardboard_label_right.png", function(){ renderer.render(scene, camera);});
	}
	else{
		textureBox2 = new THREE.TextureLoader().load("box_texture/cardboard.png", function(){ renderer.render(scene, camera);});
	}

	//Etiqueta izquierda.
	if(labelLeft == true){
		textureBox1 = new THREE.TextureLoader().load("box_texture/cardboard_label_left.png", function(){ renderer.render(scene, camera);});
	}
	else{
		textureBox1 = new THREE.TextureLoader().load("box_texture/cardboard.png", function(){ renderer.render(scene, camera);});
	}

	//Etiqueta trasera.
	if(labelBack == true){
		textureBox3 = new THREE.TextureLoader().load("box_texture/cardboard_label_back.png", function(){ renderer.render(scene, camera);});
	}
	else{
		textureBox3 = new THREE.TextureLoader().load("box_texture/cardboard.png", function(){ renderer.render(scene, camera);});
	}

	scene.remove(newBoxSize);
	showBoxSize(boxLenght, boxWidth, boxHeight);
}

//Cambia las unidades de medida del display.
function changeMeasurementUnits(){

	measurementUnits = document.getElementById("unit-measurement").value;

	if (measurementUnits == 1){
		boxLenght = document.getElementById("box-lenght").value / 0.04;
		boxWidth = document.getElementById("box-width").value / 0.04;
		boxHeight = document.getElementById("box-height").value / 0.04;
	}
	else{
		boxLenght = Math.trunc(document.getElementById("box-lenght").value * 0.04);
		boxWidth = Math.trunc(document.getElementById("box-width").value * 0.04);
		boxHeight = Math.trunc(document.getElementById("box-height").value * 0.04);
	}

	document.getElementById("box-lenght").value = Math.round(boxLenght*100)/100;
	document.getElementById("box-width").value = Math.round(boxWidth*100)/100;
	document.getElementById("box-height").value = Math.round(boxHeight*100)/100;
}

//Cambia las unidades de medida del display.
function changeWeightUnits(){

	measurementWeight = document.getElementById("weight-measurement").value;

	if (measurementWeight == 1){
		boxMass = document.getElementById("box-mass").value / 2.2;
	}
	else{
		boxMass = document.getElementById("box-mass").value * 2.2;
	}

	document.getElementById("box-mass").value = Math.round(boxMass*100)/100;
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