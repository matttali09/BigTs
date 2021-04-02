import React , { useRef } from "react";
import Modal from 'react-modal';
import API from "../../utils/API";

const customStyles = {
  overlay: {
    zIndex:  '100',
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.75)'
  },
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)',
    background            : 'darkgrey',
    textAlign             : 'center',
  }
};

export default function MyModal(props) {
  var subtitle;

  const [modalIsOpen,setIsOpen] = React.useState(true);
  const [modalOptions, setModalOptions] = React.useState(true);
  const [formatedDate, setFormatedDate] = React.useState(true);

  const [userInfo, setUserInfo] = React.useState(false);
  const [modalMessage, setModalMessage] = React.useState(false);

  const userName = props.username;


  const componentRef = useRef(null);
 
  function afterOpenModal() {
    // references are now sync'd and can be accessed.
    // console.log(Time.now())
    subtitle.style.color = '#000';
  }
 
  function closeModal(){
    props.closeModalHandler(false);
    setIsOpen(false);
  }

  function scheduleAndCloseModal (event) {
    if (props.findElAndColor && props.formatedDate && userName) {
      // props.scheduled = {date: props.formatedDate, approved: true}
      props.findElAndColor(props.formatedDate, "#008074");

      API.getUser(userName).then(response => {
        console.log(response.data.scheduled)
        let userData = response.data.scheduled;
        userData.push({date: props.formatedDate, approved: true, username: userName, typeKey: "EO"})
        console.log("userData")
        console.log(userData)
        API.updateUser(userName, {scheduled: userData}).then(response => {
          console.log("response")
          console.log(response)
        })
      })

      

    } else {

      console.log("THIS RAN6")
      API.getUser(userName).then(response => {
        console.log(response.data.scheduled)
        let userData = response.data.scheduled;
        userData.push({date: formatedDate, approved: true, username: userName, typeKey: "EO"})
        console.log("userData")
        console.log(userData)
        API.updateUser(userName, {scheduled: userData}).then(response => {
          console.log("response")
          console.log(response)
        })
      })

    }
    
    closeModal();
  }

  // move to 
  function formatDate(event) {
    let thisValue = new Date(event.target.value);
    const formatedValue = new Intl.DateTimeFormat('en-US', {year: 'numeric', month: 'long', day: 'numeric'}).format(thisValue);

    console.log("props.user");
    console.log(props);
    console.log(userName)

    console.log("userInfo");
    console.log(userInfo);

    setFormatedDate(formatedValue)
    checkUserSchedule(formatedValue);
  }

  const checkUserSchedule = formatedValue => {
    let usersScheduledDates = [];

    if (props.modalKey) {
      setUserInfo({scheduled: {date: formatedValue, approved: true, username: userName, typeKey: props.modalKey}})
    } else {
      setUserInfo({scheduled: {date: formatedValue, approved: true, username: userName, typeKey: "EO"}})
    }
    console.log({scheduled: {date: formatedValue, approved: true, username: userName, typeKey: "EO"}})


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
              } else {
                scheduledDate.username = user.username;
                usersScheduledDates.push(scheduledDate);
              }

            // for regular users
            } else {
              // scheduled date for this user which has been approved
              if (scheduledDate.approved && user.username === userName.toLowerCase()) {
                scheduledDate.username = user.username;;
                usersScheduledDates.push(scheduledDate);

                // scheduled date for this user which has not been approved
              } else if (!scheduledDate.approved && user.username === userName.toLowerCase()) {
                scheduledDate.username = user.username;
                usersScheduledDates.push(scheduledDate)
              
                // scheduled date for a different user which has not been approved
              } else {
                scheduledDate.username = user.username;
                usersScheduledDates.push(scheduledDate)
              }
            }
          }
        })
      })
      // inside the .then of users retrieval
      if (formatedValue && isDateAfterToday(formatedValue)) {
        setModal(formatedValue, usersScheduledDates);
      } else if (formatedValue) {
        console.log("Date before today")
        setModalMessage("BUT THE DATE SELECTED IS BEFORE TODAY");
        setModalOptions(false);
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
          setModalMessage("You Have Already Approved This Date.")
          setModalOptions(false);
          break;
        } else if (formatedDate === scheduledDate.date) {
          // set message for admin selected date not approved
          setModalMessage("You Have Not Approved This Date.")
          setModalOptions(false);
          break;
        } else {
          // set message for non-scheduled dates
          setModalMessage("Confirm Blackout Date!")
          setModalOptions(true);
        }
      } else {
        console.log(formatedDate)
        console.log(scheduledDate.date)
        if (formatedDate === scheduledDate.date && scheduledDate.approved && userName.toLowerCase() === scheduledDate.username) {
          // message for approved date selected same user
          setModalMessage("You Have Already Been Approved for This Date.")
          setModalOptions(false);
          break;
        } else if (formatedDate === scheduledDate.date && !scheduledDate.approved && userName.toLowerCase() === scheduledDate.username) {
          // message for not approved selected same user
          setModalMessage("You have Not Been Approved for This Date.")
          setModalOptions(false);
          break;
        } else if (formatedDate === scheduledDate.date) {
          // message for scheduledDate selected not same user
          setModalMessage("This Date is Already Scheduled for Another User.")
          setModalOptions(false);
          break;
        } else {
          // message for day available
          setModalMessage("Great Just Confirm Your Adventure Now!")
          setModalOptions(true);
        }
      }
    }
  }
 
    return (
      <div ref={componentRef}>
        <div className="center">
          <Modal
            isOpen={modalIsOpen}
            onAfterOpen={afterOpenModal}
            onRequestClose={closeModal}
            style={customStyles}
            contentLabel="Schedule Confirmation Modal"
            ariaHideApp={false}
            closeTimeoutMS={250}
          >
            <h2 ref={_subtitle => (subtitle = _subtitle)}>Sounds Great!</h2>
            
            <div className="modal-text">{props.message}</div>
            {props.message === "Go Ahead and Pick your date now!"  && 
              <input type="date" name="date" onChange={formatDate}/>
            }
            {modalMessage  && 
              <div className="modal-text">{modalMessage}</div>
            }
            {props.modalOptions && modalOptions ? (
              <div className="schedule-btns">
                <button className="yes-btn" onClick={scheduleAndCloseModal}>Confirm!</button>
                <button className="cancel-btn" onClick={closeModal}>Cancel</button>
              </div>
            ) : (
              <button style={{"marginLeft": "0"}} className="cancel-btn" onClick={closeModal}>Cancel</button>
            )}
            
          </Modal>
        </div>
      </div>
    );
}