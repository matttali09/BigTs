import React, { useEffect, useState } from 'react';
import API from '../utils/API.js'
import DatesTable from '../components/table/dates-table.js'
import PasswordModal from '../components/modal/password-modal.js'

export default function AccountPage(props) {
    
    const userName = props.user;
    const role = props.role;
    const [email, setEmail] = useState(false);
    const [dates, setDates] = useState([]);
    const [number, setNumber] = useState(false);
    const [checkedDates, setCheckedDates] = useState({});

    const passwordMessage = "Enter your new password below."
    const [openModal, setOpenModal] = useState(false);
    const modalMessage = passwordMessage;

    useEffect(() => {
        // console.log(this.state)
        if (userName && role === "admin") {
            API.getUsers()
            .then(response => {
                // console.log("response");
                // console.log(response);
                // insert scheduled array into the page 
                let datesArr = []
                let checkedDatesObj = checkedDates;
                response.data.forEach(user => {
                    user.scheduled.forEach(scheduledDate => {
                        if (isDateAfterToday(scheduledDate["date"])) {
                            scheduledDate["name"] = user.username
                            scheduledDate["number"] = user.number
                            scheduledDate["email"] = user.email
                            // console.log("scheduledDate");
                            // console.log(scheduledDate);
                            datesArr.push(scheduledDate);
                            checkedDatesObj[scheduledDate.date] = scheduledDate.approved
                        }
                    })
                });
                let sortedDatesArr = sortScheduledDates(datesArr);
                // console.log("checkedDatesObj:");
                // console.log(checkedDatesObj);
                // console.log("sortedDates:");
                // console.log(sortedDatesArr);
                setDates(sortedDatesArr);
                setCheckedDates(checkedDatesObj);
            })
            API.getUser(userName)
            .then(response => {
                console.log(response);
                // insert scheduled array into the page
                setEmail(response.data.email);
                setNumber(response.data.number);
            })
        } else if (userName && role) {
            API.getUser(userName)
            .then(response => {
                console.log("response");
                console.log(response);
                // insert scheduled array into the page
                let newArrayMapped = sortScheduledDates(response.data.scheduled);
                setDates(newArrayMapped);
                setEmail(response.data.email);
                setNumber(response.data.number);
            })
        } else {
            console.log("No User signed in.")
        }
    }, [checkedDates, role, userName]);

    // function to take an array of date objects and sort them based off date attribute
    function sortScheduledDates(scheduled) {
        let newDateArr = [];
        // console.log(scheduled);
        scheduled.forEach(dateObj => {
            let newFormat = dateObj;
            newFormat["date"] = new Date(dateObj.date);
            newDateArr.push(newFormat);
        })
        let newDateArrSorted = newDateArr.sort(function (a, b) {
            return (a.date > b.date) - (a.date < b.date);
        });
        let newArrayMapped = newDateArrSorted.map(dateObj => {
            dateObj["date"] = new Intl.DateTimeFormat('en-US', {year: 'numeric', month: 'long', day: 'numeric'}).format(dateObj.date)
            return dateObj;
        })
        // console.log(newArrayMapped);
        return newArrayMapped;
    }

    function isDateAfterToday(date) {
        try {
        date = new Date(date);
        return new Date(date.toDateString()) >= new Date(new Date().toDateString());
        } catch (e) {
          console.log("isDateAfterToday error");
    
          console.log(e);
        }
    }

    return (
        <div className="container mainContent">
            <div className="center">
                <h2>Scheduled Dates</h2>
                {!dates.length ? 
                <p>No dates have been scheduled yet.</p>
                : <div>
                    <p className="info-text">Click on date in order to cancel.</p>
                    <DatesTable username={userName} dates={dates} role={role} checkedDates={checkedDates}/>
                  </div>
                }
                <h2 className="account-info-header">Account Info</h2>
                <div className="account-info">
                    <div className="row">
                        <div className="column"><span className="column-label">UserName:</span></div>
                        <div className="column"><span className="column-info">{userName}</span></div>
                    </div>
                    <div className="row">
                        <div className="column"><span className="column-label">Email:</span></div>
                        <div className="column"><span className="column-info">{email}</span></div>
                    </div>
                    <div className="row">
                        <div className="column"><span className="column-label">Phone Number:</span></div>
                        <div className="column"><span className="column-info">{number}</span></div>
                    </div>
                    <div className="row">
                        <div className="column"><span className="column-label">Role:</span></div>
                        <div className="column"><span className="column-info">{role}</span></div>
                    </div>
                    <div className="row">
                        <div className="column"><span className="column-label">Password:</span></div>
                        <div className="column">
                            <span className="column-info"> <button className="btn waves-effect" onClick={setOpenModal}>Change Password</button> </span>
                        </div>
                    </div>
                </div>
                {openModal &&
                    <PasswordModal 
                    message={modalMessage}
                    closeModalHandler={setOpenModal}
                    userInfo={userName}
                    />
                }
            </div>
        </div>
    );
}