const db = require('../db')
const jwt = require('jsonwebtoken');
var express = require('express')
  , router = express.Router()




const validate  = (username, password) =>  db.GetRecords("ap_security_login", [username, password] )

const validateUser = async(username, password) => {
	const [ records, meta] = await validate(username, password)
	const [ response ] = records

	if(response.code > 0){
		const payload = {
			userId: response.userId
		}
		const token = jwt.sign(payload, db.GetSecret())
		return {
			token: token, 
			success: true
		}
	}else {
		const {code, message} = response
		return {code, message}
	}

}

const login  = (req, res) => {
	validateUser(req.body.username, req.body.password).then( (response) => {
		res.send(response)
	}).catch( (ex) => {
		res.send(ex)
	})
}



router.post('/', login)



module.exports = router