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
          <div className="header">
          <img className="logo-img" src="../images/BigTs-logo.PNG" alt="Big Ts Logo"></img>
            <h1>Gallery</h1>
            <img className="logo-img" src="../images/BigTs-logo.PNG" alt="Big Ts Logo"></img>
          </div>
          <Slider/>
          <Link to="/scheduling" style={{"marginTop": "80px"}} className="main-btn btn btn-link waves-effect center">
            <span className="black-txt">Schedule Your Adventure!</span>
          </Link>
          <img className="logo-img" src="../images/BigTs-logo.PNG" alt="Big Ts Logo"></img>
        </center>
      </div>
    );

  }
}


export default Home;
