var ellink = document.getElementById('linktitle');
var elinput = document.getElementById('titleinput');

function toggle() {
    if (elinput.offsetWidth > 0 || elinput.offsetHeight > 0) {
        elinput.style.display = 'none';
    }
    else {
        elinput.style.display = 'block';
    }
};

ellink.addEventListener('click', function(){toggle()}, false);