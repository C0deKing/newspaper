export default async (path, body, self) => {
	return new Promise( (resolve, reject) => {
		$.ajax({
		    url: `/${path}`,
		    type:"POST",
		    crossDomain: true,              
		    data: JSON.stringify(body),
		    contentType:"application/json; charset=utf-8",
		    dataType:"json",
		    success: function(data){
		    	if(data.error && self){
		    		self.props.history.push('published')
		    	}else{
		    		resolve(data)
		    	}

		    },
		    error: function (responseData, textStatus, errorThrown) {
		        reject({data: responseData, error: errorThrown});
		    },
		     headers: {
		       	'token': window.localStorage.getItem('token') || "",
		        'Content-Type':'application/json'
		    }
		 })
	} )
} 