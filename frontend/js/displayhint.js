var hint = document.querySelector('.helper-text');
var elpwd = document.getElementById('pwd');
var elrepwd = document.getElementById('repwd');

function display(){
	hint.style.display = 'block';
}

function hide(){
	hint.style.display = 'none';
}

elpwd.onfocus = function(){
    display();
};

elpwd.onblur = function(){
    hide();
};

elrepwd.onfocus = function(){
    hide();
};