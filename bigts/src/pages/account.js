import React, { Component } from 'react';
import API from '../utils/API.js'

class AccountPage extends Component {
    state = {
        user: this.props.user,
        dates: []
    }

    componentDidMount() {
        if (this.state.user){
            API.getUser(this.state.user)
            .then(response => {
                // insert scheduled array into the page
                this.setState({
                    dates: response.data.scheduled
                  })
            })
        } else {
            console.log("No User signed in.")
        }
    }

    render() {
        const dates = this.state.dates.map(date =>
            <li key={date.date}>{date.date}</li>
        );

        return (
            <div className="container mainContent">
                <div className="center">
                    <h2>AccountPage</h2>
                    <div>{this.state.user} Scheduled Dates</div>
                    <div>{dates}</div>
                </div>
            </div>
        );
    
    }
}

export default AccountPage;