var lastIntervalStream;
var lastUrl = "";
var marker = null;
var markers = [];
var lastData = null;
var searchValue;
var initial= true;
var images = [];
var currentImage = 0;
var totalImageCount = 0;
var lastImages = [];
var transition = false;

var totalImages = [];
var speed = 3500;

var pause = false;

$(function(){
	
	var speeds = ["Slow", "", "Med", "", "Fast"];	
	
	var $slider2 = $("#slider2").slider({ max: 4, value: 2});
	
	$slider2.slider("pips", {rest: "label", labels: speeds});	
	
	$('#pauseplay').hide();	
	
	$('#searchFor').html('&nbsp;');	
	
	$("#button").click(function() {

		$('#pauseplay').show();				  
		  
		clearInterval(lastIntervalStream);
		images = [];
		currentImage = 0;
		//totalImageCount = 0;
		$('#pic-body').html(""); 
	
		deleteMarkers();	

		searchValue = $('#searchfield').val();
		$('#searchfield').val('');		  	
		
		$('#searchFor').html('Searching #'+searchValue);
		
		requestImages();		
	 
	});
	
	$('#pauseplay').click(function(){
		
		if(pause===false){
			pauseStream();
		}
		else{
			playStream();
		}
	});
	
	$( "#slider2" ).slider({
		change: function( event, ui ) {
			console.log("CHANGE");
		
			var value = $( "#slider2" ).slider( "option", "value" );
			
			if(value===0){
				speed = 6000;
			}
			else if(value===1){
				speed = 4750;
			}
			else if(value===2){
				speed =3500;
			}
			else if(value===3){
				speed = 2250;
			}
			else if(value===4){
				speed = 1000;
			}		
			
		}
	});
	
	$('#info').click(function(){
		console.log(JSON.stringify(totalImages));
	});
	
});


function requestImages(){

	console.log('new request');

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
	
			nextImage();		
    		    		
    		lastIntervalStream = setInterval(function(){

				if(currentImage+1 >= images.length){
						newRequest();					
					}
				else{
					 	nextImage();  
					}	
				 
			}, speed);
 		}
 		
	});

}

function pauseStream(){
	clearInterval(lastIntervalStream);			
	pause = true;
	$('#pauseplay').removeClass('btn-danger');
	$('#pauseplay').addClass('btn-success');
	$('#pauseplay').text('Play');
}

function playStream(){
	requestImages();
	pause = false;
	$('#pauseplay').removeClass('btn-success');
	$('#pauseplay').addClass('btn-danger');	
	$('#pauseplay').text('Stop');
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
	console.log("image array cleared");
	images = [];
	currentImage = 0;
	
	requestImages(nextImage);
}


function nextImage(){
	
	var preloadImage = new Image();
	
	preloadImage.src = ''+images[currentImage].images.standard_resolution.url;
	preloadImage.width = "400";

	$('#current-pic').html('');
	$('#current-pic-link').attr('href', ''+images[currentImage].link);
	$('#current-pic-link').attr('target', '_blank');
	var currentPic = document.getElementById('current-pic');
	currentPic.appendChild(preloadImage);		
	
	$('#current-pic a:first-child').css('width', '200px');
	
	if(transition === true){
		
	}
	else{		
	
	if(currentImage>0){

		$('#pic-body').prepend("<img id='"+totalImageCount+"'class='pic' src='"+
		images[currentImage-1].images.standard_resolution.url+"'></img>");	
		
		$('.pic').css('cursor', 'pointer');		
			
		$('.pic').click(function(){
			pauseStream();
			var index = parseInt($(this).attr('id'));
			console.log(index);
			switchMarker(totalImages[index]);
			loadCurrentImage(totalImages[index]);
			/*
			$('#topbar').ScrollTo({
   			duration: 1000,
    			easing: 'linear'
			});
			*/

		});			

		totalImages.push(images[currentImage-1]);
		totalImageCount++;
	}
	else{
		if(lastImages.length>0){

			$('#pic-body').prepend("<img id='"+totalImageCount+"'class='pic' src='"+
			lastImages[lastImages.length-2].images.standard_resolution.url+"'></img>");				

			totalImages.push(lastImages[lastImages.length-2]);
			totalImageCount++;	
		}

	}
	
	}

	
	createMarker(images[currentImage]);
	
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
/*
function markerListen(){

	google.maps.event.addListener(marker, 'click', function() {
    map.setZoom(8);
    map.setCenter(marker.getPosition());
    console.log('test');
  });	
	
}
*/

function loadCurrentImage(image){
	
	var preloadImage = new Image();
	
	preloadImage.src = ''+image.images.standard_resolution.url;
	preloadImage.width = "400";

	$('#current-pic').html('');
	$('#current-pic-link').attr('href', ''+image.link);
	var currentPic = document.getElementById('current-pic');
	currentPic.appendChild(preloadImage);
	
}
   
