import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import API from "../utils/API";

class LoginForm extends Component {
  state = {
    username: "",
    password: "",
    redirectTo: null,
    role: "user"
  };

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  handleSubmit = event => {
    event.preventDefault();

    let formData = {};
		if (this.state.username === "matttali09" || this.state.username === "tonytali") {
			formData = {
				username: this.state.username,
				password: this.state.password,
				role: 'admin'
			};
		} else {
			formData = {
				username: this.state.username,
				password: this.state.password,
				role: "user"
			};
		}

    API.signInUser(formData)
      .then(response => {
        if (response.status === 200) {
          // update App.js state
          this.props.updateUser({
            loggedIn: true,
            username: response.data.username,
            role: response.data.role
          });
          // update the state to redirect to home
          this.setState({
            redirectTo: "/home"
          });
        }
      })
      .catch(error => {
        console.log("login error: ");
        console.log(error);
        alert("password or username is incorrect")
      });
  };

  render() {
    if (this.state.redirectTo) {
      return <Redirect to={{ pathname: this.state.redirectTo }} />;
    } else {
      return (
        <div className="container mainContent form-container">
          <center>
            <h6 className="center text-28">
              <i className="material-icons">check_box</i> Login
            </h6>
          </center>
          <center>
            <form className="form-horizontal">
              <div className="form-group">
                <div className="col-1 col-ml-auto">
                  <label className="form-label" htmlFor="username">
                    Username
                  </label>
                </div>
                <div className="col-3 col-mr-auto">
                  <input
                    className="form-input"
                    type="text"
                    id="username"
                    name="username"
                    placeholder="Username"
                    value={this.state.username}
                    onChange={this.handleChange}
                  />
                </div>
              </div>
              <div className="form-group">
                <div className="col-1 col-ml-auto">
                  <label className="form-label" htmlFor="password">
                    Password:{" "}
                  </label>
                </div>
                <div className="col-3 col-mr-auto">
                  <input
                    className="form-input"
                    placeholder="password"
                    type="password"
                    name="password"
                    value={this.state.password}
                    onChange={this.handleChange}
                  />
                </div>
              </div>
              <div className="form-group ">
                <div className="col-7" />
                <button
                  className="btn btn-primary col-1 col-mr-auto"
                  onClick={this.handleSubmit}
                  type="submit"
                >
                  Login
                </button>
              </div>
            </form>
          </center>
        </div>
      );
    }
  }
}

export default LoginForm;
