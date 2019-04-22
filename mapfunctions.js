var client;
//Advanced Functionality 1 quiz points change colour when the question has been answered, red if wrong and green if correct
//Reference: Practical 2 Step 2 Using Custom Icons for the GeoJSON
//the blue marker (original question point)
var MarkerBlue = L.AwesomeMarkers.icon({
icon: 'play',
markerColor: 'blue'
});
//the red marker (wrong answer)
//var MarkerRed = L.AwesomeMarkers.icon({
//icon: 'play',
//markerColor: 'red'
//});

//the green marker (correct answer )
//var MarkerGreen = L.AwesomeMarkers.icon({
//icon: 'play',
//markerColor: 'green'
//});

//Reference: adapted from the LeafletFunctions.js used in practical 6 
 //creating the AJAX request to get the Questions data using an XMLHttpRequest
	var xhrQuizPoints;
	function getQuizPoints(){
		alert('Getting the quiz data')
		xhrQuizPoints = new XMLHttpRequest();
		var url = "http://developer.cege.ucl.ac.uk:"+ httpPortNumber;
		url = url +"/getQuizPoints/"+ httpPortNumber;
		xhrQuizPoints.open("GET",url,true);
        xhrQuizPoints.onreadystatechange = QuizPointsResponse;  
        xhrQuizPoints.send();
	}
	//The code to wait for the response from the data server, and process once it is received 
	function QuizPointsResponse(){
		//this function listens for the server to say that the data is ready 
		if (xhrQuizPoints.readyState == 4){
			console.log();
			//once the data is ready, process the data
			var quizPoints = xhrQuizPoints.responseText;
			loadQuizPoints(quizPoints);
		}
	}

	
	// convert the received data - which is text to JSON format and add it to the map 
	//Reference: Adapted from Pactical 6 and 7 placing an html string in a popup 
var quizLayer;
function loadQuizPoints(quizPoints){
	//convert the text to JSON
	var quizPointsjson = JSON.parse(quizPoints);
	//question will appear in a popup instead of a div 
	// add the JSON layer onto the map - it will appear using the default icons
	quizlayer = L.geoJSON(quizPointsjson,
		{ 
			pointToLayer: function(feature, latlng)
			{
				//in this case we build an HTML DIV string, using the values in the data
var htmlString = "<DIV id='popup'"+ feature.properties.id + "><h2>" + feature.properties.question_title + "</h2><br>";
htmlString = htmlString + "<h3>"+feature.properties.question_text + "</h3><br>";
htmlString = htmlString + "<input type='radio' name='answer' id='"+feature.properties.id+"_1'/>"+feature.properties.answer_1+"<br>";
htmlString = htmlString + "<input type='radio' name='answer' id='"+feature.properties.id+"_2'/>"+feature.properties.answer_2+"<br>";
htmlString = htmlString + "<input type='radio' name='answer' id='"+feature.properties.id+"_3'/>"+feature.properties.answer_3+"<br>";
htmlString = htmlString + "<input type='radio' name='answer' id='"+feature.properties.id+"_4'/>"+feature.properties.answer_4+"<br>";
htmlString = htmlString + "<button onclick='checkAnswer(" + feature.properties.id + ");return false;'>Submit Answer</button>";
// now include a hidden element with the answer
// in this case the answer is always the first choice
// for the assignment this will of course vary - you can use
//feature.properties.correct_answer 
htmlString = htmlString + "<div id=answer" + feature.properties.id +" hidden>1</div>";
htmlString = htmlString + "</div>";
return L.marker(latlng, {icon:MarkerBlue}).bindPopup(htmlString);

}
}).addTo(mymap);

mymap.fitBounds(quizlayer.getBounds());
}

//Reference: Adapted from Practicals 6 and 7 and changing colour of icons adapted from Practical 2 and https://leafletjs.com/reference-1.4.0.html#latlng
function checkAnswer(questionID) {
// get the answer from the hidden div
// NB - do this BEFORE you close the pop-up as when you close the pop-up the
//DIV is destroyed
var answer = document.getElementById("answer"+questionID).innerHTML;

// now check the question radio buttons
var correctAnswer = false;
var answerSelected = 0;

for (var i=1; i < 5; i++) {
if (document.getElementById(questionID+"_"+i).checked){
answerSelected = i;


}
if ((document.getElementById(questionID+"_"+i).checked) && (i ==answer)) {
	alert ("Well done");
correctAnswer = true;
}
}
if (correctAnswer === false) {
// they didn't get it right
alert("Better luck next time");
}
// now close the popup
mymap.closePopup();
// the code to upload the answer to the server would go here
// call an AJAX routine using the data
// the answerSelected variable holds the number of the answer
//that the user picked
var question_id= questionID;

var answer_selected= answerSelected;
var correct_answer=answer;
var postString="question_id="+question_id +"&answer_selected="+answer_selected+"&correct_answer="+correct_answer;
alert(postString);
	//calling the processing function
	answerData(postString);
}



var client2;  // the global variable that holds the request, client was used for the uploadQuestion

//Reference: Adapted from Practical 6 and 7
function answerData(postString) {
    client2 = new XMLHttpRequest();
    postString = postString + "&port_id=" + httpPortNumber;
    var url = 'http://developer.cege.ucl.ac.uk:' + httpPortNumber + "/uploadAnswer";
    client2.open('POST', url, true);
    client2.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    client2.onreadystatechange = answerUpload;
    client2.send(postString);
}

//create the code to wait for the response from the data server, and process the response once it is received
function answerUpload() {
	//function listens out for the server to say that the data is ready
	if (client2.readyState == 4){
		
}
}

//Advanced functionality 1 quiz question pops up automatically using a proximity alert when the suer is close to the point. 
//Reference: Adapted from Practical 6 and 7 Proximity Alert 
//var userlat;
//var userlong;
//function closestFormPoint(position) {
// take the leaflet formdata layer
// go through each point one by one
// and measure the distance to Warren Street
// for the closest point show the pop up of that point
//var minDistance = 0.015 ; //15 metres minimum distance 
//quizlayer.eachLayer(function(layer){
//var distance = calculateDistance(userlat,
//userlong,layer.getLatLng().lat, layer.getLatLng().lng, 'K');
//if (distance < minDistance){
//closestFormPoint = layer.feature.properties.id;
//}
//});
// for this to be a proximity alert, the minDistance must be
// closer than a given distance - you can check that here
// using an if statement
// show the popup for the closest point to the set location
//quizlayer.eachLayer(function(layer) {
//if (layer.feature.properties.id == closestFormPoint){
//layer.openPopup();
//}
//});
//}


