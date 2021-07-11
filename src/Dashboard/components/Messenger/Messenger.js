import React, { useState, useEffect } from 'react';
import { sendMessageUsingDataChannel } from '../../../utils/webRTC/webRTCHandler';
import InputEmoji from 'react-input-emoji';
import { appendMessage } from './MessageDisplayer';

import './Messenger.css';


const Messenger = ({ message, setDirectCallMessage, calleeusername }) => {
  const [inputValue, setInputValue] = useState('');
  // on pressing enter messge will be sent and will aloso get
  // added to messge container by passin fit to appendmessege function from messegeDisplayer
  const handleOnKeyDownEvent = (e) => {
    if (e.keyCode === 13 && inputValue !== '') {
      sendMessageUsingDataChannel(inputValue);
      appendMessage(inputValue, true);
      setInputValue('');
    }
  };
  
// call the append messge function after every messege is recieved
  useEffect(() => {
    if (message.content !== '') {
      appendMessage(message.content, false);
    }

    if (message.received) {
     
      setDirectCallMessage(false, '');
    
    }

  }, [message.received,message.content,setDirectCallMessage]);

  return (
    <>

      <div className='messenger_container'>
        <div className='messages_container' id='messages_container'></div>
        <div >
          <InputEmoji  type='text' placeholder="Type your message..." value={inputValue}
            onChange={setInputValue}
            onKeyDown={handleOnKeyDownEvent}/>
            
        </div>
      </div>

    </>
  );
};

export default Messenger;
