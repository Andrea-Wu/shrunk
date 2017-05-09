//(function () {
var password = getEl("password");
var repwd = getEl('repeatpwd');
var signup = getEl('signup');
var hint = document.querySelector('.helper-text');
var helperText = {
    charLength: document.querySelector('.helper-text .length')
    , lowercase: document.querySelector('.helper-text .lowercase')
    , uppercase: document.querySelector('.helper-text .uppercase')
    , special: document.querySelector('.helper-text .special')
};
var pattern = {
    charLength: function () {
        if (password.value.length >= 8) {
            return true;
        }
    }
    , lowercase: function () {
        var regex = /^(?=.*[a-z]).+$/; // Lowercase character pattern
        if (regex.test(password.value)) {
            return true;
        }
    }
    , uppercase: function () {
        var regex = /^(?=.*[A-Z]).+$/; // Uppercase character pattern
        if (regex.test(password.value)) {
            return true;
        }
    }
    , special: function () {
        var regex = /^(?=.*[0-9_\W]).+$/; // Special character or number pattern
        if (regex.test(password.value)) {
            return true;
        }
    }
};

function patternTest(pattern, response) {
    if (pattern) {
        addClass(response, 'valid');
        return true;
    }
    else {
        removeClass(response, 'valid');
        return false;
    }
}

function addClass(el, className) {
    if (el.classList) {
        el.classList.add(className);
    }
    else {
        el.className += ' ' + className;
    }
}

function removeClass(el, className) {
    if (el.classList) {
        el.classList.remove(className);
    }
    else {
        el.className = el.className.replace(new RegExp('(^|\\b)' + className.split(' ').join('|') + '(\\b|$)', 'gi'), ' ');
    }
}

function hasClass(el, className) {
    if (el.classList) {
        return el.classList.contains(className);
    }
    else {
        new RegExp('(^| )' + className + '( |$)', 'gi').test(el.className);
    }
}

function ifValid() {
    if (hasClass(helperText.charLength, 'valid') && hasClass(helperText.lowercase, 'valid') && hasClass(helperText.uppercase, 'valid') && hasClass(helperText.special, 'valid') && name.value.length > 0 && (password.value == repwd.value)) {
        signup.disabled = false;
    }
    else {
        signup.disabled = true;
    }
};

var patternStatus = false, valname = false;

function validatePattern() {
    hint.style.display = "block";
    var length = patternTest(pattern.charLength(), helperText.charLength);
    var lower = patternTest(pattern.lowercase(), helperText.lowercase);
    var upper = patternTest(pattern.uppercase(), helperText.uppercase);
    var special = patternTest(pattern.special(), helperText.special);
    if (length && lower && upper && special) {
        setTimeout(function () {
            hint.style.display = "none";
        }, 1000);
        return patternStatus = true;
    }
    else{
        return patternStatus = false;
    }
}

function confirmPwd() {
    if (password.value != repwd.value) {
        showEl("repwdPrompt");
        prompt("Password do not match", "repwdPrompt", invalid);
        return false;
    }
    else {
        hideEl("repwdPrompt");
        return true;
    }
}

password.onkeyup = function(){
    validatePattern();
}
    
repwd.onkeyup = function () {
        confirmPwd();
}

getEl("name").onkeyup = function () {
    valname = validateName("name", "namePrompt");
}

getEl("signupBtn").onclick = function () {
    var evalSubmit = (valname && patternStatus && confirmPwd());
    submitValidation("submitPrompt1", evalSubmit);
}

//})();