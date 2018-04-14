import React from 'react';

class Login extends React.Component {
	constructor(props){
		super(props)
	    this.state = {
	      	
	    }
	}
	componentDidMount() {
	}
	
	render() {
		return(
			<div className="row justify-content-center" style={{paddingTop: "150px"}}>
				<div className="col-4">
					<div className="text-center mb-4">
				        <h1 className="h3 mb-3 font-weight-normal">Sign In</h1>
				      </div>

				      <div className="form-label-group">
				        <input type="email" id="inputEmail" className="form-control" placeholder="Email address" />
				      </div>

				      <div className="form-label-group">
				        <input type="password" id="inputPassword" className="form-control" placeholder="Password"  />
				      </div>

				     
				      <button className="btn btn-lg btn-primary btn-block" type="submit">Sign in</button>
				      <p className="mt-5 mb-3 text-muted text-center">&copy; 2017-2018</p>
				</div>
			</div>
	    )
	}
}



export default Login