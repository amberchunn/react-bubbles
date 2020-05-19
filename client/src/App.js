import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import PrivateRoute from './components/PrivateRoute';
import Login from './components/Login';
import './styles.scss';
import BubblePage from './components/BubblePage';

const App = (props) => {
	return (
		<Router>
			<div className="App">
				<Route exact path="/" component={Login} props={props} />
				<PrivateRoute
					exact
					path="/protected"
					component={BubblePage}
					props={props}
				/>
			</div>
		</Router>
	);
};

export default App;
