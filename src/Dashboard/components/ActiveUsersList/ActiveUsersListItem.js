import React from 'react';
import { startCalling } from '../../../utils/webRTC/webRTCHandler';
import { callStates} from '../../../store/actions/callActions';
import { BiPhoneCall } from "react-icons/bi";
import './ActiveUsersList.css';

const styles = {
  buttonContainer: {
    display: 'flex',
    position: 'absolute',
    bottom: '2%',
    left: '30%'
  },
  icon: {
    width: '25px',
    height: '25px',
    fill: '#e6e5e8'
  }
};
const ActiveUsersListItem = (props) => {
  const { activeUser, callState } = props;
//  This function is called when we click on dial button in the active users list
  const handleListItemPressed = () => {
    // checking if callee is avilable for call
    if (callState === callStates.CALL_AVAILABLE) {
      // This is a function imorted from webrtc handler 
      //This function initiate the call by passing calle details to this function
      //callee detail contain socked id and name
      startCalling(activeUser);
    
    }
  };

  return (
    <div className='active_user_list_item' >
      <div className='active_user_button_container'>

        <button className='activeuserbutton' onClick={handleListItemPressed}>
          <BiPhoneCall style={styles.icon} />
        </button>
      </div>
      <div className='active_user_list_text'>{activeUser.username}
      </div>
   
    </div>
  );
};

export default ActiveUsersListItem;
