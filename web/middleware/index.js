const jwt = require('jsonwebtoken');
const db = require('../db')



const getUser = (userId) => db.GetRecords("ap_getUser", [userId])


const loadUserToRequest = async (req, res, next, userId) => {
	let [ records] = await getUser(userId)
	let [ user ] = records
	req.user = user
	next()
}

const error =  (err, req, res, next) => {
  console.error(err.stack)
  res.status(500).send('Something broke!    ' + err)
}

const injectUser = async (req, res, next) => {
	const token = req.header("token")
	if(token) {
		jwt.verify(token, db.GetSecret(), function(err, payload) { 
			res.setHeader("token", token || "")     
			if (err) {
		        return res.send({ 	success: false, 
		        					message: 'Failed to authenticate token.', 
		        					x_unauthorized: true ,
		        					redirect: "unauthorized" });    
		    } else {
		      	loadUserToRequest(req, res, next, payload.userId)
		      	
		    }
		});
	}else {
		req.user = {
			id: 0, 
			isEditor: false, 
			isAdmin: false
		}
		next()
	}
	
}


module.exports = (app) => {
	app.use(injectUser)
	app.use(error)
}