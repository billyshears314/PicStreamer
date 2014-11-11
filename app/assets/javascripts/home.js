var lastIntervalStream;
var lastUrl = "";


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
   	
		if(data[0].images.standard_resolution.url!=lastUrl){   
   
    		$('#pic-body').prepend("<a href='"+data[0].link+"'><img class='pic' src='"+
    		data[0].images.standard_resolution.url+"'></img></a>");
			lastUrl = data[0].images.standard_resolution.url;

		}		
		
    	},
   
    });
   
	}, 2000);
 
    
});

});