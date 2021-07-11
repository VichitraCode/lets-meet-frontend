import React from 'react';
import { acceptIncomingCallRequest, rejectIncomingCallRequest } from '../../../utils/webRTC/webRTCHandler';

import './IncomingCallDialog.css';

const IncomingCallDialog = ({ callerUsername }) => {
//  This will handle the accept the button and will call the acceptIncomingCallRequest form webrtc handler
  const handleAcceptButtonPressed = () => {
    acceptIncomingCallRequest();
  };
// this will handle the call rejection
  const handleRejectButtonPressed = () => {
    rejectIncomingCallRequest();
  };

  return (
    <div className='direct_call_dialog background_secondary_color'>
      <span className='direct_call_dialog_caller_name'>{callerUsername}</span>
      <div className='direct_call_dialog_button_container'>
        <button className='direct_call_dialog_accept_button' onClick={handleAcceptButtonPressed}>
          Accept
        </button>
        <button className='direct_call_dialog_reject_button' onClick={handleRejectButtonPressed}>
          Reject
        </button>
      </div>
    </div>
  );
};

export default IncomingCallDialog;
