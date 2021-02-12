// dependencies
import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom'

// components
import CreateAccountPage from './pages/create-account';
import LoginForm from './pages/login-form';
import AccountPage from './pages/account';
import Home from './pages/home';
import Scheduling from './pages/scheduling';
import Navbar from './components/navbar';
import Footer from './components/footer';
import NoMatch from './components/noMatch';

class App extends Component {
  state = {
    loggedIn: false,
    username: null,
    role: "user"
  }

  updateUser = userObject => {
    this.setState(userObject)
  }

  render() {
    return (
      <div className="App">

        <Navbar updateUser={this.updateUser} loggedIn={this.state.loggedIn} />
        {/* greet user if logged in: */}
        {this.state.loggedIn &&
          <div className="container mainContent">
            <center>
              <h6>Welcome, <span className="username-text1">{this.state.username}!</span></h6>
            </center>
          </div>
        }
        {/* Routes to different components */}
        <main>
        <Switch>
          <Route exact path="/"  render={() => <LoginForm updateUser={this.updateUser} />}
          />
          <Route exact path="/home" render={() => <Home />}
          />
          <Route path="/signin" render={() => <LoginForm updateUser={this.updateUser} />}
          />
          <Route path="/create-account" render={() => <CreateAccountPage updateUser={this.updateUser} />}
          />
          <Route exact path="/scheduling" render={() => <Scheduling user={this.state.username}/>}
          />
          <Route path="/account" render={() => <AccountPage user={this.state.username} />}
          />
          <Route href="/*" component={NoMatch} />
        </Switch>
        </main>
        <Footer />
      </div>
    );

  }
}

export default App;