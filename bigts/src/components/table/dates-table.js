import React, { useState } from 'react';
import API from "../../utils/API.js"

const Checkbox = ({ type = "checkbox", name, checked = false, onChange, user }) => {
    //console.log("Checkbox: ", name, checked);

    return (
        <input type={type} name={name} checked={checked} user={user} onChange={onChange} />
    );
};

const DatesTable = (props) => {
    const [checkedItems, setCheckedItems] = useState(props.checkedDates ? props.checkedDates : {});

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
                name: date.date,
                key: index,
                label: date.approved ? (`${date.name} has scheduled date for ${date.date} Approved!`)
                    : (`${date.name} has scheduled date for ${date.date} not approved.`),
                user: date.name,
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

    const userDates = props.dates.map((date, index) =>
        date.approved ? (
            <p key={index}>Your adventure scheduled for <span className="date">{date.date}</span> is approved!</p>
        ) : (
            <p key={index}>Your adventure scheduled for <span className="date">{date.date}</span> has not been approved yet.</p>
        )
    );

    return (
        <div className="dates-table">
            {props.role === "admin" ? (
                <div className="styled-checkbox">
                    {checkboxes().map(item => (
                        <p key={item.key}>
                            <label key={item.key}>
                            <Checkbox
                                name={item.name}
                                checked={checkedItems[item.name]}
                                onChange={handleChange}
                                user={item.user}
                            />
                            {item.label}
                            </label>
                        </p>
                    ))}
                </div>
            ) : (
                <div>
                    <div>{userDates}</div>
                </div>
            )}
        </div>
    );
};

export default DatesTable;