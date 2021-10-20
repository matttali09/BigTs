import React, { useState } from 'react';
import API from "../../utils/API.js";

import CancelModal from "../modal/cancel-modal.js"

const Checkbox = ({ type = "checkbox", name, checked = false, onChange, user }) => {
    //console.log("Checkbox: ", name, checked);

    return (
        <input type={type} name={name} checked={checked} user={user} onChange={onChange} />
    );
};

const DatesTable = (props) => {
    const [checkedItems, setCheckedItems] = useState(props.checkedDates ? props.checkedDates : {});

    const [openModal, setOpenModal] = useState(false);
    const [userName, setUserName] = useState(props.username);

    const [formatedDate, setFormatedDate] = useState(false);

    const handleChange = event => {
        const userName = event.target.attributes.user.value;

        API.getUser(userName).then(response => {
            const newScheduledMap = response.data.scheduled

            newScheduledMap.map(scheduledDate => {
                if (scheduledDate.date === event.target.name) {
                    scheduledDate.approved = event.target.checked
                }
                return scheduledDate
            })
            API.updateUser(userName, {scheduled: newScheduledMap}).then(response => {
                // console.log("updated user response");
                // console.log(response);
            })
        })

        setCheckedItems({
            ...checkedItems,
            [event.target.name]: event.target.checked
        });
        props.dates.forEach(date => {
            if (date.date === event.target.name) {
                date.approved = event.target.checked;
            }
        })
        console.log("checkedItems: ", checkedItems);
    };

    const checkboxes = () => {
        let checkboxArr = [];

        props.dates.forEach((date , index) => {
            let checkboxInfo = {
                date: date.date,
                key: index,
                label: date.approved ? (`${date.name} has scheduled date for ${date.date} Approved!`)
                    : (`${date.name} has scheduled date for ${date.date} not approved.`),
                user: date.name,
                number: date.number,
                email: date.email,
                checked: date.approved
            }
            checkboxArr.push(checkboxInfo);
        });
        // console.log("props.checkedDates : ");
        // console.log(props.checkedDates);
        // console.log("checkedItems : ");
        // console.log(checkedItems);
        // console.log("checkboxArr : ");
        // console.log(checkboxArr);
        return checkboxArr;
    }
    const setCancelModal = (event) => {
        setFormatedDate(event.target.id);
        if (props.role === "admin") {
            setUserName(event.target.attributes.name.value);
        }
        setOpenModal(true);
    }

    const userDates = props.dates.map((date, index) =>
        isDateAfterToday(date.date) ? (
            date.approved ? (
                <p key={index} id={date.date} onClick={setCancelModal}><span className="date" id={date.date}>{date.date}</span> is confirmed!</p>
            ) : (
                <p key={index} id={date.date} onClick={setCancelModal}><span className="date" id={date.date}>{date.date}</span> not confirmed.</p>
            )
        ) : (null)
    );

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
        <div className="dates-table">
            {props.role === "admin" ? (
                <div className="styled-checkbox">
                    {checkboxes().map(item => (
                        <p key={item.key}>
                            <label key={item.key}>
                                <Checkbox
                                    name={item.date}
                                    checked={checkedItems[item.date]}
                                    onChange={handleChange}
                                    user={item.user}
                                />
                                {item.label}
                                <br/><span className="date-text">Date: {item.date}</span>
                                <br/><span className="phone-text"><a href={"tel:" + item.number} >Phone: {item.number}</a></span>
                                <br/><span className="email-text"><a target="_blank" rel="noreferrer" href={"mailto: " + item.email} >Email: {item.email}</a></span>
                            </label>
                            <p className="center">Cancel: <span id={item.date} className="date" name={item.user} onClick={setCancelModal}>{item.date}</span></p>
                        </p>
                    ))}
                </div>
            ) : (
                <div>
                    <div>{userDates}</div>
                </div>
            )}
            {openModal && 
                <CancelModal 
                    formatedDate={formatedDate}
                    username={userName}
                    closeModalHandler={setOpenModal}
                />
            }
        </div>
    );
};

export default DatesTable;