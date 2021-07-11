import React from 'react';
import './CallingDialog.css';
import { hangUp } from '../../../utils/webRTC/webRTCHandler';
import { MdCallEnd } from 'react-icons/md';

const styles = {
  buttonContainer: {
    marginTop: '10px',
    width: '40px',
    height: '40px',
    borderRadius: '40px',
    border: '2px solid #ff0000',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  }
};

const CallingDialog = () => {
  // called when hangup button is pressed in the calling dialog
  const handleHangUpButtonPressed = () => {
    // this function is imported from webrtc handler
    // This reset the call data like call state
    hangUp();
  };

  return (
    // this will appear when we call someone as calling dialog
    <div className='direct_calling_dialog background_secondary_color'>
      <span>Calling</span>
      <div style={styles.buttonContainer} onClick={handleHangUpButtonPressed}>
        <MdCallEnd style={{ width: '20px', height: '20px', fill: '#ff0000' }} />
      </div>
    </div>
  );
};

export default CallingDialog;
