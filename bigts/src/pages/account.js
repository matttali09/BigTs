import React, { Component } from 'react';
import API from '../utils/API.js'
import DatesTable from '../components/table/dates-table.js'

class AccountPage extends Component {
    state = {
        user: this.props.user,
        role: this.props.role,
        dates: []
    }

    componentDidMount() {
        console.log(this.state)
        if (this.state.user && this.state.role === "admin") {
            API.getUsers()
            .then(response => {
                // insert scheduled array into the page 
                let datesArr = []
                response.data.forEach(user => {
                    user.scheduled.forEach(scheduledDate => {
                        scheduledDate["name"] = user.username
                        console.log("scheduledDate")
                        console.log(scheduledDate)
                        datesArr.push(scheduledDate);
                    })
                });
                this.setState({
                    dates: datesArr
                })
            })
        } else if (this.state.user && this.state.role) {
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

        return (
            <div className="container mainContent">
                <div className="center">
                    <h2>AccountPage</h2>
                    <DatesTable dates={this.state.dates} role={this.props.role}/>
                </div>
            </div>
        );
    
    }
}

export default AccountPage;