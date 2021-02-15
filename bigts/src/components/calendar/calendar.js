import React, { useState, useRef, useEffect } from 'react';
import Calendar from 'react-calendar';
import API from '../../utils/API.js';
import MyModal from "../modal/modal.js";
 
function CalendarFun(props) {
  // declare value hooks
  const [value, setValue] = useState(new Date());
  const [openModal, setOpenModal] = React.useState(false);
  // set modalMessage with hook and initialize variables for messages here for readability
  const availableModalMessage = "The date you selected is available would you like to schedule it?";
  const unavailableModalMessage = "The date you selected has already been scheduled by another user.";
  const [modalMessage, setModalMessage] = React.useState(availableModalMessage);

  // declare variables and component reference
  const userName = props.user;
  const componentRef = useRef(null);

  // component did mount equivalent for function components hook
  useEffect(() => {
    // code to run on component mount
    checkUserSchedule(null);
    
    // ignore missing dependency warning
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  function onChange(nextValue) {
    setValue(nextValue);
    checkDate(nextValue);
  }

  const checkDate = nextValue => {
    // outputs date January 21, 2021
    const formatedValue = new Intl.DateTimeFormat('en-US', {year: 'numeric', month: 'long', day: 'numeric'}).format(nextValue);

    // async function to call API and refresh calendar with user scheduled dates
    checkUserSchedule(formatedValue);
  }

  const checkUserSchedule = formatedValue => {
    formatedValue ? setOpenModal(true) : setOpenModal(false);

    let duplicate = false;
    let userDuplicate = false;
    let updatedDates;

    API.getUsers()
      .then(response => {
        // loop through each user and paint the calendar as needed
        response.data.forEach(user => {

          user.scheduled.forEach(scheduledDate => {
            
            if (user.name === userName && scheduledDate.date === formatedValue) {
              duplicate = true;
              userDuplicate = true;

            } else if (scheduledDate.date === formatedValue) {
              duplicate = true;
            }
            
            // should be without not when finished
            if (scheduledDate.approved && user.username === userName) {
              findElAndColor(scheduledDate.date, "green");
            }
            else if (!scheduledDate.approved && user.username === userName) {
              findElAndColor(scheduledDate.date, "yellow");

            } else if (!scheduledDate.approved) {
              findElAndColor(scheduledDate.date, "red");
            } else {
              findElAndColor(scheduledDate.date, "red");
            }
            
          });

          if (user.username === userName && formatedValue) {
            updatedDates = user.scheduled.concat({date: formatedValue, approved: false});
          }

        });

        if (!duplicate && !userDuplicate && formatedValue) {
          // save user info with previous scheduled and current value
          let userInfo = {username: userName, scheduled: updatedDates};

          findElAndColor(formatedValue, "yellow");

          API.updateUser(userName, userInfo);

        } else if (!duplicate && formatedValue) {

          // save user info with previous scheduled and current value
          let userInfo = {username: userName, scheduled: {date: formatedValue, approved: false}}

          findElAndColor(formatedValue, "red");

          API.updateUser(userName, userInfo);
          
        } else if (formatedValue) {
          setModalMessage(unavailableModalMessage);
        }
        
      }
      )
  }

  const findElAndColor = (date, color) => {
    const element = componentRef.current.querySelector(`abbr[aria-label='${date}'`);
    if (element) {
      element.style.background = color;
    } else {
      console.error("date not found;")
    }
  }
 
  return (
    <div ref={componentRef}>
      
      <Calendar
        onChange={onChange}
        value={value}
      />

      {openModal &&
        <MyModal 
          message={modalMessage}
          closeModalHandler={setOpenModal}
        />
      }
    </div>
  );
}

export default CalendarFun;