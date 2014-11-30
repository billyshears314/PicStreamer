var imageList = [];
var imagesAdded = false;

function requestImages(){

	console.log('new request');

	$.ajax({
   	url: "/update",
   	type: 'POST',
   	data:  {search: searchValue},
   	success: function(data){	
    		
    		for(var i=data.length-1; i>=0; i--){

				if(isNewUrl(data[i].images.standard_resolution.url)){

					if(data[i].location!=null){
					
						if(data[i].location.latitude!=null){
							
							/*
							$.get(data[i].images.standard_resolution.url)
							.done(function(){
								imageList.push(data[i]);
								imagesAdded = true;				
							}).fail(function(){
								console.log("Bad image url");
							})
							*/					
							
					
							//console.log("CHECK");					
							//console.log(JSON.stringify(data[i]));
							var imageUrl = data[i].images.standard_resolution.url;
								 imageExists(imageUrl, data, function(data, exists) {
  								//console.log('RESULT: url=' + imageUrl + ', exists=' + exists);
  					
  								if(exists===true){
  									//console.log(JSON.stringify(data[i]));
  									//imageList.push(data[i]);
  									//imagesAdded = true;
  									//console.log("PUSH");
  								}
  								else{
  									console.log("Bad image url");	
  								}
							});
							
							//images.push(data[i]);
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
    		
	    		//if(counter===0){
	    			clearInterval(lastIntervalStream);
	    			//nextImage();
	    			lastIntervalStream = setInterval(function(){nextImage();}, speed);	
	    		//}
    		
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