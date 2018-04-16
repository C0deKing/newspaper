import React from 'react';
import { Switch, Route, Link } from 'react-router-dom'
import Published from '../published/index.jsx'
import Login from '../login/index.jsx'
import Articles from '../articles/index.jsx'
import Admin from '../admin/index.jsx'
import AddUser from '../admin/add.jsx'
import User from '../user/index.jsx'
import Review from '../review/index.jsx'
import post from '../helpers/post.js'


const getUser = async(self) => {
	let res = await post("user", {})
	const {firstName, lastName, username, isAdmin, isEditor} = res
	window.localStorage.setItem("firstName", firstName)
	window.localStorage.setItem("lastName", lastName)
	window.localStorage.setItem("isAdmin", isAdmin)
	window.localStorage.setItem("isEditor", isEditor)
	window.localStorage.setItem("username", username)
	self.loadState(self)
}



class Body extends React.Component {
	constructor(props){
		super(props)
	    this.state = {
	      	authorized: window.localStorage.getItem("token"), 
	      	isEditor: parseInt(window.localStorage.getItem("isEditor")), 
	      	isAdmin: parseInt(window.localStorage.getItem("isAdmin")), 
	      	username: window.localStorage.getItem("username"),
	      	firstName: window.localStorage.getItem("firstName"), 
	      	lastName: window.localStorage.getItem("lastName")
	    }
	    //this.login = this.login.bind(this)

	}
	componentDidMount() {
		if(this.state.authorized){			
			//this.loadUser()
		}
	}

	loadState(self) {
		self.setState({
			authorized: window.localStorage.getItem("token"), 
	      	isEditor: parseInt(window.localStorage.getItem("isEditor")), 
	      	isAdmin: parseInt(window.localStorage.getItem("isAdmin")), 
	      	username: window.localStorage.getItem("username"),
	      	firstName: window.localStorage.getItem("firstName"), 
	      	lastName: window.localStorage.getItem("lastName")
		})
	}
	logout() {
		window.localStorage.setItem("token", "")
		window.location = "/"
	}
	loadUser() {
		getUser(this)

	}
	render() {
		let self = this
		const Router = () => {
			
				return(
					<div>
						  <Route exact path='/' component={Published}/>
					      <Route path='/published' component={Published}/>
					      <Route path='/login' component={Login}/>
					      <Route path='/articles' component={Articles}/>
					      <Route exact path='/admin' component={Admin}/>
					      <Route path='/register' component={AddUser}/>
					      <Route path='/user' component={User}/>
					      <Route path='/review' component={Review} />
					</div>
				)				
			
		}

		const Header = () => {
			if(self.state.authorized){
				if(self.state.isAdmin){
					return(<ul className="navbar-nav mr-auto">
					     <li className="nav-item">
					        <Link className="nav-link" to="/published">Published</Link>
					      </li>
					      <li className="nav-item">
					        <Link className="nav-link" to="/articles">Articles</Link>
					      </li>
					      <li className="nav-item">
					        <Link className="nav-link" to="/review">Review</Link>
					      </li>
					      <li className="nav-item">
					        <Link className="nav-link" to="/admin">Admin</Link>
					      </li>	
					      <li className="nav-item">
						        <Link to="" onClick={this.logout.bind(this)} className="nav-link">Log Out</Link>
					      </li>			    
					 </ul>)
				}else if(self.state.isEditor){
					return(<ul className="navbar-nav mr-auto">
					      <li className="nav-item">
					        <Link className="nav-link" to="/published">Published</Link>
					      </li>
					      <li className="nav-item">
					        <Link className="nav-link" to="/articles">Articles</Link>
					      </li>
					      <li className="nav-item">
						        <Link to="" onClick={this.logout.bind(this)} className="nav-link">Log Out</Link>
					      </li>		    
					 </ul>)
				}
				else{
					return(
						 <ul className="navbar-nav mr-auto">
						      <li className="nav-item">
						        <Link className="nav-link" to="/published">Articles</Link>
						      </li>
						      <li className="nav-item">
						        <Link to="" onClick={this.logout.bind(this)} className="nav-link">Log Out</Link>
						      </li>		    
						 </ul>
					)
				}
			}else{
				return(
					 <ul className="navbar-nav mr-auto">
					      <li className="nav-item">
					        <Link className="nav-link" to="/published">Articles</Link>
					      </li>
					      <li className="nav-item">
					        <Link className="nav-link" to="/login">Login</Link>
					      </li>		    
					 </ul>
				)
			}
		}

		return(
			<div>
				<div className="row">
					<nav className="navbar navbar-expand-lg navbar-dark bg-dark" style={{width:"100%", paddingLeft: "40px"}}>
					  <Link to={this.state.authorized ? "/user" : "/"} className="navbar-brand" href="">Newspaper</Link>
					  <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
					    <span className="navbar-toggler-icon"></span>
					  </button>
					  <div className="collapse navbar-collapse" id="navbarText">
					   <Header />
					    
					  </div>
					</nav>

				</div>
				<div className="row">
					<div className="container">
						<Switch>
					      <Router/>
					    </Switch>
					    </div>				
			    </div>
		    </div>
	    )
	}
}





export default Body