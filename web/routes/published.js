const db = require('../db')
const jwt = require('jsonwebtoken');
var express = require('express')
  , router = express.Router()




const getArticles  = (pageNumber, pageSize ) =>  db.GetRecords("ap_getPublishedArticles", [pageNumber || 1, pageSize || 25] )


const getArticle = (id) => db.GetRecords("ap_getPublishedArticle", [id || 0])


const articles = async(req, res) => {
	let [ results, [{rows}]] = await getArticles(req.body.pageNumber, req.body.pageSize)
	res.send({results, rows })
}

const article = async(req, res) => {
	console.log("getting", req.params)
	let [ [record], meta ] = await  getArticle(req.params.id)
	res.send({record})
}


router.post('/', articles)
router.post('/:id',article )

module.exports = router