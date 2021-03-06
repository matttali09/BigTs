import React, { Component } from 'react'
import { Redirect, Link } from 'react-router-dom'
import API from '../utils/API';

class CreateAccountPage extends Component {
	constructor(props) {
		super(props);
		this.myRef = React.createRef();
	}

	state = {
		email: '',
		username: '',
		password: '',
		number: '',
		confirmPassword: '', // not being used;
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
			const el = this.myRef.current.querySelector(".username-helper")
			el.innerHTML = "";
			return true;
		} else {
			const el = this.myRef.current.querySelector(".username-helper")
			el.innerHTML = "Username was empty";
			return false;
		}
	}
	validateNumber() {
		if (this.state.number) {
			const re = /^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/;
			if (re.test(this.state.number)) {
				const el = this.myRef.current.querySelector(".number-helper")
				el.innerHTML = "";
				return true;
			} else {
				const el = this.myRef.current.querySelector(".number-helper")
				el.innerHTML = "Please enter a valid 10-digit phone number.";
				return false;
			}
		} else {
			const el = this.myRef.current.querySelector(".number-helper")
			el.innerHTML = "Phone number was empty.";
			return false;
		}
	}
	validatePassword() {
		if (this.state.password.length >= 8) {
			const el = this.myRef.current.querySelector(".password-helper")
			el.innerHTML = "";
			return true;
		} else {
			const el = this.myRef.current.querySelector(".password-helper")
			el.innerHTML = "Password must be at least 8 characters.";
			return false;
		}
	}

	runValidation() {
		let valid = true;
		if(this.validateEmail(this.state.email)) {
			const el = this.myRef.current.querySelector(".email-helper")
			el.innerHTML = "";
			// console.log("email validation passed");
		} else {
			const el = this.myRef.current.querySelector(".email-helper")
			el.innerHTML = "Please enter a valid email address.";
			valid = false;
		}
		if (this.validateUserName()) {
			// console.log("username validation passed");
		} else {
			valid = false;
		}
		if (this.validateNumber()) {
			// console.log("Phone number validation passed");
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
		if (this.state.username.toLowerCase().trim() === "matttali09" || this.state.username.toLowerCase().trim() === "tonytali") {
			formData = {
				email: this.state.email,
				number: this.state.number,
				username: this.state.username,
				password: this.state.password,
				role: 'admin'
			};
		} else {
			formData = {
				email: this.state.email,
				number: this.state.number,
				username: this.state.username,
				password: this.state.password,
				role: "user"
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
					<form className="form-horizontal" ref={this.myRef}>
						<div className="form-group">
							<div className="col-1 col-ml-auto">
								<label className="form-label" htmlFor="email">Email</label>
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
							<p className="email-helper"></p>
						</div>
						<div className="form-group">
							<div className="col-1 col-ml-auto">
								<label className="form-label" htmlFor="number">Phone Number</label>
							</div>
							<div className="col-3 col-mr-auto">
								<input className="form-input"
									type="text"
									id="number"
									name="number"
									placeholder="(xxx) xxx-xxxx"
									value={this.state.number}
									onChange={this.handleChange}
								/>
							</div>
							<p className="number-helper"></p>
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
							<p className="username-helper"></p>
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
							<p className="password-helper"></p>
						</div>
						<div className="form-group ">
							<div className="col-7"></div>
							<button
								className="btn btn-primary col-1 col-mr-auto create-btn"
								onClick={this.handleSubmit}
								type="submit"
							>Create Account</button>
							<Link to="/signin" className="center signin-nav">
								<span>Already have an Account?</span>
							</Link>
						</div>
					</form>
					</center>
				</div>

			)
		}
	}
}
export default CreateAccountPage
