import React, { Component } from 'react';
import API from '../utils/API.js'
import DatesTable from '../components/table/dates-table.js'

class AccountPage extends Component {
    state = {
        user: this.props.user,
        role: this.props.role,
        email: '',
        dates: [],
        checkedDates: {}
    }

    componentDidMount() {
        // console.log(this.state)
        if (this.state.user && this.state.role === "admin") {
            API.getUsers()
            .then(response => {
                // insert scheduled array into the page 
                let datesArr = []
                let checkedDatesObj = this.state.checkedDates;
                response.data.forEach(user => {
                    user.scheduled.forEach(scheduledDate => {
                        scheduledDate["name"] = user.username
                        // console.log("scheduledDate");
                        // console.log(scheduledDate);
                        datesArr.push(scheduledDate);
                        checkedDatesObj[scheduledDate.date] = scheduledDate.approved
                    })
                });
                this.setState({
                    dates: datesArr,
                    checkedDates: checkedDatesObj
                })
            })
        } else if (this.state.user && this.state.role) {
            API.getUser(this.state.user)
            .then(response => {
                console.log(response);
                // insert scheduled array into the page
                this.setState({
                    dates: response.data.scheduled,
                    email: response.data.email
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
                    <h2>Scheduled Dates</h2>
                    {!this.state.dates.length ? 
                    <p>No dates have been scheduled yet.</p>
                    : <DatesTable dates={this.state.dates} role={this.state.role} checkedDates={this.state.checkedDates}/>
                    }
                    <h2 className="account-info-header">Account Info</h2>
                    <div className="account-info">
                        <div className="row">
                            <div className="column"><span className="column-label">UserName:</span></div>
                            <div className="column"><span className="column-info">{this.state.user}</span></div>
                        </div>
                        <div className="row">
                            <div className="column"><span className="column-label">Email:</span></div>
                            <div className="column"><span className="column-info">{this.state.email}</span></div>
                        </div>
                    </div>
                </div>
            </div>
        );
    
    }
}

export default AccountPage;