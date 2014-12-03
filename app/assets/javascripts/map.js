var map;

function initializeMap() {
  var mapOptions = {
    center: { lat: 38.797, lng: -95.35},
    zoom: 4
  };
   map = new google.maps.Map(document.getElementById('map-canvas'),
      mapOptions);
}

$(document).ready(function () {
	google.maps.event.addDomListener(window, 'load', initializeMap);

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
                     var add = results[0].formatted_address;
                     var value = add.split(",");

                     count=value.length;
                     country=value[count-1];
                     state=value[count-2];
                     city=value[count-3];
                     
                     var a = 'test';
							a = city + ', ' + country;                  

							if(a.length > 40){							
								a = a.substring(0, 40);
								a = a + '...';      
							}               
                     
							$('#location-info').html(city + ', '+country);
							$('#location-info').html(a);
                 }
                 else 
                 {
           			$('#location-info').html('&nbsp;');
                 }
         }
          else
         {
				console.log("FAILED!");
				$('#location-info').html('&nbsp;');
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

function createMarker(image){

	//creates red pin image
	var pinImage = createPinImage("FE7569");
			
	//Set old green pic to red now that isn't current
	if(marker!=null){
		marker.setIcon(pinImage);
		marker.setZIndex(0);
	}
	
	var position = {
		lat: image.location.latitude, 
		lng: image.location.longitude
	};		
			
	map.panTo(position);
				
	//creates 
	pinImage = createPinImage("44DD22");	
 
	marker = new google.maps.Marker({
		position: position,
		map: map,
	  // title:"Hello World!",
	   icon: pinImage
	});
		
	markers.push(marker);
	marker.setZIndex(100);
	updateLocationInfo(position);

}

function switchMarker(image){
	
	//creates red pin image
	var pinImage = createPinImage("FE7569");
			
	//Set old green pic to red now that isn't current
		marker.setIcon(pinImage);
		marker.setZIndex(0);
	
	var position = {
		lat: image.location.latitude, 
		lng: image.location.longitude
	};		
			
	map.panTo(position);
				
	//creates 
	pinImage = createPinImage("44DD22");	
 
	marker = new google.maps.Marker({
		position: position,
		map: map,
	  // title:"Hello World!",
	   icon: pinImage
	});

	//google.maps.event.addDomListener(window, 'load', markerListen);
		
	markers.push(marker);
	marker.setZIndex(100);
	updateLocationInfo(position);

}

function createPinImage(color){
	
	var pinColor = color;
 	var pinImage = new google.maps.MarkerImage("http://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|" + pinColor,
 	new google.maps.Size(21, 34),
 	new google.maps.Point(0,0),
  	new google.maps.Point(10, 34));	
  	
  	return pinImage;	
	
}