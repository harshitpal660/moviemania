import React from 'react';
import Modal from 'react-modal';
import styles from "../Styles/warning.module.css"
const WarningModal = ({ isOpen, handleType }) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={handleType}
      contentLabel="18+ Warning"
      className={`desktop ${styles.warning}`}
    >
      <h2>Are you above or below 18</h2>
      <p>This site may contain adult content so select type</p>
      <div className={styles.warningButtons}>
        <button onClick={()=>handleType(true)}>Above 18</button>
        <button onClick={()=>handleType(false)}>Below 18</button>
      </div>
      

    </Modal>
  );
};

export default WarningModal;
