import React from 'react';
import ActiveUsersListItem from './ActiveUsersListItem';
import { connect } from 'react-redux';

import './ActiveUsersList.css';

const ActiveUsersList = ({ activeUsers, callState }) => {
  return (
    <div className='active_user_list_container'>
      <div className='activeuserhead'> Online Users</div>
      {/* passing every item of active users to Activeuserlist item 
      that will render the each element of this array */}
      {/* ActiveUsersListItem is called to reduce the repetetion of code */}
      {activeUsers.map((activeUser) =>
        <ActiveUsersListItem
          key={activeUser.socketId}
          activeUser={activeUser}
          callState={callState}
        />)}
    </div>
  );
};

const mapStateToProps = ({ dashboard, call }) => ({
  ...dashboard,
  ...call
});

export default connect(mapStateToProps)(ActiveUsersList);
