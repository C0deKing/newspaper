

$(function() {
	$.post( "/ping", function( data ) {
	  	console.log(data)
	  	alert("Test Change! - " + data)
	});
})

