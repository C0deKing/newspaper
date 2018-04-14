import React from 'react';
import Pager from 'react-ultimate-pagination-bootstrap-4'
import post from  '../helpers/post'
const Loading = () => (
	<strong>Loading.....</strong>
)

const article = (record) => (
	<tr key={record.id}>
		<td>{record.headline}</td>
		<td>{record.createdAt}</td>
		<td>{record.updatedAt}</td>
		<td>{record.isApproved ? "Yes" : "No"}</td>
		<td><button type="button" className="btn btn-warning">Edit</button></td>		
	</tr>
)

const getArticles = async (page, pageSize, self) => {
	let response = await post("articles", {pageNumber: page, pageSize}, self)
	console.log(response)
	if (response.rows){
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
					<h1>My Articles</h1>
					<Pager 
			           currentPage={this.state.page} 
			           totalPages={parseInt((this.state.rows/this.state.pageSize)) || 1} 
			           onChange={this.handlePageChange.bind(this)}
			         />
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
			         		{this.state.records.map( (record) => article(record) )}
			         	</tbody>

			         </table>

					

					 <Pager 
			           currentPage={this.state.page} 
			           totalPages={parseInt((this.state.rows/this.state.pageSize)) || 1} 
			           onChange={this.handlePageChange.bind(this)}
			         />
				</div>) 
		}
		
	}
}



export default Body