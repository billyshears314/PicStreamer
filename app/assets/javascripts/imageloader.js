var imageList = [];

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
							console.log("CHECK");					
							
							var imageUrl = data[i].images.standard_resolution.url;
								imageExists(imageUrl, function(exists) {
  								console.log('RESULT: url=' + imageUrl + ', exists=' + exists);
  					
  								if(exists===true){
  									images.push(data[i]);
  									console.log("PUSH");
  								}
  								else{
  									console.log("Bad image url");	
  								}
							});
							*/
							//images.push(data[i]);
							imageList.push(data[i]);
							
						}
						else{
							console.log("location does not have latitude/longitude");
						}
					}    		
				
				}
    			
    		}
    		
    		if(counter===0){
    			nextImage();
    			lastIntervalStream = setInterval(function(){nextImage();}, speed);	
    		}
    		
 		}
 		
	});

}


function isNewUrl(url){
/*
	for(var i=0; i<lastImages.length; i++){
	
		if(lastImages[i].images.standard_resolution.url===url){
			console.log("REPEAT URL");
			return false;		
		}	
		
	}
	*/
	return true;
}