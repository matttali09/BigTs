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
            <h1>Gallery</h1>
        </center>
        <Slider/>
        <center>
            <Link to="/scheduling" style={{"marginTop": "80px"}} className="main-btn btn btn-link waves-effect center">
              <span className="black-txt">Schedule Your Adventure!</span>
            </Link>
        </center>
      </div>
    );

  }
}


export default Home;
