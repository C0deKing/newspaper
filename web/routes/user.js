const db = require('../db')
var express = require('express')
  , router = express.Router()


const updateUser = (userId, selectedUserId, firstName, lastName, isApproved, isEditor, isAdmin) => db.GetRecords("ap_profile_updateUser",
																[userId || 0, selectedUserId || 0, firstName || "",
																	lastName || "", isApproved || 0, isEditor || "",
																	isAdmin || 0])




const user  = (req, res) => {
	let { firstName, lastName, username} = req.user
	res.send({ firstName, lastName, username})
}


const update = async (req, res) => {
	if(req.user.id){
		let [ [result], meta] = await updateUser(req.user.id, req.user.id, req.body.firstName, 
										req.body.lastName, req.user.isApproved, req.user.isEditor,
										req.user.isAdmin)
		res.send(result)
	}else{
		res.send({error: "You must have a session to update your user"})
	}
}

router.post('/', user)
router.post('/update', update)


module.exports = router