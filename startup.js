
//Function startup designed to automatically zoom in on the user's location when the quiz and question apps are launched and load the quizpoints 
//Reference: zoomOnMap taken from Practical 2 (Location based services)
//Reference: trackLocation taken from Location based services practical 2 
//getQuizPoints taken from Practical 6 and 7 for core functionality 3 
function startup() {
   document.addEventListener('DOMContentLoaded', function(){
		getPort();
		trackLocation();
		zoomOnMap();
		getQuizPoints();
		alert("Please click on the help page at the bottom of the left menu for instructions");
	},false);
}
	
	

