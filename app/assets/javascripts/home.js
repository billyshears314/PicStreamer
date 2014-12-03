var lastIntervalStream;
var marker = null;
var markers = [];
var searchValue;

var speed = 3500;
var pause = false;
var counter = 0;

$(function(){

	initialize();
		
	$("#stream_button").click(function() {
		startStream();
		console.log(pause);
	});
	
	$('#pauseplay').click(function(){
		
		if(pause===false){
			pauseStream();
		}
		else{
			playStream();
		}
		
		console.log(pause);
	});
	
	$( "#slider2" ).slider({
		change: function( event, ui ) {
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
			refresh(playStream);
		}
	});
	
	$("input").keyup(function(e) {
	e.preventDefault();
	
	if(e.keyCode == 13) {
		startStream();	
  	}
  	
	});
});

function initialize(){
	
	var speeds = ["Slow", "", "Med", "", "Fast"];	
	var $slider2 = $("#slider2").slider({ max: 4, value: 2});
	$slider2.slider("pips", {rest: "label", labels: speeds});	
	
	$('#pauseplay').hide();	
	$('#searchFor').html('&nbsp;');
	
}
//Clears variables and begins a new stream of pictures
function startStream(){
	
	$('#pauseplay').show();				  
		  
	clearInterval(lastIntervalStream);
	currentImage = 0;
	counter = 0;
	imageList = [];
	$('#pic-body').html(""); 

	deleteMarkers();	

	searchValue = $('#searchfield').val();

	if(searchValue.charAt(0)==='#'){
		searchValue = searchValue.substring(1);	
	}	
	
	$('#searchfield').val('');		  	
	
	$('#searchFor').html('Searching #'+searchValue);

	pause = false;	
	$('#pauseplay').removeClass('btn-success');
	$('#pauseplay').addClass('btn-danger');	
	$('#pauseplay').text('Stop');	
	requestImages();
	
}

function pauseStream(){
	clearInterval(lastIntervalStream);			
	pause = true;
	$('#pauseplay').removeClass('btn-danger');
	$('#pauseplay').addClass('btn-success');
	$('#pauseplay').text('Play');
}

function playStream(){
	nextImage();
   lastIntervalStream = setInterval(function(){nextImage();}, speed);	
	pause = false;
	$('#pauseplay').removeClass('btn-success');
	$('#pauseplay').addClass('btn-danger');	
	$('#pauseplay').text('Stop');
}

//pauses and then plays stream again to refresh it
function refresh(callback) {
  pauseStream();
  callback();
} 

function nextImage(){

	var preloadImage = new Image();
	console.log("Current Image: " + counter);
	preloadImage.src = ''+imageList[counter].images.standard_resolution.url;
	preloadImage.width = "350";

	$('#current-pic').html('');
	$('#current-pic-link').attr('href', ''+imageList[counter].link);
	$('#current-pic-link').attr('target', '_blank');
	var currentPic = document.getElementById('current-pic');
	currentPic.appendChild(preloadImage);		
	
	$('#current-pic a:first-child').css('width', '175px');
		
	if(counter>0){

		$('#pic-body').prepend("<div class='pic_container'> <img id='"+(counter-1)+"'class='pic' src='"+
		imageList[counter-1].images.standard_resolution.url+"'></img> </div>");	
		
		$('.pic').css('cursor', 'pointer');		
			
		$('.pic').click(function(){
			
			//scrolls to the top of the page
			$( 'html:not(:animated),body:not(:animated)' ).animate( { scrollTop: $('body').offset().top}, 800);
			pauseStream();
			var index = parseInt($(this).attr('id'));
			console.log(index);
			switchMarker(imageList[index]);
			loadCurrentImage(imageList[index]);
		});			

	}
		
	createMarker(imageList[counter]);
	counter++;	
	
	if(counter >= imageList.length - 1){
		console.log("COUNTER WAS: " + counter);
		console.log("Total Images Length: " + imageList.length);
		requestImages();	
	}
	
}

function loadCurrentImage(image){
	
	var preloadImage = new Image();
	
	preloadImage.src = ''+image.images.standard_resolution.url;
	preloadImage.width = "350";

	$('#current-pic').html('');
	$('#current-pic-link').attr('href', ''+image.link);
	var currentPic = document.getElementById('current-pic');
	currentPic.appendChild(preloadImage);
	
}
