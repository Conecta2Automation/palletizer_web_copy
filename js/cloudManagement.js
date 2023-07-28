var company;

var projectName = document.getElementById("project-title");
var projectNameBtn = document.getElementsByClassName('import-window-button');

const firebaseConfig = {
    apiKey: "AIzaSyB_ZSmdzndA7Fj1tVFxueCUuOEB9ncJxvE",
    authDomain: "paletizer.firebaseapp.com",
    projectId: "paletizer",
    storageBucket: "paletizer.appspot.com",
    messagingSenderId: "467515410351",
    appId: "1:467515410351:web:5b535ba02db2dd6cf8515a"
  };

firebase.initializeApp(firebaseConfig);
let cloudDB = firebase.firestore();

var exp_projectDescription;
//Box size vars.
let exp_boxLenght,exp_boxWidth,exp_boxHeight,exp_boxMass,exp_labelFront,exp_labelBack,exp_labelRight,exp_labelLeft;
//Pallet size vars
let exp_palletType,exp_palletLenght,exp_palletWidth,exp_palletHeight,exp_palletMass,exp_palletLoad;
//Placement vars
var exp_oddPosX = [];
var exp_oddPosY = [];
var exp_oddRot = [];
var exp_evenPosX = [];
var exp_evenPosY = [];
var exp_evenRot = [];
//Layer vars.
let exp_layerValue,exp_interlayerBool,exp_interlayerWidth;

//#region Importación de los nombres de los proyectos.
function importProjectNames(){
    company = document.getElementById("username-h1").innerHTML;

    var indexImportedProjects = 0;

    cloudDB.collection(company).get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            projectNameBtn[indexImportedProjects].innerHTML = doc.id;
            projectNameBtn[indexImportedProjects].style.display = "inline";

            indexImportedProjects = indexImportedProjects + 1;
        });
    });
}
//#endregion 

//#region Importación de las variables del proyecto.
function loadProjectVars(projectID){
    cloudDB.collection(company).doc(projectID).get() 
    .then(function(doc){
        //console.log(company,projectID)
        if(doc.exists){
            document.getElementById("project-title").value = projectID;
            document.getElementById("project-textarea").value = doc.data().fb_projectDescription;

            document.getElementById("unit-measurement").value = 1;
            document.getElementById("weight-measurement").value = 1;
            document.getElementById("pallet-measurement").value = 1;
            document.getElementById("pallet-weight").value = 1;

            document.getElementById("box-lenght").value = doc.data().fb_boxLenght;
            document.getElementById("box-width").value = doc.data().fb_boxWidth;
            document.getElementById("box-height").value = doc.data().fb_boxHeight;
            document.getElementById("box-mass").value = doc.data().fb_boxMass;
            document.getElementById("front-label").checked = doc.data().fb_labelFront;
            document.getElementById("back-label").checked = doc.data().fb_labelBack;
            document.getElementById("left-label").checked = doc.data().fb_labelLeft;
            document.getElementById("right-label").checked = doc.data().fb_labelRight;

            document.getElementById("pallet-selection").value = doc.data().fb_palletType;
            document.getElementById("pallet-lenght").value = doc.data().fb_palletLenght;
            document.getElementById("pallet-width").value = doc.data().fb_palletWidth;
            document.getElementById("pallet-height").value = doc.data().fb_palletHeight;
            document.getElementById("pallet-mass").value = doc.data().fb_palletMass;
            document.getElementById("pallet-load").value = doc.data().fb_palletLoad;
            
            var imp_oddPosX = [];
            var imp_oddPosY = [];
            var imp_oddRot = [];
            var imp_evenPosX = [];
            var imp_evenPosY = [];
            var imp_evenRot = [];

            var imp_boxLenght = Number(doc.data().fb_boxLenght);
            var imp_boxWidth = Number(doc.data().fb_boxWidth);
            var imp_boxHeight = Number(doc.data().fb_boxHeight);

            var imp_labelFront = doc.data().fb_labelFront;
            var imp_labelBack = doc.data().fb_labelBack;
            var imp_labelLeft = doc.data().fb_labelLeft;
            var imp_labelRight = doc.data().fb_labelRight;

            imp_oddPosX = doc.data().fb_oddPosX;
            imp_oddPosY = doc.data().fb_oddPosY;
            imp_oddRot = doc.data().fb_oddRot;
            imp_evenPosX = doc.data().fb_evenPosX;
            imp_evenPosY = doc.data().fb_evenPosY;
            imp_evenRot = doc.data().fb_evenRot;

            loadImportedPositions(imp_boxLenght,imp_boxWidth,imp_boxHeight,imp_labelFront,imp_labelBack,imp_labelLeft,imp_labelRight,imp_oddPosX,imp_oddPosY,imp_oddRot,imp_evenPosX,imp_evenPosY,imp_evenRot);

            document.getElementById("slider-layer").value = doc.data().fb_layerValue;
            document.getElementById("interlayer-size").value = doc.data().fb_interlayerWidth;
            document.getElementById("interlayer-check").checked = doc.data().fb_interlayerBool;

            document.getElementById('console-messages').style.display = "block";
            document.getElementById('message-h1').innerHTML = "Project has been imported successfully."
            setTimeout(function(){ document.getElementById('console-messages').style.display = "none"; }, 3000);
        }
        else{
            //console.log("Collection does not exist.")
        }            
    })
    .catch(function(error){
        //console.log("Error", error);
    })
    activeImport();
    activeBoxSize();
}
//#endregion

//Guardado de los datos.
function saveData(){

    catchData();

    cloudDB.collection(company).doc(projectName.value).get() 
    .then(function(doc){
        if(doc.exists){
            updateData();     
            document.getElementById('console-messages').style.display = "block";
            document.getElementById('message-h1').innerHTML = "Project has been saved successfully."
            setTimeout(function(){ document.getElementById('console-messages').style.display = "none"; }, 3000);         
        }
        else{
            addData();
            document.getElementById('console-messages').style.display = "block";
            document.getElementById('message-h1').innerHTML = "Project has been updated successfully."
            setTimeout(function(){ document.getElementById('console-messages').style.display = "none"; }, 3000);
        }            
    })
    .catch(function(error){
        //console.log("Error", error);
    })

}

function catchData(){
    exp_projectDescription = document.getElementById("project-textarea").value;

    //#region Box size vars.
    var exp_measurementUnits = document.getElementById("unit-measurement").value;

	if (exp_measurementUnits == 1){
		if(document.getElementById("box-lenght").value < 100){
			exp_boxLenght = 100;
		}
		else{
			exp_boxLenght = document.getElementById("box-lenght").value;
		}
		
		if(document.getElementById("box-width").value < 100){
			exp_boxWidth = 100;
		}
		else{
			exp_boxWidth = document.getElementById("box-width").value;
		}
		if(document.getElementById("box-height").value < 100){
			exp_boxHeight = 100;
		}
		else{
			exp_boxHeight = document.getElementById("box-height").value;
		}
		
	}
	else{
		exp_boxLenght = Math.trunc(document.getElementById("box-lenght").value / 0.04);
		exp_boxWidth = Math.trunc(document.getElementById("box-width").value / 0.04);
		exp_boxHeight = Math.trunc(document.getElementById("box-height").value / 0.04);
	}

	var exp_measurementWeight = document.getElementById("weight-measurement").value;

	if (exp_measurementWeight == 1){
		exp_boxMass = document.getElementById("box-mass").value;
	}
	else{
		exp_boxMass = document.getElementById("box-mass").value / 2.2;
	}

    exp_labelFront = document.getElementById("front-label").checked;
	exp_labelRight = document.getElementById("right-label").checked;
	exp_labelLeft = document.getElementById("left-label").checked;
	exp_labelBack = document.getElementById("back-label").checked;
    //#endregion

    //#region Pallet size vars.
    exp_palletType = document.getElementById("pallet-selection").value;

    var exp_measurementUnits = document.getElementById("pallet-measurement").value;

	if (exp_measurementUnits == 1){
		exp_palletLenght = document.getElementById("pallet-lenght").value;
        exp_palletWidth = document.getElementById("pallet-width").value;
        exp_palletHeight = document.getElementById("pallet-height").value;
	}
	else{
        exp_palletLenght = Math.round(document.getElementById("pallet-lenght").value / 0.04);
        exp_palletWidth = Math.round(document.getElementById("pallet-width").value / 0.04);
        exp_palletHeight = Math.round(document.getElementById("pallet-height").value / 0.04);
	}

    var exp_measurementWeight = document.getElementById("pallet-weight").value;

	if (exp_measurementWeight == 1){
		exp_palletMass = document.getElementById("pallet-mass").value;
        exp_palletLoad = document.getElementById("pallet-load").value;
	}
	else{
		Math.round(exp_palletMass = document.getElementById("pallet-mass").value / 2.2);
        Math.round(exp_palletLoad = document.getElementById("pallet-load").value / 2.2);
	}
    //#endregion

    //#region Box placement vars.
    exp_oddPosX = [];
    exp_oddPosY = [];
    exp_oddRot = [];
    exp_evenPosX = [];
    exp_evenPosY = [];
    exp_evenRot = [];

    for(var i = 0; i < oddBoxes.length; i++){
        exp_oddPosX.push(oddBoxes[i].position.x);
        exp_oddPosY.push(oddBoxes[i].position.y);
        exp_oddRot.push(oddBoxes[i].rotation.z);
    }
    for(var i = 0; i < evenBoxes.length; i++){
        exp_evenPosX.push(evenBoxes[i].position.x);
        exp_evenPosY.push(evenBoxes[i].position.y);
        exp_evenRot.push(evenBoxes[i].rotation.z);
    }

    if(evenBoxes.length == 0){
        for(var i = 0; i < oddBoxes.length; i++){
            exp_evenPosX.push(oddBoxes[i].position.x);
            exp_evenPosY.push(oddBoxes[i].position.y);
            exp_evenRot.push(oddBoxes[i].rotation.z);
        }
    }
    //#endregion

    //#region Layer vars.
    exp_layerValue = document.getElementById("slider-layer").value;
    exp_interlayerBool = document.getElementById("interlayer-check").checked;
    exp_interlayerWidth = document.getElementById("interlayer-size").value;
    //#endregion
}

//#region Escritura de datos.
function addData(){
    cloudDB.collection(company).doc(projectName.value).set(
        {
            fb_projectDescription : exp_projectDescription,

            fb_boxLenght : Number(exp_boxLenght),
            fb_boxWidth : Number(exp_boxWidth),
            fb_boxHeight : Number(exp_boxHeight),
            fb_boxMass : Number(exp_boxMass),
            fb_labelFront : exp_labelFront,
            fb_labelBack : exp_labelBack,
            fb_labelRight : exp_labelRight,
            fb_labelLeft : exp_labelLeft,

            fb_palletType : Number(exp_palletType),
            fb_palletLenght : Number(exp_palletLenght),
            fb_palletWidth : Number(exp_palletWidth),
            fb_palletHeight : Number(exp_palletHeight),
            fb_palletMass : Number(exp_palletMass),
            fb_palletLoad : Number(exp_palletLoad),

            fb_oddPosX : exp_oddPosX,
            fb_oddPosY : exp_oddPosY,
            fb_oddRot : exp_oddRot,
            fb_evenPosX : exp_evenPosX,
            fb_evenPosY : exp_evenPosY,
            fb_evenRot : exp_evenRot,

            fb_layerValue : Number(exp_layerValue),
            fb_interlayerBool : exp_interlayerBool,
            fb_interlayerWidth : Number(exp_interlayerWidth)
        }
    )

    .catch(function(error){
        console.error("Error adding document", error);
    })
}
//#endregion

//#region Actualización de datos.
function updateData(){
    cloudDB.collection(company).doc(projectName.value).update(
        {
            fb_projectDescription : exp_projectDescription,

            fb_boxLenght : Number(exp_boxLenght),
            fb_boxWidth : Number(exp_boxWidth),
            fb_boxHeight : Number(exp_boxHeight),
            fb_boxMass : Number(exp_boxMass),
            fb_labelFront : exp_labelFront,
            fb_labelBack : exp_labelBack,
            fb_labelRight : exp_labelRight,
            fb_labelLeft : exp_labelLeft,

            fb_palletType : Number(exp_palletType),
            fb_palletLenght : Number(exp_palletLenght),
            fb_palletWidth : Number(exp_palletWidth),
            fb_palletHeight : Number(exp_palletHeight),
            fb_palletMass : Number(exp_palletMass),
            fb_palletLoad : Number(exp_palletLoad),

            fb_oddPosX : exp_oddPosX,
            fb_oddPosY : exp_oddPosY,
            fb_oddRot : exp_oddRot,
            fb_evenPosX : exp_evenPosX,
            fb_evenPosY : exp_evenPosY,
            fb_evenRot : exp_evenRot,

            fb_layerValue : Number(exp_layerValue),
            fb_interlayerBool : exp_interlayerBool,
            fb_interlayerWidth : Number(exp_interlayerWidth)
        }
    )
    .catch(function(error){
        console.error("Error updating document", error);
    })
}
//#endregion

importProjectNames();