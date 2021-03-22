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
    animation             : 'fadeIn ease 10s',
    textAlign             : 'center',
    animation             : 'fadeOut ease 60s'
  }
};

export default function MyModal(props) {
  var subtitle;

  const [modalIsOpen,setIsOpen] = React.useState(true);

  const componentRef = useRef(null);
 
  function afterOpenModal() {
    // references are now sync'd and can be accessed.
    subtitle.style.color = '#000';
  }
 
  function closeModal(){
    props.closeModalHandler(false);
    setIsOpen(false);
  }

  function scheduleAndCloseModal () {
    if (props.findElAndColor) {
      props.findElAndColor(props.formatedDate, "yellow");
      API.updateUser(props.userInfo.username, props.userInfo);
    }
    closeModal();
  }

  // move to 
  function formatDate() {
    // if (input exists) {
    //   const formatedValue = new Intl.DateTimeFormat('en-US', {year: 'numeric', month: 'long', day: 'numeric'}).format(nextValue);
    // }
    let thisValue;
    console.log("props.user");
    console.log(props);
    const element = componentRef.current.querySelector(`input[type="date"]`);
    console.log("element");
    console.log(element);

    if(element) {
      if (element.value) {
        element.value ? thisValue = new Intl.DateTimeFormat('en-US', {year: 'numeric', month: 'long', day: 'numeric'}).format(element.value) : console.log("no date selected");
        let userInfo = {user: props.userInfo, scheduled: thisValue};
        console.log(userInfo);
        // API.updateUser(props.userInfo, userInfo);
        scheduleAndCloseModal();
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
              <input type="date" name="date" onClick={formatDate}/>
            }
            {props.modalOptions ? (
              <div className="schedule-btns">
                <button className="yes-btn" onClick={scheduleAndCloseModal}>Yes!</button>
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