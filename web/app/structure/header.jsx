import React from 'react';
import { Link } from 'react-router-dom'
const ret = () => (
	<div className="row">
		<nav className="navbar navbar-expand-lg navbar-dark bg-dark" style={{width:"100%", paddingLeft: "30px"}}>
		  <Link to="/" className="navbar-brand" href="">Newspaper</Link>
		  <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
		    <span className="navbar-toggler-icon"></span>
		  </button>
		  <div className="collapse navbar-collapse" id="navbarText">
		    <ul className="navbar-nav mr-auto">
		      <li className="nav-item">
		        <Link className="nav-link" to="/published">Articles</Link>
		      </li>
		      <li className="nav-item">
		        <Link className="nav-link" to="/login">Login</Link>
		      </li>		    
		    </ul>
		    
		  </div>
		</nav>

	</div>
)

export default ret