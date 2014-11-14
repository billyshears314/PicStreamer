var lastIntervalStream;
var lastUrl = "";
var marker = null;
var markers = [];
var lastData = null;
var searchValue;
var initial= true;
var images = [];
var currentImage = 0;
var lastImages = [];
var preloadImage = new Image();

var totalImages = [];

$(function(){

	$('#pauseplay').hide();	
	
	$("button").click(function() {

		$('#pauseplay').show();				  
		  
		clearInterval(lastIntervalStream);
		images = [];
		currentImage = 0;
		$('#pic-body').html(""); 
	
		deleteMarkers();	

		searchValue = $('#searchfield').val();
		$('#searchfield').val('');		  	
		
		$('#searchFor').html('Searching #'+searchValue);
		  	
		$('#tagName').html(""+searchValue); 
		
		requestImages(nextImage);		
	 
	});
	
	$('#pauseplay').click(function(){
		
				
		
	});

});


function requestImages(callback){

	$.ajax({
   	url: "/update",
   	type: 'POST',
   	data:  {search: searchValue},
   	success: function(data){	
    		
    		for(var i=0; i<data.length; i++){

				if(isNewUrl(data[i].images.standard_resolution.url)){

					if(data[i].location!=null){
					
						if(data[i].location.latitude!=null){
							images.push(data[i]);	
						}
						else{
							console.log("location does not have latitude/longitude");
						}
					}    		
				
				}
    			
    		}
	
    		callback();
    		
    		lastIntervalStream = setInterval(function(){

				if(currentImage+1 >= images.length){
						newRequest();					
					}
				else{
					 	nextImage();  
					}	
				 
			}, 3500);
 		}
 		
	});

	
}

function isNewUrl(url){

	for(var i=0; i<lastImages.length; i++){
	
		if(lastImages[i].images.standard_resolution.url===url){

			return false;		
			
		}	
		
	}
	
	return true;
}

function newRequest(){
	
	clearInterval(lastIntervalStream);
	lastImages = images;
	images = [];
	currentImage = 0;
	
	requestImages(nextImage);
	
}


function nextImage(){
	
		preloadImage.src = ''+images[currentImage].images.standard_resolution.url;
		
		preloadImage.width = "350";

	var currentPic = document.getElementById('current-pic');

	currentPic.appendChild(preloadImage);			
	
		if(currentImage>0){
			/*
			$('#pic-body').prepend("<a href='"+images[currentImage-1].link+"'><img class='pic' src='"+
			images[currentImage-1].images.standard_resolution.url+"'></img></a>");
			*/
			$('#pic-body').prepend("<img class='pic' src='"+
			images[currentImage-1].images.standard_resolution.url+"'></img>");
			
			$('.pic').click(function(){
				console.log("pic clicked");
			});			
			
			totalImages.push(images[currentImage-1]);
		}		
		
			$('#latitude').html("Lat: "+images[currentImage].location.latitude);
			$('#longitude').html("Lon: "+images[currentImage].location.longitude);
			
			var position = {lat: images[currentImage].location.latitude, lng: images[currentImage].location.longitude};		
			
			map.panTo(position);

			//creates red pin image
			var pinImage = createPinImage("FE7569");
			
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
		
	 currentImage++;
}

function createPinImage(color){
	
	var pinColor = color;
 	var pinImage = new google.maps.MarkerImage("http://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|" + pinColor,
 	new google.maps.Size(21, 34),
 	new google.maps.Point(0,0),
  	new google.maps.Point(10, 34));	
  	
  	return pinImage;	
	
}


   
   
   