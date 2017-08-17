"use strict"


function login() {
    
    var uname = document.getElementById("uname").value;
    var pass = document.getElementById("pass").value;
    console.log(uname + "_" + pass);
    var data = JSON.stringify({ "username": uname, "password": pass });
    console.log(data)

    var login_req = new XMLHttpRequest();
    //login_req.setRequestHeader("Access-Control-Allow-Origin", "*");
    //login_req.setRequestHeader("Content-Type", "application/json; charset=utf-8");
    //login_req.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    login_req.open("POST", "http://127.0.0.1:5000/login". true);
    //login_req.setRequestHeader("Access-Control-Allow-Origin", "*");
    //login_req.setRequestHeader("Access-Control-Allow-Methods", "HEAD, GET, POST");
    login_req.setRequestHeader("Content-Type", "application/json");

    login_req.onreadystatechange = function() {
        if (login_req.readyState == 4 && login_req.status == 200) {
            alert(login_req.responseText); 
        } else {
            window.alert('Error: ' + login_req.status);
        }
    };
    login_req.send(data);
    //window.alert(uname+"_"+pass);
}
