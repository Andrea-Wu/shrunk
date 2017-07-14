"use strict";

// This body of code stores the validator functions, and 
//  sanitizes the format of the input

// Colors used to color text in prompts that tell user whether
//  the input is valid or not
var invalid = "#E91E63";
var valid = "#31B59B";
var ruidLength = 9;

// The following are functions used to alias common operations,
//  like getting a DOM object, showing and hiding the object
//  (which in this case is a prompt that appears when the input
//  format in a given form is incorrect, and disappears when
//  correct)

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

// Checks whether the format of the username specified is correct
function validateName(id, promptId) {
    var name = getEl(id).value;
    showEl(promptId);
    if (name.length === 0) {
        prompt("Username is required", promptId, invalid);
        return false;
    }
    else if (name.length !== ruidLength && !name.match(/^[A-Za-z0-9]{4,7}$/)) {
        prompt("Invalid username", promptId, invalid);
        return false;
    }
    else {
        hideEl(promptId);
        return true;
    }
}

// Checks whether the format of the RUID specified is correct
function validateRUID(id, promptId) {
    var ruid = getEl(id).value;
    showEl(promptId);
    if (ruid.length === 0) {
        prompt("RUID is required", promptId, invalid);
        return false;
    }
    else if (ruid.length !== 9 || !ruid.match(/[0-9]{9}/)) {
        prompt("Invalid RUID", promptId, invalid);
        return false;
    }
    else {
        hideEl(promptId);
        return true;
    }
}

// Checks whether the format of the password specified is correct
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

// Checks whether the format of the email specified is correct
function validateEmail(id, promptId){
    showEl(promptId);
    var email = getEl(id).value;
    if(!email.match(/^\D[A-Za-z\.\_\-0-9]*[@][a-z]*[\.][a-z]{2,4}$/)){
        prompt("Please enter a valid email", promptId, invalid);
        return false;
    }
    else{
        hideEl(promptId);
        return true;
    }
}

// Checks if the input specified is of the correct form.
//  TODO: This part is going to interact with the backend
//      (e.g. validate account retrieve information, etc...)
//  I (Ming) think it's missing another field which specified
//      the action that should occur, since this function
//      is used for multiple purposes
function submitValidation(promptID, is_valid_input) {
    if (!is_valid_input) {
        showEl(promptID);
        prompt("All Fields Must be Valid to Submit", promptID, invalid);
        setTimeout(function () {
            hideEl(promptID);
        }, 2000);
    }
    else {
        showEl(promptID);
        prompt("Submitted", promptID, valid);
        setTimeout(function () {
            hideEl(promptID);
        }, 2000);
    }
}

///////////////////////////

// Collection of tests the password needs to satisfy
var pass_tests = {
    charLength: function (pwd) {
        if (pwd.value.length >= 8) {    // At least 8 characters
            return true;
        }
    },
    lowercase: function (pwd) {
        var regex = /^(?=.*[a-z]).+$/; // Contains a lowercase character
        if (regex.test(pwd.value)) {
            return true;
        }
    },
    uppercase: function (pwd) {
        var regex = /^(?=.*[A-Z]).+$/; // Contains an uppercase character
        if (regex.test(pwd.value)) {
            return true;
        }
    },
    special: function (pwd) {
        var regex = /^(?=.*[0-9_\W]).+$/; // Contains a special character or number
        if (regex.test(pwd.value)) {
            return true;
        }
    }
};

// Validates password pattern
function validatePattern() {
    // Used to provide hint, guideline to creating password
    hint.style.display = "block";

    // Get password and test the given password
    var pwd = getEl("password");
    var length = pass_tests.charLength(pwd);
    var lower = pass_tests.lowercase(pwd);
    var upper = pass_tests.uppercase(pwd);
    var special = pass_tests.special(pwd);

    // Displays messages when the input format of password
    //  is in correct
    if (length && lower && upper && special) {
        setTimeout(function () {
            hint.style.display = "none";
        }, 1000);
        return true;
    }
    else{
        return false;
    }
};

// Checks if input for password and confirm-password forms are equal
function confirmPwd() {
    var password = getEl("password");
    var repwd = getEl("repeatpwd");
    if (password.value !== repwd.value) {
        showEl("repwdPrompt");
        prompt("Password do not match", "repwdPrompt", invalid);
        return false;
    }
    else {
        hideEl("repwdPrompt");
        return true;
    }
};
