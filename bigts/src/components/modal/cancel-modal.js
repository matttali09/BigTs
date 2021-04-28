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

  const cancelAndCloseModal = () => {
    try {

      console.log(userName)

    API.getUser(userName).then(response => {
        console.log(response);
        console.log(response.data.scheduled);
        if (response.data.scheduled) {
            let filtered = response.data.scheduled.filter(function (value, index, arr) {
                return value.date !== props.formatedDate;
            })
            console.log(filtered);
            API.updateUser(userName, {scheduled: filtered}).then(response => {
                console.log(response)
                if (props.checkUserSchedule) {
                  props.findElAndColor(props.formatedDate, "#EFEFEF");
                  props.checkUserSchedule(null);
                }
            })
        }
    })
    } catch (e) {
      console.log("cancel and close error!")
      console.error(e)
    }
    closeModal();
  }
 
    return (
      <div ref={componentRef}>
        <div className="center">
          <Modal
            isOpen={modalIsOpen}
            onAfterOpen={afterOpenModal}
            onRequestClose={closeModal}
            style={customStyles}
            contentLabel="Schedule Cancel Modal"
            ariaHideApp={false}
            closeTimeoutMS={250}
          >
            <h2 ref={_subtitle => (subtitle = _subtitle)}>Cancel This Date.</h2>
            <div className="modal-text">{props.formatedDate}</div>
            <div className="schedule-btns">
                <button className="yes-btn" onClick={cancelAndCloseModal}>Confirm</button>
                <button className="cancel-btn" onClick={closeModal}>Keep</button>
            </div>   
          </Modal>
        </div>
      </div>
    );
}