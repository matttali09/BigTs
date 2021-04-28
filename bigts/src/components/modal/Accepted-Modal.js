import React , { useRef } from "react";
import Modal from 'react-modal';

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

export default function AcceptedModal(props) {
  var subtitle;

  const [modalIsOpen,setIsOpen] = React.useState(true);


  const componentRef = useRef(null);
 
  function afterOpenModal() {
    subtitle.style.color = '#000';
  }
 
  function closeModal(){
    props.closeModalHandler(false);
    setIsOpen(false);
  }

  const cancelAndCloseModal = () => {
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
            <h2 ref={_subtitle => (subtitle = _subtitle)}>Your Date Has Been Confirmed!</h2>
            <div className="modal-text">{props.formatedDate}</div>
            <div className="schedule-btns">
                <button className="yes-btn" onClick={cancelAndCloseModal}>Confirm</button>
            </div>   
          </Modal>
        </div>
      </div>
    );
}