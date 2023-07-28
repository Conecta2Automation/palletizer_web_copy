let palletSizeX, palletSizeY, palletSizeZ;
var rightPallet_oddBoxesDistance = [];
var rightPallet_oddBoxes_Reference = [];
var rightPallet_evenBoxesDistance = [];
var rightPallet_evenBoxes_Reference = [];

var leftPallet_oddBoxesDistance = [];
var leftPallet_oddBoxes_Reference = [];
var leftPallet_evenBoxesDistance = [];
var leftPallet_evenBoxes_Reference = [];

function download(filename, text) {
    var element = document.createElement('a');
    element.setAttribute('href', 'data:application/octet-stream;charset=utf-8,' + encodeURIComponent(text));
    element.setAttribute('download', filename);
  
    element.style.display = 'none';
    document.body.appendChild(element);
  
    element.click();
  
    document.body.removeChild(element);
}


function boxOrder(){
    getPalletSize();

    //#region Right pallet.
        rightPallet_oddBoxesDistance = [];
        rightPallet_oddBoxes_Reference = [];
        rightPallet_evenBoxesDistance = [];
        rightPallet_evenBoxes_Reference = [];

        //Cálculo de la distancia de las cajas impares respecto la esquina inferior derecha del pallet.
        for(var i = 0; i < oddBoxes.length; i++){
            var distance = Math.round(Math.sqrt((oddBoxes[i].position.x - palletSizeX/2)**2 + (oddBoxes[i].position.y + palletSizeX/2)**2));
            rightPallet_oddBoxesDistance.push([String(distance)]);
            rightPallet_oddBoxes_Reference.push({"distance" : String(distance), "oddBoxLenght" : String(oddSizeX[i]),  "oddBoxWidth" : String(oddSizeY[i]), "oddPositionX" : String(oddBoxes[i].position.x - palletSizeX/2), "oddPositionY" : String(oddBoxes[i].position.y + palletSizeY/2), "oddRotation" : String(Math.round(oddBoxes[i].rotation.z*180/Math.PI))})
        }

        rightPallet_oddBoxes_Reference.sort(function(a, b) {
        var keyA = new Number(a.distance),
            keyB = new Number(b.distance);
        //Compara los dos valores.
        if (keyA < keyB) return 1;
        if (keyA > keyB) return -1;
        return 0;
        });

        //Cálculo de la distancia de las cajas pares respecto la esquina inferior derecha del pallet.
        for(var i = 0; i < evenBoxes.length; i++){
            var distance = Math.round(Math.sqrt((evenBoxes[i].position.x - palletSizeX/2)**2 + (evenBoxes[i].position.y + palletSizeX/2)**2));
            rightPallet_evenBoxesDistance.push([String(distance)]);
            rightPallet_evenBoxes_Reference.push({"distance" : String(distance), "evenBoxLenght" : String(evenSizeX[i]),  "evenBoxWidth" : String(evenSizeY[i]), "evenPositionX" : String(evenBoxes[i].position.x - palletSizeX/2), "evenPositionY" : String(evenBoxes[i].position.y + palletSizeY/2), "evenRotation" : String(Math.round(evenBoxes[i].rotation.z*180/Math.PI))})
        }

        rightPallet_evenBoxes_Reference.sort(function(a, b) {
            var keyA = new Number(a.distance),
            keyB = new Number(b.distance);
            //Compara los dos valores.
            if (keyA < keyB) return 1;
            if (keyA > keyB) return -1;
            return 0;
        });


        //Giro de 170º a -90º, de 360º a 0º. y de 180º a -180º.
        for(var i = 0; i < rightPallet_oddBoxes_Reference.length; i++){
            if (Number(rightPallet_oddBoxes_Reference[i].oddRotation) > 200 ){
                if (Number(rightPallet_oddBoxes_Reference[i].oddRotation) > 300 ){
                    rightPallet_oddBoxes_Reference[i].oddRotation = String(0);
                }
                else{
                    rightPallet_oddBoxes_Reference[i].oddRotation = String(-90);
                }
            }

            if(Number(rightPallet_oddBoxes_Reference[i].oddRotation) == 180 ){
                rightPallet_oddBoxes_Reference[i].oddRotation = 180;
            }
        }
        for(var i = 0; i < rightPallet_evenBoxes_Reference.length; i++){
            if (Number(rightPallet_evenBoxes_Reference[i].evenRotation) > 200){
                if (Number(rightPallet_evenBoxes_Reference[i].evenRotation) > 300){
                    rightPallet_evenBoxes_Reference[i].evenRotation = String(0);
                }
                else{
                    rightPallet_evenBoxes_Reference[i].evenRotation = String(-90);
                }
            }

            if(Number(rightPallet_evenBoxes_Reference[i].evenRotation) == 180 ){
                rightPallet_evenBoxes_Reference[i].evenRotation = 180;
            }
        }

        //Comprovación para evitar horquillas de cajas.
        for(var i = 0; i < rightPallet_oddBoxes_Reference.length; i++){
            for(var j = i + 1; j < rightPallet_oddBoxes_Reference.length; j++){
                if(Number(rightPallet_oddBoxes_Reference[i].oddPositionX) > Number(rightPallet_oddBoxes_Reference[j].oddPositionX)){
                    if(Number(rightPallet_oddBoxes_Reference[i].oddPositionY) - Number(rightPallet_oddBoxes_Reference[i].oddBoxWidth/2) < Number(rightPallet_oddBoxes_Reference[j].oddPositionY) + Number(rightPallet_oddBoxes_Reference[j].oddBoxWidth/2) ){
                        var i_reference = rightPallet_oddBoxes_Reference[i];
                        var j_reference = rightPallet_oddBoxes_Reference[j];
        
                        rightPallet_oddBoxes_Reference[i] = j_reference;
                        rightPallet_oddBoxes_Reference[j] = i_reference;
                    }
                }
            }
        }

        //Comprovación para evitar horquillas de cajas.
        for(var i = 0; i < rightPallet_evenBoxes_Reference.length; i++){
            for(var j = i + 1; j < rightPallet_evenBoxes_Reference.length; j++){
                if(Number(rightPallet_evenBoxes_Reference[i].evenPositionX) > Number(rightPallet_evenBoxes_Reference[j].evenPositionX)){
                    if(Number(rightPallet_evenBoxes_Reference[i].evenPositionY) - Number(rightPallet_evenBoxes_Reference[i].evenBoxWidth/2) < Number(rightPallet_evenBoxes_Reference[j].evenPositionY) + Number(rightPallet_evenBoxes_Reference[j].evenBoxWidth/2) ){
                        var i_reference = rightPallet_evenBoxes_Reference[i];
                        var j_reference = rightPallet_evenBoxes_Reference[j];
        
                        rightPallet_evenBoxes_Reference[i] = j_reference;
                        rightPallet_evenBoxes_Reference[j] = i_reference;
                    }
                }
            }
        }
    //#endregion
    

    //#region Left pallet.
    leftPallet_oddBoxesDistance = [];
    leftPallet_oddBoxes_Reference = [];
    leftPallet_evenBoxesDistance = [];
    leftPallet_evenBoxes_Reference = [];

    //Cálculo de la distancia de las cajas impares respecto la esquina inferior derecha del pallet.
    for(var i = 0; i < oddBoxes.length; i++){
        var distance = Math.round(Math.sqrt((oddBoxes[i].position.x - palletSizeX/2)**2 + (oddBoxes[i].position.y - palletSizeX/2)**2));
        leftPallet_oddBoxesDistance.push([String(distance)]);
        leftPallet_oddBoxes_Reference.push({"distance" : String(distance), "oddBoxLenght" : String(oddSizeX[i]),  "oddBoxWidth" : String(oddSizeY[i]), "oddPositionX" : String(oddBoxes[i].position.x - palletSizeX/2), "oddPositionY" : String((-1)*(oddBoxes[i].position.y - palletSizeY/2)), "oddRotation" : String(Math.round(oddBoxes[i].rotation.z*180/Math.PI))})
    }

    leftPallet_oddBoxes_Reference.sort(function(a, b) {
    var keyA = new Number(a.distance),
        keyB = new Number(b.distance);
    //Compara los dos valores.
    if (keyA < keyB) return 1;
    if (keyA > keyB) return -1;
    return 0;
    });

    //Cálculo de la distancia de las cajas pares respecto la esquina inferior derecha del pallet.
    for(var i = 0; i < evenBoxes.length; i++){
        var distance = Math.round(Math.sqrt((evenBoxes[i].position.x - palletSizeX/2)**2 + (evenBoxes[i].position.y - palletSizeX/2)**2));
        leftPallet_evenBoxesDistance.push([String(distance)]);
        leftPallet_evenBoxes_Reference.push({"distance" : String(distance), "evenBoxLenght" : String(evenSizeX[i]),  "evenBoxWidth" : String(evenSizeY[i]), "evenPositionX" : String(evenBoxes[i].position.x - palletSizeX/2), "evenPositionY" : String((-1)*(evenBoxes[i].position.y - palletSizeY/2)), "evenRotation" : String(Math.round(evenBoxes[i].rotation.z*180/Math.PI))})
    }

    leftPallet_evenBoxes_Reference.sort(function(a, b) {
        var keyA = new Number(a.distance),
        keyB = new Number(b.distance);
        //Compara los dos valores.
        if (keyA < keyB) return 1;
        if (keyA > keyB) return -1;
        return 0;
    });

    //Giro de 170º a -90º, de 360º a 0º. y de 180º a -180º.
    for(var i = 0; i < leftPallet_oddBoxes_Reference.length; i++){
        if (Number(leftPallet_oddBoxes_Reference[i].oddRotation) > 200 ){
            if (Number(leftPallet_oddBoxes_Reference[i].oddRotation) > 300 ){
                leftPallet_oddBoxes_Reference[i].oddRotation = String(0);
            }
            else{
                leftPallet_oddBoxes_Reference[i].oddRotation = String(-90);
            }
        }

        if(Number(leftPallet_oddBoxes_Reference[i].oddRotation) == 180 ){
            leftPallet_oddBoxes_Reference[i].oddRotation = 180;
        }
    }
    for(var i = 0; i < leftPallet_evenBoxes_Reference.length; i++){
        if (Number(leftPallet_evenBoxes_Reference[i].evenRotation) > 200){
            if (Number(leftPallet_evenBoxes_Reference[i].evenRotation) > 300){
                leftPallet_evenBoxes_Reference[i].evenRotation = String(0);
            }
            else{
                leftPallet_evenBoxes_Reference[i].evenRotation = String(-90);
            }
        }

        if(Number(leftPallet_evenBoxes_Reference[i].evenRotation) == 180 ){
            leftPallet_evenBoxes_Reference[i].evenRotation = 180;
        }
    }

    //Comprovación para evitar horquillas de cajas.
    for(var i = 0; i < leftPallet_oddBoxes_Reference.length; i++){
        for(var j = i + 1; j < leftPallet_oddBoxes_Reference.length; j++){
            if(Number(leftPallet_oddBoxes_Reference[i].oddPositionX) > Number(leftPallet_oddBoxes_Reference[j].oddPositionX)){
                if(Number(leftPallet_oddBoxes_Reference[i].oddPositionY) - Number(leftPallet_oddBoxes_Reference[i].oddBoxWidth/2) < Number(leftPallet_oddBoxes_Reference[j].oddPositionY) + Number(leftPallet_oddBoxes_Reference[j].oddBoxWidth/2) ){
                    var i_reference = leftPallet_oddBoxes_Reference[i];
                    var j_reference = leftPallet_oddBoxes_Reference[j];
    
                    leftPallet_oddBoxes_Reference[i] = j_reference;
                    leftPallet_oddBoxes_Reference[j] = i_reference;
                }
            }
        }
    }

    //Comprovación para evitar horquillas de cajas.
    for(var i = 0; i < leftPallet_evenBoxes_Reference.length; i++){
        for(var j = i + 1; j < leftPallet_evenBoxes_Reference.length; j++){
            if(Number(leftPallet_evenBoxes_Reference[i].evenPositionX) > Number(leftPallet_evenBoxes_Reference[j].evenPositionX)){
                if(Number(leftPallet_evenBoxes_Reference[i].evenPositionY) - Number(leftPallet_evenBoxes_Reference[i].evenBoxWidth/2) < Number(leftPallet_evenBoxes_Reference[j].evenPositionY) + Number(leftPallet_evenBoxes_Reference[j].evenBoxWidth/2) ){
                    var i_reference = leftPallet_evenBoxes_Reference[i];
                    var j_reference = leftPallet_evenBoxes_Reference[j];
    
                    leftPallet_evenBoxes_Reference[i] = j_reference;
                    leftPallet_evenBoxes_Reference[j] = i_reference;
                }
            }
        }
    }
//#endregion
 


    callDownload();
}

function getPalletSize(){
    var palletType = document.getElementById("pallet-selection").value;
    var measurementUnits = document.getElementById("pallet-measurement").value;

    switch (palletType){
        case "1":
            palletSizeX = 1200;
            palletSizeY = 800;
            palletSizeZ = 144;
            break;
        case "2":
            palletSizeX = 1200;
            palletSizeY = 1000;
            palletSizeZ = 162;	
            break;      
        case "3":
            palletSizeX = 1200;
            palletSizeY = 1000;
            palletSizeZ = 144;
            break;    
        case "4":
            palletSizeX = 600;
            palletSizeY = 800;
            palletSizeZ = 144;		
            break;     
        case "5":
            palletSizeX = 1016;
            palletSizeY = 1219.2;
            palletSizeZ = 121;
            break;
        case "6":
            palletSizeX = 1066.8;
            palletSizeY = 1066.8;
            palletSizeZ = 140;			  
            break;
        case "7":
            if(measurementUnits == 1){
                palletSizeX = document.getElementById("pallet-lenght").value;
                palletSizeY = document.getElementById("pallet-width").value;
                palletSizeZ = document.getElementById("pallet-height").value;
            }
            else{
                palletSizeX = document.getElementById("pallet-lenght").value / 0.04;
                palletSizeY = document.getElementById("pallet-width").value / 0.04;
                palletSizeZ = document.getElementById("pallet-height").value / 0.04;
            }
            break;
        default:
    
        break;
    }
}

function callDownload(){

    var downloadContent = undefined;

    //Medidas de la caja.
    downloadContent = "boxLenght = " + initialBoxLenght  +'\n' + "boxWidth = " + initialBoxWidth  +'\n' + "boxHeight = " + initialBoxHeight  +'\n' + "palletLenght = " + palletSizeX + '\n'+ "palletWidth = " + palletSizeY +'\n'+ "palletHeight = " + palletSizeZ +'\n';

    //#region Variables del pallet derecho.
    //Posiciones pallet derecho eje X impares.
    for(var i = 0; i < oddBoxes.length; i++){
        if(i == 0){
            downloadContent = downloadContent + "right_oddPosX = {" +  rightPallet_oddBoxes_Reference[i].oddPositionX + ",";
        }
        else if (i < oddBoxes.length - 1){
            downloadContent = downloadContent + rightPallet_oddBoxes_Reference[i].oddPositionX + ",";
        }
        else{
            downloadContent = downloadContent + rightPallet_oddBoxes_Reference[i].oddPositionX + "}" +'\n';
        }       
    }

    //Posiciones pallet derecho eje Y impares.
    for(var i = 0; i < oddBoxes.length; i++){
        if(i == 0){
            downloadContent = downloadContent + "right_oddPosY = {" +  rightPallet_oddBoxes_Reference[i].oddPositionY + ",";
        }
        else if (i < oddBoxes.length - 1){
            downloadContent = downloadContent + rightPallet_oddBoxes_Reference[i].oddPositionY + ",";
        }
        else{
            downloadContent = downloadContent + rightPallet_oddBoxes_Reference[i].oddPositionY + "}" +'\n';
        }
    }

    //Rotaciones pallet derecho impares.
    for(var i = 0; i < oddBoxes.length; i++){
        if(i == 0){
            downloadContent = downloadContent + "right_oddRot = {" + ((-1)*Number(rightPallet_oddBoxes_Reference[i].oddRotation)).toFixed(3) + ",";
        }
        else if (i < oddBoxes.length - 1){
            downloadContent = downloadContent + ((-1)*Number(rightPallet_oddBoxes_Reference[i].oddRotation)).toFixed(3) + ",";
        }
        else{
            downloadContent = downloadContent + ((-1)*Number(rightPallet_oddBoxes_Reference[i].oddRotation)).toFixed(3) + "}" +'\n';
        }
    }
    
    if(evenBoxes.length == 0){
        //Posiciones pallet derecho eje X pares.
        for(var i = 0; i < oddBoxes.length; i++){
            if(i == 0){
                downloadContent = downloadContent + "right_evenPosX = {" +  rightPallet_oddBoxes_Reference[i].oddPositionX + ",";
            }
            else if (i < oddBoxes.length - 1){
                downloadContent = downloadContent + rightPallet_oddBoxes_Reference[i].oddPositionX + ",";
            }
            else{
                downloadContent = downloadContent + rightPallet_oddBoxes_Reference[i].oddPositionX + "}" +'\n';
            }
        }

        //Posiciones pallet derecho eje Y pares.
        for(var i = 0; i < oddBoxes.length; i++){
            if(i == 0){
                downloadContent = downloadContent + "right_evenPosY = {" +  rightPallet_oddBoxes_Reference[i].oddPositionY + ",";
            }
            else if (i < oddBoxes.length - 1){
                downloadContent = downloadContent + rightPallet_oddBoxes_Reference[i].oddPositionY + ",";
            }
            else{
                downloadContent = downloadContent + rightPallet_oddBoxes_Reference[i].oddPositionY + "}" +'\n';
            }
        }

        //Rotaciones pallet derecho pares.
        for(var i = 0; i < oddBoxes.length; i++){
            if(i == 0){
                downloadContent = downloadContent + "right_evenRot = {" + ((-1)*Number(rightPallet_oddBoxes_Reference[i].oddRotation)).toFixed(3) + ",";
            }
            else if (i < oddBoxes.length - 1){
                downloadContent = downloadContent + ((-1)*Number(rightPallet_oddBoxes_Reference[i].oddRotation)).toFixed(3) + ",";
            }
            else{
                downloadContent = downloadContent + ((-1)*Number(rightPallet_oddBoxes_Reference[i].oddRotation)).toFixed(3) + "}" +'\n';
            }
        }
    }
    else{
        //Posiciones pallet derecho eje X pares.
        for(var i = 0; i < evenBoxes.length; i++){
            if(i == 0){
                downloadContent = downloadContent + "right_evenPosX = {" +  rightPallet_evenBoxes_Reference[i].evenPositionX + ",";
            }
            else if (i < evenBoxes.length - 1){
                downloadContent = downloadContent + rightPallet_evenBoxes_Reference[i].evenPositionX + ",";
            }
            else{
                downloadContent = downloadContent + rightPallet_evenBoxes_Reference[i].evenPositionX + "}" +'\n';
            }
        }

        //Posiciones pallet derecho eje Y pares.
        for(var i = 0; i < evenBoxes.length; i++){
            if(i == 0){
                downloadContent = downloadContent + "right_evenPosY = {" +  rightPallet_evenBoxes_Reference[i].evenPositionY + ",";
            }
            else if (i < evenBoxes.length - 1){
                downloadContent = downloadContent + rightPallet_evenBoxes_Reference[i].evenPositionY + ",";
            }
            else{
                downloadContent = downloadContent + rightPallet_evenBoxes_Reference[i].evenPositionY + "}" +'\n';
            }
        }

        //Rotaciones pallet derecho pares.
        for(var i = 0; i < evenBoxes.length; i++){
            if(i == 0){
                downloadContent = downloadContent + "right_evenRot = {" + ((-1)*Number(rightPallet_evenBoxes_Reference[i].evenRotation)).toFixed(3) + ",";
            }
            else if (i < evenBoxes.length - 1){
                downloadContent = downloadContent + ((-1)*Number(rightPallet_evenBoxes_Reference[i].evenRotation)).toFixed(3) + ",";
            }
            else{
                downloadContent = downloadContent + ((-1)*Number(rightPallet_evenBoxes_Reference[i].evenRotation)).toFixed(3) + "}" +'\n';
            }
        }
    }
    //#endregion




    //#region Variables del pallet izquierdo.
    //Posiciones pallet izquierdo eje X impares.
    for(var i = 0; i < oddBoxes.length; i++){
        if(i == 0){
            downloadContent = downloadContent + "left_oddPosX = {" +  leftPallet_oddBoxes_Reference[i].oddPositionX + ",";
        }
        else if (i < oddBoxes.length - 1){
            downloadContent = downloadContent + leftPallet_oddBoxes_Reference[i].oddPositionX + ",";
        }
        else{
            downloadContent = downloadContent + leftPallet_oddBoxes_Reference[i].oddPositionX + "}" +'\n';
        }       
    }

    //Posiciones pallet izquierdo eje Y impares.
    for(var i = 0; i < oddBoxes.length; i++){
        if(i == 0){
            downloadContent = downloadContent + "left_oddPosY = {" +  (Number(leftPallet_oddBoxes_Reference[i].oddPositionY)) + ",";
        }
        else if (i < oddBoxes.length - 1){
            downloadContent = downloadContent + (Number(leftPallet_oddBoxes_Reference[i].oddPositionY)) + ",";
        }
        else{
            downloadContent = downloadContent + (Number(leftPallet_oddBoxes_Reference[i].oddPositionY)) + "}" +'\n';
        }
    }

    //Rotaciones pallet izquierdo impares.
    for(var i = 0; i < oddBoxes.length; i++){
        if(i == 0){
            downloadContent = downloadContent + "left_oddRot = {" + ((-1)*Number(leftPallet_oddBoxes_Reference[i].oddRotation)).toFixed(3) + ",";
        }
        else if (i < oddBoxes.length - 1){
            downloadContent = downloadContent + ((-1)*Number(leftPallet_oddBoxes_Reference[i].oddRotation)).toFixed(3) + ",";
        }
        else{
            downloadContent = downloadContent + ((-1)*Number(leftPallet_oddBoxes_Reference[i].oddRotation)).toFixed(3) + "}" +'\n';
        }
    }
    
    if(evenBoxes.length == 0){
        //Posiciones pallet izquierdo eje X pares.
        for(var i = 0; i < oddBoxes.length; i++){
            if(i == 0){
                downloadContent = downloadContent + "left_evenPosX = {" +  leftPallet_oddBoxes_Reference[i].oddPositionX + ",";
            }
            else if (i < oddBoxes.length - 1){
                downloadContent = downloadContent + leftPallet_oddBoxes_Reference[i].oddPositionX + ",";
            }
            else{
                downloadContent = downloadContent + leftPallet_oddBoxes_Reference[i].oddPositionX + "}" +'\n';
            }
        }

        //Posiciones pallet izquierdo eje Y pares.
        for(var i = 0; i < oddBoxes.length; i++){
            if(i == 0){
                downloadContent = downloadContent + "left_evenPosY = {" +  (Number(leftPallet_oddBoxes_Reference[i].oddPositionY)) + ",";
            }
            else if (i < oddBoxes.length - 1){
                downloadContent = downloadContent + (Number(leftPallet_oddBoxes_Reference[i].oddPositionY)) + ",";
            }
            else{
                downloadContent = downloadContent + (Number(leftPallet_oddBoxes_Reference[i].oddPositionY)) + "}" +'\n';
            }
        }

        //Rotaciones pallet izquierdo pares.
        for(var i = 0; i < oddBoxes.length; i++){
            if(i == 0){
                downloadContent = downloadContent + "left_evenRot = {" + ((-1)*Number(leftPallet_oddBoxes_Reference[i].oddRotation)).toFixed(3) + ",";
            }
            else if (i < oddBoxes.length - 1){
                downloadContent = downloadContent + ((-1)*Number(leftPallet_oddBoxes_Reference[i].oddRotation)).toFixed(3) + ",";
            }
            else{
                downloadContent = downloadContent + ((-1)*Number(leftPallet_oddBoxes_Reference[i].oddRotation)).toFixed(3) + "}" +'\n';
            }
        }
    }
    else{
        //Posiciones pallet izquierdo eje X pares.
        for(var i = 0; i < evenBoxes.length; i++){
            if(i == 0){
                downloadContent = downloadContent + "left_evenPosX = {" +  leftPallet_evenBoxes_Reference[i].evenPositionX + ",";
            }
            else if (i < evenBoxes.length - 1){
                downloadContent = downloadContent + leftPallet_evenBoxes_Reference[i].evenPositionX + ",";
            }
            else{
                downloadContent = downloadContent + leftPallet_evenBoxes_Reference[i].evenPositionX + "}" +'\n';
            }
        }

        //Posiciones pallet izquierdo eje Y pares.
        for(var i = 0; i < evenBoxes.length; i++){
            if(i == 0){
                downloadContent = downloadContent + "left_evenPosY = {" +  (Number(leftPallet_evenBoxes_Reference[i].evenPositionY)) + ",";
            }
            else if (i < evenBoxes.length - 1){
                downloadContent = downloadContent + (Number(leftPallet_evenBoxes_Reference[i].evenPositionY)) + ",";
            }
            else{
                downloadContent = downloadContent + (Number(leftPallet_evenBoxes_Reference[i].evenPositionY)) + "}" +'\n';
            }
        }

        //Rotaciones pallet izquierdo pares.
        for(var i = 0; i < evenBoxes.length; i++){
            if(i == 0){
                downloadContent = downloadContent + "left_evenRot = {" + ((-1)*Number(leftPallet_evenBoxes_Reference[i].evenRotation)).toFixed(3) + ",";
            }
            else if (i < evenBoxes.length - 1){
                downloadContent = downloadContent + ((-1)*Number(leftPallet_evenBoxes_Reference[i].evenRotation)).toFixed(3) + ",";
            }
            else{
                downloadContent = downloadContent + ((-1)*Number(leftPallet_evenBoxes_Reference[i].evenRotation)).toFixed(3) + "}" +'\n';
            }
        }
    }
    //#endregion

    downloadContent = downloadContent + "totalOddBoxes = " + oddBoxes.length +'\n';

    if(evenBoxes.length == 0){
        downloadContent = downloadContent + "totalEvenBoxes = " + oddBoxes.length +'\n';
    }
    else{
        downloadContent = downloadContent + "totalEvenBoxes = " + evenBoxes.length +'\n';
    }

    downloadContent = downloadContent + "totalLayers = " + document.getElementById("slider-layer").value +'\n';
    downloadContent = downloadContent + "interlayer = " + document.getElementById("interlayer-check").checked +'\n' +'\n';

    if(initialBoxLenght == 300){
        downloadContent = downloadContent + "tipoCaja = " + 0;
    }
    else{
        downloadContent = downloadContent + "tipoCaja = " + 1;
    }
   

    // Start file download.
    download("global.lua",downloadContent);
}