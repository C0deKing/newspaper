const db = require('../db')
const jwt = require('jsonwebtoken');
var express = require('express')
  , router = express.Router()




const getMyArticles  = (userId, pageNumber, pageSize ) =>  db.GetRecords("ap_getMyArticles", [userId || 0, pageNumber || 1, pageSize || 25] )



const myArticles  = async (req, res) => {
	 const [records, info, meta] = await getMyArticles(req.user.id,  req.body.pageNumber, req.body.pageSize)
	 if(meta) {
	 	const [{rows}] = info
	 	res.send({records, rows })
	 }else {
	 	res.send({error: records[0]})
	 }
}

const publicArticles = async(req, res) => {
	res.send({message: "not yet"})
}


router.post('/mine', myArticles)
router.post('/', publicArticles)


module.exports = router