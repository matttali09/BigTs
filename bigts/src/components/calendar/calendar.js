import React, { useState, useRef, useEffect } from 'react';
import Calendar from 'react-calendar';
import API from '../../utils/API.js';
import SchedulingModal from "../modal/scheduling-modal.js";
 
function CalendarFun(props) {
  // declare value hooks
  const [value, setValue] = useState(new Date());
  const [openModal, setOpenModal] = useState(false);
  const [userInfo, setUserInfo] = useState({});
  const [formatedDate, setFormatedDate] = useState("");
  const [modalOptions, setModalOptions] = useState(false);
  // set modalMessage with hook and initialize variables for messages here for readability
  const availableMessage = "The date you selected is available would you like to schedule it?";
  const unavailableMessage = "The date you selected has already been scheduled by another user.";
  const userDuplicateMessage = "You have already selected this date to be scheduled.";
  const userDuplicateAcceptedMessage = "You have been approved for this date already!";
  const adminDateApprovedMessage = "You have already approved this date.";
  const adminDateUnapprovedMessage = "You have not approved this date yet.";
  const adminDateNotScheduledMessage = "This date has not been scheduled by any user yet.";

  const [modalMessage, setModalMessage] = React.useState(availableMessage);

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
    let duplicate = false;
    let userDuplicate = false;
    let userDateAccepted = false;
    let updatedDates = [];
    let adminApproved = false;

    API.getUsers()
      .then(response => {
        // loop through each user and paint the calendar as needed
        response.data.forEach(user => {

          user.scheduled.forEach(scheduledDate => {
            
            // will run when formatedValue is present and determine which flags to set
            if (formatedValue) {
              if (user.username === userName && scheduledDate.date === formatedValue  && scheduledDate.approved) {
                duplicate = true;
                userDuplicate = true;
                userDateAccepted = true;

              } else if (user.username === userName && scheduledDate.date === formatedValue) {
                duplicate = true;
                userDuplicate = true;

              } else if (scheduledDate.date === formatedValue) {
                duplicate = true;
              }
            }
            
            // ========= determining how to paint each scheduled date for each user ======= 
            // for admin
            if (props.role === "admin") {
              if (scheduledDate.approved && scheduledDate.date === formatedValue) {
                adminApproved = true;
                findElAndColor(scheduledDate.date, "green");
              } else if (scheduledDate.approved ) {
                findElAndColor(scheduledDate.date, "green");
              } else {
                findElAndColor(scheduledDate.date, "yellow");
              }

              // for regular users
            } else {
              // scheduled date for this user which has been approved
              if (scheduledDate.approved && user.username === userName) {
                findElAndColor(scheduledDate.date, "green");

                // scheduled date for this user which has not been approved
              } else if (!scheduledDate.approved && user.username === userName) {
                findElAndColor(scheduledDate.date, "yellow");
              
                // scheduled date for a different user which has not been approved
              } else if (!scheduledDate.approved) {
                findElAndColor(scheduledDate.date, "red");

                // scheduled date for different user which has not been approved
              } else {
                findElAndColor(scheduledDate.date, "red");
              }
            }
            
          });

          if (user.username === userName && formatedValue) {
            updatedDates = user.scheduled.concat({date: formatedValue, approved: false});
          }

        });

        // if a date has been selected this will determine what modal to show
        if (formatedValue) {
          // logic switch for admin
          if (props.role === "admin") {
            if (duplicate && adminApproved) {
              setModalMessage(adminDateApprovedMessage);
              setModalOptions(false);

            } else if (duplicate) {
              setModalMessage(adminDateUnapprovedMessage);
              setModalOptions(false);
            } else {
              setModalMessage(adminDateNotScheduledMessage);
              setModalOptions(false);

            }
          } else {
            // if user has selected a date this will determine what to do next.
            // duplicate for this user
            if (duplicate && userDuplicate && userDateAccepted) {
              setModalMessage(userDuplicateAcceptedMessage);
              setModalOptions(false);
              setUserInfo({});

            // duplicate for this user, date is unavailable
            } else if (duplicate && userDuplicate) {
              setModalMessage(userDuplicateMessage);
              setModalOptions(false);
              setUserInfo({});
            
            // duplicate for other user, date is unavailable
            } else if (duplicate) {
              setModalMessage(unavailableMessage);
              setModalOptions(false);
              setUserInfo({});
            
            // not a duplicate, date is available.
            } else {
              setModalMessage(availableMessage);
              setModalOptions(true);

              setFormatedDate(formatedValue);
              setUserInfo({username: userName, scheduled: updatedDates});

            }
          }
          // after all checks for users open the modal if a date was selected
          setOpenModal(true)
        } else {
          setOpenModal(false)
        }
      })
  }

  const findElAndColor = (date, color) => {
    const element = componentRef.current.querySelector(`abbr[aria-label='${date}'`);
    if (element) {
      element.style.background = color;
    } else {
      console.log("date not found;")
    }
  }
 
  return (
    <div ref={componentRef}>
      
      <Calendar
        onChange={onChange}
        value={value}
      />

      {openModal &&
        <SchedulingModal 
          message={modalMessage}
          closeModalHandler={setOpenModal}
          userInfo={userInfo}
          findElAndColor={findElAndColor}
          formatedDate={formatedDate}
          modalOptions={modalOptions}
        />
      }
    </div>
  );
}

export default CalendarFun;