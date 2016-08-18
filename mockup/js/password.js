var elpwd = document.getElementById('pwd');
var elrepwd = document.getElementById('repwd');

elpwd.addEventListener( 'focus', function(){
    elpwd.type = 'text';
});
elpwd.addEventListener( 'blur', function(){
    elpwd.type = 'password';
});

elrepwd.addEventListener( 'focus', function(){
    elrepwd.type = 'text';
});
elrepwd.addEventListener( 'blur', function(){
    elrepwd.type = 'password';
});  
