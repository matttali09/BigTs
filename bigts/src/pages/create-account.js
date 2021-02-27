import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import API from '../utils/API';

class CreateAccountPage extends Component {
	state = {
		email: '',
		username: '',
		password: '',
		confirmPassword: '', // not being used;
		role: 'user',
		redirectTo: null
	}
	
	handleChange = event => {
		this.setState({
			[event.target.name]: event.target.value
		})
	}

	validateEmail(email) {
		const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
		return re.test(String(email).toLowerCase());
	}
	validateUserName() {
		if (this.state.username) {
			return true;
		} else {
			alert("username was empty");
			return false;
		}
	}
	validatePassword() {
		if (this.state.password) {
			return true;
		} else {
			alert("password was empty");
			return false;
		}
	}

	runValidation() {
		let valid = true;
		if(this.validateEmail(this.state.email)) {
			// console.log("email validation passed");
		} else {
			alert("Please enter a valid email addressed");
			valid = false;
		}
		if (this.validateUserName()) {
			// console.log("username validation passed");
		} else {
			valid = false;
		}
		if (this.validatePassword()) {
			// console.log("Password validation passed");
		} else {
			valid = false;
		}
		return valid
	}

	handleSubmit = event => {
		event.preventDefault();

		if (this.runValidation()) {

		let formData = {};
		if (this.state.username.toLowerCase() === "matttali09" || this.state.username.toLowerCase() === "tonytali") {
			formData = {
				email: this.state.email,
				username: this.state.username,
				password: this.state.password,
				role: 'admin'
			};
		} else {
			formData = {
				email: this.state.email,
				username: this.state.username,
				password: this.state.password,
				role: this.state.role
			};
		}
		console.log(formData);
		
		// Request to server to add a new username/password
		API.createUser(formData)
			.then(response => {
				console.log(response);
				if (!response.data.errmsg && response.data.name !== 'UserExistsError') {
					this.props.updateUser({
                        loggedIn: true,
                        username: response.data.username,
						role: response.data.role
                    })
					this.setState({
						redirectTo: '/home'
					})
				} else {
					alert('Username already taken');
				}
			}).catch(error => {
				console.log('Account Creation error: ');
				console.log(error);
				alert("Unknown error occured during account creation.")
			})
		} else {
			console.log("runValidation failed")
		}
	}


	render() {
		if (this.state.redirectTo) {
			return <Redirect to={{ pathname: this.state.redirectTo }} />
		} else {
			return (
				<div className="container mainContent form-container">
				<center>
					<h6 className="center text-28"><i className="material-icons">account_box</i> Create Account</h6></center>
					<center>
					<form className="form-horizontal">
						<div className="form-group">
							<div className="col-1 col-ml-auto">
								<label className="form-label" htmlFor="email">email</label>
							</div>
							<div className="col-3 col-mr-auto">
								<input className="form-input"
									type="text"
									id="email"
									name="email"
									placeholder="email"
									value={this.state.email}
									onChange={this.handleChange}
								/>
							</div>
						</div>
						<div className="form-group">
							<div className="col-1 col-ml-auto">
								<label className="form-label" htmlFor="username">User Name</label>
							</div>
							<div className="col-3 col-mr-auto">
								<input className="form-input"
									type="text"
									id="username"
									name="username"
									placeholder="username"
									value={this.state.username}
									onChange={this.handleChange}
								/>
							</div>
						</div>
						<div className="form-group">
							<div className="col-1 col-ml-auto">
								<label className="form-label" htmlFor="password">Password: </label>
							</div>
							<div className="col-3 col-mr-auto">
								<input className="form-input"
									placeholder="password"
									type="password"
									name="password"
									value={this.state.password}
									onChange={this.handleChange}
								/>
							</div>
						</div>
						<div className="form-group ">
							<div className="col-7"></div>
							<button
								className="btn btn-primary col-1 col-mr-auto"
								onClick={this.handleSubmit}
								type="submit"
							>Create Account</button>
						</div>
					</form>
					</center>
				</div>

			)
		}
	}
}
export default CreateAccountPage
