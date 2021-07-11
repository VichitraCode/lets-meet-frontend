import React from 'react';
import { MdCallEnd, MdMic, MdMicOff, MdVideocam, MdVideocamOff, MdVideoLabel, MdCamera, MdFiberManualRecord } from 'react-icons/md';
import ConversationButton from './ConversationButton';
import { switchForScreenSharingStream, hangUp } from '../../../utils/webRTC/webRTCHandler';
import * as Recordingutils from '../../../utils/RecordingUtils/recordingUtils';

import store from '../../../store/store';
import { setRecordingActive } from '../../../store/actions/callActions';

const styles = {
  buttonContainer: {
    display: 'flex',
    position: 'absolute',
    bottom: '2%',
    left: '35%'
  },
  icon: {
    width: '25px',
    height: '25px',
    fill: '#e7e6e2'
  },
  callicon: {
    width: '50px',
    height: '50px',
    fill: '#e7e6e2'
  }
};

const ConversationButtons = (props) => {
  const {
    localStream,
    localCameraEnabled,
    localMicrophoneEnabled,
    setCameraEnabled,
    setMicrophoneEnabled,
    screenSharingActive
  } = props;
  //  this control the mic while on call
  const handleMicButtonPressed = () => {
    const micEnabled = localMicrophoneEnabled;
    localStream.getAudioTracks()[0].enabled = !micEnabled;
    setMicrophoneEnabled(!micEnabled);
  };
//  this control the camera while calling
  const handleCameraButtonPressed = () => {
    const cameraEnabled = localCameraEnabled;
    localStream.getVideoTracks()[0].enabled = !cameraEnabled;
    setCameraEnabled(!cameraEnabled);
  };
// This control the screen share
  const handleScreenSharingButtonPressed = () => {
    switchForScreenSharingStream();
  };
// This handle the hang up call
  const handleHangUpButtonPressed = () => {
    hangUp();
  };
  // This handle the recording of the remote stream
  const handleRecordingButtonPressed = () => {
    //  
    if (!store.getState().call.recordingActive) {
      Recordingutils.startRecording();
      store.dispatch(setRecordingActive(true));

    } else {
      Recordingutils.stopRecording();
      store.dispatch(setRecordingActive(false));
    }
  };


  return (
    <div style={styles.buttonContainer}>
     {/* ConversationButton is used to reduce the repetetion of code */}
      <ConversationButton onClickHandler={handleMicButtonPressed}>
        {localMicrophoneEnabled ? <MdMic style={styles.icon} /> : <MdMicOff style={styles.icon} />}
      </ConversationButton>

      <ConversationButton onClickHandler={handleCameraButtonPressed}>
        {localCameraEnabled ? <MdVideocam style={styles.icon} /> : <MdVideocamOff style={styles.icon} />}
      </ConversationButton>
      <ConversationButton onClickHandler={handleHangUpButtonPressed}>
        <MdCallEnd style={styles.callicon} />
      </ConversationButton>
      <ConversationButton onClickHandler={handleScreenSharingButtonPressed}>
        {screenSharingActive ? <MdCamera style={styles.icon} /> : <MdVideoLabel style={styles.icon} />}

      </ConversationButton>

      <ConversationButton onClickHandler={handleRecordingButtonPressed}>
        <MdFiberManualRecord style={styles.icon} />

      </ConversationButton>
      {/* recording indicator when recording started */}
      {store.getState().call.recordingActive && <div className='recordingIndicator'> Recording Started

      </div>}

    </div>


  );
};

export default ConversationButtons;
