import React from 'react';
import { Switch, Route } from 'react-router-dom'
import Published from '../published/index.jsx'
import Login from '../login/index.jsx'
import Articles from '../articles/index.jsx'
class Body extends React.Component {
	constructor(props){
		super(props)
	    this.state = {
	      	
	    }
	}
	componentDidMount() {
	}
	
	render() {
		return(
			<div className="row">
				<div className="container">
					<Switch>
				      <Route exact path='/' component={Published}/>
				      <Route path='/published' component={Published}/>
				      <Route path='/login' component={Login}/>
				      <Route path='/articles' component={Articles}/>
				    </Switch>
				    </div>				
		    </div>
	    )
	}
}



export default Body