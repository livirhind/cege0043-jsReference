var client;
//Reference: adapted from the LeafletFunctions.js used in practical 6 
 //creating the AJAX request to get the Questions data using an XMLHttpRequest
	var xhrQuizPoints;
	function getQuizPoints(){
		alert('Getting the quiz data')
		xhrQuizPoints = new XMLHttpRequest();
		var url = "http://developer.cege.ucl.ac.uk:"+httpPortNumber;
		url = url +"/getQuizPoints/"+httpPortNumber;
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
return L.marker(latlng).bindPopup(htmlString);

},
}).addTo(mymap);

//mymap.fitBounds(quizLayer.getBounds());
}

//Reference: Adapted from Practicals 6 and 7 
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
}

//Reference: Adapted from uploadData.js used in practicals from week 5 and week 6 
//Adapted uploadData.js to upload the answer instead of the question as seen in uploadQuestion.js in the Question setting App repository 
function startAnswerUpload(){
	alert("start answer upload");
	//receive the text box values
	var question_id= document.getElementById("question_id").value;
	alert(question_id);
	var answer_selected= document.getElementById("answer_selected").value;
	alert(answer_selected);
	var correct_answer= document.getElementById("correct_answer").value;
	alert(correct_answer);
	//put values in poststring to send to the server, into database quizanswers
	var postString="question_id="+question_id +"&answer_selected="+answer_selected+"&correct_answer="+correct_answer;
	
	alert(postString);
	//calling the processing function
	processData(postString);
}

var client2;  // the global variable that holds the request, client was used for the uploadQuestion

//Reference: Adapted from Practical 6 and 7
function processData(postString) {
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
	if (client.readyState == 4){
		//change the DIV to show the response
		document.getElementById("answerUploadResult").innerHTML= client.responseText;
	}
}

