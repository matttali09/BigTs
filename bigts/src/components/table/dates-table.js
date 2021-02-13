import React, { useState } from 'react';

const Checkbox = ({ type = "checkbox", name, checked = false, onChange }) => {
    console.log("Checkbox: ", name, checked);

    return (
        <input type={type} name={name} checked={checked} onChange={onChange} />
    );
};

const DatesTable = (props) => {
    const [checkedItems, setCheckedItems] = useState({});

    const handleChange = event => {
        setCheckedItems({
            ...checkedItems,
            [event.target.name]: event.target.checked
        });
        console.log("checkedItems: ", checkedItems);
    };

    const checkboxes = () => {
        let checkboxArr = [];
        props.dates.forEach((date , index) => {
            let checkboxInfo = {
                name: date.date,
                key: index,
                label: `${date.name} has scheduled date for ${date.date}`
            }
            checkboxArr.push(checkboxInfo);
        });
        return checkboxArr;
    }

    const userDates = props.dates.map(date =>
        date.approved ? (
            <p>Your adventure scheduled for <span className="date">{date.date}</span> is approved!</p>
        ) : (
            <p>Your adventure scheduled for <span className="date">{date.date}</span> has not been approved yet.</p>
        )
    );

    return (
        <div className="dates-table">
            {props.role === "admin" ? (
                <div className="styled-checkbox">
                    <h4>Dates to be approved</h4> <br />
                    {checkboxes().map(item => (
                        <p>
                            <label key={item.key}>
                            <Checkbox
                                name={item.name}
                                checked={checkedItems[item.name]}
                                onChange={handleChange}
                            />
                            {item.label}
                            </label>
                        </p>
                    ))}
                </div>
            ) : (
                <div>{userDates}</div>
            )}
        </div>
    );
};

export default DatesTable;