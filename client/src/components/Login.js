import React, { useState } from 'react';
import { axiosWithAuth } from '../util/axiosWithAuth';

const Login = (props) => {
	// make a post request to retrieve a token from the api
	// when you have handled the token, navigate to the BubblePage route
	const [credentials, setCredentials] = useState({});

	const login = (event) => {
		event.preventDefault();
		axiosWithAuth()
			.post('/login', credentials)
			.then((response) => {
				localStorage.setItem('token', response.data.token);
				props.history.push('/protected');
			})
			.catch((err) => {
				console.log('Err is: ', err);
			});
	};

  const handleChange = event => {
        setCredentials: {
          ...credentials,
          [event.target.name]: event.target.value,
        }
    }

	return (
		<>
			<h1>Welcome to the Bubble App!</h1>
			<form onSubmit={login}>
				<input
					type="text"
					name="username"
					value={credentials.username}
					onChange={handleChange}
				/>
				<input
					type="password"
					name="password"
					value={credentials.password}
					onChange={handleChange}
				/>
				<button>Log in</button>
			</form>
		</>
	);
};

export default Login;
