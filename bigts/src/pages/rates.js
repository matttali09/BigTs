import React, { useState, useEffect} from "react";

import SchedulingModal from "../components/modal/scheduling-modal.js"
import API from "../utils/API.js";

const RatesPage = (props) => {

    const [userInfo, setUserInfo] = useState(props.user);
    const [modalKey, setModalKey] = useState(null);
    const userName = props.user;

    // component did mount equivalent for function components hook
    useEffect(() => {
        // code to run on component mount
        if (userName)
            API.getUser(userName).then(response => {
                setUserInfo(response.data.scheduled)
                console.log(userInfo);
            })
        
        // ignore missing dependency warning
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const [openModal, setOpenModal] = useState(false);

    const pickDateMessage = "Go Ahead and Pick your date now!";
    const pleaseLoginMessage = <span>PLEASE LOGIN OR CREATE ACCOUNT TO SCHEDULE A DATE. <br/>Contact Us Now <span className="phone-text"><br/><a href="tel:8509057203">Phone: (850) 905-7203</a></span> <span className="email-text"><br/><a target="_blank" rel="noreferrer" href="mailto: bigtscharters@gmail.com">Email: BigTsCharters@gmail.com</a></span></span>;

    const[modalMessage, setModalMessage] = useState(pickDateMessage);

    const [modalOptions, setModalOptions] = useState(true);

    const handleClick = (event) => {
        console.log(openModal)
        setOpenModal(true);
        console.log(event.target.id)
        setModalKey(event.target.id)
        if (event.target.id === "contact") {
            setModalOptions(false);
            setModalMessage(<span>Contact Us Now <span className="phone-text"><br/><a href="tel:8509057203">Phone: (850) 905-7203</a></span> <span className="email-text"><br/><a target="_blank" rel="noreferrer" href="mailto: bigtscharters@gmail.com">Email: BigTsCharters@gmail.com</a></span></span>);
        } else if (userName) {
            setModalOptions(true);
            setModalMessage(pickDateMessage);
        } else {
            setModalOptions(false);
            setModalMessage(pleaseLoginMessage);
        }
    }
   
    return (
        <div className="rates-page">
            <div className="container mainContent center">
                <h1>Half Day</h1>
                <div className="rates-section">
                    <div className="row half-day-rates">
                        <div className="col-s-12 col-md-12 card">
                            <div className="img-wrap">
                                <div className="img-border">
                                    <div className="day-img half-day-img" id="FO" onClick={handleClick}>
                                    </div>
                                </div>
                            </div>
                            <div className="rate-txt-header">
                                <h5>FIVE-HOUR OFF-SHORE FISHING TRIP</h5>
                            </div>
                            <div className="rate-txt">
                                <p>$500 | Up to Four People | All Ages | Intro and Advanced Off-Shore Fishing</p>
                            </div>
                            <div className="btn-wrap">
                                <button className="btn waves-effect half-day-btn" id="FO" onClick={handleClick}>Book Now!</button>
                            </div>
                        </div>
                    </div>
                    
                    <h1>Full Day</h1>
                    <div className="row full-day-rates">
                        <div className="col-s-12 col-md-12 card">
                            <div className="img-wrap">
                                <div className="img-border">
                                    <div className="day-img full-day-img" onClick={handleClick}>
                                    </div>
                                </div>
                            </div>
                            <div className="rate-txt-header">
                                <h5>EIGHT-HOUR OFF-SHORE FISHING TRIP</h5>
                            </div>
                            <div className="rate-txt">
                                <p>$800 | Up to Four People | All Ages | Intro and Advanced Off-Shore Fishing</p>
                            </div>
                            <div className="btn-wrap">
                                <button className="btn waves-effect half-day-btn" onClick={handleClick}>Book Now!</button>
                            </div>
                        </div>
                    </div>

                    <h1>Customized Day</h1>
                    <div className="row full-day-rates">
                        <div className="col-s-12 col-md-12 card">
                            <div className="img-wrap">
                                <div className="img-border">
                                    <div className="day-img contact-img" id="contact" onClick={handleClick}>
                                    </div>
                                </div>
                            </div>
                            <div className="rate-txt-header">
                                <h5>Call for customized length and style of trip!</h5>
                            </div>
                            <div className="btn-wrap">
                                <button id="contact" className="btn waves-effect half-day-btn" onClick={handleClick}>Book Now!</button>
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