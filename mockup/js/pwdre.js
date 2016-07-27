var elpwd = document.getElementById('pwd');
var elrepwd = document.getElementById('repwd');
var elMsg = document.getElementById('feedback-repwd');
var elButton = document.getElementById('submitbtn');

function confirmPwd(){
	if(elpwd.value != elrepwd.value){
       elMsg.textContent = "Password do not match";
       elButton.disabled = true;
	}
	else {
	   elMsg.textContent = "";	
	   elButton.disabled = false;
	}
}

elrepwd.addEventListener('blur', function(){
	confirmPwd();
  }, false);       

// disable submit is not match