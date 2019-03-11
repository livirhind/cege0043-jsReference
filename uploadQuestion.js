function startQuestionUpload(){
	
	//receive the text box values
	var question_title= document.getElementById("question_title").value;
	var question_text= document.getElementById("question_text").value;
	var answer_1= document.getElementById("answer_1").value;
	var answer_2= document.getElementById("answer_2").value;
	var answer_3= document.getElementById("answer_3").value;
	var answer_4= document.getElementById("answer_4").value;
	var correct_answer= document.getElementById("correct_answer").value;
	var latitude = document.getElementById("latitude").value;
	var longitude = document.getElementById("longitude").value;
	//put values in postring to send to the server
	var postString="question_title="+question_title +"&question_text="+question_text+"&answer_1="+answer_1 + "&answer_2="+ answer_2 + "&answer_3="+answer_3+"&answer_4="+answer_4
	+"&correct_answer="+correct_answer+ "&latitude=" + latitude + "&longitude=" + longitude ;
	//managing the select button, checkbox and radio buttons 
	var checkString = "";
	for (var i = 1; i<5;i++){
		if (document.getElementById("check"+i).checked === true){
			checkString = checkString + document.getElementById("check"+i).value + "||"
		}
	}
	
	alert(postString);
	//calling the processing function
	processData(postString);
}

var client;  // the global variable that holds the request

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