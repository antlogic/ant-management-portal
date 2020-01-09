import React, { Component } from 'react'
import AuthenticationService from './AuthenticationService.js'
import {
	BrowserRouter as Router,
	Redirect,
	Route
} from "react-router-dom";
import Login from './Login'
import ImgUpload from "../image-upload/ImgUpload";

class AuthenticationRoute extends Component {
	render() {
		if(AuthenticationService.isUserLoggedIn()) {
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
					<Route>
						<Redirect to="/login" />
						<Route path='/login/' component={Login} />
					</Route>
				</Router>
			)
		}

	}
}

export default AuthenticationRoute
