import React, { Component } from "react";
import { Link } from "react-router-dom";

import Slider from "../components/carousel/carousel.js"

class Home extends Component {
  state = {
    hidden: true,
  }

  toggleHidden() {
    this.setState({
      isHidden: !this.state.isHidden
    })
  }
  

  render() {
    return (
      <div className="container mainContent">
        <center>
            <h1>RECENT ADVENTURES</h1>
        </center>
        <Slider/>
        <center>
            <h3>Plan Your Adventure Today!</h3>
            <Link to="/scheduling" className="main-btn btn btn-link waves-effect center">
              <span className="black-txt">Schedule Your Adventure!</span>
            </Link>
        </center>
      </div>
    );

  }
}


export default Home;
