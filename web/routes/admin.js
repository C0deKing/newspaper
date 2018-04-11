const db = require('../db')
const jwt = require('jsonwebtoken');
var express = require('express')
  , router = express.Router()




const getUsers  = (userId, pageNumber, pageSize ) =>  db.GetRecords("ap_getUsers", 
													[userId || 0, pageNumber || 1, pageSize || 25] )


const registerUser = (username, password) => db.GetRecords("ap_registerUser", [username || '', password || ''])


const updateUser = (userId, selectedUserId, firstName, lastName, isApproved, isEditor, isAdmin) => db.GetRecords("ap_profile_updateUser",
																[userId || 0, selectedUserId || 0, firstName || "",
																	lastName || "", isApproved || 0, isEditor || "",
																	isAdmin || 0])

const users = async(req, res) => {
	if(req.user.isAdmin){
		let [ results, [{rows}]] = await getUsers( req.user.id, req.body.pageNumber, req.body.pageSize)
		res.send({results, rows })
	}else{
		res.send({error: "Only Administrators can view other users"})
	}
	
}

const register = async(req, res) => {
	if(req.user.isAdmin){
		let [ [result], meta] = await registerUser(req.body.username, req.body.password)
		res.send(result)
	}else{
		res.send({error: "Only Administrators can register a new user"})
	}
}

const update = async (req, res) => {
	if(req.user.isAdmin) {
		let [ [result], meta] = await updateUser(req.user.id, req.params.id, req.body.firstName, 
										req.body.lastName, req.body.isApproved, req.body.isEditor,
										req.body.isAdmin)
		res.send(result)
	}else{
		res.send({error: "Only Administrators can update user settings"})
	}
}





router.post('/', users)
router.post('/register/', register)
router.post('/update/:id', update)

module.exports = router