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
                    <h3 style={{"marginTop": "80px"}}>Plan Your Adventure Today!</h3>
                    <Calendar user={this.props.user}/>
                </center>
            </div>
        );

    }
}

export default Scheduling;