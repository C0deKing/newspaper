import React from 'react';
import Pager from 'react-ultimate-pagination-bootstrap-4'
import post from  '../helpers/post'
const Loading = () => (
	<strong>Loading.....</strong>
)

const article = (record) => (
	<div key={record.id}>
		<div className="jumbotron">
			<h3>{record.headline}</h3>
			<p className="lead">{record.body}</p>

		</div>
		
	</div>
)

const getArticles = async (page, pageSize, self) => {
	let response = await post("published", {pageNumber: page, pageSize})
	if (response.rows){
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
			           totalPages={parseInt((this.state.rows/this.state.pageSize)) || 1} 
			           onChange={this.handlePageChange.bind(this)}
			         />

					{this.state.records.map( (record) => article(record) )}

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