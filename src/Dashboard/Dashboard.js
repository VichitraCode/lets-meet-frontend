import React, { useEffect } from 'react';
import ActiveUsersList from './components/ActiveUsersList/ActiveUsersList';
import * as webRTCHandler from '../utils/webRTC/webRTCHandler';
import DirectCall from './components/DirectCall/DirectCall';
import { connect } from 'react-redux';
import DashboardInformation from './components/DashboardInformation/DashboardInformation';
import { callStates } from '../store/actions/callActions';

import './Dashboard.css';

const Dashboard = ({ username, callState }) => {
  // localstream will get set peer coneection will start

  useEffect(() => {
    webRTCHandler.getLocalStream();
  }, []);

  return (
    <div style={{ backgroundImage: `url(https://anteelo.com/wp-content/uploads/2021/05/1595005040.jpg)`,backgroundSize: 'cover' }} 
      className='dashboard_container'>
        <div className='dashboard_left_section'>
        {/* online users kist will get render */}
        <div className='dashboard_active_users_list'>
          <ActiveUsersList />
        </div>
      </div>
      <div className='dashboard_center_section'>
        <div className='dashboard_content_container'>
          <DirectCall />
          {callState !== callStates.CALL_IN_PROGRESS && <DashboardInformation username={username} />}
        </div>
      </div>
     
    
    </div>
  );
};

const mapStateToProps = ({ call, dashboard }) => ({
  ...call,
  ...dashboard
});

export default connect(mapStateToProps)(Dashboard);
