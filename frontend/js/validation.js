//(function(){
function getEl(id) {
    return document.getElementById(id);
}

function showEl(id) {
    getEl(id).style.display = "block";
}

function hideEl(id) {
    getEl(id).style.display = "none";
}

function prompt(message, location, color) {
    getEl(location).textContent = message;
    getEl(location).style.color = color;
}

var invalid = "#E91E63";
var valid = "#31B59B";

function validateName(id, promptId) {
    var name = getEl(id).value;
    showEl(promptId);
    if (name.length === 0) {
        prompt("Name is required", promptId, invalid);
        return false;
    }
    else if (name.length !== 0 && !name.match(/^[A-Za-z0-9]{4,7}$/)) {
        prompt("Invalid RUID", promptId, invalid);
        return false;
    }
    else {
        hideEl(promptId);
        return true;
    }
}

function validatePass(id, promptId) {
    showEl(promptId);
    var pass = getEl(id).value;
    if (pass.length === 0) {
        prompt("Password required", promptId, invalid);
        return false;
    }
    else {
        hideEl(promptId);
        return true;
    }
}

function validateEmail(id, promptId){
    showEl(promptId);
    var email = getEl(id).value;
    if(!email.match(/^\D[A-Za-z\.\_\-0-9]*[@][a-z]*[\.][a-z]{2,4}$/)){
        prompt("Please enter valid email format", promptId, "red");
        return false;
    }
    else{
        hideEl(promptId);
        return true;
    }
}

function submitValidation(promptID, func) {
    if (!func) {
        showEl(promptID);
        prompt("All Fields Must be Valid to Submit", promptID, invalid);
        setTimeout(function () {
            hideEl(promptID);
        }, 2000);
    }
    else {
        showEl(promptID);
        prompt("Submited", promptID, valid);
        setTimeout(function () {
            hideEl(promptID);
        }, 2000);
    }
}

//})();