import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import { getDatabase, ref, get, child } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

var api = {};
await fetch("./Scripts/api.json").then(response => response.json()).then(json => {api = json});
initializeApp(api);

const day = document.getElementById("Day");

for (let i = 1 ; i <= 31 ; i++) {
    let option = new Option(i,i);
    day.add(option,undefined);
}

const loginButton = document.getElementById("LoginButton");

loginButton.onclick = function() {
    const year = document.getElementById("Year").value;
    const month = document.getElementById("Month").value;
    const day = document.getElementById("Day").value;

    const intYear = parseInt(year);
    const date = new Date();
    const nowYear = date.getFullYear();
    const result = nowYear - intYear;

    if (year == "") {
        alert("Please, we need to know the year of your birthday.");
    }
    else if (result > 80) {
        alert("You seemsto be to old for video games...");
    }
    else {
        sessionStorage.setItem("Year",year)
        sessionStorage.setItem("Day",day);
        sessionStorage.setItem("Month",month);
        window.location.href = "createAccount.html";
    }
}