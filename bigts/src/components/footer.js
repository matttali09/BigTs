import React, { Component } from "react";

class Footer extends Component {
  render() {
    return (
      <footer className="page-footer" id="footer">
        <div className="container">
          <div className="row">
            <center>
              <img className="logo-img" src="../images/BigTs-logo.PNG" alt="Big T's Logo"></img>
              <h6 className="grey-text text-lighten-1">About Big T's</h6>
              <p className="grey-text text-lighten-1" />
              My wife and I are avid offshore fishermen. It is in our blood, and I love to help create memorable offshore adventures for others as well. 
              I spent 37 years working in National Security, 20 years in the Air Force and 17 in industry, with fishing as a hobby. 
              Now I devote myself to my passion full time. I look forward to our next adventure. Contact us now by <br/><a href="tel:8509057203">Phone: (850) 905-7203</a> <br/><a target="_blank" rel="noreferrer" href="mailto: bigtscharters@gmail.com">Email: BigTsCharters@gmail.com</a>
            </center>
          </div>
        </div>
        <div className="footer-copyright">
          <div className="container">
            <center>
              <p className="grey-text text-lighten-1">
                Copyright © 2021 All rights reserved | Made
                with <i className="far fa-heart" aria-hidden="true" /> by <a target="_blank" rel="noreferrer" href="https://www.linkedin.com/in/matthew-taliancich-718970168/">TalaHachi</a>
              </p>
            </center>
          </div>
        </div>
      </footer>
    );
  }
}

export default Footer;
