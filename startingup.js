function loadW3HTML() {
	w3.includeHTML();
}


function startingup() {
	document.addEventListener('DOMContentLoaded', function(){
		getPort();
	},false);
	document.addEventListener('DOMContentLoaded', function(){
		zoomOnMap();
	},false)
	document.addEventListener('DOMContentLoaded', function(){
		loadW3HTML();
	},false);
	
}

