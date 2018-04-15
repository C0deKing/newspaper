import React from 'react';
import post from '../helpers/post.js'

const validate = async (username, password, self) => {
	let response = await post('login', {username, password}, self)
	console.log(response)
	if(response.success && response.token){
		window.localStorage.setItem('token',response.token )
		//self.props.login()
		window.location = "/user"		
	}else{
		alert(response.message || 'Authentication Error')
	}
}


class Login extends React.Component {
	constructor(props){
		super(props)
	    this.state = {
	      	username: "", 
	      	password: "", 
	      	error: false, 
	      	message: ""
	    }
	}
	componentDidMount() {
	}
	usernameChange(e){
		this.setState({
			username: e.target.value
		})
	}
	passwordChange(e){
		this.setState({
			password: e.target.value
		})
	}
	login(){
		validate(this.state.username, this.state.password, this)
	}

	render() {
		return(
			<div className="row justify-content-center" style={{paddingTop: "150px"}}>
				<div className="col-4">
					<div className="text-center mb-4">
				        <h1 className="h3 mb-3 font-weight-normal">Sign In</h1>
				      </div>

				      <div className="form-label-group" >
				        <input type="email" id="inputEmail" onChange={this.usernameChange.bind(this)} style={{marginBottom: "15px"}} className="form-control" placeholder="Username" />
				      </div>

				      <div className="form-label-group">
				        <input type="password" id="inputPassword"onChange={this.passwordChange.bind(this)} style={{marginBottom: "15px"}} className="form-control" placeholder="Password"  />
				      </div>

				     
				      <button className="btn btn-lg btn-primary btn-block" onClick={this.login.bind(this)}>Sign in</button>
				      <p className="mt-5 mb-3 text-muted text-center">&copy; 2017-2018</p>
				</div>
			</div>
	    )
	}
}



export default Login