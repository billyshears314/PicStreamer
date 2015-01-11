var imageList = [];
var imagesAdded = false;

function requestImages(){

	console.log('new ajax request to server');

	$.ajax({
   	url: "/update",
   	type: 'POST',
   	data:  {search: searchValue},
   	success: function(data){	
    		
    		for(var i=data.length-1; i>=0; i--){

				if(isNewUrl(data[i].images.standard_resolution.url)){

					if(data[i].location!=null){
					
						if(data[i].location.latitude!=null){				

							var imageUrl = data[i].images.standard_resolution.url;
								 imageExists(imageUrl, data, function(data, exists) {
  					
  								if(exists===true){

  								}
  								else{
  									console.log("Bad image url");	
  								}
							});

							imageList.push(data[i]);
							imagesAdded = true;	
						}
						else{
							console.log("location does not have latitude/longitude");
						}
					}    		
				
				}
    			
    		}
    		
    		
			if(imagesAdded===true){    		
    		
					if(counter===0){
						nextImage();	
					}    		
    		
	    			clearInterval(lastIntervalStream);
	    			
	    			lastIntervalStream = setInterval(function(){nextImage();}, speed);	
    		
    		}
    		else{
    			imagesAdded = false;
				clearInterval(lastIntervalStream);			
    			console.log("No new images to stream");
 				setTimeout(function(){requestImages()}, 5000);
    		}
    		
    		imagesAdded = false;
    		
 		}
 		
	});

}

function imageExists(url, data, callback) {
  var img = new Image();
  img.onload = function() { callback(data, true); };
  img.onerror = function() { callback(data, false); };
  img.src = url;
}

//Checks to see if pic is new
function isNewUrl(url){

	if(imageList.length>0){

	for(var i=0; i<imageList.length; i++){
		//console.log(JSON.stringify(imageList));	
		if(imageList[i].images.standard_resolution.url===url){
			console.log("REPEAT URL");
			return false;		
		}	
		
	}

	}	
	
	return true;
}