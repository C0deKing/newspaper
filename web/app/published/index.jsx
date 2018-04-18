import React from 'react';
import Pager from 'react-ultimate-pagination-bootstrap-4'
import post from  '../helpers/post'
import {Link } from 'react-router-dom'
const Loading = () => (
	<strong>Loading.....</strong>
)
const header = (record) => {
	if(record.featured){
		return  <h1><b><i>{record.headline}</i></b></h1>
	}else{
		return(<h3>{record.headline}</h3>)
	}
}
const article = (record) => (
	<div key={record.id}>
		<div className="jumbotron">
			<div className="row">
				<div className="col-12">
					{header(record)}	
				</div>

			</div>
			<div className="row">
				<div className="col-12">
					<p className="lead">
						<Link to={`/view?${record.id}`} className="btn btn-primary">View Article</Link>
					</p>
				</div>
				<div className="col-12">
					<p className="lead">
						<i>{record.featured ? "(featured)" : ""}</i>
					</p>
				</div>
			</div>			
		</div>
		
	</div>
)

const getArticles = async (page, pageSize, self) => {
	let response = await post("published", {pageNumber: page, pageSize})
	if (response.rows || response.rows === 0){
		self.setState({
			records: response.results, 
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

class Body extends React.Component {
	constructor(props){
		super(props)
	    this.state = {
	      	loading: true, 
	      	error: false,
	      	records: [], 
	      	rows: 0, 
	      	page: 1, 
	      	pageSize: 5
	    }
	}
	componentDidMount() {
		getArticles(1,this.state.pageSize, this)
	}
	handlePageChange(pageNumber) {
		getArticles(pageNumber, this.state.pageSize, this)
	}
	render() {
		if(this.state.loading){
			return <Loading />
		}else{
			return (
				<div className="container" style={{paddingTop: "30px"}}>
					<h1>Articles</h1>
					<Pager 
			           currentPage={this.state.page} 
			           totalPages={Math.ceil((this.state.rows/this.state.pageSize)) || 1} 
			           onChange={this.handlePageChange.bind(this)}
			         />

					{this.state.records.map( (record) => article(record) )}

					 <Pager 
			           currentPage={this.state.page} 
			           totalPages={Math.ceil((this.state.rows/this.state.pageSize)) || 1} 
			           onChange={this.handlePageChange.bind(this)}
			         />
				</div>) 
		}
		
	}
}



export default Body