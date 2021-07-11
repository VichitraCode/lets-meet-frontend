import React, { useRef, useEffect } from 'react';

const styles = {
  videoContainer: {
    width: '73%',
    height: '100%',
    borderRadius: '10px',
    background: 'linear-gradient(168.68deg, #0052c9 1.12%, #0a91db 100%)',
    border: '2px solid #40ff00',
    marginLeft: '10px',
    marginTop: '5px'  
   
  },
  videoElement: {
    width: '100%',
    height: '100%',
    paddingTop: '1px'
   
  }
};

const RemoteVideoView = props => {
  const { remoteStream } = props;
  const remoteVideoRef = useRef();
// it render the remote strem on the screen when call is in progress
  useEffect(() => {
    if (remoteStream) {
      const remoteVideo = remoteVideoRef.current;
      remoteVideo.srcObject = remoteStream;

      remoteVideo.onloadedmetadata = () => {
        remoteVideo.play();
      };
    }
  }, [remoteStream]);

  return (
    <div style={styles.videoContainer} >
      <video style={styles.videoElement} ref={remoteVideoRef} autoPlay />
    </div>
  );
};

export default RemoteVideoView;
