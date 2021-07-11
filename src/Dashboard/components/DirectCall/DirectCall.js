import React from 'react';
import { connect } from 'react-redux';
import LocalVideoView from '../LocalVideoView/LocalVideoView';
import RemoteVideoView from '../RemoteVideoView/RemoteVideoView';
import CallRejectedDialog from '../CallRejectedDialog/CallRejectedDialog';
import IncomingCallDialog from '../IncomingCallDialog/IncomingCallDialog';
import CallingDialog from '../CallingDialog/CallingDialog';
import { callStates, setCallRejected, setLocalCameraEnabled, setLocalMicrophoneEnabled , setMessage} from '../../../store/actions/callActions';
import ConversationButtons from '../ConversationButtons/ConversationButtons';
import Messenger from '../Messenger/Messenger';


const DirectCall = (props) => {
  const {
    localStream,
    remoteStream,
    callState,
    callerUsername,
    calleeUsername,
    callingDialogVisible,
    callRejected,
    hideCallRejectedDialog,
    setDirectCallMessage,
    message
  } = props;

  return (
    <> 
      {/* localstream is passed to LocalVideoView and got rendered in screen*/}
      <LocalVideoView localStream={localStream} />
      {/* First it is checked that call is in progress then the remote stream is rendered  */}
      {remoteStream && callState === callStates.CALL_IN_PROGRESS && <RemoteVideoView remoteStream={remoteStream} />}
      {callRejected.rejected && <CallRejectedDialog
        reason={callRejected.reason}
        hideCallRejectedDialog={hideCallRejectedDialog}
      />}
      {/* If the call is requested then dialog box will appear that will offer to accept and reject call */}
      {callState === callStates.CALL_REQUESTED && <IncomingCallDialog callerUsername={callerUsername} />}
      {callingDialogVisible && <CallingDialog />}
      {/* If call is in progress then the conversation button got rendered */}
      {remoteStream && callState === callStates.CALL_IN_PROGRESS && <ConversationButtons {...props} />}
      {/* If call is in  progress then the chat components will get rendered by callin Messenger.js */}
      {remoteStream && callState === callStates.CALL_IN_PROGRESS && <Messenger message={message} 
        setDirectCallMessage={setDirectCallMessage} calleeUsername={calleeUsername} />}   
    </>
  );
};

function mapStoreStateToProps ({ call }) {
  return {
    ...call
  };
}

function mapDispatchToProps (dispatch) {
  return {
    hideCallRejectedDialog: (callRejectedDetails) => dispatch(setCallRejected(callRejectedDetails)),
    setCameraEnabled: (enabled) => dispatch(setLocalCameraEnabled(enabled)),
    setMicrophoneEnabled: (enabled) => dispatch(setLocalMicrophoneEnabled(enabled)),
    setDirectCallMessage: (received, content) => dispatch(setMessage(received, content))
  };
}

export default connect(mapStoreStateToProps, mapDispatchToProps)(DirectCall);
