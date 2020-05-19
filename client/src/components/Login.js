import React, { useState } from 'react';
import { axiosWithAuth } from '../util/axiosWithAuth';

const Login = (props) => {
	// make a post request to retrieve a token from the api
	// when you have handled the token, navigate to the BubblePage route
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');

	const login = (event) => {
		event.preventDefault();
		axiosWithAuth()
			.post('/login', { username, password })
			.then((response) => {
				localStorage.setItem('token', response.data.payload);
				props.history.push('/protected');
			})
			.catch((err) => {
				console.log('Err is: ', err);
			});
	};

	return (
		<>
			<h1>Welcome to the Bubble App!</h1>
			<form onSubmit={login}>
				<input type="text" onChange={(event) => setUsername(event.target.value)} />
				<input
					type="password"
					onChange={(event) => setPassword(event.target.value)}
				/>
				<button>Login</button>
			</form>
		</>
	);
};

export default Login;
