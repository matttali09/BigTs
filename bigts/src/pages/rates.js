import React, { useState } from "react";

import SchedulingModal from "../components/modal/scheduling-modal.js"

const RatesPage = (props) => {

    const userInfo = props.user;

    const [openModal, setOpenModal] = useState(false);

    const pickDateMessage = "Go Ahead and Pick your date now!";

    const[modalMessage, setModalMessage] = useState(pickDateMessage);

    const modalOptions = true;

    const handleClick = () => {
        setOpenModal(true);
    }
   
    return (
        <div className="rates-page">
            <div className="container mainContent center">
                <h1>Half Days</h1>
                <div className="rates-section">
                    <div className="row half-day-rates">
                        <div className="col-s-12 col-md-6 card">
                            <div className="img-wrap">
                                <div className="img-border">
                                    <div className="half-day-img" onClick={handleClick}>
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
                                <button className="btn waves-effect half-day-btn" onClick={handleClick}>Book Now!</button>
                            </div>
                        </div>
                        <div className="col-s-12 col-md-6 card">
                            <div className="img-wrap">
                                <div className="img-border">
                                    <div className="half-day-img" onClick={handleClick}>
                                    </div>
                                </div>
                            </div>
                            <div className="rate-txt-header">
                                <h5>FIVE-HOUR In-SHORE FISHING TRIP</h5>
                            </div>
                            <div className="rate-txt">
                                <p>$300 | Up to Six People | All Ages | Intro and Advanced IN-Shore Fishing</p>
                            </div>
                            <div className="btn-wrap">
                                <button className="btn waves-effect half-day-btn" onClick={handleClick}>Book Now!</button>
                            </div>
                        </div>
                    </div>
                    
                    <h1>Full Days</h1>
                    <div className="row full-day-rates">
                        <div className="col-s-12 col-md-6 card">
                            <div className="img-wrap">
                                <div className="img-border">
                                    <div className="half-day-img" onClick={handleClick}>
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
                                <button className="btn waves-effect half-day-btn" onClick={handleClick}>Book Now!</button>
                            </div>
                        </div>
                        <div className="col-s-12 col-md-6 card">
                            <div className="img-wrap">
                                <div className="img-border">
                                    <div className="half-day-img" onClick={handleClick}>
                                    </div>
                                </div>
                            </div>
                            <div className="rate-txt-header">
                                <h5>EIGHT-HOUR In-SHORE FISHING TRIP</h5>
                            </div>
                            <div className="rate-txt">
                                <p>$500 | Up to Six People | All Ages | Intro and Advanced IN-Shore Fishing</p>
                            </div>
                            <div className="btn-wrap">
                                <button className="btn waves-effect half-day-btn" onClick={handleClick}>Book Now!</button>
                            </div>
                        </div>
                    </div>
                    
                </div>
                    {openModal &&
                        <SchedulingModal 
                            message={modalMessage}
                            closeModalHandler={setOpenModal}
                            userInfo={userInfo}
                            modalOptions={modalOptions}
                        />
                }
            </div>
        </div>
    );
}

export default RatesPage;