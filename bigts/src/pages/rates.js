import React from "react";

import MyModal from "../components/modal/scheduling-modal.js"

const RatesPage = (props) => {

    const handleClick = () => {

    }
   
    return (
        <div className="container mainContent center">
            <h1>Rates Page</h1>
            <div className="rates-section">
                <div className="row half-day-rates">
                    <div className="col-s-12 col-md-6 card">
                        <div className="img-wrap">
                            <div className="img-border">
                                <div className="half-day-img">
                                </div>
                            </div>
                        </div>
                        <div className="rate-txt-header">
                            <h5>FIVE-HOUR OFF-SHORE FISHING TRIP</h5>
                        </div>
                        <div className="rate-txt">
                            <p>$400 | Up to Six People | All Ages | Intro and Advanced Off-Shore Fishing</p>
                        </div>
                        <div className="btn-wrap">
                            <button className="btn waves-effect half-day-btn">Book Now!</button>
                        </div>
                    </div>
                </div>
                
                <div className="row full-day-rates">
                    <div className="col-s-12 col-md-6 card">
                        <div className="img-wrap">
                            <div className="img-border">
                                <div className="half-day-img">
                                </div>
                            </div>
                        </div>
                        <div className="rate-txt-header">
                            <h5>EIGHT-HOUR OFF-SHORE FISHING TRIP</h5>
                        </div>
                        <div className="rate-txt">
                            <p>$600 | Up to Six People | All Ages | Intro and Advanced Off-Shore Fishing</p>
                        </div>
                        <div className="btn-wrap">
                            <button className="btn waves-effect half-day-btn">Book Now!</button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="full-day-rates">

            </div>
        </div>
    );
}

export default RatesPage;