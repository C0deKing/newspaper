const db = require('../db')
const AWS = require('aws-sdk')
AWS.config.update({ accessKeyId: 'AKIAIBZQHBRLZGKMPCAQ', secretAccessKey: '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' });
const s3 = new AWS.S3();

var express = require('express')
  , router = express.Router()





const upload = async (req, res) => {
	if(req.files.file){
		//console.log("File", req.files.file)
		//console.log("Body",req.body)
		const params = {Bucket: 'matt-newspaper', Key: req.body.key || req.files.file.name, Body: req.files.file.data };
		
		s3.putObject(params, function(err, data) {
	    	if (err) {
	            console.log(err)
	            res.send(err)
	        }else {
	        	res.send(data)           
	        }

	      });	
	}
	else{
		res.send({error: "No file provided"})
	}
	

	
}

router.post('/', upload)


module.exports = router