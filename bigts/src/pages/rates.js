import React from "react";

const RatesPage = (props) => {
   
    return (
        <div className="container mainContent center">
            <h1>Rates Page</h1>
            <div className="rates-section">
                <div className="half-day-rates">
                    <div className="row">
                        <div className="col-s-12 col-md-6">
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
                                <p>$400 | Up to Six People | All Ages | Intro to Off-Shore Fishing</p>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-s-12 col-md-6">
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
                                <p>$600 | Up to Six People | All Ages | Intro to Off-Shore Fishing</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="full-day-rates">

                </div>
            </div>
        </div>
    );
}

export default RatesPage;