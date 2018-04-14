import React from 'react';
import Pager from 'react-ultimate-pagination-bootstrap-4'

const Loading = () => (
	<strong>Body</strong>
)

const article = (record) => (
	<div key={record.id}>
		<div className="jumbotron">
			<h3>{record.headline}</h3>
			<p className="lead">{record.body}</p>

		</div>
		
	</div>
)

const getArticles = (page, pageSize, self) => {
	$.post('/published', JSON.stringify({
			pageNumber: page, 
			pageSize: pageSize
		}), function(data) {
			console.log(data)
				if(data.rows){
					self.setState({
						records: data.results, 
						rows: data.rows, 
						loading: false, 
						page: page,
						pageSize: pageSize
					})
					console.log(self.state)
				}else{
					self.setState({
						error: true
					})
				}
		}, "json")
	
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
	      	pageSize: 25
	    }
	}
	componentDidMount() {
		getArticles(1,25, this)
	}
	handlePageChange(pageNumber) {
		console.log(pageNumber)
		getArticles(pageNumber, 25, this)
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
			           totalPages={2} 
			           onChange={this.handlePageChange.bind(this)}
			         />

					{this.state.records.map( (record) => article(record) )}

					 <Pager 
			           currentPage={this.state.page} 
			           totalPages={2} 
			           onChange={this.handlePageChange.bind(this)}
			         />
				</div>) 
		}
		
	}
}



export default Body