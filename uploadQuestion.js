var popup=L.popup();
var latitude
var longitude
// create an event detector to wait for the user's click (listener) and use the popup previously created to show them the coordinates of the point they cicked on
// Leaflet API converts screen coordinates to real world coordinates for you
// core functionality 2 the lat/lng of the question point is automatically entered when the user clicks on the map in the question setting app
//Reference: Adapted from Practical 2 simpleMapGeoJSON.html, cleaning up the text of the returned latitude and longitude so it can be inputted into question table without comma and brackets from Leaflet.js Essentials by Paul Crickard III 
function onMapClick(e){
	popup
	     .setLatLng(e.latlng)
         .setContent("Question Coordinates, please fill in the form below:" + e.latlng.toString())
         .openOn(mymap);
    var coord = e.latlng;
    latitude =  coord.lat
    longitude = coord.lng
		
		}
// add the click event detector to the map
mymap.on('click',onMapClick);


function startQuestionUpload(){

	//receive the text box values
	var question_title= document.getElementById("question_title").value;
	var question_text= document.getElementById("question_text").value;
	var answer_1= document.getElementById("answer_1").value;
	var answer_2= document.getElementById("answer_2").value;
	var answer_3= document.getElementById("answer_3").value;
	var answer_4= document.getElementById("answer_4").value;
	var correct_answer= document.getElementById("correct_answer").value;
	//put values in postring to send to the server
	var postString="question_title="+question_title +"&question_text="+question_text+"&answer_1="+answer_1 + "&answer_2="+ answer_2 + "&answer_3="+answer_3+"&answer_4="+answer_4
	+"&correct_answer="+correct_answer+"&latitude=" + latitude + "&longitude=" + longitude; 
	//Core Functionality 3- error messages will appear if the user does not fill in all parts of the question form 
	{
		if (question_title == "" ||  question_text == "" ||  answer_1 == "" ||  answer_2 == ""||  answer_3 == ""||  answer_4 == "") {
			alert("Please fill in all sections on the question form"); return false;
		}
	}
//Core Functionality 3- error message will appear if the user inserts an answer that is not between 1 and 4 
	{
		if (correct_answer > 4 || correct_answer < 1 ) {alert ("The answer must be a number between 1 and 4"); return false;

	}
}
	alert(postString);
	//calling the processing function
	processData(postString);
}

var client;  // the global variable that holds the request
//Reference: From Practical 6 and 7 Adapted for the question setting App
function processData(postString) {
    client = new XMLHttpRequest();
    postString = postString + "&port_id=" + httpPortNumber;
    var url = 'http://developer.cege.ucl.ac.uk:' + httpPortNumber + "/uploadQuestion";
    client.open('POST', url, true);
    client.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    client.onreadystatechange = dataUpload;
    client.send(postString);
}

//create the code to wait for the response from the data server, and process the response once it is received
function dataUpload() {
	//function listens out for the server to say that the data is ready
	if (client.readyState == 4){
		//change the DIV to show the response
		document.getElementById("dataUploadResult").innerHTML= client.responseText;
	}
}