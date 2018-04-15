import React from 'react';
import Pager from 'react-ultimate-pagination-bootstrap-4'
import post from  '../helpers/post'

const getUser = async(self) => {
	let res = await post("user", {})
	const {firstName, lastName, username, isAdmin, isEditor} = res
	self.setState({
		firstName: firstName, 
		lastName: lastName, 
		username: username,
		dirty: false
	})
}

const updateUser = async(record, self) =>{
	const {firstName, lastName} = record
	const result = await post("user/update", {firstName, lastName})
	if(result.error){
		alert(result.message)
	}else{
		getUser(self)
	}
}
class User extends React.Component {
	constructor(props){
		super(props)
		this.state = {
			firstName: "",
			lastName: "", 
			username: "",
			dirty: false
		}

	}
	componentDidMount(){
		getUser(this)
	}
	firstNameChange(e) {
		this.setState({
			firstName: e.target.value, 
			dirty: true
		})
	}
	lastNameChange(e){
		this.setState({
			lastName: e.target.value,
			dirty: true
		})
	}

	save(){
		updateUser(this.state, this)
	}
	cancel(){
		getUser(this)
	}
	
	render(){
		return(
			<div className="container" style={{paddingTop: "30px"}}>
				<h1>Welcome {this.state.firstName || this.state.username}! Your Information is Below</h1>				
				<hr/>
				<div className="form-group">
					<label>Username: &nbsp; &nbsp; </label>
					<strong>{this.state.username}</strong>
				</div>
				<div className="form-group">
					<label>First Name</label>
					<input type="text" className="form-control" 
						value={this.state.firstName} onChange={this.firstNameChange.bind(this)} />
				</div>
				<div className="form-group">
					<label>Last Name</label>
					<input type="text" className="form-control" 
						value={this.state.lastName} onChange={this.lastNameChange.bind(this)} />
				</div>
				
				<div style={{display: this.state.dirty ? "" :"none"}}>
					<div className="float-left">
						<button type="button" className="btn btn-secondary" onClick={this.cancel.bind(this)}>Undo</button>
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