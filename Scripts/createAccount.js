import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import { getDatabase, ref, set, get, child } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

var api = {};
await fetch("./Scripts/api.json").then(response => response.json()).then(json => {api = json});
initializeApp(api);

const db = getDatabase();

const loginButton = document.getElementById("LoginButton");
const loginning = document.getElementById("Logining");
const username = document.getElementById("username");
const firstname = document.getElementById("firstname");
const lastname = document.getElementById("lastname");
const email = document.getElementById("email");
const password = document.getElementById("password");
const phoneNumber = document.getElementById("phoneNumber");
var err = false;

const inputs = document.getElementsByClassName("loginInput");
for (let i = 0; i < inputs.length ; i++) {
    inputs[i].addEventListener("focus",function(){
        inputs[i].style.border = "solid white 1px";
    });
}

loginButton.onclick = function() {
    loginButton.hidden = true;
    loginning.hidden = false;

    const terms = document.getElementById("terms").checked;

    if (terms) {
        
        if (process()) {
            const db = getDatabase();
            const dbRef = ref(db);
            get(child(dbRef,"Users")).then((profiles)=>{
                profiles.forEach((profile)=>{
                    if (profile.key == username.value) onError("Username alreay taken");
                    else if (profile.child("email").val() == email.value) onError("Email already taken");
                });

                if (!err) {
                    sessionStorage.setItem("username",username.value);
                    sessionStorage.setItem("firstname",firstname.value);
                    sessionStorage.setItem("lastname",lastname.value);
                    sessionStorage.setItem("email",email.value);
                    sessionStorage.setItem("password",password.value);
                    sessionStorage.setItem("phoneNumber",phoneNumber.value);
                    window.location.href = "verifyNumber.html";
                }
            });
        }
        
    } else onError("You have to be agress with terms to continue.");

}

function process() {

    verify(username);
    if (err) return false;
    
    verify(firstname);
    if (err) return false;

    verify(lastname);
    if (err) return false;

    verify(email);
    if (err) return false;

    verify(phoneNumber);
    if (err) return false;

    verify(password);
    if (err) return false;

    return true;
}

function verify(test) {
    if (test.value == "") {
        test.style.border = "solid red 1px";
        onError();
    }
}

function onError(str) {
    err = true;
    loginning.hidden = true;
    loginButton.hidden = false;
    if (str != undefined) alert(str);
}