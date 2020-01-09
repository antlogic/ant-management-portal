import React, {Component} from "react";
import { Formik } from 'formik'
import * as Yup from 'yup'
import AuthenticationService from './AuthenticationService.js'
import {
	BrowserRouter as Router,
	Redirect,
	Route
} from "react-router-dom";
import ImgUpload from "../image-upload/ImgUpload";

class Login extends Component {
	render() {
		if(AuthenticationService.isUserLoggedIn()) {
			console.log(AuthenticationService.isUserLoggedIn())
			return (
				<Router>
					<Route>
						<Redirect to="/admin" />
					</Route>
					<Route path='/admin/' component={ImgUpload}/>
				</Router>
			)
		} else {
			return (
				<div>
					<Formik
						initialValues={{email: '', password: ''}}
						onSubmit={(values, {setSubmitting}) => {
							setTimeout(() => {
								console.log("Logging in", values);
								setSubmitting(false)

							}, 500);
							AuthenticationService.registerSuccessfulLogin(values.email, values.password)
						}}
						validationSchema={Yup.object().shape({
							email: Yup.string()
								.email()
								.required("Required"),
							password: Yup.string()
								.required("No password provided.")
								.min(8, "Password is too short - should be 8 chars minimum.")
						})}>
						{props => {
							const {
								values,
								touched,
								errors,
								isSubmitting,
								handleChange,
								handleBlur,
								handleSubmit
							} = props;
							return (
								<form onSubmit={handleSubmit}>
									<label htmlFor="email">Email</label>
									<input
										name='email'
										type='text'
										placeholder='Enter your Email'
										onChange={handleChange}
										onBlur={handleBlur}
										value={values.email}/>
									<label htmlFor="email">Password</label>
									<input
										name='password'
										type='password'
										placeholder='Password'
										onChange={handleChange}
										onBlur={handleBlur}
										value={values.password}/>

									<button type='submit' disabled={isSubmitting}>
										Login
									</button>
								</form>
							);
						}}

					</Formik>
				</div>
			)
		}
	}
}

export default Login


