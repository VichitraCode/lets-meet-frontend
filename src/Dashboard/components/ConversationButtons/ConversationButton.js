import React from 'react';
import './Conversationbutton.css';



const ConversationButton = (props) => {
  const { onClickHandler } = props;
  return (
    <button className='button' onClick={onClickHandler}>
      {props.children}
    </button>
  );
};

export default ConversationButton;
