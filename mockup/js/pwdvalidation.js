var password = document.getElementById('pwd');
var elrepwd = document.getElementById('repwd');
var elMsg = document.getElementById('feedback-repwd');
var elButton = document.getElementById('submitbtn');
var username = document.getElementById('userid');  
var elUserMsg = document.getElementById('feedback-user');  
var helperText = {
    charLength: document.querySelector('.helper-text .length'),
    lowercase: document.querySelector('.helper-text .lowercase'),
    uppercase: document.querySelector('.helper-text .uppercase'),
    special: document.querySelector('.helper-text .special')
};
var pattern = {
    charLength: function() {
        if( password.value.length >= 8 ) {
            return true;
        }
    },
    lowercase: function() {
        var regex = /^(?=.*[a-z]).+$/; // Lowercase character pattern

        if( regex.test(password.value) ) {
            return true;
        }
    },
    uppercase: function() {
        var regex = /^(?=.*[A-Z]).+$/; // Uppercase character pattern

        if( regex.test(password.value) ) {
            return true;
        }
    },
    special: function() {
        var regex = /^(?=.*[0-9_\W]).+$/; // Special character or number pattern

        if( regex.test(password.value) ) {
            return true;
        }
    }   
};

function patternTest(pattern, response) {
    if(pattern) {
  addClass(response, 'valid');
}
else {
  removeClass(response, 'valid');
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
    if (el.classList){
            el.classList.remove(className);
    }
    else{
        el.className = el.className.replace(new RegExp('(^|\\b)' + className.split(' ').join('|') + '(\\b|$)', 'gi'), ' ');
    }
}

function hasClass(el, className) {
    if (el.classList) {
        console.log(el.classList);
        return el.classList.contains(className);    
    }
    else {
        new RegExp('(^| )' + className + '( |$)', 'gi').test(el.className); 
    }
}

function usermsg () {
    if (username.value.length < 1) {           
    elUserMsg.textContent = 'Username cannot be empty';
    username.focus();
  } else {                                            
    elUserMsg.textContent = '';                              
  }    
};

function ifValid() {
    if( hasClass(helperText.charLength, 'valid') && hasClass(helperText.lowercase, 'valid') && hasClass(helperText.uppercase, 'valid') && hasClass(helperText.special, 'valid') && username.value.length > 0 && (password.value == elrepwd.value)) {
        elButton.disabled = false;
    }
    else {
        elButton.disabled = true;
    }
};

function confirmPwd() {
	if(password.value != elrepwd.value) {
       elMsg.textContent = "Password do not match";
	}
	else {
	   elMsg.textContent = "";	
	}
};

elButton.disabled = false;

username.onkeyup = function () {                    
    usermsg();
    ifValid();
};

password.onkeyup= function () {
    patternTest( pattern.charLength(), helperText.charLength );    
    patternTest( pattern.lowercase(), helperText.lowercase );
    patternTest( pattern.uppercase(), helperText.uppercase );    
    patternTest( pattern.special(), helperText.special );
    ifValid();
};

elrepwd.onkeyup = function() {
    confirmPwd();
    ifValid();
}; 