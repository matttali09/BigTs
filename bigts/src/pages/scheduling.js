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
                    <img className="logo-img" src="../images/BigTs-logo.PNG" alt="Big Ts Logo"></img>
                    <h1>Plan Your Adventure Today!</h1>
                    <Calendar 
                    user={this.props.user}
                    role={this.props.role}
                    />
                    <img className="logo-img" src="../images/BigTs-logo.PNG" alt="Big Ts Logo"></img>
                </center>
            </div>
        );

    }
}

export default Scheduling;