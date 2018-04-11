const db = require('../db')
var express = require('express')
  , router = express.Router()




const user  = (req, res) => {
	let { firstName, lastName, username} = req.user
	res.send({ firstName, lastName, username})
}



router.post('/', user)



module.exports = router