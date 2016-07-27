var button = document.getElementById("shortenbtn"),
table = document.getElementById("historytable"),
longurl = document.getElementById("longurl"),
idtitle = document.getElementById("idtitle"),
pagination = document.getElementById("pagination"),
historybox = document.getElementById("history"),
tableHeading = document.getElementById("tableHeading"),
scrollbox = document.getElementById("scrollbox");

// fade in
function fadeIn(el, display){
  el.style.opacity = 0;
  el.style.display = display || "block";

  (function fade() {
    var val = parseFloat(el.style.opacity);
    if (!((val += .1) > 1)) {
      el.style.opacity = val;
      requestAnimationFrame(fade);
    }
  })();
}

// fade out
function fadeOut(el){
  el.style.opacity = 1;

  (function fade() {
    if ((el.style.opacity -= .1) < 0) {
      el.style.display = "none";
    } else {
      requestAnimationFrame(fade);
    }
  })();
}

function insertData() {
	var row = table.insertRow(0),
	 cell1 = row.insertCell(0),
	 cell2 = row.insertCell(1),
	 cell3 = row.insertCell(2),
	 cell4 = row.insertCell(3),
	 cell5 = row.insertCell(4),
	 cell6 = row.insertCell(5);
	var x = document.createElement("span");
	x.setAttribute('class', 'glyphicon glyphicon-pencil');
	var y = cell1.appendChild(x);
// time
	var today = new Date(),
	 hms = today.toLocaleTimeString(),
	 date = today.toLocaleDateString();
	var time = hms;
	cell2.textContent = idtitle.value;
	cell3.textContent = longurl.value;
	cell4.textContent = "ab.cd";
	cell5.textContent = time;
	var a = document.createElement("button");
    a.innerText = "view";
    a.setAttribute("class", "btn btn-default btn-xs");
  	var b = cell6.appendChild(a);
    cell6.setAttribute("style", "text-align:center;");
    x.onmouseover = function() {
	    x.setAttribute("style", "cursor:pointer");
		x.setAttribute("title", "Edit");
    };
    
    //may replace innerHTML with var elinput= document.createElement("input"); 
    //elinput.setAttribute("style", "border-radius:3px; border:0px; padding-left:5px;");
    //cell2.appendChild(elinput);

    x.onclick = function() {
	     cell1.innerHTML = '<span class="glyphicon glyphicon-repeat"></span>';
	     cell2.innerHTML = '<div><input type="text" style="border-radius:3px; border:0px; padding-left:5px;"></div><div></div>';
	     cell3.innerHTML = '<div><input type="text" style="border-radius:3px; border:0px; padding-left:5px;"></div><div></div>';
	     cell4.innerHTML = '<div><input type="text" style="border-radius:3px; border:0px; padding-left:5px;"></div><div></div>';
	     var input2 = cell2.childNodes[0].childNodes[0],
		     input3 = cell3.childNodes[0].childNodes[0],
	         input4 = cell4.childNodes[0].childNodes[0];
         input2.value = idtitle.value;
         input3.value = longurl.value;
	     input4.value = "ab.cd";

	     var rebtn = cell1.childNodes[0];
	     rebtn.onmouseover = function() {
	        rebtn.setAttribute("style", "cursor:pointer");
			rebtn.setAttribute("title", "Update");
	     };

	     rebtn.onclick = function() {
	     	cell1.removeChild(rebtn);
            cell1.appendChild(x);
            cell2.childNodes[1].innerHTML = input2.value;            
            cell3.childNodes[1].innerHTML = input3.value;
	        cell4.childNodes[1].innerHTML = input4.value;
			cell2.childNodes[0].style.display = "none";
			cell3.childNodes[0].style.display = "none";
			cell4.childNodes[0].style.display = "none";;
    	 };
    };
    a.onmouseover = function() {
	     a.setAttribute("style", "cursor:pointer"); 
    };
	a.onclick = function() {
		 a.setAttribute("data-toggle", "modal");	
		 a.setAttribute("data-target", "#myModal");	
	};

	if(table.rows.length >= 5){
         pagination.style.display = "block";
	}

	scrollbox.onscroll = function(){
		if(this.scrollTop > 35) {
		  tableHeading.style.display = "block";
		}
		else {
		  tableHeading.style.display = "none";	
		}
	};
}

button.addEventListener('click',insertData,false);

