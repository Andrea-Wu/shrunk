var hint = document.querySelector('.helper-text');
var elpwd = document.getElementById('pwd');
var elrepwd = document.getElementById('repwd');

function display(){
	hint.style.display = 'block';
}

function hide(){
	hint.style.display = 'none';
}

elpwd.addEventListener( 'focus', function(){
    display();
});

elpwd.addEventListener( 'blur', function(){
    hide();
});

elrepwd.addEventListener( 'focus', function(){
    hide();
});