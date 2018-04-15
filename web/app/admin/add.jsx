import React from 'react';
import Pager from 'react-ultimate-pagination-bootstrap-4'
import post from  '../helpers/post'

const createUser = async (record, self) => {
	const {username, password} = record
	const result = await post("admin/register", {username, password})
	console.log(result)
	if(result.error){
		alert(result.error)
	}
	else if(result.code < 0){
		alert(result.message)
	}else{
		self.props.history.push('admin')
	}
	
}

class User extends React.Component {
	constructor(props){
		super(props)
		this.state = {
			username: "", 
			password: "", 
			passwordConfirm: ""
		}
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
	passwordConfirmChange(e){
		this.setState({
			passwordConfirm: e.target.value
		})
	}
	save(){
		createUser(this.state, this)
	}
	cancel(){
		self.props.history.push('admin')
	}
	render(){
		return(
			<div className="container" style={{paddingTop: "30px"}}>
				<h1>Add User</h1>
				<span>Hold onto the password. it can not be reset</span>
				<hr/>
				<div className="form-group">
					<label>Username</label>
					<input type="text" className="form-control" 
						value={this.state.username} onChange={this.usernameChange.bind(this)} />
				</div>
				<div className="form-group">
					<label>Password</label>
					<input type="text" className="form-control" 
						value={this.state.password} onChange={this.passwordChange.bind(this)} />
				</div>
				<div className="form-group">
					<label>Confirm Password</label>
					<input type="text" className="form-control" 
						value={this.state.passwordConfirm} onChange={this.passwordConfirmChange.bind(this)} />
				</div>
				<div>
					<div className="float-left">
						<button type="button" className="btn btn-default" onClick={this.cancel.bind(this)}>Cancel</button>
					</div>
					<div className="float-right">
						<button type="button" className="btn btn-success" onClick={this.save.bind(this)}>Save</button>
					</div>
				</div>
			</div>

		)
	}
}

export default User