import React from 'react';

const SubmitButton = ({ handleletsgoButtonPressed }) => {
  return (
    <div className='login-page_button_container'>
      <button
        className='login-page_button text_main_color'
        onClick={handleletsgoButtonPressed}
      >
        <span>Let's Go</span>
      </button>
    </div>

  );
};

export default SubmitButton;
