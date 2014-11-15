var map;

function initialize() {
  var mapOptions = {
    center: { lat: 38.797, lng: -95.35},
    zoom: 4
  };
   map = new google.maps.Map(document.getElementById('map-canvas'),
      mapOptions);

}

$(document).ready(function () {
	google.maps.event.addDomListener(window, 'load', initialize);

	var latlng = new google.maps.LatLng(-34.397, 150.644);

});

function updateLocationInfo(latlng){
	
    geocoder = new google.maps.Geocoder();
    //var latlng = new google.maps.LatLng(-34.397, 150.644);
    
    geocoder.geocode({'latLng': latlng}, function(results, status)
     {
         //alert("Else loop1");
         if (status == google.maps.GeocoderStatus.OK)
          {
                 if (results[0])
                 {
                     var add= results[0].formatted_address ;
                     var  value=add.split(",");

                     count=value.length;
                     country=value[count-1];
                     state=value[count-2];
                     city=value[count-3];
                     
							$('#location-info').html(city + ', '+country);
                 }
                 else 
                 {
           alert("address not found");
                 }
         }
          else
         {
				console.log("FAILED!");
				$('#location-info').html('');
         }
     });

};

function setAllMap(map) {
  for (var i = 0; i < markers.length; i++) {
    markers[i].setMap(map);
  }
}

function clearMarkers() {
  setAllMap(null);
}

function deleteMarkers() {
  clearMarkers();
  markers = [];
}

function createPinImage(color){
	
	var pinColor = color;
 	var pinImage = new google.maps.MarkerImage("http://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|" + pinColor,
 	new google.maps.Size(21, 34),
 	new google.maps.Point(0,0),
  	new google.maps.Point(10, 34));	
  	
  	return pinImage;	
	
}