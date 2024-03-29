import React, { useState, useRef, useEffect } from 'react';
import Calendar from 'react-calendar';
import API from '../../utils/API.js';

// import modals
import SchedulingModal from "../modal/scheduling-modal.js";
import CancelModal from "../modal/cancel-modal.js";
import AcceptedModal from "../modal/Accepted-Modal.js"

// import loader
import Loader from "../../utils/loader.js"
 
function CalendarFun(props) {
  // declare value hooks
  const [value, setValue] = useState(new Date());
  const [openModal, setOpenModal] = useState(false);
  const [cancelModal, setCancelModal] = useState(false);
  const [acceptedModal, setAcceptedModal] = useState(false);
  const [cancelUsername, setCancelUserename] = useState(false);
  const [userInfo, setUserInfo] = useState({});
  const [formatedDate, setFormatedDate] = useState("");
  const [modalOptions, setModalOptions] = useState(false);
  const [showLoader, setShowLoader] = useState(false);

  // set modalMessage with hook and initialize variables for messages here for readability
  const soundsGreatHeader = "Sounds Great!";
  const emptyHeader = "";
  const availableMessage = "THE DATE YOU HAVE SELECTED IS AVAILABLE WOULD YOU LIKE TO SCHEDULE IT?";
  const unavailableMessage = "THE DATE YOU HAVE SELECTED IS UNAVAILABLE.";
  const userUnacceptedMessage = "YOU HAVE NOT BEEN APPROVED FOR THIS DATE YET.";
  const userAcceptedMessage = "YOU HAVE BEEN APPROVED FOR THIS DATE!";
  const adminDateApprovedMessage = "YOU HAVE APPROVED THIS DATE YET, WOULD YOU LIKE TO CANCEL IT?";
  const adminDateUnapprovedMessage = "YOU HAVE NOT APPROVED THIS DATE YET, WOULD YOU LIKE TO CANCEL IT?";
  const adminDateNotScheduledMessage = "THIS DATE HAS NOT BEEN SCHEDULED WOULD YOU LIKE TO BLACK IT OUT?";
  const pleaseLoginMessage = <span>PLEASE LOGIN OR CREATE ACCOUNT TO SCHEDULE A DATE. <br/>Contact Us Now <span className="phone-text"><br/><a href="tel:8509057203">Phone: (850) 905-7203</a></span> <span className="email-text"><br/><a target="_blank" rel="noreferrer" href="mailto: bigtscharters@gmail.com">Email: BigTsCharters@gmail.com</a></span></span>;

  const [modalMessage, setModalMessage] = React.useState(availableMessage);
  const [modalHeader, setModalHeader] = React.useState(soundsGreatHeader);

  // declare variables and component reference
  const userName = props.user;
  const userRole = props.role;
  const componentRef = useRef(null);

  // component did mount equivalent for function components hook
  useEffect(() => {
    // console.log("this ran")
    // code to run on component mount
    checkUserSchedule(null);
    // console.log("this ran")
    
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
    setFormatedDate(formatedValue);
    checkUserSchedule(formatedValue);
  }

  // functiuon to take the formated value. 
  // Get all users scheduled dates together and checka it
  // against the full schedule and then individual schedule
  const checkUserSchedule = formatedValue => {
    setShowLoader(true);
    let usersScheduledDates = [];

    setUserInfo({scheduled: {date: formatedValue, approved: true, username: userName, typeKey: "EO"}})


    API.getUsers().then(response => {
      // console.log(response);
      // console.log(response.data);
      response.data.forEach(user => { 
      // console.log(user);
      try {
        if (user.scheduled !== []) {
          user.scheduled.forEach(scheduledDate => {
            if (user) {
              if (userRole === "admin") {
                // console.log("THIS RAN")
                if (scheduledDate.approved) {
                  scheduledDate.username = user.username;
                  usersScheduledDates.push(scheduledDate);
                  findElAndColor(scheduledDate.date, "#008021");
                } else {
                  scheduledDate.username = user.username;
                  usersScheduledDates.push(scheduledDate);
                  findElAndColor(scheduledDate.date, "#ff8100");
                }

              // for regular users
              } else {
                // scheduled date for this user which has been approved
                if (userName) {
                  if (scheduledDate.approved && user.username === userName.toLowerCase()) {
                    scheduledDate.username = user.username;;
                    usersScheduledDates.push(scheduledDate);
                    findElAndColor(scheduledDate.date, "#008021");

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
                } else {
                  findElAndColor(scheduledDate.date, "#444");
                }
              }
            }
          })
        }
        if (!formatedValue){
          setShowLoader(false);
        }

      } catch (e) {
        setShowLoader(false);
        console.log("checkUserSchedule error")
        console.log(e);
      }
      })
      // inside the .then of users retrieval
      if (formatedValue && isDateAfterToday(formatedValue) && userName) {
        console.log("setModal entry for date after today")
        setModal(formatedValue, usersScheduledDates);
      } else if (formatedValue && userName) {
        setShowLoader(false);
        setModalHeader("")
        setModalMessage("THE DATE SELECTED IS BEFORE TODAY.");
        setModalOptions(false);
        setOpenModal(true);
      } else if (formatedValue) {
        setShowLoader(false);
        setModalMessage(pleaseLoginMessage);
        setModalOptions(false);
        setOpenModal(true);
      }
    }).catch(e => {
      setShowLoader(false);
      console.log("API get error")
      console.log(e);
    })
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

  const setModal = (formatedDate, usersScheduledDates) => {
    try {
      // console.log(usersScheduledDates)
      if (usersScheduledDates !== []) {
        for (let scheduledDate of usersScheduledDates) {
          // console.log("scheduledDate");
          // console.log(scheduledDate);
          if (props.role === "admin") {
            if (formatedDate === scheduledDate.date && scheduledDate.approved) {
              // set message for approved date selected by admin
              setCancelUserename(scheduledDate.username);
              setModalMessage(adminDateApprovedMessage);
              setCancelModal(true);
              setOpenModal(false);
              setShowLoader(false);
              break;
            } else if (formatedDate === scheduledDate.date) {
              // set message for admin selected date not approved
              setCancelUserename(scheduledDate.username);
              setModalMessage(adminDateUnapprovedMessage);
              setCancelModal(true);
              setOpenModal(false);
              setShowLoader(false);
              break;
            } else {
              // set message for non-scheduled dates
              setModalHeader(emptyHeader);
              setModalMessage(adminDateNotScheduledMessage);
              setModalOptions(true);
              setOpenModal(true);
              setShowLoader(false);
            }
          } else {
            console.log(formatedDate)
            console.log(scheduledDate.date)
            if (userName) {
              if (formatedDate === scheduledDate.date && scheduledDate.approved && userName.toLowerCase() === scheduledDate.username) {
                // message for approved date selected same user
                setModalMessage(userAcceptedMessage);
                setCancelModal(true);
                setOpenModal(false);
                setShowLoader(false);
                break;
              } else if (formatedDate === scheduledDate.date && !scheduledDate.approved && userName.toLowerCase() === scheduledDate.username) {
                // message for not approved selected same user
                setModalHeader(emptyHeader);
                setModalMessage(userUnacceptedMessage);
                setCancelModal(true);
                setOpenModal(false);
                setShowLoader(false);
                break;
              } else if (formatedDate === scheduledDate.date) {
                // message for scheduledDate selected not same user
                setModalHeader(emptyHeader);
                setModalMessage(unavailableMessage);
                setModalOptions(false);
                setOpenModal(true);
                setShowLoader(false);
                break;
              } else {
                // message for day available
                setModalHeader(soundsGreatHeader);
                setModalMessage(availableMessage);
                setModalOptions(true);
                setOpenModal(true);
                setShowLoader(false);
              }
            }
          }
        }
      } else {
        // message for day available
        setModalMessage(availableMessage);
        setModalOptions(true);
        setOpenModal(true);
      }

    } catch (e) {
      console.log("checkUserSchedule error");
      console.log(e);
    }
  }

  const findElAndColor = (date, color) => {
    try {
      // console.log(date)
      const element = componentRef.current.querySelector(`abbr[aria-label='${date}'`);
      if (element) {
        let par = element.parentNode
        par.style.background = color;
        if (color === "#EFEFEF") {
          element.style.color = "black";
        } else {
          element.style.color = "white";
        }
      } else {
        // console.log("date not found;");
      }
    } catch (e) {
      console.log("findElAndColor Error")
      console.log(e)
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
      {showLoader && 
        <Loader/>
        }
      {openModal &&
        <SchedulingModal 
          header={modalHeader}
          message={modalMessage}
          openAcceptedModal={setAcceptedModal}
          closeModalHandler={setOpenModal}
          userInfo={userInfo}
          updateUser={setUserInfo}
          findElAndColor={findElAndColor}
          formatedDate={formatedDate}
          modalOptions={modalOptions}
          username={userName}
        />
      }
      {cancelModal &&
        <CancelModal
        message={modalMessage}
        formatedDate={formatedDate}
        username={cancelUsername || userName}
        closeModalHandler={setCancelModal}
        checkUserSchedule={checkUserSchedule}
        findElAndColor={findElAndColor}
      />
      }
      {acceptedModal &&
        <AcceptedModal 
          closeModalHandler={setAcceptedModal}
          formatedDate={formatedDate}
      />
      }
    </div>
  );
}

export default CalendarFun;