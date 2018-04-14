import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter } from 'react-router-dom'
import Body from './structure/body.jsx'
import Header from './structure/header.jsx'

const App = () => (
	<div>
		<Header />
		<Body />
	</div>
)


class Page extends React.Component {
  render () {
    return (
    	<BrowserRouter>
    		<App />
  		</BrowserRouter>);
  }
}

render(<Page/>, document.getElementById('app'));