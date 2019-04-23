        var userMarker;

        //define the user's location lat and long for proximity alerts in advanced functionality 1
        //var userlat;
        //var userlong;

     
       
      //Function to zoom into the location of the user, will also display the location of the quiz points
      //Reference: Taken from Practical 2 location based services 
        function zoomOnMap(){
        	alert('Zooming in to display your location');
        	navigator.geolocation.getCurrentPosition(getPosition);
        }
        
        function getPosition(position){
        	mymap.setView([position.coords.latitude, position.coords.longitude],15);
        }

        //Reference: Function to track the location of the user taken from Practical 2: Location based services via HTML5
        function trackLocation(){
			if (navigator.geolocation){
				navigator.geolocation.watchPosition(showPosition);
				
			} 
			else {
				document.getElementById('showLocation').innerHTML = "Geolocation is not supported by this browser.";
			}
		}
        
        //Reference: Function taken from Practical 2 to show the position of the user 
         function showPosition(position){
         	if(userMarker){
         		mymap.removeLayer(userMarker);
         	}
            userMarker = L.marker([position.coords.latitude, position.coords.longitude]).addTo(mymap).bindPopup("<b>You are here</b>");
       }

	 
//Reference: From Practical 2: Location based services via HTML5
// code adapted from https://www.htmlgoodies.com/beyond/javascript/calculate-the-distance-between-two-points-inyour-web-apps.html

function calculateDistance(lat1,lon1,lat2,lon2,unit){
	var radlat1 = Math.PI * lat1/180;
	var radlat2 = Math.PI * lat2/180;
	var radlon1 = Math.PI * lon1/180;
	var radlon2 = Math.PI * lon2/180;
	var theta = lon1-lon2;
	var radtheta = Math.PI * theta/180;
	var subAngle = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
	subAngle = Math.acos(subAngle);
    subAngle = subAngle * 180/Math.PI; // convert the degree value returned by acos back to degrees from radians
    dist = (subAngle/360) * 2 * Math.PI * 3956; // (subtended angle in degrees/360) * 2 * pi * radius where radius of Earth is 39556 miles
     
     if (unit=="K"){dist = dist * 1.609344 ;} // convert miles to km 
     if (unit=="N"){dist= dist * 0.8684;} //convert miles to nautical miles
     return dist;
}