import React , { useState } from "react";
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
  
    const [modalIsOpen,setIsOpen] = useState(true);
    const [confirmPassword, setConfirmPassword] = useState();
    const [newPassword, setNewPassword] = useState();
    const [confirmNewPassword, setConfirmNewPassword] = useState();
   
    function afterOpenModal() {
      // references are now sync'd and can be accessed.
      subtitle.style.color = '#000';
    }
   
    function closeModal(){
      console.log(props.userInfo)
      props.closeModalHandler(false);
      setIsOpen(false);
    }
  
    function scheduleAndCloseModal () {
      if (validateFields()) {
        API.updateUser(props.userInfo, {password: newPassword, oldpassword: confirmPassword}).then(response => {
          console.log(response)
          alert(response.data.message)
        });
      }
      closeModal();
    }

    function validateFields () {
      if (confirmPassword && newPassword && confirmNewPassword) {
        if (newPassword === confirmNewPassword) {
          if (confirmPassword !== newPassword) {
            return true;
          } else {
            alert("New password should not be the same as the old one.")
            return false;
          } 
        } else {
          alert("New password fields must match.")
          return false;
        }
      } else {
        alert("Please fill out all fields.")
        return false;
      }
    }
   
      return (
        <div>
          <div className="center">
            <Modal
              isOpen={modalIsOpen}
              onAfterOpen={afterOpenModal}
              onRequestClose={closeModal}
              style={customStyles}
              contentLabel="Change Password Modal"
              ariaHideApp={false}
              closeTimeoutMS={250}
            >
              <h2 ref={_subtitle => (subtitle = _subtitle)}>Hello There!</h2>
              <div className="modal-text">{props.message}</div>
              <form className="change-password-form">
                <div className="form-group">
                  <div className="col-1 col-ml-auto">
                    <label className="form-label" htmlFor="password">
                      Confirm Current Password:{" "}
                    </label>
                  </div>
                  <div className="col-3 col-mr-auto">
                    <input
                      className="form-input"
                      placeholder="Confirm Password"
                      type="password"
                      name="confirmPassword"
                      value={confirmPassword}
                      onChange={e => setConfirmPassword(e.target.value)}
                    />
                  </div>
                </div>
                <div className="form-group">
                  <div className="col-1 col-ml-auto">
                    <label className="form-label" htmlFor="password">
                      New Password:{" "}
                    </label>
                  </div>
                  <div className="col-3 col-mr-auto">
                    <input
                      className="form-input"
                      placeholder="New Password"
                      type="password"
                      name="newPassword"
                      value={newPassword}
                      onChange={e => setNewPassword(e.target.value)}
                    />
                  </div>
                </div>
                <div className="form-group">
                  <div className="col-1 col-ml-auto">
                    <label className="form-label" htmlFor="password">
                      Confirm New Password:{" "}
                    </label>
                  </div>
                  <div className="col-3 col-mr-auto">
                    <input
                      className="form-input"
                      placeholder="New Password"
                      type="password"
                      name="confirmNewPassword"
                      value={confirmNewPassword}
                      onChange={e => setConfirmNewPassword(e.target.value)}
                    />
                  </div>
                </div>
              </form>
              <div>
                <button className="yes-btn" onClick={scheduleAndCloseModal}>Yes!</button>
                <button className="cancel-btn" onClick={closeModal}>Cancel</button>
              </div>
              
            </Modal>
          </div>
        </div>
      );
  }