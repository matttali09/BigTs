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
                sessionStorage.user = null;
                sessionStorage.role = "user";
                sessionStorage.loggedIn = false;
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
                                <img className="nav-logo" src="../images/BigTs-logo.PNG" alt="Big Ts Logo"></img>
                            </Link>
                            
                            <Link to="/signin" className="btn btn-link waves-effect text-secondary center" onClick={this.logout}>
                                <span className="text-secondary">Logout</span>
                            </Link>
                            <Link to="/account" className="btn btn-link waves-effect text-secondary center">
                                <span className="text-secondary">Account</span>
                            </Link>
                            <Link to="/boat" className="btn btn-link waves-effect text-secondary center">
                                <span className="text-secondary">The Boat</span>
                            </Link>
                            <Link to="/captain" className="btn btn-link waves-effect text-secondary center">
                                <span className="text-secondary">The Captain</span>
                            </Link>
                            <Link to="/rates" className="btn btn-link waves-effect text-secondary center">
                                <span className="text-secondary">Rates</span>
                            </Link>
                            <Link to="/scheduling" className="btn btn-link waves-effect text-secondary center">
                                <span className="text-secondary">Scheduling</span>
                            </Link>
                        </div>
                    ) : (
                            <div className="hide-on-med-and-down">
                                <Link to="/home" className="btn brand waves-effect">
                                    <img className="nav-logo" src="../images/BigTs-logo.PNG" alt="Big Ts Logo"></img>
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
                                <Link to="/home" className="waves-effect sidenav-close">
                                    <img className="nav-logo" src="../images/BigTs-logo.PNG" alt="Big Ts Logo"></img>
                                </Link>
                                <Link to="/scheduling" className="waves-effect sidenav-close">
                                    <span>Scheduling</span>
                                </Link>
                                <Link to="/rates" className="waves-effect sidenav-close">
                                    <span>Rates</span>
                                </Link>
                                <Link to="/captain" className="waves-effect sidenav-close">
                                    <span>The Captain</span>
                                </Link>
                                <Link to="/boat" className="waves-effect sidenav-close">
                                    <span>The Boat</span>
                                </Link>
                                <Link to="/account" className="waves-effect sidenav-close">
                                    <span>Account</span>
                                </Link>
                                <Link to="/signin" className="waves-effect sidenav-close" onClick={this.logout}>
                                    <span>Logout</span>
                                </Link>
                                <div className="waves-effect sidenav-close">
                                    <i className="fas fa-arrow-circle-right"></i>
                                </div>
                            </>
                        ) : (
                            <>
                                <Link to="/home" className="waves-effect sidenav-close">
                                    <img className="nav-logo" src="../images/BigTs-logo.PNG" alt="Big Ts Logo"></img>
                                </Link>
                                <Link to="/create-account" className="waves-effect sidenav-close">
                                    <span>Create Account</span>
                                </Link>
                                <Link to="/signin" className="waves-effect sidenav-close">
                                    <span>Login</span>
                                </Link>
                                <div className="waves-effect sidenav-close">
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