let inputUsername = document.getElementById('username');
let inputPassword = document.getElementById('password');
document.getElementById('console-message').readOnly = true;


let usernameValidation, passwordValidation;

var collection = "credentials";
var company;

function Update(val,type){
    if(type == 'username'){
        usernameValidation = val;
    }
    else if(type == 'password'){
        passwordValidation = val;
    }
}


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


//#region Inicio de sesión.
function loginCheck(){
    cloudDB.collection(collection).doc(inputUsername.value).get() 
    .then(function(doc){
        if(doc.exists){
            if(doc.data().username == inputUsername.value && doc.data().password == inputPassword.value){
                window.localStorage.setItem("username", document.getElementById('username').value);
                window.location.href = "project.html";           
            }
            else{
                document.getElementById('console-message').value = "User or password are incorrect.";
            }
        }
       
    })
    .catch(function(error){
        //console.log("Error", error);
    })
}
//#endregion 

document.getElementById('login').onclick=function(){
    loginCheck();
};
