const jwt = require('jsonwebtoken');
const db = require('../db')



const getUser = (userId) => db.GetRecords("ap_getUser", [userId])


const loadUserToRequest = async (req, res, next, userId) => {
	let [ records] = await getUser(userId)
	let [ user ] = records
	req.user = user
	next()
}

const injectUser = (req, res, next) => {
	const token = req.header("token")
	if(req.path != '/login' && req.path != '/articles') {
		jwt.verify(token, db.GetSecret(), function(err, payload) { 
			res.setHeader("token", token || "")     
			if (err) {
		    	console.log(err)
		        return res.send({ 	success: false, 
		        					message: 'Failed to authenticate token.', 
		        					x_unauthorized: true ,
		        					redirect: "unauthorized" });    
		    } else {
		      	loadUserToRequest(req, res, next, payload.userId)
		      	
		    }
		});
	}else {
		next()
	}
	
}


module.exports = (app) => {
	app.use(injectUser)
}