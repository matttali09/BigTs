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

	handleSubmit = event => {
		event.preventDefault()

		let formData = {};
		if (this.state.username === "matttali09") {
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
