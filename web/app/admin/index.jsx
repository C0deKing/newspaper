import React from 'react';
import Pager from 'react-ultimate-pagination-bootstrap-4'
import post from  '../helpers/post'

const Loading = () => (
	<strong>Loading.....</strong>
)

const UserRow = (props) => (
	<tr >
		<td>{props.record.username}</td>
		<td>{props.record.firstName}</td>
		<td>{props.record.lastName}</td>
		<td>{props.record.isAdmin ? "Yes" : "No"}</td>
		<td>{props.record.isEditor ? "Yes" : "No"}</td>
		<td><button type="button" onClick={props.self.editRecord.bind(props.self,props.record)} className="btn btn-warning">Edit</button></td>		
	</tr>
)



const getUsers = async (page, pageSize, self) => {
	let response = await post("admin", {pageNumber: page, pageSize}, self)
	if (response.rows || response.rows === 0){
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

const updateUser = async(record, self) => {
	const {id, username, firstName, lastName, isEditor, isAdmin} = record
	let response = await post(`admin/update/${id}`, {username, firstName, lastName, isEditor, isAdmin})
	self.props.save()
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
	      	pageSize: 10,
	      	record: {}, 
	      	add: false
	    }
	    this.cancelEdit = this.cancelEdit.bind(this)
	    this.save = this.save.bind(this)
	}
	componentDidMount() {
		getUsers(1,this.state.pageSize, this)
	}
	handlePageChange(pageNumber) {
		getUsers(pageNumber, this.state.pageSize, this)
	}
	editRecord(record) {
		this.setState({
			record: record
		})
	}
	addRecord() {
		this.props.history.push('register')
	}
	cancelEdit(){
		this.setState({
			record: {}, 
			add: false
		})
	}
	save() {
		this.setState({
			record: {}, 
			add: false,
			loading: true
		})
		getUsers(this.state.page, this.state.pageSize, this)
	}
	render() {
		if(this.state.loading){
			return <Loading />
		}else if(this.state.record.id || this.state.add){
			return(
				<User save={this.save} record={this.state.record} add={this.state.add} cancel={this.cancelEdit} />
			)
		}else{
			return (
				<div className="container" style={{paddingTop: "30px"}}>
					<h1>Users</h1>
					<div>
						<div className="float-left">
							<Pager 
					           currentPage={this.state.page} 
					           totalPages={Math.ceil((this.state.rows/this.state.pageSize)) || 1} 
					           onChange={this.handlePageChange.bind(this)}
					         />
						</div>
						<div className="float-right">
							<button type="button" className="btn btn-primary" onClick={this.addRecord.bind(this)}>Add +</button>
						</div>
					</div>
					
			         <table className="table table-striped table-hover">
			         	<thead>
			         		<tr>
			         			<th>Username</th>
			         			<th>First Name</th>
			         			<th>Last Name</th>
			         			<th>Is Admin</th>
			         			<th>Is Editor</th>
			         			<th>Actions</th>			         			
			         		</tr>
			         	</thead>
			         	<tbody>
			         		{this.state.records.map( (record) => <UserRow self={this} key={record.id} record={record}/> )}
			         	</tbody>

			         </table>

					

					 <Pager 
			           currentPage={this.state.page} 
			           totalPages={Math.ceil((this.state.rows/this.state.pageSize)) || 1} 
			           onChange={this.handlePageChange.bind(this)}
			         />
				</div>) 
		}
		
	}
}


class User extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			username: props.record.username || "", 
			firstName: props.record.firstName || "", 
			lastName: props.record.lastName || "", 
			isEditor: props.record.isEditor || "", 
			isAdmin: props.record.isAdmin || "", 
			id: props.record.id || 0,
			add: props.add
		}
		
	}
	usernameChange(e) {
		this.setState({
			username: e.target.value
		})
	}
	firstNameChange(e) {
		this.setState({
			firstName: e.target.value
		})
	}
	lastNameChange(e) {
		this.setState({
			lastName: e.target.value
		})
	}
	adminChange(e) {
		this.setState({
			isAdmin: e.target.checked
		})
	}
	eidtorChange(e) {
		this.setState({
			isEditor: e.target.checked
		})
	}
	save() {
		updateUser(this.state, this)
	}
	render() {
		return(
			<div className="container" style={{paddingTop:"30px"}}>
					<h1>Update User</h1>
					<br/>
					<div className="form-group">
						<label className="">Username</label>						
						<input className="form-control" value={this.state.username} onChange={this.usernameChange.bind(this)} />						
					</div>
					<div className="form-group">
						<label className="">First Name</label>						
						<input className="form-control" value={this.state.firstName} onChange={this.firstNameChange.bind(this)} />						
					</div>
					<div className="form-group">
						<label className="">Last Name</label>						
						<input className="form-control" value={this.state.lastName} onChange={this.lastNameChange.bind(this)} />						
					</div>
					<div className="form-group">
						<label>Is Editor? &nbsp; &nbsp;</label>	
						<input type="checkbox"   checked={this.state.isEditor} onChange={this.eidtorChange.bind(this)} />						
		
					</div>
					<div className="form-group">
						<label >Is Admin? &nbsp; &nbsp;</label>	
						<input type="checkbox"   checked={this.state.isAdmin} onChange={this.adminChange.bind(this)} />						
		
					</div>
				
					<div>
						<div className="float-left">
							<button type="button" className="btn btn-default" onClick={this.props.cancel}>Cancel</button>
						</div>
						<div className="float-right">
							<button type="button" className="btn btn-success" onClick={this.save.bind(this)}>Save</button>
						</div>
					</div>
					
				</div>

		)
	}
}

export default Body