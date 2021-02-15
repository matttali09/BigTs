import React from "react";
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
    textAlign             : 'center'
  }
};

export default function MyModal(props) {
  var subtitle;

  const [modalIsOpen,setIsOpen] = React.useState(true);
 
  function afterOpenModal() {
    // references are now sync'd and can be accessed.
    subtitle.style.color = '#000';
  }
 
  function closeModal(event){
    if (event.target.className === "yes-btn") {
      props.findElAndColor(props.formatedDate, "yellow");
      API.updateUser(props.userInfo.username, props.userInfo);
    }
    props.closeModalHandler(false);
    setIsOpen(false);
  }
 
    return (
      <div>
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
            <h2 ref={_subtitle => (subtitle = _subtitle)}>Hello There!</h2>
            <div className="modal-text">{props.message}</div>
            {props.modalOptions ? (
              <div>
                <button className="yes-btn" onClick={closeModal}>Yes!</button>
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