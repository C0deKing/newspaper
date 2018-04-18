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
				  <video id="my-video" className="video-js" controls preload="auto" width="640" height="264"
					  poster="MY_VIDEO_POSTER.jpg" data-setup="{}">
					    <source src={`https://matt-newspaper.s3.amazonaws.com/${record.s3Key}`} type='video/mp4' />
					    <source src={`https://matt-newspaper.s3.amazonaws.com/${record.s3Key}`} type='video/webm' />
					    <p className="vjs-no-js">
					      To view this video please enable JavaScript, and consider upgrading to a web browser that
					      <a href="http://videojs.com/html5-video-support/" target="_blank">supports HTML5 video</a>
					    </p>
					</video>
					
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