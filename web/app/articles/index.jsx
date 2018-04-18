import React from 'react';
import Pager from 'react-ultimate-pagination-bootstrap-4'
import post from  '../helpers/post'
import ReactQuill from 'react-quill'
import Trumbowyg from 'react-trumbowyg'
import ReactS3 from 'react-s3';
import axios from 'axios'
const uuidv1 = require('uuid/v1');


const config = {
    bucketName: 'matt-newspaper',
    albumName: 'photos',
    region: 'us-east-1',
    accessKeyId: 'AKIAIBZQHBRLZGKMPCAQ',
    secretAccessKey: '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',
}
const Loading = () => (
	<strong>Loading.....</strong>
)

const ArticleRow = (props) => (
	<tr >
		<td>{props.record.headline}</td>
		<td>{props.record.createdAt}</td>
		<td>{props.record.updatedAt}</td>
		<td>{props.record.isApproved ? "Yes" : "No"}</td>
		<td><button type="button" onClick={props.self.editRecord.bind(props.self,props.record)} className="btn btn-warning">Edit</button></td>		
	</tr>
)



const getArticles = async (page, pageSize, self) => {
	let response = await post("articles", {pageNumber: page, pageSize}, self)
	console.log(response)
	if (response.rows || response.rows === 0){
		self.setState({
			records: response.records, 
			rows: response.rows, 
			loading: false, 
			page: page,
			pageSize: pageSize
			
		})
	}
	else{
		self.setState({
			error: true
		})
	}
}

const uploadFile = async (self) => {
	if(self.uploadInput.files[0]){
		const key =  uuidv1() + "/"+ self.uploadInput.files[0].name
		let data = new FormData();		
  		data.append('file', self.uploadInput.files[0]);
  		data.append('key', key)
  		let res = await axios.post('/upload', data);  		
  		return key
	}
	return ""
}

const updateArticle = async(record, self) => {
	const newKey = await uploadFile(self)
	const {id, headline, body, addLink1, addLink2, addLink3, s3Key} = record
	const response = await post(`articles/update/${id || 0}`, {headline, body, addLink1, addLink2, addLink3, s3Key: newKey || s3Key} )
	self.props.save()
}

class Body extends React.Component {
	constructor(props){
		super(props)
	    this.state = {
	      	loading: true, 
	      	error: false,
	      	records: [], 
	      	rows: 0, 
	      	page: 1, 
	      	pageSize: 10,
	      	record: {}, 
	      	add: false
	    }
	    this.cancelEdit = this.cancelEdit.bind(this)
	    this.save = this.save.bind(this)
	}
	componentDidMount() {
		getArticles(1,this.state.pageSize, this)
	}
	handlePageChange(pageNumber) {
		getArticles(pageNumber, this.state.pageSize, this)
	}
	editRecord(record) {
		this.setState({
			record: record
		})
	}
	addRecord() {
		this.setState({
			add: true
		})
	}
	cancelEdit(){
		this.setState({
			record: {}, 
			add: false
		})
	}
	save() {
		this.setState({
			record: {}, 
			add: false,
			loading: true
		})
		getArticles(this.state.page, this.state.pageSize, this)
	}
	render() {
		if(this.state.loading){
			return <Loading />
		}else if(this.state.record.id || this.state.add){
			return(
				<Article save={this.save} record={this.state.record} add={this.state.add} cancel={this.cancelEdit} />
			)
		}else{
			return (
				<div className="container" style={{paddingTop: "30px"}}>
					<h1>My Articles</h1>
					<div>
						<div className="float-left">
							<Pager 
					           currentPage={this.state.page} 
					           totalPages={Math.ceil((this.state.rows/this.state.pageSize)) || 1} 
					           onChange={this.handlePageChange.bind(this)}
					         />
						</div>
						<div className="float-right">
							<button type="button" className="btn btn-primary" onClick={this.addRecord.bind(this)}>Add +</button>
						</div>
					</div>
					
			         <table className="table table-striped table-hover">
			         	<thead>
			         		<tr>
			         			<th>Headline</th>
			         			<th>Created At</th>
			         			<th>Updated At</th>
			         			<th>Is Approved</th>
			         			<th>Actions</th>			         			
			         		</tr>
			         	</thead>
			         	<tbody>
			         		{this.state.records.map( (record) => <ArticleRow self={this} key={record.id} record={record}/> )}
			         	</tbody>

			         </table>

					

					 <Pager 
			           currentPage={this.state.page} 
			           totalPages={Math.ceil((this.state.rows/this.state.pageSize)) || 1} 
			           onChange={this.handlePageChange.bind(this)}
			         />
				</div>) 
		}
		
	}
}


class Article extends React.Component {
	constructor(props) {
		super(props)
		const { body, headline, addLink1, addLink2, addLink3, s3Key } = props.record
		let parts = ""
		if(s3Key){ parts  = s3Key.split('/') }
		this.state = {
			headline: headline || "", 
			body: body ||  "", 
			id: props.record.id || 0,
			add: props.add, 
			addLink1: addLink1, 
			addLink2: addLink2, 
			addLink3: addLink3, 
			s3Key:s3Key, 
			fileName:  parts.length  ? parts[parts.length - 1] : ""
		}
		this.bodyChange = this.bodyChange.bind(this)
	}
	bodyChange(e) {
		
		const html = e.target.innerHTML
		this.setState({
			body: html || ""
		})
				
	}
	headlineChange(e){
		if(e.target){
			this.setState({
				headline: e.target.value
			})
		}
		
	}
	handleAddLink1Change(e) {
		this.setState({
			addLink1: e.target.value
		})
	}
	handleAddLink2Change(e) {
		this.setState({
			addLink2: e.target.value
		})
	}
	handleAddLink3Change(e) {
		this.setState({
			addLink3: e.target.value
		})
	}
	save() {
		updateArticle(this.state, this)
	}
	uploadFile(e){
		uploadFile(this)
	}
	render() {
		return(
			<div className="container" style={{paddingTop:"30px"}}>
					<h1>{this.state.add ? "Create" : "Update"} Article</h1>
					<br/>
					<div className="form-group">
						<label className="">Headline</label>						
						<input className="form-control" value={this.state.headline} onChange={this.headlineChange.bind(this)} />						
					</div>
					<div className="form-group">
						<label className="">Body</label>
						<Trumbowyg id='react-trumbowyg'
                        buttons={
                            [
                                ['viewHTML'],
                                ['formatting'],
                                'btnGrp-semantic',
                                ['link'],
                                ['insertImage'],
                                'btnGrp-justify',
                                'btnGrp-lists',                                
                                ['fullscreen']
                            ]
                        }
                        data={this.props.record.body}
                        placeholder='Type your text!'
                        onChange={this.bodyChange}
                        ref="trumbowyg"
                    />											
					</div>
					<div className="form-group">
						<label>Upload Image or Video</label>
					    <input className="form-control" ref={(ref) => { this.uploadInput = ref; }} type="file" />
					</div>
					<div className="form-group" style={{display: this.state.fileName ? "" : "none"}}>
						<label>Current File: &nbsp; &nbsp;</label>
						<strong><a href={`https://s3.amazonaws.com/matt-newspaper/${this.state.s3Key}`}>{this.state.fileName}</a></strong>
					</div>
					    
					<div className="form-group">
						<label className="">Add Link 1</label>						
						<input className="form-control" value={this.state.addLink1} onChange={this.handleAddLink1Change.bind(this)} />						
					</div>
					<div className="form-group">
						<label className="">Add Link 2</label>						
						<input className="form-control" value={this.state.addLink2} onChange={this.handleAddLink2Change.bind(this)} />						
					</div>
					<div className="form-group">
						<label className="">Add Link 3</label>						
						<input className="form-control" value={this.state.addLink3} onChange={this.handleAddLink3Change.bind(this)} />						
					</div>
					<div>
						<div className="float-left">
							<button type="button" className="btn btn-default" onClick={this.props.cancel}>Cancel</button>
						</div>
						<div className="float-right">
							<button type="button" className="btn btn-success" onClick={this.save.bind(this)}>Save</button>
						</div>
					</div>
					
				</div>

		)
	}
}


class File extends React.Component {

}

export default Body

