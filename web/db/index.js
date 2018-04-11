var mysql = require('mysql');
let config = require('./config.js');
var pool  = mysql.createPool(config);



const buildParams = (parameters) => {
	let params = ""
	for(var i = 0; i < parameters.length; i++)
	{
		var temp = "";
		if(typeof parameters[i] === 'string' || parameters[i] instanceof String)
		{
			temp = mysql.escape(parameters[i]); 
		}
		else 
		{
			temp = parameters[i];
		}
		params += ((i == 0)? "" : ",") + temp;
	}
	return params;
}
const GetRecords = (proc, parameters) => {
	
	return new Promise((resolve, reject) => {		
		pool.query(`call ${proc}(${buildParams(parameters)});`, function (err, result, fields) {		
			if (err){
				LogError(err);
				reject(err);
			} 
			else{
				resolve(result);
			}			
				
		})		
	})
}

const GetSecret = () => {
	return config.jwt_secret
}




const LogError = (err) => {
	GetRecords("sp_logError", ["'" +err + "'"]).then(() =>{});
}

module.exports = {
	GetRecords: GetRecords, 
	Log: LogError, 
	GetSecret: GetSecret
}