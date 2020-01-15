import React, { Component } from 'react'
import AuthenticationService from './AuthenticationService.js'
import {
	BrowserRouter as Router,
	Redirect,
	Route,
	Switch
} from "react-router-dom";
import Login from '../components/Auth/Login'
import ImgUpload from "../containers/image-upload/ImgUpload";

class AuthenticationRoute extends Component {
	constructor(props) {
		super(props);
		this.state = {
			isLoggedIn: AuthenticationService.isUserLoggedIn()
		}
	}
	render() {
		if(this.state.isLoggedIn) {
			return (
				<Router>
					<Route>
						<Redirect to="/admin" />
					</Route>
					<Route path='/admin/' component={ImgUpload}/>
				</Router>
			)
		} else {
			return(
				<Router>
					<Switch>
						<Route>
							<Redirect to="/login" />
							<Route path='/login/' component={Login} />
						</Route>
					</Switch>
				</Router>
			)
		}

	}
}

export default AuthenticationRoute
