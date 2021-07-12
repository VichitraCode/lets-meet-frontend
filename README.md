# How this project works
When you run this project and enter you name on login page and press submit button your name with correspoding socked id will get saved in an array in the backend server and localstream will get set and client will be ready to recieve call or data and this all will be implemented by getLocalStream()
![alt text](https://github.com/VichitraCode/lets-meet-frontend/blob/master/src/resources/Screenshot%20(159).png)

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


After pressing submit button ,dashboard will open and the user details stored in an array in the backend sever will get rendered in the left side of dashboard and you can call these active users by clicking on dial button corresponding to their names.
When dial button nis clicked startCalling() function is called call state and calle username are dispatched to store and 'pre-offer' message is sent by socket.io to the callee via the signalling server


    
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
![alt text](https://github.com/VichitraCode/lets-meet-frontend/blob/master/src/resources/Screenshot%20(160).png)    
    
 if callees socket server listen 'pre-offer' then handlePreOffer()  function is invoked on the callee side and the caller's details are dispatched to store and call state is set to CALL_REQUESTED then the dialog box appears with option of accepting and rejecting the call
 ![alt text](https://github.com/VichitraCode/lets-meet-frontend/blob/master/src/resources/Screenshot%20(162).png)
 
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

If the call is accepted  then the 'pre-offer-answer' message with the call accepted answer is emitted by socket.io to the caller side via signalling server and call state is setted to CALL_IN_PROGRESS

        export const acceptIncomingCallRequest = () => {
        wss.sendPreOfferAnswer({
            callerSocketId: connectedUserSocketId,
            answer: preOfferAnswers.CALL_ACCEPTED
        });

        store.dispatch(setCallState(callStates.CALL_IN_PROGRESS));
        };

  Now the caller will handle the 'pre-offer-answer' recieved from the callee and the handlePreOfferAnswer()will get invoked and it will send the webrtc offer to the callee and local description will get setted 


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


 Now handleOffer() function will get invoked on the calle side to handle the webrtc offer sent by caller and the local description and remotedescription will get setted for the calle and answer will be sent to the caller.

        export const handleOffer = async (data) => {
        await peerConnection.setRemoteDescription(data.offer);
        const answer = await peerConnection.createAnswer();
        await peerConnection.setLocalDescription(answer);
        wss.sendWebRTCAnswer({
            callerSocketId: connectedUserSocketId,
            answer: answer
        });
        };


Now caller side will recive answer from the calle side and the remote decription for the caller side will get setted


    export const handleAnswer = async (data) => {
    await peerConnection.setRemoteDescription(data.answer);
    };
![alt text](https://github.com/VichitraCode/lets-meet-frontend/blob/master/src/resources/Screenshot%20(163).png)


#Some additional features
Screen share
Record the stream
Chat feature
Tracks hand touch on face and throw the alert
    
