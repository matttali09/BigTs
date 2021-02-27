import React, { useEffect, useState } from 'react';
import API from '../utils/API.js'
import DatesTable from '../components/table/dates-table.js'
import PasswordModal from '../components/modal/password-modal.js'

export default function AccountPage(props) {
    
    const userName = props.user;
    const role = props.role;
    const [email, setEmail] = useState([]);
    const [dates, setDates] = useState([]);
    const [checkedDates, setCheckedDates] = useState({});

    const passwordMessage = "So u wanna change your password huh?"
    const [openModal, setOpenModal] = useState(false);
    const [modalMessage, setModalMessage] = React.useState(passwordMessage);

    useEffect(() => {
        // console.log(this.state)
        if (userName && role === "admin") {
            API.getUsers()
            .then(response => {
                console.log("response")
                console.log(response)
                // insert scheduled array into the page 
                let datesArr = []
                let checkedDatesObj = checkedDates;
                response.data.forEach(user => {
                    user.scheduled.forEach(scheduledDate => {
                        scheduledDate["name"] = user.username
                        // console.log("scheduledDate");
                        // console.log(scheduledDate);
                        datesArr.push(scheduledDate);
                        checkedDatesObj[scheduledDate.date] = scheduledDate.approved
                    })
                });
                setDates(datesArr);
                setCheckedDates(checkedDatesObj);
            })
            API.getUser(userName)
            .then(response => {
                console.log(response);
                // insert scheduled array into the page
                setEmail(response.data.email)
            })
        } else if (userName && role) {
            API.getUser(userName)
            .then(response => {
                console.log(response);
                // insert scheduled array into the page
                setDates(response.data.scheduled);
                setEmail(response.data.email)
            })
        } else {
            console.log("No User signed in.")
        }
    }, [checkedDates, role, userName]);

    return (
        <div className="container mainContent">
            <div className="center">
                <h2>Scheduled Dates</h2>
                {!dates.length ? 
                <p>No dates have been scheduled yet.</p>
                : <DatesTable dates={dates} role={role} checkedDates={checkedDates}/>
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