//  import * as THREE from 'three';
//  import 'three/examples/js/controls/OrbitControls';

//Creación de la escena.
const scene = new THREE.Scene();
scene.background = new THREE.Color( 0x000000 );

//Creación de las constantes de la escena.
let camera,renderer,container;

//Setting de la cámara.
camera = new THREE.OrthographicCamera(-window.innerWidth, window.innerWidth, window.innerHeight, -window.innerHeight, 1, 10000);
camera.position.set(0,0,5000);

//Renderizado de la escena en la 'section' llamada 'container'.
renderer = new THREE.WebGLRenderer( { antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
container = document.getElementById("scene-box-placement");
container.appendChild( renderer.domElement );

//Creación de la iluminación
scene.add( new THREE.AmbientLight( 0x0f0f0f ) );


//#region Variables de la escena.
	//Variables iniciales de la caja.
	var initialBoxLenght = 400;
	var initialBoxWidth = 200;
	var initialBoxHeight = 400;
	var initialBoxMass = 2.5;
	var initialLabelFront = false;
	var initialLabelRight = false;
	var initialLabelLeft = false;
	var initialLabelBack = true;
	var boxLenght = initialBoxLenght;
	var boxWidth = initialBoxWidth;
	var boxHeight = initialBoxHeight;
	var firstRunCheck = false;

	//Tamaño del pallet.
	var palletLenght = 1200;
	var palletWidth = 800;
	var palletHeight = 144;
	var palletMass = 25;
	var palletLoad = 1500;

	//Listado de objetos y contador.
	var objects = [];
	var lastSelectedBoxIndex;

	//Array con el tamaño de cajas.
	var boxSizeX = [];
	var boxSizeY = [];

	//Definición de las variables de límite de las cajas.
	var boundBottom = [];
	var boundTop = [];
	var boundLeft = [];
	var boundRight = [];

	//Bool de selección de piso par/impar y altura de posición.
	var oddLayer = true;
	var layerHeight = boxHeight / 2;

	//Arrays con las variables impares y pares.
	var oddBoxes = [];
	var oddSizeX = [];
	var oddSizeY = [];
	var oddBottom = [];
	var oddTop = [];
	var oddRight = [];
	var oddLeft = [];

	var evenBoxes = [];
	var evenSizeX = [];
	var evenSizeY = [];
	var evenBottom = [];
	var evenTop = [];
	var evenRight = [];
	var evenLeft = [];

	var blockObjects = []

//#endregion

//#region Inicialización de la escena.
	function showBoxPlacement(){
		if(firstRunCheck == false){
			firstRun();
		}		
		updatePalletSize();
		spawnPreviousBoxes()

		changeLayer();
		changeLayer();
		changeLayer();
	}

	//Actualiza el pallet.
	function updatePalletSize(){
		deletePallet();
			
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
	}

	//Primera ejecución de la escena.
	function firstRun(){
		updateBoxSize();

		document.getElementById("position-x").readOnly = true;
		document.getElementById("position-y").readOnly = true;

		//Listeners de drag and drop.
		var controls = new THREE.DragControls( objects, camera, renderer.domElement );
		controls.addEventListener( 'dragstart', dragStartCallback );
		controls.addEventListener( 'dragend', dragendCallback );
		controls.addEventListener('');

		updatePalletSize();

		//Asignación del tamaño del caja.
		initialBoxLenght = (Math.round((parseInt(document.getElementById("box-lenght").value)) / 10) * 10);
		initialBoxWidth =  (Math.round((parseInt(document.getElementById("box-width").value)) / 10) * 10);
		initialBoxHeight =  (Math.round((parseInt(document.getElementById("box-height").value)) / 10) * 10);
		initialBoxMass =  (Math.round((parseInt(document.getElementById("box-mass").value)) / 10) * 10);
		initialLabelFront = document.getElementById("front-label").checked;
		initialLabelRight = document.getElementById("right-label").checked;
		initialLabelLeft = document.getElementById("left-label").checked;
		initialLabelBack = document.getElementById("back-label").checked;

		spawnBackground();
		checkForNewSpawn();
		detectColision();
		changeLayer();
		changeLayer();

		animate();

		firstRunCheck = true;
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
	//#endregion

	//Función para poner las etiquetas.
	function labelSelection(frontLabel, rightLabel, leftLabel, backLabel){
		var stringLabel = String(Number(frontLabel)) + String(Number(rightLabel)) + String(Number(leftLabel)) + String(Number(backLabel));
		switch(stringLabel){
			case "0001":
				textureBox4 = new THREE.TextureLoader().load("box_texture/cardboard.png", function(){ renderer.render(scene, camera);});				//Front label.
				textureBox2 = new THREE.TextureLoader().load("box_texture/cardboard.png", function(){ renderer.render(scene, camera);});				//Right label.
				textureBox1 = new THREE.TextureLoader().load("box_texture/cardboard.png", function(){ renderer.render(scene, camera);});				//Left label.
				textureBox3 = new THREE.TextureLoader().load("box_texture/cardboard_label_back.png", function(){ renderer.render(scene, camera);});		//Back label.
				textureBox5 = new THREE.TextureLoader().load("box_texture/0001.png", function(){ renderer.render(scene, camera);});						//Top label.
				textureBox6 = new THREE.TextureLoader().load("box_texture/cardboard.png", function(){ renderer.render(scene, camera);});				//Bottom label.
			break;
			case "0010":
				textureBox4 = new THREE.TextureLoader().load("box_texture/cardboard.png", function(){ renderer.render(scene, camera);});				//Front label.
				textureBox2 = new THREE.TextureLoader().load("box_texture/cardboard.png", function(){ renderer.render(scene, camera);});				//Right label.
				textureBox1 = new THREE.TextureLoader().load("box_texture/cardboard_label_left.png", function(){ renderer.render(scene, camera);});		//Left label.
				textureBox3 = new THREE.TextureLoader().load("box_texture/cardboard.png", function(){ renderer.render(scene, camera);});				//Back label.
				textureBox5 = new THREE.TextureLoader().load("box_texture/0010.png", function(){ renderer.render(scene, camera);});						//Top label.
				textureBox6 = new THREE.TextureLoader().load("box_texture/cardboard.png", function(){ renderer.render(scene, camera);});				//Bottom label.
			break;
			case "0011":
				textureBox4 = new THREE.TextureLoader().load("box_texture/cardboard.png", function(){ renderer.render(scene, camera);});				//Front label.
				textureBox2 = new THREE.TextureLoader().load("box_texture/cardboard.png", function(){ renderer.render(scene, camera);});				//Right label.
				textureBox1 = new THREE.TextureLoader().load("box_texture/cardboard_label_left.png", function(){ renderer.render(scene, camera);});		//Left label.
				textureBox3 = new THREE.TextureLoader().load("box_texture/cardboard_label_back.png", function(){ renderer.render(scene, camera);});		//Back label.
				textureBox5 = new THREE.TextureLoader().load("box_texture/0011.png", function(){ renderer.render(scene, camera);});						//Top label.
				textureBox6 = new THREE.TextureLoader().load("box_texture/cardboard.png", function(){ renderer.render(scene, camera);});				//Bottom label.
			break;
			case "0100":
				textureBox4 = new THREE.TextureLoader().load("box_texture/cardboard.png", function(){ renderer.render(scene, camera);});				//Front label.
				textureBox2 = new THREE.TextureLoader().load("box_texture/cardboard_label_right.png", function(){ renderer.render(scene, camera);});	//Right label.
				textureBox1 = new THREE.TextureLoader().load("box_texture/cardboard.png", function(){ renderer.render(scene, camera);});				//Left label.
				textureBox3 = new THREE.TextureLoader().load("box_texture/cardboard.png", function(){ renderer.render(scene, camera);});				//Back label.
				textureBox5 = new THREE.TextureLoader().load("box_texture/0100.png", function(){ renderer.render(scene, camera);});						//Top label.
				textureBox6 = new THREE.TextureLoader().load("box_texture/cardboard.png", function(){ renderer.render(scene, camera);});				//Bottom label.
			break;
			case "0101":
				textureBox4 = new THREE.TextureLoader().load("box_texture/cardboard.png", function(){ renderer.render(scene, camera);});				//Front label.
				textureBox2 = new THREE.TextureLoader().load("box_texture/cardboard_label_right.png", function(){ renderer.render(scene, camera);});	//Right label.
				textureBox1 = new THREE.TextureLoader().load("box_texture/cardboard.png", function(){ renderer.render(scene, camera);});				//Left label.
				textureBox3 = new THREE.TextureLoader().load("box_texture/cardboard_label_back.png", function(){ renderer.render(scene, camera);});		//Back label.
				textureBox5 = new THREE.TextureLoader().load("box_texture/0101.png", function(){ renderer.render(scene, camera);});						//Top label.
				textureBox6 = new THREE.TextureLoader().load("box_texture/cardboard.png", function(){ renderer.render(scene, camera);});				//Bottom label.
			break;
			case "0110":
				textureBox4 = new THREE.TextureLoader().load("box_texture/cardboard.png", function(){ renderer.render(scene, camera);});				//Front label.
				textureBox2 = new THREE.TextureLoader().load("box_texture/cardboard_label_right.png", function(){ renderer.render(scene, camera);});	//Right label.
				textureBox1 = new THREE.TextureLoader().load("box_texture/cardboard_label_left.png", function(){ renderer.render(scene, camera);});		//Left label.
				textureBox3 = new THREE.TextureLoader().load("box_texture/cardboard.png", function(){ renderer.render(scene, camera);});				//Back label.
				textureBox5 = new THREE.TextureLoader().load("box_texture/0110.png", function(){ renderer.render(scene, camera);});						//Top label.
				textureBox6 = new THREE.TextureLoader().load("box_texture/cardboard.png", function(){ renderer.render(scene, camera);});				//Bottom label.
			break;
			case "0111":
				textureBox4 = new THREE.TextureLoader().load("box_texture/cardboard.png", function(){ renderer.render(scene, camera);});				//Front label.
				textureBox2 = new THREE.TextureLoader().load("box_texture/cardboard_label_right.png", function(){ renderer.render(scene, camera);});	//Right label.
				textureBox1 = new THREE.TextureLoader().load("box_texture/cardboard_label_left.png", function(){ renderer.render(scene, camera);});		//Left label.
				textureBox3 = new THREE.TextureLoader().load("box_texture/cardboard_label_back.png", function(){ renderer.render(scene, camera);});		//Back label.
				textureBox5 = new THREE.TextureLoader().load("box_texture/0111.png", function(){ renderer.render(scene, camera);});						//Top label.
				textureBox6 = new THREE.TextureLoader().load("box_texture/cardboard.png", function(){ renderer.render(scene, camera);});				//Bottom label.
			break;
			case "1000":
				textureBox4 = new THREE.TextureLoader().load("box_texture/cardboard_label_front.png", function(){ renderer.render(scene, camera);});	//Front label.
				textureBox2 = new THREE.TextureLoader().load("box_texture/cardboard.png", function(){ renderer.render(scene, camera);});				//Right label.
				textureBox1 = new THREE.TextureLoader().load("box_texture/cardboard.png", function(){ renderer.render(scene, camera);});				//Left label.
				textureBox3 = new THREE.TextureLoader().load("box_texture/cardboard.png", function(){ renderer.render(scene, camera);});				//Back label.
				textureBox5 = new THREE.TextureLoader().load("box_texture/1000.png", function(){ renderer.render(scene, camera);});						//Top label.
				textureBox6 = new THREE.TextureLoader().load("box_texture/cardboard.png", function(){ renderer.render(scene, camera);});				//Bottom label.
			break;
			case "1001":
				textureBox4 = new THREE.TextureLoader().load("box_texture/cardboard_label_front.png", function(){ renderer.render(scene, camera);});	//Front label.
				textureBox2 = new THREE.TextureLoader().load("box_texture/cardboard.png", function(){ renderer.render(scene, camera);});				//Right label.
				textureBox1 = new THREE.TextureLoader().load("box_texture/cardboard.png", function(){ renderer.render(scene, camera);});				//Left label.
				textureBox3 = new THREE.TextureLoader().load("box_texture/cardboard_label_back.png", function(){ renderer.render(scene, camera);});		//Back label.
				textureBox5 = new THREE.TextureLoader().load("box_texture/1001.png", function(){ renderer.render(scene, camera);});						//Top label.
				textureBox6 = new THREE.TextureLoader().load("box_texture/cardboard.png", function(){ renderer.render(scene, camera);});				//Bottom label.
			break;
			case "1010":
				textureBox4 = new THREE.TextureLoader().load("box_texture/cardboard_label_front.png", function(){ renderer.render(scene, camera);});	//Front label.
				textureBox2 = new THREE.TextureLoader().load("box_texture/cardboard.png", function(){ renderer.render(scene, camera);});				//Right label.
				textureBox1 = new THREE.TextureLoader().load("box_texture/cardboard_label_left.png", function(){ renderer.render(scene, camera);});		//Left label.
				textureBox3 = new THREE.TextureLoader().load("box_texture/cardboard.png", function(){ renderer.render(scene, camera);});				//Back label.
				textureBox5 = new THREE.TextureLoader().load("box_texture/1010.png", function(){ renderer.render(scene, camera);});						//Top label.
				textureBox6 = new THREE.TextureLoader().load("box_texture/cardboard.png", function(){ renderer.render(scene, camera);});				//Bottom label.
			break;
			case "1011":
				textureBox4 = new THREE.TextureLoader().load("box_texture/cardboard_label_front.png", function(){ renderer.render(scene, camera);});	//Front label.
				textureBox2 = new THREE.TextureLoader().load("Ibox_textureMG/cardboard.png", function(){ renderer.render(scene, camera);});				//Right label.
				textureBox1 = new THREE.TextureLoader().load("box_texture/cardboard_label_left.png", function(){ renderer.render(scene, camera);});		//Left label.
				textureBox3 = new THREE.TextureLoader().load("box_texture/cardboard_label_back.png", function(){ renderer.render(scene, camera);});		//Back label.
				textureBox5 = new THREE.TextureLoader().load("box_texture/1011.png", function(){ renderer.render(scene, camera);});						//Top label.
				textureBox6 = new THREE.TextureLoader().load("box_texture/cardboard.png", function(){ renderer.render(scene, camera);});				//Bottom label.
			break;
			case "1100":
				textureBox4 = new THREE.TextureLoader().load("box_texture/cardboard_label_front.png", function(){ renderer.render(scene, camera);});	//Front label.
				textureBox2 = new THREE.TextureLoader().load("box_texture/cardboard_label_right.png", function(){ renderer.render(scene, camera);});	//Right label.
				textureBox1 = new THREE.TextureLoader().load("box_texture/cardboard.png", function(){ renderer.render(scene, camera);});				//Left label.
				textureBox3 = new THREE.TextureLoader().load("box_texture/cardboard.png", function(){ renderer.render(scene, camera);});				//Back label.
				textureBox5 = new THREE.TextureLoader().load("box_texture/1100.png", function(){ renderer.render(scene, camera);});						//Top label.
				textureBox6 = new THREE.TextureLoader().load("box_texture/cardboard.png", function(){ renderer.render(scene, camera);});				//Bottom label.
			break;
			case "1101":
				textureBox4 = new THREE.TextureLoader().load("box_texture/cardboard_label_front.png", function(){ renderer.render(scene, camera);});	//Front label.
				textureBox2 = new THREE.TextureLoader().load("box_texture/cardboard_label_right.png", function(){ renderer.render(scene, camera);});	//Right label.
				textureBox1 = new THREE.TextureLoader().load("box_texture/cardboard.png", function(){ renderer.render(scene, camera);});				//Left label.
				textureBox3 = new THREE.TextureLoader().load("box_texture/cardboard_label_back.png", function(){ renderer.render(scene, camera);});		//Back label.
				textureBox5 = new THREE.TextureLoader().load("box_texture/1101.png", function(){ renderer.render(scene, camera);});						//Top label.
				textureBox6 = new THREE.TextureLoader().load("box_texture/cardboard.png", function(){ renderer.render(scene, camera);});				//Bottom label.
			break;
			case "1110":
				textureBox4 = new THREE.TextureLoader().load("box_texture/cardboard_label_front.png", function(){ renderer.render(scene, camera);});	//Front label.
				textureBox2 = new THREE.TextureLoader().load("box_texture/cardboard_label_right.png", function(){ renderer.render(scene, camera);});	//Right label.
				textureBox1 = new THREE.TextureLoader().load("box_texture/cardboard_label_left.png", function(){ renderer.render(scene, camera);});		//Left label.
				textureBox3 = new THREE.TextureLoader().load("box_texture/cardboard.png", function(){ renderer.render(scene, camera);});				//Back label.
				textureBox5 = new THREE.TextureLoader().load("box_texture/1110.png", function(){ renderer.render(scene, camera);});						//Top label.
				textureBox6 = new THREE.TextureLoader().load("box_texture/cardboard.png", function(){ renderer.render(scene, camera);});				//Bottom label.
			break;
			case "1111":
				textureBox4 = new THREE.TextureLoader().load("box_texture/cardboard_label_front.png", function(){ renderer.render(scene, camera);});	//Front label.
				textureBox2 = new THREE.TextureLoader().load("box_texture/cardboard_label_right.png", function(){ renderer.render(scene, camera);});	//Right label.
				textureBox1 = new THREE.TextureLoader().load("box_texture/cardboard_label_left.png", function(){ renderer.render(scene, camera);});		//Left label.
				textureBox3 = new THREE.TextureLoader().load("box_texture/cardboard_label_back.png", function(){ renderer.render(scene, camera);});		//Back label.
				textureBox5 = new THREE.TextureLoader().load("box_texture/1111.png", function(){ renderer.render(scene, camera);});						//Top label.
				textureBox6 = new THREE.TextureLoader().load("box_texture/cardboard.png", function(){ renderer.render(scene, camera);});				//Bottom label.
			break;
			default:
				textureBox1 = new THREE.TextureLoader().load("box_texture/cardboard.png", function(){ renderer.render(scene, camera);});				//Left label.
				textureBox2 = new THREE.TextureLoader().load("box_texture/cardboard.png", function(){ renderer.render(scene, camera);});				//Right label.
				textureBox3 = new THREE.TextureLoader().load("box_texture/cardboard.png", function(){ renderer.render(scene, camera);});				//Back label.
				textureBox4 = new THREE.TextureLoader().load("box_texture/cardboard.png", function(){ renderer.render(scene, camera);});				//Front label.	
				textureBox5 = new THREE.TextureLoader().load("box_texture/0000.png", function(){ renderer.render(scene, camera);});						//Top label.
				textureBox6 = new THREE.TextureLoader().load("box_texture/cardboard.png", function(){ renderer.render(scene, camera);});				//Bottom label.
			break;	
		}
	}

//#endregion

//#region Spawn de cajas.
	//Crea un background para que al presionar se desactiven las cajas.
	function spawnBackground(){
		//Definición de la geometría de la caja.
		var boxGeometry = new THREE.BoxGeometry(10000, 10000, 1);
		var spawnedBox = undefined;

		var textureBackground = new THREE.TextureLoader().load("box_texture/background_button.png", function(){ renderer.render(scene, camera);});;
		var boxTexture = [];
		boxTexture.push(new THREE.MeshBasicMaterial({map:textureBackground}));
		boxTexture.push(new THREE.MeshBasicMaterial({map:textureBackground}));
		boxTexture.push(new THREE.MeshBasicMaterial({map:textureBackground}));
		boxTexture.push(new THREE.MeshBasicMaterial({map:textureBackground}));
		boxTexture.push(new THREE.MeshBasicMaterial({map:textureBackground}));
		boxTexture.push(new THREE.MeshBasicMaterial({map:textureBackground}));

		//Creación de la caja en la escena.
		spawnedBox = new THREE.Mesh(boxGeometry,boxTexture);
		spawnedBox.position.set(0,0,-5000);
		spawnedBox.name = "backgroundBox";
		scene.add(spawnedBox);

		//Introducción de la nueva caja en el array de objetos de la escena.
		objects.push(spawnedBox);
	
		//Límites de la caja.
		boxSizeX.push(boxLenght);
		boxSizeY.push(boxWidth);
	
		//Introducción de los límites de la caja en arrays
		boundBottom.push(boxWidth/2);
		boundTop.push(boxWidth/2);
		boundLeft.push(boxLenght/2);
		boundRight.push(boxLenght/2);
	}

	//Spawn de caja no girada.
	function spawnBoxNoRotated(){
		//Definición de la geometría de la caja.
		var boxGeometry = new THREE.BoxGeometry(initialBoxLenght, initialBoxWidth, initialBoxHeight);
		var spawnedBox = undefined;

		//Asignación de las texturas.
		labelSelection(initialLabelFront, initialLabelRight, initialLabelLeft, initialLabelBack);

		var boxTexture = [];
		boxTexture.push(new THREE.MeshBasicMaterial({map:textureBox1}));
		boxTexture.push(new THREE.MeshBasicMaterial({map:textureBox2}));
		boxTexture.push(new THREE.MeshBasicMaterial({map:textureBox3}));
		boxTexture.push(new THREE.MeshBasicMaterial({map:textureBox4}));
		boxTexture.push(new THREE.MeshBasicMaterial({map:textureBox5}));
		boxTexture.push(new THREE.MeshBasicMaterial({map:textureBox6}));

		//Creación de la caja en la escena.
		spawnedBox = new THREE.Mesh(boxGeometry,boxTexture);
		spawnedBox.position.set(1200,-(initialBoxWidth+initialBoxHeight)/2,layerHeight);
		spawnedBox.name = "spawnedBox";
		spawnedBox.rotation.z = 0*Math.PI/180;
		scene.add(spawnedBox);

		//Introducción de la nueva caja en el array de objetos de la escena.
		objects.push(spawnedBox);
	
		//Límites de la caja.
		boxSizeX.push(initialBoxLenght);
		boxSizeY.push(initialBoxWidth);
	
		//Introducción de los límites de la caja en arrays
		boundBottom.push(initialBoxWidth/2);
		boundTop.push(initialBoxWidth/2);
		boundLeft.push(initialBoxLenght/2);
		boundRight.push(initialBoxLenght/2);
	}

	//Spawn de caja girada.
	function spawnBoxRotated(){
		//Definición de la geometría de la caja.
		var boxGeometry = new THREE.BoxGeometry(initialBoxLenght, initialBoxWidth, initialBoxHeight);
		var spawnedBox = undefined;

		//Asignación de las texturas.
		labelSelection(initialLabelFront, initialLabelRight, initialLabelLeft, initialLabelBack);

		var boxTexture = [];
		boxTexture.push(new THREE.MeshBasicMaterial({map:textureBox1}));
		boxTexture.push(new THREE.MeshBasicMaterial({map:textureBox2}));
		boxTexture.push(new THREE.MeshBasicMaterial({map:textureBox3}));
		boxTexture.push(new THREE.MeshBasicMaterial({map:textureBox4}));
		boxTexture.push(new THREE.MeshBasicMaterial({map:textureBox5}));
		boxTexture.push(new THREE.MeshBasicMaterial({map:textureBox6}));

		//Creación de la caja en la escena.
		spawnedBox = new THREE.Mesh(boxGeometry,boxTexture);
		spawnedBox.position.set(1200,(initialBoxWidth+initialBoxHeight)/2,layerHeight);
		spawnedBox.rotation.z = 90*Math.PI/180;
		spawnedBox.name = "spawnedBox";
		scene.add(spawnedBox);

		//Introducción de la nueva caja en el array de objetos de la escena.
		objects.push(spawnedBox);

		//Límites de la caja.
		boxSizeX.push(initialBoxWidth);
		boxSizeY.push(initialBoxLenght);
	
		//Introducción de los límites de la caja en arrays
		boundBottom.push(initialBoxLenght/2);
		boundTop.push(initialBoxLenght/2);
		boundLeft.push(initialBoxWidth/2);
		boundRight.push(initialBoxWidth/2);
	}

	//Si no hay caja en los spawns, activa el spawn de una caja nueva.
	function checkForNewSpawn(){
		var requestNewRotatedBox = true;
		var requestNewNonRotatedBox =  true;

		for(var i = 0; i < Object.keys(objects).length; i++){
			if(objects[i].position.x >= 1000 && objects[i].position.y > 0){
				requestNewRotatedBox = false;
			}
			if(objects[i].position.x >= 1000 && objects[i].position.y < 0){
				requestNewNonRotatedBox = false;
			}
		}

		if(requestNewRotatedBox == true){
			spawnBoxRotated();
		}
		if(requestNewNonRotatedBox == true){
			spawnBoxNoRotated();
		}
	}

//#endregion

//#region Drag and drop.
	//Listeners de drag and drop.
	var controls = new THREE.DragControls( objects, camera, renderer.domElement );
	controls.addEventListener( 'dragstart', dragStartCallback );
	controls.addEventListener( 'dragend', dragendCallback );
	controls.addEventListener('');

	//Función de drag.
	function dragStartCallback(event) {
		for(var i = 0; i < objects.length; i++){
			objects[i].material[4].color.setHex(0xffffff);
		}

		if(lastSelectedBoxIndex != 0){
			event.object.material[4].color.setHex(0x00ff00);			
		}	

		getDragID(event);
		displayPosition(event);
	}

	//Función de drop.
	function dragendCallback(event) {
		if(lastSelectedBoxIndex != 0){
			event.object.material[4].color.setHex(0xffffff);
		}	
		checkForNewSpawn();	
		detectNearBox(event);
		displayPosition(event);
		detectColision();
		paintLastBox();
	}

	//Función para saber la ID de la caja arrastrada.
	function getDragID(event){
		var initialXPosition = Math.round(event.object.position.x);
		var initialYPosition = Math.round(event.object.position.y);

		for(var i = 0; i < objects.length; i++){
			if (initialXPosition == objects[i].position.x && initialYPosition == objects[i].position.y){
				lastSelectedBoxIndex = i;
				if(objects[i].name != "backgroundBox"){
					objects[i].name = "box";
				}	
			}
		}
	}

//#endregion

//#region Rotar, destruir caja e indicar layer.
	//Rotación de la caja.
	function rotateBox(){
		//Rotación en la posición.
		objects[lastSelectedBoxIndex].rotation.z =  objects[lastSelectedBoxIndex].rotation.z + 90*Math.PI/180;

		//Corrección de la rotación de la caja.
		if(objects[lastSelectedBoxIndex].rotation.z > 5){
			objects[lastSelectedBoxIndex].rotation.z = 0*Math.PI/180;
		}
		
		//Guardado de las variables iniciales.
		var rotatedBoxSizeX = boxSizeX[lastSelectedBoxIndex];
		var rotatedBoxSizeY = boxSizeY[lastSelectedBoxIndex];

		//Reemplazo para la caja rotada.
		boxSizeX[lastSelectedBoxIndex] = rotatedBoxSizeY;
		boxSizeY[lastSelectedBoxIndex] = rotatedBoxSizeX;

		boundBottom[lastSelectedBoxIndex] = boxSizeY[lastSelectedBoxIndex]/2;
		boundTop[lastSelectedBoxIndex] = boxSizeY[lastSelectedBoxIndex]/2;
		boundLeft[lastSelectedBoxIndex] = boxSizeX[lastSelectedBoxIndex]/2;
		boundRight[lastSelectedBoxIndex] = boxSizeX[lastSelectedBoxIndex]/2;
	}

	//Destrucción de la caja (no la destruimos, la enviamos lejos y canviamos su nombre).
	function destroyBox(){
		if(lastSelectedBoxIndex != 0){
			objects[lastSelectedBoxIndex].position.set(-100000,-100000,-100000);
			objects[lastSelectedBoxIndex].name = "deletedBox"
		}
	}

	//Indica si nos encontramos en el layer impar o par.
	function indicateLayer(){
		if(oddLayer == true){
			document.getElementById("layer-name").innerHTML = 'ODD LAYER';
		}
		else{
			document.getElementById("layer-name").innerHTML = 'EVEN LAYER';
		}
	}
//#endregion

//#region Funcionamiento general del posicionamiento
	//Función para colocar las cajas una al lado de otra.
	function detectNearBox(event){

		var indexMovBox = undefined;

		//Definición de las variables de límite de las cajas
		var boxBottom = [];
		var boxTop = [];
		var boxLeft = []; 
		var boxRight = [];

		//Definición de los márgenes de la caja
		//Declaración de los margenes X
		var leftExtMargin = 0;
		var leftIntMargin = 0;
		var rightIntMargin = 0;
		var rightExtMargin = 0;

		//Declaración de los margenes Y
		var upExtMargin = boxTop[i] + 200;
		var upIntMargin = boxTop[i] - 200;
		var downIntMargin = boxBottom[i] + 200;
		var downExtMargin = boxBottom[i] - 200;

		//Introducción de los límites de las cajas en arrays
		for (var i = 0; i < objects.length; i++){
			//Crea un array con los límites de las cajas ya ubicadas
			boxBottom.push(objects[i].position.y - boundBottom[i]);
			boxTop.push(objects[i].position.y + boundTop[i]);
			boxLeft.push(objects[i].position.x - boundLeft[i]);
			boxRight.push(objects[i].position.x + boundRight[i]);
		}

		//Redondeamos a la unidad el valor de la caja arrastrada
		event.object.position.x = Math.round(event.object.position.x);
		event.object.position.y = Math.round(event.object.position.y);

		//Sacamos el ID de la caja que estamos moviendo
		for(var i = 0; i < objects.length; i++){
			if (event.object.position.x == objects[i].position.x && event.object.position.y == objects[i].position.y){
				indexMovBox = i;
			}
		}

		//Ponemos a color original la caja movida.
		objects[indexMovBox].material[4].color.setHex(0xffffff);

		//Comprovamos si está en contacto con alguna otra caja
		for(var i = 0; i < objects.length; i++){
		
			//Declaración de los margenes X
			leftExtMargin = boxLeft[i] - 20;
			leftIntMargin = boxLeft[i] + 20;
			rightIntMargin = boxRight[i] - 20;
			rightExtMargin = boxRight[i] + 20;

			//Declaración de los margenes Y
			upExtMargin = boxTop[i] + 20;
			upIntMargin = boxTop[i] - 20;
			downIntMargin = boxBottom[i] + 20;
			downExtMargin = boxBottom[i] - 20;

			//Declaración de los margenes X
			leftPalletExtMargin = - palletLenght / 2 - 20;
			leftPalletIntMargin = - palletLenght / 2 + 20;
			rightPalletIntMargin = palletLenght / 2 - 20;
			rightPalletExtMargin = palletLenght / 2 + 20;

			//Declaración de los margenes Y
			upPalletExtMargin = palletWidth / 2 + 20;
			upPalletIntMargin = palletWidth / 2 - 20;
			downPalletIntMargin = - palletWidth / 2 + 20;
			downPalletExtMargin = - palletWidth / 2 - 20;


			//Pallet márgen superior
			if(upPalletIntMargin < boxTop[indexMovBox] && boxTop[indexMovBox] < upPalletExtMargin){
				objects[indexMovBox].position.y = palletWidth / 2 - boxSizeY[indexMovBox] / 2;
			}
			//Pallet márgen inferior
			if(downPalletIntMargin > boxBottom[indexMovBox] && boxBottom[indexMovBox] > downPalletExtMargin){
				objects[indexMovBox].position.y = - palletWidth / 2 + boxSizeY[indexMovBox] / 2;
			}
			//Pallet márgen izquierdo
			if(leftPalletExtMargin < boxLeft[indexMovBox] && boxLeft[indexMovBox] < leftPalletIntMargin){
				objects[indexMovBox].position.x = - palletLenght / 2 + boxSizeX[indexMovBox] / 2;
			}
			//Pallet márgen derecho
			if(rightPalletIntMargin < boxRight[indexMovBox] && boxRight[indexMovBox] < rightPalletExtMargin){
				objects[indexMovBox].position.x = palletLenght / 2 - boxSizeX[indexMovBox] / 2;
			}


			//Esquina superior izquierda
			if((upExtMargin > boxBottom[indexMovBox] && boxBottom[indexMovBox] > upIntMargin) && (leftExtMargin < boxRight[indexMovBox] && boxRight[indexMovBox] < leftIntMargin) && boxLeft[indexMovBox] < leftExtMargin && boxTop[indexMovBox] > upExtMargin){
				objects[indexMovBox].position.x = boxLeft[i] - boxSizeX[indexMovBox] / 2;
				objects[indexMovBox].position.y = boxTop[i] + boxSizeY[indexMovBox] / 2;
			}
			//Esquina superior derecha
			if((upExtMargin > boxBottom[indexMovBox] && boxBottom[indexMovBox] > upIntMargin) && (rightExtMargin > boxLeft[indexMovBox] && boxLeft[indexMovBox] > rightIntMargin) && boxRight[indexMovBox] > rightExtMargin && boxTop[indexMovBox] > upExtMargin){
				objects[indexMovBox].position.x = boxRight[i] + boxSizeX[indexMovBox] / 2;
				objects[indexMovBox].position.y = boxTop[i] + boxSizeY[indexMovBox] / 2;
			}
			//Esquina inferior derecha
			if((downExtMargin < boxTop[indexMovBox] && boxTop[indexMovBox] < downIntMargin) && (rightExtMargin > boxLeft[indexMovBox] && boxLeft[indexMovBox] > rightIntMargin) && boxRight[indexMovBox] > rightExtMargin && boxBottom[indexMovBox] < downExtMargin){
				objects[indexMovBox].position.x = boxRight[i] + boxSizeX[indexMovBox] / 2;
				objects[indexMovBox].position.y = boxBottom[i] - boxSizeY[indexMovBox] / 2;			
			}		
			//Esquina inferior izquierda
			if((downExtMargin < boxTop[indexMovBox] && boxTop[indexMovBox] < downIntMargin) && (leftExtMargin < boxRight[indexMovBox] && boxRight[indexMovBox] < leftIntMargin) && boxLeft[indexMovBox] < leftExtMargin && boxBottom[indexMovBox] < downExtMargin){
				objects[indexMovBox].position.x = boxLeft[i] - boxSizeX[indexMovBox] / 2;
				objects[indexMovBox].position.y = boxBottom[i] - boxSizeY[indexMovBox] / 2;
			}

			//Márgen superior
			if((upExtMargin > boxBottom[indexMovBox] && boxBottom[indexMovBox] > upIntMargin) && ((boxLeft[i] < boxLeft[indexMovBox] && boxLeft[indexMovBox] < boxRight[i]) || (boxLeft[i] < boxRight[indexMovBox] && boxRight[indexMovBox] < boxRight[i])) && boxTop[indexMovBox] > upExtMargin){	
				objects[indexMovBox].position.y = boxTop[i] + boxSizeY[indexMovBox] / 2;

				//Márgen superior izquierdo
				if(leftExtMargin < boxLeft[indexMovBox] && boxLeft[indexMovBox] < leftIntMargin){
					objects[indexMovBox].position.x = boxLeft[i] + boxSizeX[indexMovBox] / 2;
				}	
				//Márgen superior derecho
				if(rightExtMargin > boxRight[indexMovBox] && boxRight[indexMovBox] > rightIntMargin){
					objects[indexMovBox].position.x = boxRight[i] - boxSizeX[indexMovBox] / 2;
				}	
			}
			//Márgen derecho
			if((rightIntMargin < boxLeft[indexMovBox] && boxLeft[indexMovBox] < rightExtMargin) && ((boxTop[i] > boxTop[indexMovBox] && boxTop[indexMovBox] > boxBottom[i]) || (boxTop[i] > boxBottom[indexMovBox] && boxBottom[indexMovBox] > boxBottom[i])) && boxRight[indexMovBox] > rightExtMargin){	
				objects[indexMovBox].position.x = boxRight[i] + boxSizeX[indexMovBox] / 2;		

				//Márgen derecho superior
				if(upExtMargin > boxTop[indexMovBox] && boxTop[indexMovBox] > upIntMargin){
					objects[indexMovBox].position.y = boxTop[i] - boxSizeY[indexMovBox] / 2;
				}	
				//Márgen derecho inferior
				if(downExtMargin < boxBottom[indexMovBox] && boxBottom[indexMovBox] < downIntMargin){
					objects[indexMovBox].position.y = boxBottom[i] + boxSizeY[indexMovBox] / 2;
				}
			}
			//Márgen inferior
			if((downExtMargin < boxTop[indexMovBox] && boxTop[indexMovBox] < downIntMargin) && ((boxRight[i] > boxRight[indexMovBox] && boxRight[indexMovBox] > boxLeft[i]) || (boxRight[i] > boxLeft[indexMovBox] && boxLeft[indexMovBox] > boxLeft[i])) && boxBottom[indexMovBox] < downExtMargin){
				objects[indexMovBox].position.y = boxBottom[i] - boxSizeY[indexMovBox] / 2;	

				//Márgen superior izquierdo
				if(leftExtMargin < boxLeft[indexMovBox] && boxLeft[indexMovBox] < leftIntMargin){
					objects[indexMovBox].position.x = boxLeft[i] + boxSizeX[indexMovBox] / 2;
				}	
				//Márgen superior derecho
				if(rightExtMargin > boxRight[indexMovBox] && boxRight[indexMovBox] > rightIntMargin){
					objects[indexMovBox].position.x = boxRight[i] - boxSizeX[indexMovBox] / 2;
				}
			}	
			//Márgen izquierdo
			if((leftExtMargin < boxRight[indexMovBox] && boxRight[indexMovBox] < leftIntMargin) && ((boxTop[i] > boxTop[indexMovBox] && boxTop[indexMovBox] > boxBottom[i]) || (boxTop[i] > boxBottom[indexMovBox] && boxBottom[indexMovBox] > boxBottom[i])) && boxLeft[indexMovBox] < leftExtMargin){
				objects[indexMovBox].position.x = boxLeft[i] - boxSizeX[indexMovBox] / 2;

				//Márgen derecho superior
				if(upExtMargin > boxTop[indexMovBox] && boxTop[indexMovBox] > upIntMargin){
					objects[indexMovBox].position.y = boxTop[i] - boxSizeY[indexMovBox] / 2;
				}	
				//Márgen derecho inferior
				if(downExtMargin < boxBottom[indexMovBox] && boxBottom[indexMovBox] < downIntMargin){
					objects[indexMovBox].position.y = boxBottom[i] + boxSizeY[indexMovBox] / 2;
				}
			}		
		}
	}

	//Color en la última caja seleccionada.
	function paintLastBox(){
		if(lastSelectedBoxIndex != 0){
			objects[lastSelectedBoxIndex].material[4].color.setHex(0x00ff00);
		}
	}

	//Actualiza el valor de la posición en la pantalla.
	function displayPosition(event){
		var initialXPosition = Math.round(event.object.position.x);
		var initialYPosition = Math.round(event.object.position.y);

		for(var i = 0; i < objects.length; i++){
			if ((initialXPosition == objects[i].position.x && initialYPosition == objects[i].position.y) * i != 0){
				var XPosition = Math.round(objects[i].position.x);
				var YPosition = Math.round(objects[i].position.y);

				document.getElementById("position-x").value = XPosition;
				document.getElementById("position-y").value = YPosition;
			}
		}
	}

	//Detección de las colisiones
	function detectColision(){

		//Definición de las variables de límite de las cajas
		var boxBottom = [];
		var boxTop = [];
		var boxLeft = []; 
		var boxRight = [];

		//Vuelve todas las cajas a su color original
		for(var k = 0; k < objects.length; k++){
			objects[k].material[4].color.setHex(0xffffff);
		}

		//Detección de las colisiones
		for (var i = 0; i < objects.length; i++){
			//Crea un array con los límites de las cajas ya ubicadas
			boxBottom.push(objects[i].position.y - boundBottom[i]);
			boxTop.push(objects[i].position.y + boundTop[i]);
			boxLeft.push(objects[i].position.x - boundLeft[i]);
			boxRight.push(objects[i].position.x + boundRight[i]);

			for(var j = 0; j < objects.length; j++){
				//Límite esquina inferior derecha
				if(boxBottom[i] < boxTop[j] && boxRight[i] > boxLeft[j] && boxBottom[i] > boxBottom[j] && boxRight[i] < boxRight[j] && j != 0 && i != 0){
					objects[i].material[4].color.setHex(0xff0000);
					objects[j].material[4].color.setHex(0xff0000);
				}
				//Límite esquina inferior izquierda
				if(boxBottom[i] < boxTop[j] && boxLeft[i] < boxRight[j] && boxBottom[i] > boxBottom[j] && boxLeft[i] > boxLeft[j] && j != 0 && i != 0){
					objects[i].material[4].color.setHex(0xff0000);
					objects[j].material[4].color.setHex(0xff0000);
				}
				//Límite esquina superior izquierda
				if(boxTop[i] > boxBottom[j] && boxLeft[i] < boxRight[j] && boxTop[i] < boxTop[j] && boxLeft[i] > boxLeft[j] && j != 0 && i != 0){
					objects[i].material[4].color.setHex(0xff0000);
					objects[j].material[4].color.setHex(0xff0000);
				}
				//Límite esquina superior derecha
				if(boxTop[i] > boxBottom[j] && boxRight[i] > boxLeft[j] && boxTop[i] < boxTop[j] && boxRight[i] < boxRight[j] && j != 0 && i != 0){
					objects[i].material[4].color.setHex(0xff0000);
					objects[j].material[4].color.setHex(0xff0000);
				}
				//Límite inferior y superior
				if(boxLeft[i] == boxLeft[j] && boxRight[i] == boxRight[j] && i != j){
					if(((boxBottom[i] < boxTop[j] && boxTop[i] > boxTop[j]) || (boxBottom[i] < boxBottom[j] && boxTop[i] > boxBottom[j])) && j != 0 && i != 0){
						objects[i].material[4].color.setHex(0xff0000);
						objects[j].material[4].color.setHex(0xff0000);
					}
				}
				//Límite izquierdo y derecho
				if(boxBottom[i] == boxBottom[j] && boxTop[i] == boxTop[j] && i != j){
					if(((boxLeft[i] < boxRight[j] && boxRight[i] > boxRight[j]) || (boxLeft[i] < boxLeft[j] && boxRight[i] > boxLeft[j])) && j != 0 && i != 0){
						objects[i].material[4].color.setHex(0xff0000);
						objects[j].material[4].color.setHex(0xff0000);
					}
				}			
				//Límite izquierdo y derecho para cajas giradas
				if(((boxTop[j] > boxBottom[i] && boxBottom[j] < boxTop[i]) && ((boxLeft[i] < boxLeft[j] && boxRight[i] > boxLeft[j] ) || (boxLeft[i] < boxRight[j] && boxRight[i] > boxRight[j]))) && j != 0 && i != 0){
					objects[i].material[4].color.setHex(0xff0000);
					objects[j].material[4].color.setHex(0xff0000);
				}	
				//Límite para cajas cruzadas
				if(boxLeft[j] < boxLeft[i] && boxRight[i] < boxRight[j] && boxBottom[i] < boxBottom[j] && boxTop[j] < boxTop[i] && i != j && j != 0 && i != 0){
					objects[i].material[4].color.setHex(0xff0000);
					objects[j].material[4].color.setHex(0xff0000);
				}	
				//Límite para dos cajas en la misma posición
				if(boxLeft[j] == boxLeft[i] && boxRight[i] == boxRight[j] && boxBottom[i] == boxBottom[j] && boxTop[j] == boxTop[i] && i != j && j != 0 && i != 0){
					objects[i].material[4].color.setHex(0xff0000);
					objects[j].material[4].color.setHex(0xff0000);
				}

				//Límite para caja fuera del lado izquierdo del pallet.
				if(boxLeft[i] < (-boxSizeX[i]*0.25 - palletLenght/2) && boxRight[i] < 1200){
					objects[i].material[4].color.setHex(0xff0000);
				}
				//Límite para caja fuera del lado superior del pallet.
				if(boxTop[i] > (boxSizeY[i]*0.25 + palletWidth/2) && boxRight[i] < 1200){
					objects[i].material[4].color.setHex(0xff0000);
				}
				//Límite para caja fuera del lado derecho del pallet.
				if(boxRight[i] > (boxSizeX[i]*0.25 + palletLenght/2) && boxRight[i] < 1200){
					objects[i].material[4].color.setHex(0xff0000);
				}
				//Límite para caja fuera del lado inferior del pallet.
				if(boxBottom[i] < (-boxSizeY[i]*0.25 - palletWidth/2) && boxRight[i] < 1200){
					objects[i].material[4].color.setHex(0xff0000);
				}
			}
		}
	}


	//#region Cambio de piso, copiar layer anterior y girar layer.
	//Función para cambiar de layer
	function changeLayer(){

		//Paso de piso impar a piso par.
		if(oddLayer == true){
			//Reiniciamos las variables del piso impar.
			oddBoxes = [];
			oddSizeX = [];
			oddSizeY = [];
			oddBottom = [];
			oddTop = [];
			oddRight = [];
			oddLeft = [];
			
			//Guardado de las variables actuales a las variables impares.
			for(var i = 0; i < objects.length; i++){
				if(objects[i].name == "box"){
					oddBoxes.push(objects[i]);
					oddSizeX.push(boxSizeX[i]);
					oddSizeY.push(boxSizeY[i]);
					oddBottom.push(boundBottom[i]);
					oddTop.push(boundTop[i]);
					oddRight.push(boundRight[i]);
					oddLeft.push(boundLeft[i]);	
				}
			}

			//Eliminación de las cajas de la escena.
			for(var i = 1; i < objects.length; i++){
				scene.remove(objects[i])
			}

			//Eliminación de las posiciones actuales del array.
			objects.splice(1,objects.length);
			boxSizeX.splice(1,boxSizeX.length);
			boxSizeY.splice(1,boxSizeY.length);
			boundBottom.splice(1,boundBottom.length);
			boundTop.splice(1,boundTop.length);
			boundRight.splice(1,boundRight.length);
			boundLeft.splice(1,boundLeft.length);

			//Spawneamos las cajas impares en el piso de abajo (al no estar en objects[], quedan bloqueadas).
			for (var i = 0; i < oddBoxes.length; i++){
				oddBoxes[i].material[4].color.setHex(0x4f4f4f);
				scene.add(oddBoxes[i]);
				blockObjects.push(oddBoxes[i]);
			}

			//Definimios la altura de posicionamento del layer
			layerHeight = boxHeight * 1.5;

			//Spawneamos las cajas pares previamente configuradas (si las hay).
			for (var i = 0; i < evenBoxes.length; i++){
				evenBoxes[i].material[4].color.setHex(0xffffff);
				boxSizeX.push(evenSizeX[i]);
				boxSizeY.push(evenSizeY[i]);
				boundBottom.push(evenBottom[i]);
				boundTop.push(evenTop[i]);
				boundRight.push(evenRight[i]);
				boundLeft.push(evenLeft[i]);

				scene.add(evenBoxes[i]);

				objects.push(evenBoxes[i]);

				detectColision();
			}

			//Cambiamos de layer
			oddLayer = false;
		}
		else{
			//Reiniciamos las variables del piso par.
			evenBoxes = [];
			evenSizeX = [];
			evenSizeY = [];
			evenBottom = [];
			evenTop = [];
			evenRight = [];
			evenLeft = [];

			//Eliminación de las cajas de la escena.
			for(var i = 0; i < blockObjects.length; i++){
				scene.remove(blockObjects[i])
			}
			blockObjects = [];

			//Guardado de las variables actuales a las variables pares.
			for(var i = 0; i < objects.length; i++){
				if(objects[i].name == "box"){
					evenBoxes.push(objects[i]);
					evenSizeX.push(boxSizeX[i]);
					evenSizeY.push(boxSizeY[i]);
					evenBottom.push(boundBottom[i]);
					evenTop.push(boundTop[i]);
					evenRight.push(boundRight[i]);
					evenLeft.push(boundLeft[i]);					
				}
			}

			//Eliminación de las cajas de la escena.
			for(var i = 0; i < objects.length; i++){
				scene.remove(objects[i])
			}

			//Eliminación de las posiciones actuales del array.
			objects.splice(1,objects.length);
			boxSizeX.splice(1,boxSizeX.length);
			boxSizeY.splice(1,boxSizeY.length);
			boundBottom.splice(1,boundBottom.length);
			boundTop.splice(1,boundTop.length);
			boundRight.splice(1,boundRight.length);
			boundLeft.splice(1,boundLeft.length);

			//Definimios la altura de posicionamento del layer
			layerHeight = boxHeight * 0.5;

			//Spawneamos las cajas impares previamente configuradas (si las hay).
			for (var i = 0; i < oddBoxes.length; i++){
				oddBoxes[i].material[4].color.setHex(0xffffff);
				boxSizeX.push(oddSizeX[i]);
				boxSizeY.push(oddSizeY[i]);
				boundBottom.push(oddBottom[i]);
				boundTop.push(oddTop[i]);
				boundRight.push(oddRight[i]);
				boundLeft.push(oddLeft[i]);

				objects.push(oddBoxes[i]);

				scene.add(oddBoxes[i]);
			}

			//Cambiamos de layer
			oddLayer = true;
		}

		//Listeners de drag and drop.
		var controls = new THREE.DragControls( objects, camera, renderer.domElement );
		controls.addEventListener( 'dragstart', dragStartCallback );
		controls.addEventListener( 'dragend', dragendCallback );
		controls.addEventListener('');

		checkForNewSpawn();
		detectColision();
		indicateLayer();
	}

	//Copia el layer anterior y lo pega en el actual
	function copyPreviousLayer(){
		//Copiamos el layer par y lo ponemos en el impar.
		if(oddLayer == true){
			
		}
		//Copiamos el layer impar y lo pegamos al layer par.
		else{
			//Quitamos los objetos de la escena.
			for(var i = 0; i < objects.length; i++){
				if(objects[i].name != "backgroundBox"){
					scene.remove(objects[i]);
				}
			}

			//Eliminación de las posiciones actuales del array.
			objects.splice(1,Object.keys(objects).length);
			boxSizeX.splice(1,Object.keys(boxSizeX).length);
			boxSizeY.splice(1,Object.keys(boxSizeY).length);
			boundBottom.splice(1,Object.keys(boundBottom).length);
			boundTop.splice(1,Object.keys(boundTop).length);
			boundRight.splice(1,Object.keys(boundRight).length);
			boundLeft.splice(1,Object.keys(boundLeft).length);

			//Definimios la altura de posicionamento del layer.
			layerHeight = boxHeight * 1.5;

			//Spawn de las cajas pares al layer impar.
			for(var i = 0; i < oddBoxes.length; i++){
				//Definición de la geometría de la caja.
				var boxGeometry = new THREE.BoxGeometry(initialBoxLenght, initialBoxWidth, initialBoxHeight);
				var spawnedBox = undefined;

				//Asignación de las texturas.
				labelSelection(initialLabelFront, initialLabelRight, initialLabelLeft, initialLabelBack);

				var boxTexture = [];
				boxTexture.push(new THREE.MeshBasicMaterial({map:textureBox1}));
				boxTexture.push(new THREE.MeshBasicMaterial({map:textureBox2}));
				boxTexture.push(new THREE.MeshBasicMaterial({map:textureBox3}));
				boxTexture.push(new THREE.MeshBasicMaterial({map:textureBox4}));
				boxTexture.push(new THREE.MeshBasicMaterial({map:textureBox5}));
				boxTexture.push(new THREE.MeshBasicMaterial({map:textureBox6}));

				//Creación de la caja en la escena.
				spawnedBox = new THREE.Mesh(boxGeometry,boxTexture);
				spawnedBox.position.set(oddBoxes[i].position.x,oddBoxes[i].position.y,layerHeight);
				spawnedBox.rotation.z = oddBoxes[i].rotation.z;
				spawnedBox.name = "box";
				scene.add(spawnedBox);

				//Introducción de la nueva caja en el array de objetos de la escena.
				objects.push(spawnedBox);

				//Límites de la caja.
				boxSizeX.push(oddSizeX[i]);
				boxSizeY.push(oddSizeY[i]);

				//Introducción de los límites de la caja en arrays
				boundBottom.push(oddSizeY[i]/2);
				boundTop.push(oddSizeY[i]/2);
				boundLeft.push(oddSizeX[i]/2);
				boundRight.push(oddSizeX[i]/2);
			}
		}

		//Reinicializar los listeners de drag and drop.
		var controls = new THREE.DragControls( objects, camera, renderer.domElement );
		controls.addEventListener( 'dragstart', dragStartCallback );
		controls.addEventListener( 'dragend', dragendCallback );
		controls.addEventListener('');

		checkForNewSpawn();
		detectColision();
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

	//Gira 180º el layer.
	function mirrorLayer(){
		for(var i = 0; i < objects.length; i++){
			if(objects[i].name == "box"){
				objects[i].position.x = objects[i].position.x * (-1);
				objects[i].position.y = objects[i].position.y * (-1);
				objects[i].rotation.z = objects[i].rotation.z + 180*Math.PI/180;
			}
		}
	}
	//#endregion

	//Función para generar el magic build.
	function magicBuild(){
		var boxesRowCount = Math.trunc(palletLenght/initialBoxLenght);
		var boxesColumnCount = Math.trunc(palletWidth/initialBoxWidth);

		var marginX = Math.round(((palletLenght/initialBoxLenght - boxesRowCount)*initialBoxLenght)/2);
		var marginY = Math.round(((palletWidth/initialBoxWidth - boxesColumnCount)*initialBoxWidth)/2);


		var xAxisPositions = [];
		var yAxisPositions = []; 

		//Cálculo de las posiciones X.
		for(var i = 0; i < boxesRowCount; i++){
			var xPosition = (- palletLenght/2 + initialBoxLenght/2 + initialBoxLenght*i);
			xAxisPositions.push(xPosition);
		}

		//Cálculo de las posiciones Y.
		for(var i = 0; i < boxesColumnCount; i++){
			var yPosition = (- palletWidth/2 + initialBoxWidth/2 + initialBoxWidth*i);
			yAxisPositions.push(yPosition);
		}

		//Eliminación de las cajas de la escena.
		for(var i = 1; i < Object.keys(objects).length; i++){
			scene.remove(objects[i])
		}
		//Eliminación de las posiciones actuales del array.
		objects.splice(1,Object.keys(objects).length);
		boxSizeX.splice(1,Object.keys(boxSizeX).length);
		boxSizeY.splice(1,Object.keys(boxSizeY).length);
		boundBottom.splice(1,Object.keys(boundBottom).length);
		boundTop.splice(1,Object.keys(boundTop).length);
		boundRight.splice(1,Object.keys(boundRight).length);
		boundLeft.splice(1,Object.keys(boundLeft).length);

		for(var i = 0; i < xAxisPositions.length; i++){
			for(var j = 0; j < yAxisPositions.length; j++){
				//Definición de la geometría de la caja.
				var boxGeometry = new THREE.BoxGeometry(initialBoxLenght, initialBoxWidth, initialBoxHeight);
				var spawnedBox = undefined;

				//Asignación de las texturas.
				labelSelection(initialLabelFront, initialLabelRight, initialLabelLeft, initialLabelBack);

				var boxTexture = [];
				boxTexture.push(new THREE.MeshBasicMaterial({map:textureBox1}));
				boxTexture.push(new THREE.MeshBasicMaterial({map:textureBox2}));
				boxTexture.push(new THREE.MeshBasicMaterial({map:textureBox3}));
				boxTexture.push(new THREE.MeshBasicMaterial({map:textureBox4}));
				boxTexture.push(new THREE.MeshBasicMaterial({map:textureBox5}));
				boxTexture.push(new THREE.MeshBasicMaterial({map:textureBox6}));

				//Creación de la caja en la escena.
				spawnedBox = new THREE.Mesh(boxGeometry,boxTexture);
				spawnedBox.position.set(xAxisPositions[i] + marginX,yAxisPositions[j] + marginY,layerHeight);
				spawnedBox.name = "box";
				spawnedBox.rotation.z = 0*Math.PI/180;
				scene.add(spawnedBox);

				//Introducción de la nueva caja en el array de objetos de la escena.
				objects.push(spawnedBox);

				//Límites de la caja.
				boxSizeX.push(initialBoxLenght);
				boxSizeY.push(initialBoxWidth);

				//Introducción de los límites de la caja en arrays
				boundBottom.push(initialBoxWidth/2);
				boundTop.push(initialBoxWidth/2);
				boundLeft.push(initialBoxLenght/2);
				boundRight.push(initialBoxLenght/2);
			}
		}

		checkForNewSpawn();
	}

	//Función para cambiar el tamaño de las cajas si se modifica a posteriori de ser colocadas.
	function updateBoxSize(){
		//Asignación del tamaño del caja.
		initialBoxLenght = (Math.round((parseInt(document.getElementById("box-lenght").value)) / 10) * 10);
		initialBoxWidth =  (Math.round((parseInt(document.getElementById("box-width").value)) / 10) * 10);
		initialBoxHeight =  (Math.round((parseInt(document.getElementById("box-height").value)) / 10) * 10);
		initialBoxMass =  (Math.round((parseInt(document.getElementById("box-mass").value)) / 10) * 10);
		initialLabelFront = document.getElementById("front-label").checked;
		initialLabelRight = document.getElementById("right-label").checked;
		initialLabelLeft = document.getElementById("left-label").checked;
		initialLabelBack = document.getElementById("back-label").checked;

		//Asignación de las texturas.
		labelSelection(initialLabelFront, initialLabelRight, initialLabelLeft, initialLabelBack);

		var boxTexture = [];
		boxTexture.push(new THREE.MeshBasicMaterial({map:textureBox1}));
		boxTexture.push(new THREE.MeshBasicMaterial({map:textureBox2}));
		boxTexture.push(new THREE.MeshBasicMaterial({map:textureBox3}));
		boxTexture.push(new THREE.MeshBasicMaterial({map:textureBox4}));
		boxTexture.push(new THREE.MeshBasicMaterial({map:textureBox5}));
		boxTexture.push(new THREE.MeshBasicMaterial({map:textureBox6}));

		//Cajas impares.
		for(var i = 0; i < oddBoxes.length; i++){
			oddBoxes[i].geometry = new THREE.BoxGeometry(initialBoxLenght, initialBoxWidth, initialBoxHeight);
			oddBoxes[i].material = boxTexture;

			if(oddBoxes[i].rotation.z == 90*Math.PI/180 || oddBoxes[i].rotation.z == 270*Math.PI/180){
				//Límites de la caja.
				oddSizeX[i] = initialBoxWidth;
				oddSizeY[i] = initialBoxLenght;
			
				//Introducción de los límites de la caja en arrays
				oddBottom[i] = initialBoxLenght/2;
				oddTop[i] = initialBoxLenght/2;
				oddLeft[i] = initialBoxWidth/2;
				oddRight[i] = initialBoxWidth/2;
			}
			else{
				//Límites de la caja.
				evenSizeX[i] = initialBoxLenght;
				evenSizeY[i] = initialBoxWidth;
			
				//Introducción de los límites de la caja en arrays
				evenBottom[i] = initialBoxWidth/2;
				evenTop[i] = initialBoxWidth/2;
				evenLeft[i] = initialBoxLenght/2;
				evenRight[i] = initialBoxLenght/2;
			}
		}

		//Cajas pares.
		for(var i = 0; i < evenBoxes.length; i++){
			evenBoxes[i].geometry = new THREE.BoxGeometry(initialBoxLenght, initialBoxWidth, initialBoxHeight);
			evenBoxes[i].material = boxTexture;

			if(evenBoxes[i].rotation.z == 90*Math.PI/180 || evenBoxes[i].rotation.z == 270*Math.PI/180){
				//Límites de la caja.
				oddSizeX[i] = initialBoxWidth;
				oddSizeY[i] = initialBoxLenght;
			
				//Introducción de los límites de la caja en arrays
				oddBottom[i] = initialBoxLenght/2;
				oddTop[i] = initialBoxLenght/2;
				oddLeft[i] = initialBoxWidth/2;
				oddRight[i] = initialBoxWidth/2;
			}
			else{
				//Límites de la caja.
				evenSizeX[i] = initialBoxLenght;
				evenSizeY[i] = initialBoxWidth;
			
				//Introducción de los límites de la caja en arrays
				evenBottom[i] = initialBoxWidth/2;
				evenTop[i] = initialBoxWidth/2;
				evenLeft[i] = initialBoxLenght/2;
				evenRight[i] = initialBoxLenght/2;
			}
		}

		//Objetos.
		for(var i = 1; i < objects.length; i++){
			objects[i].geometry = new THREE.BoxGeometry(initialBoxLenght, initialBoxWidth, initialBoxHeight);
			objects[i].material = boxTexture;

			if(objects[i].rotation.z == 90*Math.PI/180 || objects[i].rotation.z == 270*Math.PI/180){
				//Límites de la caja.
				boxSizeX[i] = initialBoxWidth;
				boxSizeY[i] = initialBoxLenght;
			
				//Introducción de los límites de la caja en arrays
				boundBottom[i] = initialBoxLenght/2;
				boundTop[i] = initialBoxLenght/2;
				boundLeft[i] = initialBoxWidth/2;
				boundRight[i] = initialBoxWidth/2;
			}
			else{
				//Límites de la caja.
				boxSizeX[i] = initialBoxLenght;
				boxSizeY[i] = initialBoxWidth;
			
				//Introducción de los límites de la caja en arrays
				boundBottom[i] = initialBoxWidth/2;
				boundTop[i] = initialBoxWidth/2;
				boundLeft[i] = initialBoxLenght/2;
				boundRight[i] = initialBoxLenght/2;
			}
		}
		
		//Listeners de drag and drop.
		var controls = new THREE.DragControls( objects, camera, renderer.domElement );
		controls.addEventListener( 'dragstart', dragStartCallback );
		controls.addEventListener( 'dragend', dragendCallback );
		controls.addEventListener('');
	}
		
	//Vuelve a colocar las cajas anteriormente configuradas.
	function spawnPreviousBoxes(){
		//Eliminación de las cajas de la escena.
		for(var i = 0; i < Object.keys(objects).length; i++){
			scene.remove(objects[i])
		}
		
		//Eliminación de las cajas de la escena.
		for(var i = 0; i < blockObjects.length; i++){
			scene.remove(blockObjects[i])
		}

		blockObjects = [];
		
		//Listado de objetos y contador.
		objects = [];

		//Array con el tamaño de cajas.
		boxSizeX = [];
		boxSizeY = [];

		//Definición de las variables de límite de las cajas.
		boundBottom = [];
		boundTop = [];
		boundLeft = [];
		boundRight = [];

		updateBoxSize();

		oddLayer = true;

		//Reinicializar los listeners de drag and drop.
		var controls = new THREE.DragControls( objects, camera, renderer.domElement );
		controls.addEventListener( 'dragstart', dragStartCallback );
		controls.addEventListener( 'dragend', dragendCallback );
		controls.addEventListener('');

		spawnBackground();

		for(var i = 0; i < oddBoxes.length; i++){
			//Definición de la geometría de la caja.
			var boxGeometry = new THREE.BoxGeometry(initialBoxLenght, initialBoxWidth, initialBoxHeight);
			var spawnedBox = undefined;

			//Asignación de las texturas.
			labelSelection(initialLabelFront, initialLabelRight, initialLabelLeft, initialLabelBack);

			var boxTexture = [];
			boxTexture.push(new THREE.MeshBasicMaterial({map:textureBox1}));
			boxTexture.push(new THREE.MeshBasicMaterial({map:textureBox2}));
			boxTexture.push(new THREE.MeshBasicMaterial({map:textureBox3}));
			boxTexture.push(new THREE.MeshBasicMaterial({map:textureBox4}));
			boxTexture.push(new THREE.MeshBasicMaterial({map:textureBox5}));
			boxTexture.push(new THREE.MeshBasicMaterial({map:textureBox6}));

			//Creación de la caja en la escena.
			spawnedBox = new THREE.Mesh(boxGeometry,boxTexture);
			spawnedBox.position.set(oddBoxes[i].position.x,oddBoxes[i].position.y,0.5*initialBoxHeight);
			spawnedBox.name = "box";
			spawnedBox.rotation.z = oddBoxes[i].rotation.z;
			scene.add(spawnedBox);

			//Introducción de la nueva caja en el array de objetos de la escena.
			objects.push(spawnedBox);

			if(Math.round(oddBoxes[i].rotation.z*57.2957) == 90 || Math.round(oddBoxes[i].rotation.z*57.2957) == 270 || Math.round(oddBoxes[i].rotation.z*57.2957) == - 90){
				//Límites de la caja.
				boxSizeX.push(initialBoxWidth);
				boxSizeY.push(initialBoxLenght);

				//Introducción de los límites de la caja en arrays
				boundBottom.push(initialBoxLenght/2);
				boundTop.push(initialBoxLenght/2);
				boundLeft.push(initialBoxWidth/2);
				boundRight.push(initialBoxWidth/2);
			}
			else{
				//Límites de la caja.
				boxSizeX.push(initialBoxLenght);
				boxSizeY.push(initialBoxWidth);
			
				//Introducción de los límites de la caja en arrays
				boundBottom.push(initialBoxWidth/2);
				boundTop.push(initialBoxWidth/2);
				boundLeft.push(initialBoxLenght/2);
				boundRight.push(initialBoxLenght/2);
			}	
			lastSelectedBoxIndex = i;
			detectColision();
		}

		oddLayer = false;

		//Reiniciamos las variables del piso impar.
		oddBoxes = [];
		oddSizeX = [];
		oddSizeY = [];
		oddBottom = [];
		oddTop = [];
		oddRight = [];
		oddLeft = [];

		//Guardado de las variables actuales a las variables impares.
		for(var i = 0; i < objects.length; i++){
			if(objects[i].name == "box"){
				oddBoxes.push(objects[i]);
				oddSizeX.push(boxSizeX[i]);
				oddSizeY.push(boxSizeY[i]);
				oddBottom.push(boundBottom[i]);
				oddTop.push(boundTop[i]);
				oddRight.push(boundRight[i]);
				oddLeft.push(boundLeft[i]);	
			}
		}

		//Eliminación de las cajas de la escena.
		for(var i = 1; i < objects.length; i++){
			scene.remove(objects[i])
		}

		//Eliminación de las posiciones actuales del array.
		objects.splice(1,objects.length);
		boxSizeX.splice(1,boxSizeX.length);
		boxSizeY.splice(1,boxSizeY.length);
		boundBottom.splice(1,boundBottom.length);
		boundTop.splice(1,boundTop.length);
		boundRight.splice(1,boundRight.length);
		boundLeft.splice(1,boundLeft.length);

		//Spawneamos las cajas impares en el piso de abajo (al no estar en objects[], quedan bloqueadas).
		for (var i = 0; i < oddBoxes.length; i++){
			oddBoxes[i].material[4].color.setHex(0x4f4f4f);
			scene.add(oddBoxes[i]);
			blockObjects.push(oddBoxes[i]);
		}

		//Definimios la altura de posicionamento del layer
		layerHeight = boxHeight * 1.5;

		//Spawneamos las cajas pares previamente configuradas (si las hay).
		for(var i = 0; i < evenBoxes.length; i++){
			//Definición de la geometría de la caja.
			var boxGeometry = new THREE.BoxGeometry(initialBoxLenght, initialBoxWidth, initialBoxHeight);
			var spawnedBox = undefined;

			//Asignación de las texturas.
			labelSelection(initialLabelFront, initialLabelRight, initialLabelLeft, initialLabelBack);

			var boxTexture = [];
			boxTexture.push(new THREE.MeshBasicMaterial({map:textureBox1}));
			boxTexture.push(new THREE.MeshBasicMaterial({map:textureBox2}));
			boxTexture.push(new THREE.MeshBasicMaterial({map:textureBox3}));
			boxTexture.push(new THREE.MeshBasicMaterial({map:textureBox4}));
			boxTexture.push(new THREE.MeshBasicMaterial({map:textureBox5}));
			boxTexture.push(new THREE.MeshBasicMaterial({map:textureBox6}));

			//Creación de la caja en la escena.
			spawnedBox = new THREE.Mesh(boxGeometry,boxTexture);
			spawnedBox.position.set(evenBoxes[i].position.x,evenBoxes[i].position.y,0.5*initialBoxHeight);
			spawnedBox.name = "box";
			spawnedBox.rotation.z = evenBoxes[i].rotation.z;
			scene.add(spawnedBox);

			//Introducción de la nueva caja en el array de objetos de la escena.
			objects.push(spawnedBox);

			if(Math.round(evenBoxes[i].rotation.z*57.2957) == 90 || Math.round(evenBoxes[i].rotation.z*57.2957) == 270 || Math.round(evenBoxes[i].rotation.z*57.2957) == - 90){
				//Límites de la caja.
				boxSizeX.push(initialBoxWidth);
				boxSizeY.push(initialBoxLenght);

				//Introducción de los límites de la caja en arrays
				boundBottom.push(initialBoxLenght/2);
				boundTop.push(initialBoxLenght/2);
				boundLeft.push(initialBoxWidth/2);
				boundRight.push(initialBoxWidth/2);
			}
			else{
				//Límites de la caja.
				boxSizeX.push(initialBoxLenght);
				boxSizeY.push(initialBoxWidth);
			
				//Introducción de los límites de la caja en arrays
				boundBottom.push(initialBoxWidth/2);
				boundTop.push(initialBoxWidth/2);
				boundLeft.push(initialBoxLenght/2);
				boundRight.push(initialBoxLenght/2);
			}	
			lastSelectedBoxIndex = i;
			detectColision();
		}

		//Cambiamos de layer
		oddLayer = false;

	}




	//Colocación de las cajas importadas.
	function loadImportedPositions(new_boxLenght,new_boxWidth,new_boxHeight,new_labelFront,new_labelBack,new_labelLeft,new_labelRight,new_oddPosX,new_oddPosY,new_oddRot,new_evenPosX,new_evenPosY,new_evenRot){
		//Eliminación de las cajas de la escena.
		for(var i = 1; i < Object.keys(objects).length; i++){
			scene.remove(objects[i])
		}
		
		//Eliminación de las cajas de la escena.
		for(var i = 0; i < blockObjects.length; i++){
			scene.remove(blockObjects[i])
		}
		blockObjects = [];
		
		//Eliminación de las posiciones actuales del array.
		objects.splice(1,Object.keys(objects).length);
		boxSizeX.splice(1,Object.keys(boxSizeX).length);
		boxSizeY.splice(1,Object.keys(boxSizeY).length);
		boundBottom.splice(1,Object.keys(boundBottom).length);
		boundTop.splice(1,Object.keys(boundTop).length);
		boundRight.splice(1,Object.keys(boundRight).length);
		boundLeft.splice(1,Object.keys(boundLeft).length);

		//Reiniciamos las variables del piso par.
		evenBoxes = [];
		evenSizeX = [];
		evenSizeY = [];
		evenBottom = [];
		evenTop = [];
		evenRight = [];
		evenLeft = [];

		//Reiniciamos las variables del piso impar.
		oddBoxes = [];
		oddSizeX = [];
		oddSizeY = [];
		oddBottom = [];
		oddTop = [];
		oddRight = [];
		oddLeft = [];

		//Nuevos tamaños de caja.
		initialBoxLenght = new_boxLenght;
		initialBoxWidth = new_boxWidth;
		initialBoxHeight = new_boxHeight;
		initialLabelFront = new_labelFront;
		initialLabelBack = new_labelBack;
		initialLabelLeft = new_labelLeft;
		initialLabelRight = new_labelRight;
		



		//Eliminación de las cajas de la escena.
		for(var i = 0; i < Object.keys(objects).length; i++){
			scene.remove(objects[i])
		}
		
		//Eliminación de las cajas de la escena.
		for(var i = 0; i < blockObjects.length; i++){
			scene.remove(blockObjects[i])
		}

		blockObjects = [];
		
		//Listado de objetos y contador.
		objects = [];

		//Array con el tamaño de cajas.
		boxSizeX = [];
		boxSizeY = [];

		//Definición de las variables de límite de las cajas.
		boundBottom = [];
		boundTop = [];
		boundLeft = [];
		boundRight = [];

		updateBoxSize();

		oddLayer = true;

		//Reinicializar los listeners de drag and drop.
		var controls = new THREE.DragControls( objects, camera, renderer.domElement );
		controls.addEventListener( 'dragstart', dragStartCallback );
		controls.addEventListener( 'dragend', dragendCallback );
		controls.addEventListener('');

		spawnBackground();

		for(var i = 0; i < new_oddPosX.length; i++){
			//Definición de la geometría de la caja.
			var boxGeometry = new THREE.BoxGeometry(initialBoxLenght, initialBoxWidth, initialBoxHeight);
			var spawnedBox = undefined;

			//Asignación de las texturas.
			labelSelection(initialLabelFront, initialLabelRight, initialLabelLeft, initialLabelBack);

			var boxTexture = [];
			boxTexture.push(new THREE.MeshBasicMaterial({map:textureBox1}));
			boxTexture.push(new THREE.MeshBasicMaterial({map:textureBox2}));
			boxTexture.push(new THREE.MeshBasicMaterial({map:textureBox3}));
			boxTexture.push(new THREE.MeshBasicMaterial({map:textureBox4}));
			boxTexture.push(new THREE.MeshBasicMaterial({map:textureBox5}));
			boxTexture.push(new THREE.MeshBasicMaterial({map:textureBox6}));

			//Creación de la caja en la escena.
			spawnedBox = new THREE.Mesh(boxGeometry,boxTexture);
			spawnedBox.position.set(new_oddPosX[i],new_oddPosY[i],0.5*initialBoxHeight);
			spawnedBox.name = "box";
			spawnedBox.rotation.z = new_oddRot[i];
			scene.add(spawnedBox);

			//Introducción de la nueva caja en el array de objetos de la escena.
			objects.push(spawnedBox);

			if(Math.round(new_oddRot[i]*57.2957) == 90 || Math.round(new_oddRot[i]*57.2957) == 270 || Math.round(new_oddRot[i]*57.2957) == - 90){
				//Límites de la caja.
				boxSizeX.push(initialBoxWidth);
				boxSizeY.push(initialBoxLenght);

				//Introducción de los límites de la caja en arrays
				boundBottom.push(initialBoxLenght/2);
				boundTop.push(initialBoxLenght/2);
				boundLeft.push(initialBoxWidth/2);
				boundRight.push(initialBoxWidth/2);
			}
			else{
				//Límites de la caja.
				boxSizeX.push(initialBoxLenght);
				boxSizeY.push(initialBoxWidth);
			
				//Introducción de los límites de la caja en arrays
				boundBottom.push(initialBoxWidth/2);
				boundTop.push(initialBoxWidth/2);
				boundLeft.push(initialBoxLenght/2);
				boundRight.push(initialBoxLenght/2);
			}	
			lastSelectedBoxIndex = i;
			detectColision();
		}

		oddLayer = false;

		//Reiniciamos las variables del piso impar.
		oddBoxes = [];
		oddSizeX = [];
		oddSizeY = [];
		oddBottom = [];
		oddTop = [];
		oddRight = [];
		oddLeft = [];

		//Guardado de las variables actuales a las variables impares.
		for(var i = 0; i < objects.length; i++){
			if(objects[i].name == "box"){
				oddBoxes.push(objects[i]);
				oddSizeX.push(boxSizeX[i]);
				oddSizeY.push(boxSizeY[i]);
				oddBottom.push(boundBottom[i]);
				oddTop.push(boundTop[i]);
				oddRight.push(boundRight[i]);
				oddLeft.push(boundLeft[i]);	
			}
		}

		//Eliminación de las cajas de la escena.
		for(var i = 1; i < objects.length; i++){
			scene.remove(objects[i])
		}

		//Eliminación de las posiciones actuales del array.
		objects.splice(1,objects.length);
		boxSizeX.splice(1,boxSizeX.length);
		boxSizeY.splice(1,boxSizeY.length);
		boundBottom.splice(1,boundBottom.length);
		boundTop.splice(1,boundTop.length);
		boundRight.splice(1,boundRight.length);
		boundLeft.splice(1,boundLeft.length);

		//Spawneamos las cajas impares en el piso de abajo (al no estar en objects[], quedan bloqueadas).
		for (var i = 0; i < oddBoxes.length; i++){
			oddBoxes[i].material[4].color.setHex(0x4f4f4f);
			scene.add(oddBoxes[i]);
			blockObjects.push(oddBoxes[i]);
		}

		//Definimios la altura de posicionamento del layer
		layerHeight = boxHeight * 1.5;

		//Spawneamos las cajas pares previamente configuradas (si las hay).
		for(var i = 0; i < new_evenPosX.length; i++){
			//Definición de la geometría de la caja.
			var boxGeometry = new THREE.BoxGeometry(initialBoxLenght, initialBoxWidth, initialBoxHeight);
			var spawnedBox = undefined;

			//Asignación de las texturas.
			labelSelection(initialLabelFront, initialLabelRight, initialLabelLeft, initialLabelBack);

			var boxTexture = [];
			boxTexture.push(new THREE.MeshBasicMaterial({map:textureBox1}));
			boxTexture.push(new THREE.MeshBasicMaterial({map:textureBox2}));
			boxTexture.push(new THREE.MeshBasicMaterial({map:textureBox3}));
			boxTexture.push(new THREE.MeshBasicMaterial({map:textureBox4}));
			boxTexture.push(new THREE.MeshBasicMaterial({map:textureBox5}));
			boxTexture.push(new THREE.MeshBasicMaterial({map:textureBox6}));

			//Creación de la caja en la escena.
			spawnedBox = new THREE.Mesh(boxGeometry,boxTexture);
			spawnedBox.position.set(new_evenPosX[i],new_evenPosY[i],1.5*initialBoxHeight);
			spawnedBox.name = "box";
			spawnedBox.rotation.z = new_evenRot[i];
			scene.add(spawnedBox);

			//Introducción de la nueva caja en el array de objetos de la escena.
			objects.push(spawnedBox);

			if(Math.round(new_evenRot[i]*57.2957) == 90 || Math.round(new_evenRot[i]*57.2957) == 270 || Math.round(new_evenRot[i]*57.2957) == - 90){
				//Límites de la caja.
				boxSizeX.push(initialBoxWidth);
				boxSizeY.push(initialBoxLenght);

				//Introducción de los límites de la caja en arrays
				boundBottom.push(initialBoxLenght/2);
				boundTop.push(initialBoxLenght/2);
				boundLeft.push(initialBoxWidth/2);
				boundRight.push(initialBoxWidth/2);
			}
			else{
				//Límites de la caja.
				boxSizeX.push(initialBoxLenght);
				boxSizeY.push(initialBoxWidth);
			
				//Introducción de los límites de la caja en arrays
				boundBottom.push(initialBoxWidth/2);
				boundTop.push(initialBoxWidth/2);
				boundLeft.push(initialBoxLenght/2);
				boundRight.push(initialBoxLenght/2);
			}	
			lastSelectedBoxIndex = i;
			detectColision();
		}

		//Cambiamos de layer
		oddLayer = false;

		changeLayer();
	}

//#endregion

//#region Cerrar teclado al presionar enter.

//#endregion



















//Reajuste de la escena.
function animate() {
	requestAnimationFrame( animate );
	renderer.render(scene, camera);
}

window.addEventListener('resize', function() {
	renderer.setSize(window.innerWidth, window.innerHeight);
	camera.bottom = - window.innerHeight;
	camera.top = window.innerHeight;
	camera.left = - window.innerWidth;
	camera.right = window.innerWidth;

	camera.updateProjectionMatrix();
	animate();
});


animate();
