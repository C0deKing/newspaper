const db = require('../db')
const jwt = require('jsonwebtoken');
var express = require('express')
  , router = express.Router()




const getArticles  = (pageNumber, pageSize ) =>  db.GetRecords("ap_getPublishedArticles", [pageNumber || 1, pageSize || 25] )



const articles = async(req, res) => {
	let [ results, [{rows}]] = await getArticles(req.body.pageNumber, req.body.pageSize)
	res.send({results, rows })
}



router.post('/', articles)


module.exports = router