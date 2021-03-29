import React, { Component } from "react";
import Calendar from "../components/calendar/calendar.js";

class Scheduling extends Component {
    state = {
        hidden: true,
    }

    render() {
        return (
            <div className="container mainContent">
                <center>
                    <div className="header">
                        <img className="logo-img" src="../images/BigTs-logo.PNG"></img>
                        <h1>Plan Your Adventure Today!</h1>
                        <img className="logo-img" src="../images/BigTs-logo.PNG"></img>
                    </div>
                    <Calendar 
                    user={this.props.user}
                    role={this.props.role}
                    />
                </center>
            </div>
        );

    }
}

export default Scheduling;