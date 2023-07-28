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
  apiKey: "AIzaSyDXs__Tu3JMYDU8r_OwBcIDdI6UPNmrWUI",
  authDomain: "paletizadoconecta2-209c3.firebaseapp.com",
  projectId: "paletizadoconecta2-209c3",
  storageBucket: "paletizadoconecta2-209c3.appspot.com",
  messagingSenderId: "455980798802",
  appId: "1:455980798802:web:d5ea6cd93ff0e276f2208b"
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
