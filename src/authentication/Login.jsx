import React, {Component} from "react";
import { Formik } from 'formik'
import * as Yup from 'yup'
import AuthenticationService from './AuthenticationService.js'
import {
	BrowserRouter as Router, Link,
	Redirect,
	Route,
	Switch
} from "react-router-dom";
import ImgUpload from "../image-upload/ImgUpload";
import SignUp from "./SignUp";
import '../stylesheets/login.scss'

class Login extends Component {
	_isMounted = false;
	constructor(props) {
		super(props);
		this.state = {
			username: '',
			password: '',
			isSubmitting: false,
			loginSuccessCode: 0,
			isLoggedIn: false
		}
	}

	componentDidMount() {
		this._isMounted = true;
	}

	componentWillUnmount() {
		this._isMounted = false;
	}

	handleClick = (event) => {
		event.preventDefault();
	}

	handleSubmit = (event) => {
		event.preventDefault();
		if(this._isMounted)
			AuthenticationService.registerSuccessfulLogin(this.state.username, this.state.password)
				.then(() => {
					console.log("signed in");
					this.setState({
						isLoggedIn: true
					})
				})

	}

	handleChange = (event) => {
		event.preventDefault();
		this.setState({
			[event.target.name]: event.target.value
		})
	}

	render() {
		if(this.state.isLoggedIn) {
			return (
				<Router>
					<Route>
						<Redirect to="/admin" />
					</Route>
					<Switch>
						<Route path='/admin/' component={ImgUpload}/>
					</Switch>
				</Router>
			)
		} else {
			const { username, password } = this.state;
			return (
				<div className='loginContainer'>
					<form onSubmit={this.handleSubmit}>
						<h1>Login</h1>
						<div className='textbox'>
							<i className="fa fa-envelope-o"/>
							<input
								name='username'
								type='text'
								placeholder='Enter your Email'
								onChange={this.handleChange}
								value={username}/>
						</div>
						<div className='textbox'>
							<i className="fa fa-lock"/>
							<input
								name='password'
								type='password'
								placeholder='Password'
								onChange={this.handleChange}
								value={password}/>
						</div>

						<button className='button' type='submit' disabled={this.state.isSubmitting}>
							Login
						</button>
						<button className='button' type='button' onClick={this.handleClick} disabled={this.state.isSubmitting}>
							<Link to='/signup'>
								Sign Up
							</Link>
						</button>
					</form>
					<Router>
						<Switch>
							<Route path='/signup/' component={SignUp}/>
						</Switch>
					</Router>
				</div>
			)
		}
	}
}

export default Login


