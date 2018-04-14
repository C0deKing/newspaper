import React from 'react';
import { Switch, Route } from 'react-router-dom'
import Published from '../published/index.jsx'

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
			<Switch>
		      <Route exact path='/' component={Published}/>
		      <Route path='/published' component={Published}/>
		    </Switch>
	    )
	}
}



export default Body