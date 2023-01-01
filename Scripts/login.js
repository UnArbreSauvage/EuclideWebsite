import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import { getDatabase, ref, get, child } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

var api = {};
await fetch("./Scripts/api.json").then(response => response.json()).then(json => {api = json});
initializeApp(api);

const database = getDatabase();
const dbRef = ref(database);
const loginButton = document.getElementById("LoginButton");
const loginning = document.getElementById("Logining");
var err = false;

loginButton.onclick = function() {
    loginning.hidden = false;
    loginButton.hidden = true;

    err = false;

    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    get(child(dbRef,"Users/"+username)).then((snapshot)=>{
        if (snapshot.val() != null) {
            if (snapshot.child("password").val() == password) onError();
        }
        else onError();
    });
}

function onError() {
    err = true;
    loginning.hidden = true;
    loginButton.hidden = false;
    alert("No account found / incorrect password.");
}