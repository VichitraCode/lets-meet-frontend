import store from '../../store/store';
import { setLocalStream, setCallState, callStates, setCalleeUsername, setCallingDialogVisible, setCallerUsername, setCallRejected, setRemoteStream, setScreenSharingActive, resetCallDataState, setMessage } from '../../store/actions/callActions';
import * as wss from '../wssConnection/wssConnection';

const preOfferAnswers = {
  CALL_ACCEPTED: 'CALL_ACCEPTED',
  CALL_REJECTED: 'CALL_REJECTED',
  CALL_NOT_AVAILABLE: 'CALL_NOT_AVAILABLE'
};
// constraints for the video
const defaultConstrains = {
  video: true,
  audio: true
};

const config = {
  iceServers: [{
    urls: 'stun:stun.l.google.com:13902'
  }]
};

let connectedUserSocketId;
let peerConnection;
let dataChannel;
// localstream is fetched by using webrtc
export const getLocalStream = () => {
  navigator.mediaDevices.getUserMedia(defaultConstrains)
    .then(stream => {
      store.dispatch(setLocalStream(stream));
      store.dispatch(setCallState(callStates.CALL_AVAILABLE));
      createPeerConnection();
    })
    .catch(err => {
      console.log('error occured when trying to get an access to get local stream');
      console.log(err);
    });
}
  ;
// peerconnection are created ,localstream and remotestream are added to peerconnection
// datachannel are created for message
const createPeerConnection = () => {
  peerConnection = new RTCPeerConnection(config);
  const localStream = store.getState().call.localStream;

  for (const track of localStream.getTracks()) {
    peerConnection.addTrack(track, localStream);
  }

  peerConnection.ontrack = ({ streams: [stream] }) => {
    store.dispatch(setRemoteStream(stream));
  };




  // incoming data channel messages
  peerConnection.ondatachannel = (event) => {
    const dataChannel = event.channel;

    dataChannel.onopen = () => {
      console.log('peer connection is ready to receive data channel messages');
    };

    dataChannel.onmessage = (event) => {
      store.dispatch(setMessage(true, event.data));
    
    };
  };

  dataChannel = peerConnection.createDataChannel('chat');

  dataChannel.onopen = () => {
    console.log('chat data channel succesfully opened');
  };

  peerConnection.onicecandidate = (event) => {
    console.log('geeting candidates from stun server');
    if (event.candidate) {
      wss.sendWebRTCCandidate({
        candidate: event.candidate,
        connectedUserSocketId: connectedUserSocketId
      });
    }
  };

  peerConnection.onconnectionstatechange = (event) => {
    if (peerConnection.connectionState === 'connected') {
      console.log('succesfully connected with other peer');
    }
  };
};
// preofffer is sent and call states ar chnaged
export const startCalling = (calleeDetails) => {
  connectedUserSocketId = calleeDetails.socketId;
  store.dispatch(setCallState(callStates.CALL_IN_PROGRESS));
  store.dispatch(setCallingDialogVisible(true));
  store.dispatch(setCalleeUsername(calleeDetails.username));
  wss.sendPreOffer({
    callee: calleeDetails,
    caller: {
      username: store.getState().dashboard.username
    }
  });
};
// it handle the recieved prreoffer and accept and reject call option are offeres
export const handlePreOffer = (data) => {
  if (checkIfCallIsPossible()) {
    connectedUserSocketId = data.callerSocketId;
    store.dispatch(setCallerUsername(data.callerUsername));
    store.dispatch(setCallState(callStates.CALL_REQUESTED));
  } else {
    wss.sendPreOfferAnswer({
      callerSocketId: data.callerSocketId,
      answer: preOfferAnswers.CALL_NOT_AVAILABLE
    });
  }
};
// incoming call accepted and preoffer answer is sent
export const acceptIncomingCallRequest = () => {
  wss.sendPreOfferAnswer({
    callerSocketId: connectedUserSocketId,
    answer: preOfferAnswers.CALL_ACCEPTED
  });

  store.dispatch(setCallState(callStates.CALL_IN_PROGRESS));
};

export const rejectIncomingCallRequest = () => {
  wss.sendPreOfferAnswer({
    callerSocketId: connectedUserSocketId,
    answer: preOfferAnswers.CALL_REJECTED
  });
  resetCallData();
};
// it handle the preoffer answer and if call is accepted then the offer is and local description is setted
export const handlePreOfferAnswer = (data) => {
  store.dispatch(setCallingDialogVisible(false));

  if (data.answer === preOfferAnswers.CALL_ACCEPTED) {
    sendOffer();
  } else {
    let rejectionReason;
    if (data.answer === preOfferAnswers.CALL_NOT_AVAILABLE) {
      rejectionReason = 'Callee is not able to pick up the call right now';
    } else {
      rejectionReason = 'Call rejected by the callee';
    }
    store.dispatch(setCallRejected({
      rejected: true,
      reason: rejectionReason
    }));

    resetCallData();
  }
};

const sendOffer = async () => {
  const offer = await peerConnection.createOffer();
  await peerConnection.setLocalDescription(offer);
  wss.sendWebRTCOffer({
    calleeSocketId: connectedUserSocketId,
    offer: offer
  });
};
// remote and local description is setted for the callee and answer is sent to caller
export const handleOffer = async (data) => {
  await peerConnection.setRemoteDescription(data.offer);
  const answer = await peerConnection.createAnswer();
  await peerConnection.setLocalDescription(answer);
  wss.sendWebRTCAnswer({
    callerSocketId: connectedUserSocketId,
    answer: answer
  });
};
// remotedescription isi setted for caller
export const handleAnswer = async (data) => {
  await peerConnection.setRemoteDescription(data.answer);
};

export const handleCandidate = async (data) => {
  try {
    console.log('adding ice candidates');
    await peerConnection.addIceCandidate(data.candidate);
  } catch (err) {
    console.error('error occured when trying to add received ice candidate', err);
  }
};

export const checkIfCallIsPossible = () => {
  if (store.getState().call.localStream === null ||
    store.getState().call.callState !== callStates.CALL_AVAILABLE) {
    return false;
  } else {
    return true;
  }
};

let screenSharingStream;
// replace the stream with the screenshare stream
export const switchForScreenSharingStream = async () => {
  if (!store.getState().call.screenSharingActive) {
    try {
      screenSharingStream = await navigator.mediaDevices.getDisplayMedia({ video: true });
      store.dispatch(setScreenSharingActive(true));
      const senders = peerConnection.getSenders();
      const sender = senders.find(sender => sender.track.kind === screenSharingStream.getVideoTracks()[0].kind);
      sender.replaceTrack(screenSharingStream.getVideoTracks()[0]);
    } catch (err) {
      console.error('error occured when trying to get screen sharing stream', err);
    }
  } else {
    const localStream = store.getState().call.localStream;
    const senders = peerConnection.getSenders();
    const sender = senders.find(sender => sender.track.kind === localStream.getVideoTracks()[0].kind);
    sender.replaceTrack(localStream.getVideoTracks()[0]);
    store.dispatch(setScreenSharingActive(false));
    screenSharingStream.getTracks().forEach(track => track.stop());
  }
}
  ;

export const handleUserHangedUp = () => {
  resetCallDataAfterHangUp();
};

export const hangUp = () => {
  wss.sendUserHangedUp({
    connectedUserSocketId: connectedUserSocketId
  });

  resetCallDataAfterHangUp();
};
// resettting calldata after hangup
const resetCallDataAfterHangUp = () => {
  peerConnection.close();
  peerConnection = null;
  createPeerConnection();
  resetCallData();

  const localStream = store.getState().call.localStream;
  localStream.getVideoTracks()[0].enabled = true;
  localStream.getAudioTracks()[0].enabled = true;

  if (store.getState().call.screenSharingActive) {
    screenSharingStream.getTracks().forEach(track => {
      track.stop();
    });
  }

  store.dispatch(resetCallDataState());
};

export const resetCallData = () => {
  connectedUserSocketId = null;
  store.dispatch(setCallState(callStates.CALL_AVAILABLE));
};
export const sendMessageUsingDataChannel = (message) => {
  dataChannel.send(message);
};

