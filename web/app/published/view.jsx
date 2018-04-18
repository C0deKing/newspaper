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
				<div className="col-12">
					<h3>{record.headline}</h3>		
				</div>					
				
			</div>
			<div className="row">
				<div className="col-12" style={{paddingLeft: "25%", display: record.s3Key ? "" : "none"}}>
					<object className="center-block" classID="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" codebase="http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=7,0,19,0" width="500" height="305"  title="My video">
						<param name="movie" value={`http://matt-newspaper.s3.amazonaws.com/${record.s3Key}`} />
						<param name="quality" value="low" />
						<param name="autoplay" value="true" />
						<embed src={`http://matt-newspaper.s3.amazonaws.com/${record.s3Key}`} quality="high" pluginspage="http://www.macromedia.com/go/getflashplayer" type="application/x-shockwave-flash" width="500" height="305"></embed>
					</object>
				</div>
				<div className="col-12">
					<p className="lead" dangerouslySetInnerHTML={{__html: record.body}}></p>
				</div>
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
	if(self.state.loading){
		console.log("id - ", id)
		let response = await post(`published/${id || 0}`, {})
		console.log(response)
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
	
}

class Body extends React.Component {
	constructor(props){
		super(props)		
	    this.state = {
	      	loading: true, 
	      	error: false,
	      	record: {}, 
	      	rows: 0, 
	      	page: 1, 
	      	pageSize: 5
	    }
	}
	componentDidMount() {
		getArticle(window.location.search.replace("?","") || 1, this)
	}
	
	render() {
		if(this.state.loading){
			return <Loading />
		}else{
			return (
				<div className="container" style={{paddingTop: "30px"}}>
					{article(this.state.record)}		
				</div>) 
		}
		
	}
}



export default Body