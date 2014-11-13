var lastIntervalStream;
var lastUrl = "";
var marker = null;
var markers = [];
var lastData = null;
var searchValue;
var initial= true;

$(function(){
$("button").click(function() {  
	    
   clearInterval(lastIntervalStream);    	
  	deleteMarkers();
	$('#pic-body').html(""); 	
	searchValue = $('#searchfield').val();
  	
   $('#tagName').html(""+searchValue); 	
	console.log("search value: " + searchValue);   	

		addRecentImage();
/*  	
	$.ajax({
    url: "/update",
    type: 'POST',
    data:  {search: searchValue},
    success: function(data){
    	
    	if(data[0].images.standard_resolution.url!=lastUrl){
   	 	$('#current-pic').html('<img id="current-pic-image" src=' + data[0].images.standard_resolution.url + '></img>');
			lastUrl = data[0].images.standard_resolution.url;

		}		
		
    	},
   
    });
*/
			
	lastIntervalStream = setInterval(function(){
		addRecentImage();
		/*
		$.ajax({
    url: "/update",
    type: 'POST',
    data: {search: searchValue},
    success: function(data){
   	
		if((data[0].images.standard_resolution.url!=lastUrl)&&(data[0].location!=null)){   
   
   		if(lastData!=null){
    			$('#pic-body').prepend("<a href='"+lastData[0].link+"'><img class='pic' src='"+
    			lastData[0].images.standard_resolution.url+"'></img></a>");
    		}
    		lastData = data;
			lastUrl = data[0].images.standard_resolution.url;

			$('#current-pic').html('<img id="current-pic-image" src=' + data[0].images.standard_resolution.url + '></img>');
*/

      
   
	}, 3000);
 
    
});

});

function addRecentImage(){
	
		$.ajax({
    url: "/update",
    type: 'POST',
    data:  {search: searchValue},
    success: function(data){
			console.log(initial);
    	if(((data[0].images.standard_resolution.url!=lastUrl)||(initial===true))&&(data[0].location!=null)){
   	 	$('#current-pic').html('<img id="current-pic-image" src=' + data[0].images.standard_resolution.url + '></img>');
			lastUrl = data[0].images.standard_resolution.url;
	
			if(lastData!=null){
    			$('#pic-body').prepend("<a href='"+lastData[0].link+"'><img class='pic' src='"+
    			lastData[0].images.standard_resolution.url+"'></img></a>");
    		}
    		
    		lastData = data;
    		initial = false;
    			
    		$('#current-pic').html('<img id="current-pic-image" src=' + data[0].images.standard_resolution.url + '></img>');

			$('#latitude').html("Lat: "+data[0].location.latitude);
			$('#longitude').html("Lon: "+data[0].location.longitude);
			
			var position = {lat: data[0].location.latitude, lng: data[0].location.longitude};		
			
			map.panTo(position);
			
			//creates red pin image
			var  pinImage = createPinImage("FE7569");
			
			//Set old green pic to red now that isn't current
			if(marker!=null){
				marker.setIcon(pinImage);
				marker.setZIndex(0);
			}
				
			//creates 
			pinImage = createPinImage("44DD22");	
    
			marker = new google.maps.Marker({
   		 position: position,
   		 map: map,
   	    title:"Hello World!",
   	    icon: pinImage
			});
			
			markers.push(marker);
			marker.setZIndex(100);
			updateLocationInfo(position);
			
			}
		
    	}
   
    });
   
}   

function createPinImage(color){
	
	var pinColor = color;
 	var pinImage = new google.maps.MarkerImage("http://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|" + pinColor,
 	new google.maps.Size(21, 34),
 	new google.maps.Point(0,0),
  	new google.maps.Point(10, 34));	
  	
  	return pinImage;	
	
}
   
   