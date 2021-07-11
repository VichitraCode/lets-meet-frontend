import store from '../../store/store';


let mediaRecorder;

const vp9Codec = "video/webm; codecs=vp=9";
const vp9Options = { mimeType: vp9Codec };
// to store the recording
let recordedChunks = [];
// MediRecorder API used for recording
export const startRecording = () => {
  const remoteStream = store.getState().call.remoteStream;
 
  if (MediaRecorder.isTypeSupported(vp9Codec)) {
    mediaRecorder = new MediaRecorder(remoteStream, vp9Options);
  } else {
    mediaRecorder = new MediaRecorder(remoteStream);
  }

  mediaRecorder.ondataavailable = handleDataAvailable;
  mediaRecorder.start();
};

// stop recording

export const stopRecording = () => {
  mediaRecorder.stop();
};
// download the recorder video
const downloadRecordedVideo = () => {
  const blob = new Blob(recordedChunks, {
    type: "video/webm",
  });

  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  document.body.appendChild(a);
  a.style = "display: none;";
  a.href = url;
  a.download = "recording.webm";
  a.click();
  window.URL.revokeObjectURL(url);
  recordedChunks = [];
};

const handleDataAvailable = (event) => {
  if (event.data.size > 0) {
    recordedChunks.push(event.data);
    downloadRecordedVideo();
  }
};
