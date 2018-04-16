import React from 'react';
import Pager from 'react-ultimate-pagination-bootstrap-4'
import post from  '../helpers/post'
import ReactQuill from 'react-quill'
import Trumbowyg from 'react-trumbowyg'

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

const updateArticle = async(record, self) => {
	const {id, headline, body} = record
	let response = await post(`articles/update/${id || 0}`, {headline, body} )
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
		const { body, headline } = props.record
		this.state = {
			headline: headline || "", 
			body: body ||  "", 
			id: props.record.id || 0,
			add: props.add
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
	save() {
		updateArticle(this.state, this)
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

export default Body