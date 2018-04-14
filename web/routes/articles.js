const db = require('../db')
const jwt = require('jsonwebtoken');
var express = require('express')
  , router = express.Router()




const getMyArticles  = (userId, pageNumber, pageSize ) =>  db.GetRecords("ap_getMyArticles", [userId || 0, pageNumber || 1, pageSize || 25] )
const getPendingArticles = (userId, pageNumber, pageSize ) =>  db.GetRecords("ap_getArticlesToApprove", [userId || 0, pageNumber || 1, pageSize || 25] )

const updateArticle = (userId, articleId, headline, body) => db.GetRecords("ap_updateArticle", 
																[userId || 0, articleId || 0, headline || "", body || ""])
const approveArticle = (userId, articleId, isApproved) => db.GetRecords("ap_approveArticle", [userId || 0, articleId || 0, isApproved || 0])

const myArticles  = async (req, res) => {
	if(req.user.isEditor || req.user.isAdmin){
		 const [records, info, meta] = await getMyArticles(req.user.id,  req.body.pageNumber, req.body.pageSize)
		 if(meta) {
		 	const [{rows}] = info
		 	res.send({records, rows })
		 }else {
		 	res.send({error: records})
		 }
	}
	else {
			res.send({error: "Only Administrators and Editors can view articles"})
	}
	
}

const article = async(req, res) => {
	if(req.user.isEditor || req.user.isAdmin){
		let [ [result], meta] = await updateArticle(req.user.id, req.params.id, req.body.headline, req.body.body)
		res.send(result)
	}else {
		res.send({error: "Only Administrators and Editors can update/create articles"})
	}
	
}


const pending = async(req, res) => {
	console.log(req.user)
	if(req.user.isAdmin){
		 const [records, info, meta] = await getPendingArticles(req.user.id,  req.body.pageNumber, req.body.pageSize)
		 if(meta) {
		 	const [{rows}] = info
		 	res.send({records, rows })
		 }else {
		 	res.send({error: records})
		 }
	}else{
		res.send({error: "Only Administators can approve articles"})
	}
}

const approve = async(req, res) => {
	console.log(req.user)
	if(req.user.isAdmin){
		let [ [result], meta ] = await approveArticle(req.user.id, req.params.id, req.body.isApproved)
		res.send(result)
	}else{
		res.send({error: "Only Administators can approve articles"})
	}
}

router.post('/', myArticles)
router.post('/update/:id', article)
router.post('/pending', pending)
router.post('/approve/:id', approve)

module.exports = router