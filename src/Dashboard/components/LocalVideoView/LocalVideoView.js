import React, { useRef, useEffect} from 'react';
import { check } from '../LocalVideoView/detect';
 



const styles = {
  videoContainer: {
    width: '150px',
    height: '150px',
    borderRadius: '10px',
    position: 'absolute',
    top: '2%',
    right: '21%',
    // opacity:'0.9'
    border: '2px solid #40ff00'

  },
  videoElement: {
    width: '100%',
    height: '100%',
    // position: 'center',
    // paddingLeft: '8px'
  }
};


const LocalVideoView = props => {
  const { localStream } = props;
  const localVideoRef = useRef();

 
 


 
//  it render the local stream on screen 
  useEffect(() => {
    if (localStream) {
      const localVideo = localVideoRef.current;
      localVideo.srcObject = localStream;

      localVideo.onloadedmetadata = () => {
        localVideo.play();
      };
      const sourceVideo = localVideoRef.current;
   
    // this function check the hand on your face 
    // this function is imported from detect.js
    // Video got in sourceVideo by the video tag
      check(sourceVideo);
    

    }
    

  }, [localStream]);


  return (
    <div style={styles.videoContainer} className='background_secondary_color'>

      <video style={styles.videoElement} ref={localVideoRef} autoPlay muted />
    
    </div>
  );
};

export default LocalVideoView;
