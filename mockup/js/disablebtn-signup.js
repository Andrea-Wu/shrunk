var elButton = document.getElementById('submitbtn');
var elUsername = document.getElementById('userid'); 
var elpwd = document.getElementById('pwd');
var elrepwd = document.getElementById('repwd');

elButton.disabled = true;

function disableBtn(){
   if (elUsername.value == "" || elpwd.value == "" || elrepwd.value == ""){
   	 elButton.disabled = true;
   }
   else{
   	 elButton.disabled = false;
   }
};

elButton.addEventListener('click', function(){disableBtn()}, false);