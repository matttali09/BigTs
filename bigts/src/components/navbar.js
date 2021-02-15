import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import "materialize-css/dist/css/materialize.min.css";
import M from  'materialize-css/dist/js/materialize.min.js';
import '../App.css';
import API from '../utils/API'

class Nav extends Component {

    componentDidMount() {
        let sidenav = document.querySelector('#slide-out');
        M.Sidenav.init(sidenav, {});
    }

    logout = () => {
        API.signOutUser().then(response => {
            if (response.status === 200) {
                this.props.updateUser({
                    loggedIn: false,
                    username: null,
                    role: "user"
                })
                localStorage.user = null;
                localStorage.role = null;
                localStorage.loggedIn = false;
            }
        }).catch(error => {
            console.log('Logout error');
            console.log(error);
        })
    }

    render() {
        const loggedIn = this.props.loggedIn;

        return (
            <header className="App-header" id="nav-container">
                <nav>
                    {/* if logged in show this on navbar :else */}
                    {loggedIn ? (
                        <div className="hide-on-med-and-down">
                            <Link to="/home" className="btn brand waves-effect">
                                <div className="cursive">Big T's</div>
                            </Link>
                            <Link to="/signin" className="btn btn-link waves-effect text-secondary center" onClick={this.logout}>
                                <span className="text-secondary">Logout</span>
                            </Link>
                            <Link to="/account" className="btn btn-link waves-effect text-secondary center">
                                <span className="text-secondary">Account</span>
                            </Link>
                            <Link to="/scheduling" className="btn btn-link waves-effect text-secondary center">
                                <span className="text-secondary">Scheduling</span>
                            </Link>
                        </div>
                    ) : (
                            <div className="hide-on-med-and-down">
                                <Link to="/home" className="btn brand waves-effect">
                                    <div className="cursive">Big T's</div>
                                </Link>
                                <Link to="/create-account" className="btn btn-link waves-effect center">
                                    <span className="text-secondary">Create Account</span>
                                </Link>
                                <Link to="/signin" className="btn btn-link waves-effect text-secondary center">
                                    <span className="text-secondary">Login</span>
                                </Link>
                            </div>
                        )}
                    <div data-target="slide-out" className="btn btn-link waves-effect sidenav-trigger hide-on-large-and-up"><i className="text-secondary material-icons">menu</i></div>
                    <ul id="slide-out" className="sidenav">
                        {loggedIn ? (
                            <>
                                <Link to="/home" className="waves-effect">
                                    <div className="cursive">Big T's</div>
                                </Link>
                                <Link to="/scheduling" className="waves-effect">
                                    <span>Scheduling</span>
                                </Link>
                                <Link to="/account" className="waves-effect">
                                    <span>Account</span>
                                </Link>
                                <Link to="/signin" className="waves-effect" onClick={this.logout}>
                                    <span>Logout</span>
                                </Link>
                                <div className="waves-effect sidenav-close" onClick={this.closeSidenav}>
                                    <i className="fas fa-arrow-circle-right"></i>
                                </div>
                            </>
                        ) : (
                            <>
                                <Link to="/home" className="waves-effect">
                                    <div className="cursive">Big T's</div>
                                </Link>
                                <Link to="/create-account" className="waves-effect">
                                    <span>Create Account</span>
                                </Link>
                                <Link to="/signin" className="waves-effect">
                                    <span>Login</span>
                                </Link>
                                <div className="waves-effect sidenav-close" onClick={this.closeSidenav}>
                                    <i className="fas fa-arrow-circle-right"></i>
                                </div>
                            </>
                        )}
                    </ul>
                </nav>
            </header >
        );

    }
}

export default Nav