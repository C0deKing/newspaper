export default async (path, body) => {
	return new Promise( (resolve, reject) => {
		$.ajax({
		    url: `/${path}`,
		    type:"POST",
		    crossDomain: true,              
		    data: JSON.stringify(body),
		    contentType:"application/json; charset=utf-8",
		    dataType:"json",
		    success: function(data){
		    	resolve(data)
		    },
		    error: function (responseData, textStatus, errorThrown) {
		        reject({data: responseData, error: errorThrown});
		    }
		 })
	} )
} 