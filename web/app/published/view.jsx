import React from 'react';
import Pager from 'react-ultimate-pagination-bootstrap-4'
import post from  '../helpers/post'
const Loading = () => (
	<strong>Loading.....</strong>
)

const article = (record) => (
	<div key={record.id}>
		<div className="jumbotron">
			<div className="row">
				<h3>{record.headline}</h3>
				<p className="lead" dangerouslySetInnerHTML={{__html: record.body}}></p>
			</div>
			<div className="row">
				<div className="col-4">
					<img src={record.addLink1} style={{maxWidth: "100%"}} />
				</div>
				<div className="col-4">
					<img src={record.addLink2} style={{maxWidth: "100%"}} />
				</div>
				<div className="col-4">
					<img src={record.addLink3} style={{maxWidth: "100%"}} />
				</div>
			</div>
		</div>
		
	</div>
)

const getArticle = async (id, self) => {
	let response = await post(`published/${id || 0}`, {})
	if (response.record){
		self.setState({
			record: response.record, 			
			loading: false
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