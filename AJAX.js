var xhrNode;
function callDivNodeJSChange() {
xhrNode = new XMLHttpRequest();
var filename = document.getElementById("filename").value;
xhrNode.open("GET", filename, true);
xhrNode.onreadystatechange = processDivNodeJSChange;
try {
xhrNode.setRequestHeader("Content-Type", "application/x-www-formurlencoded");
}
catch (e) {
// this only works in internet explorer
}
xhrNode.send();
}

function processDivNodeJSChange() {
if (xhrNode.readyState < 4) // while waiting response from server
document.getElementById('ajaxtext').innerHTML = "Loading...";
else if (xhrNode.readyState === 4) { // 4 = Response from server has been completely loaded.
if (xhrNode.status == 200 && xhrNode.status < 300)
// http status between 200 to 299 are all successful
document.getElementById('ajaxtext').innerHTML = xhrNode.responseText;
}
}
