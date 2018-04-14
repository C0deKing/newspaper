export default (path, body, callback) => $.ajax({
		              url: `/${path}`,
		              type:"POST",
		              crossDomain: true,              
		              data: JSON.stringify(body),
		              contentType:"application/json; charset=utf-8",
		              dataType:"json",
		              success: function(data){
		               	callback(data)
		              },
		              error: function (responseData, textStatus, errorThrown) {
		                   callback({data: responseData, error: errorThrown});
		                }
		            })