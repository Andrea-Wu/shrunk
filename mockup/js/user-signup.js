var elUsername = document.getElementById('userid');  
var elUserMsg = document.getElementById('feedback-user');      

function checkUsername(minLength) {                    // Declare function
  if (elUsername.value.length < minLength) {           // If username too short
    // Set message
    elUserMsg.textContent = 'Username cannot be empty';
    elUsername.focus();
  } else {                                             // Otherwise
    elUserMsg.textContent = '';                              // Clear message
  }
}

if (elUsername.addEventListener) {               // If event listener supported
  elUsername.addEventListener('blur', function(){// When username loses focus
    checkUsername(1);                            // Call checkUsername()
  }, false);                                     // Capture during bubble phase
} else {                                         // Otherwise
  elUsername.attachEvent('onblur', function(){   // IE fallback: on blur
    checkUsername(1);                            // Call checkUsername()
  });
}

//js var naming used on same webpage cannot be identical