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

function validateName(id) {
    var name = getEl(id).value;
    showEl("namePrompt");
    if (name.length === 0) {
        prompt("Name is required", "namePrompt", invalid);
        return false;
    }
    else if (name.length !== 0 && !name.match(/^[A-Za-z0-9]{4,7}$/)) {
        prompt("Invalid RUID", "namePrompt", invalid);
        return false;
    }
    else {
        hideEl("namePrompt");
        return true;
    }
}

function validatePass(id) {
    showEl("passPrompt");
    var pass = getEl(id).value;
    if (pass.length === 0) {
        prompt("Password required", "passPrompt", invalid);
        return false;
    }
    else {
        hideEl("passPrompt");
        return true;
    }
}

function submitValidation(id1, id2) {
    if (!validateName(id1) || !validatePass(id2)) {
        showEl("submitPrompt");
        prompt("All Fields Must be Valid to Submit", "submitPrompt", invalid);
        console.log("func1 called");
        setTimeout(function () {
            hideEl("submitPrompt");
        }, 2000);
    }
    else {
        showEl("submitPrompt");
        prompt("Submited", "submitPrompt", valid);
        console.log("func2 called");
        setTimeout(function () {
            hideEl("submitPrompt");
        }, 2000);
    }
}

getEl("nameLog").onkeyup = function () {
    validateName("nameLog");
}
getEl("passwordLog").onkeyup = function () {
    validatePass("passwordLog");
}
getEl("loginBtn").onclick = function () {
    submitValidation("nameLog", "passwordLog");
}

//})();