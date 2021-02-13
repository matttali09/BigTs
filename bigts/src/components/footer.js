import React, { Component } from "react";

class Footer extends Component {
  render() {
    return (
      <footer className="page-footer" id="footer">
        <div className="container">
          <div className="row">
            <center>
              <h6 className="grey-text text-lighten-1">About Big T's</h6>
              <p className="grey-text text-lighten-1" />
              My wife and I are the best fisher's around and we wanna take you:{" "}
              <a target="_blank" rel="noreferrer" href="mailto: matttali09@yahoo.com">Contact us</a>
            </center>
          </div>
        </div>
        <div className="footer-copyright">
          <div className="container">
            <center>
              <p className="grey-text text-lighten-1">
                Copyright © 2020 All rights reserved | Made
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
