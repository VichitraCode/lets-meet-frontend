export const callStates = {
  CALL_UNAVAILABLE: 'CALL_UNAVAILABLE',
  CALL_AVAILABLE: 'CALL_AVAILABLE',
  CALL_REQUESTED: 'CALL_REQUESTED',
  CALL_IN_PROGRESS: 'CALL_IN_PROGRESS'
};

export const CALL_SET_LOCAL_STREAM = 'CALL.SET_LOCAL_STREAM';
export const CALL_SET_CALL_STATE = 'CALL.SET_CALL_STATE';
export const CALL_SET_CALLING_DIALOG_VISIBLE = 'CALL.SET_CALLING_DIALOG_VISIBLE';
export const CALL_SET_CALLER_USERNAME = 'CALL.SET_CALLER_USERNAME';
export const CALL_SET_CALLEE_USERNAME = 'CALL.SET_CALLEE_USERNAME';
export const CALL_SET_CALL_REJECTED = 'CALL.SET_CALL_REJECTED';
export const CALL_SET_REMOTE_STREAM = 'CALL.SET_REMOTE_STREAM';
export const CALL_SET_LOCAL_MICROPHONE_ENABLED = 'CALL.SET_LOCAL_MICROPHONE_ENABLED';
export const CALL_SET_LOCAL_CAMERA_ENABLED = 'CALL.SET_LOCAL_CAMERA_ENABLED';
export const CALL_SET_SCREEN_SHARING_ACTIVE = 'CALL.SET_SCREEN_SHARING_ACTIVE';
export const CALL_RESET_CALL_STATE = 'CALL.RESET_CALL_STATE';
export const CALL_SET_CHAT_MESSAGE = 'CALL.SET_CHAT_MESSAGE';
export const CALL_SET_RECORDING_ACTIVE = 'CALL.SET_RECORDING_ACTIVE';
export const CALL_SET_CONFRENCE_ACTIVE = 'CALL.SET_CONFRENCE_ACTIVE';
// store the localstream
export const setLocalStream = (localStream) => {
  return {
    type: CALL_SET_LOCAL_STREAM,
    localStream
  };
}
  ;
// store the call state
export const setCallState = (callState) => {
  return {
    type: CALL_SET_CALL_STATE,
    callState
  };
};

export const setCallingDialogVisible = (visible) => {
  return {
    type: CALL_SET_CALLING_DIALOG_VISIBLE,
    visible
  };
};
// store the calleruser name
export const setCallerUsername = (callerUsername) => {
  return {
    type: CALL_SET_CALLER_USERNAME,
    callerUsername
  };
}
  ;
// store callee username
export const setCalleeUsername = (calleeUsername) => {
  return {
    type: CALL_SET_CALLEE_USERNAME,
    calleeUsername
  };
}
  ;

export const setCallRejected = (callRejectedDetails) => {
  return {
    type: CALL_SET_CALL_REJECTED,
    callRejected: {
      rejected: callRejectedDetails.rejected,
      reason: callRejectedDetails.reason
    }
  };
};
// store the remote stream
export const setRemoteStream = (remoteStream) => {
  return {
    type: CALL_SET_REMOTE_STREAM,
    remoteStream
  };
}
  ;
// store microphone state
export const setLocalMicrophoneEnabled = (enabled) => {
  return {
    type: CALL_SET_LOCAL_MICROPHONE_ENABLED,
    enabled
  };
};
// store the camera state
export const setLocalCameraEnabled = (enabled) => {
  return {
    type: CALL_SET_LOCAL_CAMERA_ENABLED,
    enabled
  };
};
// store the screenshare state
export const setScreenSharingActive = (active) => {
  return {
    type: CALL_SET_SCREEN_SHARING_ACTIVE,
    active
  };
}
  ;
// store the recording state
export const setRecordingActive = (active) => {
  return {
    type: CALL_SET_RECORDING_ACTIVE,
    active
  };
}
  ;


export const resetCallDataState = () => {
  return {
    type: CALL_RESET_CALL_STATE
  };
};
// store the message recieved
export const setMessage = (messageReceived, messageContent) => {
  return {
    type: CALL_SET_CHAT_MESSAGE,
    message: {
      received: messageReceived,
      content: messageContent
    }
  };
};

