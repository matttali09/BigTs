import React, { useState, useEffect} from "react";

import SchedulingModal from "../components/modal/scheduling-modal.js"
import API from "../utils/API.js";

const RatesPage = (props) => {

    const [userInfo, setUserInfo] = useState(props.user);
    const [modalKey, setModalKey] = useState(null);

    // component did mount equivalent for function components hook
    useEffect(() => {
        // code to run on component mount
        if (props.user)
            API.getUser(props.user).then(response => {
                setUserInfo(response.data.scheduled)
                console.log(userInfo);
            })
        
        // ignore missing dependency warning
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const [openModal, setOpenModal] = useState(false);

    const pickDateMessage = "Go Ahead and Pick your date now!";

    const[modalMessage, setModalMessage] = useState(pickDateMessage);

    const modalOptions = true;

    const handleClick = (event) => {
        setOpenModal(true);
        console.log(event.target.id)
        setModalKey(event.target.id)
    }
   
    return (
        <div className="rates-page">
            <div className="container mainContent center">
                <h1>Half Days</h1>
                <div className="rates-section">
                    <div className="row half-day-rates">
                        <div className="col-s-12 col-md-12 card">
                            <div className="img-wrap">
                                <div className="img-border">
                                    <div className="half-day-img" id="FO" onClick={handleClick}>
                                    </div>
                                </div>
                            </div>
                            <div className="rate-txt-header">
                                <h5>FIVE-HOUR OFF-SHORE FISHING TRIP</h5>
                            </div>
                            <div className="rate-txt">
                                <p>$400 | Up to Four People | All Ages | Intro and Advanced Off-Shore Fishing</p>
                            </div>
                            <div className="btn-wrap">
                                <button className="btn waves-effect half-day-btn" id="FO" onClick={handleClick}>Book Now!</button>
                            </div>
                        </div>
                    </div>
                    
                    <h1>Full Days</h1>
                    <div className="row full-day-rates">
                        <div className="col-s-12 col-md-12 card">
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
                                <p>$600 | Up to Four People | All Ages | Intro and Advanced Off-Shore Fishing</p>
                            </div>
                            <div className="btn-wrap">
                                <button className="btn waves-effect half-day-btn" onClick={handleClick}>Book Now!</button>
                            </div>
                        </div>
                    </div>

                    <h1>Customized Days</h1>
                    <div className="row full-day-rates">
                        <div className="col-s-12 col-md-12 card">
                            <div className="img-wrap">
                                <div className="img-border">
                                    <div className="half-day-img" onClick={handleClick}>
                                    </div>
                                </div>
                            </div>
                            <div className="rate-txt-header">
                                <h5>Call for customized length and style of days!</h5>
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
                            modalKey={modalKey}
                            username={props.user}
                        />
                    }
            </div>
        </div>
    );
}

export default RatesPage;