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
  const availableMessage = "THE DATE YOU HAVE SELECTED IS AVAILABLE WOULD YOU LIKE TO SCHEDULE IT?";
  const unavailableMessage = "BUT THE DATE YOU HAVE SELECTED IS UNAVAILABLE.";
  const userUnacceptedMessage = "BUT YOU HAVE NOT BEEN APPROVED FOR THIS DATE.";
  const userAcceptedMessage = "YOU HAVE BEEN APPROVED FOR THIS DATE!";
  const adminDateApprovedMessage = "YOU HAVE ALREADY APPROVED THIS DATE";
  const adminDateUnapprovedMessage = "BUT YOU HAVE NOT APPROVED THIS DATE YET";
  const adminDateNotScheduledMessage = "THIS DATE HAS NOT BEEN SCHEDULED WOULD YOU LIKE TO BLACK IT OUT?";

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
    formatDate(nextValue);
  }

  // function to take the value selected, format the date and check it against the schedule.
  const formatDate = nextValue => {
    // outputs date January 21, 2021
    const formatedValue = new Intl.DateTimeFormat('en-US', {year: 'numeric', month: 'long', day: 'numeric'}).format(nextValue);

    // async function to call API and refresh calendar with user scheduled dates
    setFormatedDate(formatedValue)
    checkUserSchedule(formatedValue);
  }

  // functiuon to take the formated value. 
  // Get all users scheduled dates together and checka it
  // against the full schedule and then individual schedule
  const checkUserSchedule = formatedValue => {
    let usersScheduledDates = [];

    setUserInfo({scheduled: {date: formatedValue, approved: true, username: userName, typeKey: "EO"}})


    API.getUsers().then(response => {
      // console.log(response);
      // console.log(response.data);
      response.data.forEach(user => { 
        // console.log(user);
        user.scheduled.forEach(scheduledDate => {
          if (user) {
            if (props.role === "admin") {
              if (scheduledDate.approved) {
                scheduledDate.username = user.username;
                usersScheduledDates.push(scheduledDate);
                findElAndColor(scheduledDate.date, "#008074");
              } else {
                scheduledDate.username = user.username;
                usersScheduledDates.push(scheduledDate);
                findElAndColor(scheduledDate.date, "#ff8100");
              }

            // for regular users
            } else {
              // scheduled date for this user which has been approved
              if (scheduledDate.approved && user.username === userName.toLowerCase()) {
                scheduledDate.username = user.username;;
                usersScheduledDates.push(scheduledDate);
                findElAndColor(scheduledDate.date, "#008074");

                // scheduled date for this user which has not been approved
              } else if (!scheduledDate.approved && user.username === userName.toLowerCase()) {
                scheduledDate.username = user.username;
                usersScheduledDates.push(scheduledDate)
                findElAndColor(scheduledDate.date, "#ff8100");
              
                // scheduled date for a different user which has not been approved
              } else {
                scheduledDate.username = user.username;
                usersScheduledDates.push(scheduledDate)
                findElAndColor(scheduledDate.date, "#444");
              }
            }
          }
        })
      })
      // inside the .then of users retrieval
      if (formatedValue && isDateAfterToday(formatedValue)) {
        setModal(formatedValue, usersScheduledDates);
      } else if (formatedValue) {
        setModalMessage("BUT THE DATE SELECTED IS BEFORE TODAY");
        setModalOptions(false);
        setOpenModal(true);
      }
    })
  }

  function isDateAfterToday(date) {
    date = new Date(date);
    return new Date(date.toDateString()) >= new Date(new Date().toDateString());
  }

  const setModal = (formatedDate, usersScheduledDates) => {

    for (let scheduledDate of usersScheduledDates) {
      console.log("scheduledDate");
      console.log(scheduledDate);
      if (props.role === "admin") {
        if (formatedDate === scheduledDate.date && scheduledDate.approved) {
          // set message for approved date selected by admin
          setModalMessage(adminDateApprovedMessage);
          setModalOptions(false);
          setOpenModal(true);
          break;
        } else if (formatedDate === scheduledDate.date) {
          // set message for admin selected date not approved
          setModalMessage(adminDateUnapprovedMessage);
          setModalOptions(false);
          setOpenModal(true);
          break;
        } else {
          // set message for non-scheduled dates
          setModalMessage(adminDateNotScheduledMessage);
          setModalOptions(true);
          setOpenModal(true);
        }
      } else {
        console.log(formatedDate)
        console.log(scheduledDate.date)
        if (formatedDate === scheduledDate.date && scheduledDate.approved && userName.toLowerCase() === scheduledDate.username) {
          // message for approved date selected same user
          setModalMessage(userAcceptedMessage);
          setModalOptions(false); 
          setOpenModal(true);
          break;
        } else if (formatedDate === scheduledDate.date && !scheduledDate.approved && userName.toLowerCase() === scheduledDate.username) {
          // message for not approved selected same user
          setModalMessage(userUnacceptedMessage);
          setModalOptions(false);
          setOpenModal(true);
          break;
        } else if (formatedDate === scheduledDate.date) {
          // message for scheduledDate selected not same user
          setModalMessage(unavailableMessage);
          setModalOptions(false);
          setOpenModal(true);
          break;
        } else {
          // message for day available
          setModalMessage(availableMessage);
          setModalOptions(true);
          setOpenModal(true);
        }
      }
    }
  }

  const findElAndColor = (date, color) => {
    // console.log(date)
    const element = componentRef.current.querySelector(`abbr[aria-label='${date}'`);
    if (element) {
      let par = element.parentNode
      par.style.background = color;
      element.style.color = "white";
    } else {
      console.log("date not found;");
    }
  }

  // const handleCalendarClick = () => {
  //   const reactCalendar = componentRef.current.querySelector(`.react-calendar'`);
  //   reactCalendar.onClick()
  // }
 
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
          updateUser={setUserInfo}
          findElAndColor={findElAndColor}
          formatedDate={formatedDate}
          modalOptions={modalOptions}
          username={userName}
        />
      }
    </div>
  );
}

export default CalendarFun;