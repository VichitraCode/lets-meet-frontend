import React from 'react';

import './DashboardInformation.css';

const DashboardInformation = ({ username }) => {
  return (
    <div className='dashboard_info_text_container'>
      <span className='dashboard_info_text_title'>
        Hello {username} welcome to
      </span>
      <span className='dashboard_info_text_title'>
                     Let's Meet.
      </span>
      <span className='dashboard_info_text_description'>
        You can start a call by clicking on dial button in the active users list on the left side of screen
      </span>
     
    </div>
  );
};

export default DashboardInformation;
