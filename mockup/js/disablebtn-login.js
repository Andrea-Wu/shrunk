var lobtn = document.getElementById('submitbtn');
var loUsername = document.getElementById('userid'); 
var lopwd = document.getElementById('pwd');

lobtn.disabled = true;

function disableButton(){
    lobtn.disabled = true;
}

function enableButton(){
    lobtn.disabled = false;
}


function nobutton(){
   if (loUsername.value == "" || lopwd.value == ""){
   	 disableButton();
   }
   else{
   	 enableButton();
   }
};

lopwd.addEventListener('blur', nobutton, false); 