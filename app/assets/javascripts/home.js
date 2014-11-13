var lastIntervalStream;
var lastUrl = "";
var marker = null;
var lastData = null;


$(function(){
$("button").click(function() {  
	    
   clearInterval(lastIntervalStream);    	
  	
	$('#pic-body').html(""); 
	
	var searchValue = $('#searchfield').val();
  	
   $('#tagName').html(""+searchValue); 	
	console.log("search value: " + searchValue);   	
  	
	$.ajax({
    url: "/update",
    type: 'POST',
    data:  {search: searchValue},
    success: function(data){
    	
    	if(data[0].images.standard_resolution.url!=lastUrl){
   	 	$('#pic-body').prepend("<a href='"+data[0].link+"'><img class='pic' src='"+
    		data[0].images.standard_resolution.url+"'></img></a>");
			lastUrl = data[0].images.standard_resolution.url;

		}		
		
    	},
   
    });

			
	lastIntervalStream = setInterval(function(){$.ajax({
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

			$('#latitude').html("Lat: "+data[0].location.latitude);
			$('#longitude').html("Lon: "+data[0].location.longitude);
			
			var position = {lat: data[0].location.latitude, lng: data[0].location.longitude};		
			
			map.panTo(position);
			
			var pinColor = "FE7569";
	var pinImage = new google.maps.MarkerImage("http://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|" + pinColor,
    new google.maps.Size(21, 34),
    new google.maps.Point(0,0),
    new google.maps.Point(10, 34));	
			
			if(marker!=null){
				marker.setIcon(pinImage);
				marker.setZIndex(0);
			}

			
//RED -> FE7569
var pinColor = "44DD22";
var pinImage = new google.maps.MarkerImage("http://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|" + pinColor,
    new google.maps.Size(21, 34),
    new google.maps.Point(0,0),
    new google.maps.Point(10, 34));		
    
			marker = new google.maps.Marker({
   		 position: position,
   		 map: map,
   	    title:"Hello World!",
   	    icon: pinImage
			});
			
			marker.setZIndex(100);
			updateLocationInfo(position);
		}		
		
    	},
   
    });
   
	}, 3000);
 
    
});

});