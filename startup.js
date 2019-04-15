
//Function startup designed to automatically zoom in on the user's location when the quiz app is launched and load the quizpoints 
//Reference: zoomOnMap taken from Practical 2 (Location based services)
//getQuizPoints taken from Practical 6 and 7 
function startup() {
   document.addEventListener('DOMContentLoaded', function(){
		getPort();
		trackLocation();
		getQuizPoints();
		alert("Please click on the help page at the bottom of the left menu for instructions");
	},false);
}
	
	

