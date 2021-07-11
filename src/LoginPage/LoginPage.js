import React, { useState } from 'react';
import { connect } from 'react-redux';
import logo from '../resources/logo.ico';
import ss from '../resources/screenshare.ico';
import recordico from '../resources/recording.ico';
import faceico from '../resources/face.ico';
import camico from '../resources/camera.ico';
import micico from '../resources/mic.ico';
import chatico from '../resources/chat.ico';
import UsernameInput from './components/UsernameInput';
import SubmitButton from './components/SubmitButton';
import { useHistory } from 'react-router-dom';
import { setUsername } from '../store/actions/dashboardActions';
import { registerNewUser } from '../utils/wssConnection/wssConnection';
import './LoginPage.css';

const LoginPage = ({ saveUsername }) => {
  const [username, setUsername] = useState('');

  const history = useHistory();
 //this control the submit button pressed and redirect us to the dashboard
 //with linking out entered name to the generated socked id
  const handleletsgoButtonPressed = () => {
    registerNewUser(username);
    saveUsername(username);
    // redirect to dashboard
    history.push('/dashboard');
  };

  return (
    <div style={{ background: 'linear-gradient(to right,#1c92d2, #f2fcfe)' }} className='login-page_container'>
      <div className='login-page_login_box background_secondary_color'>
        <div className='login-page_logo_container'>
          <img className='login-page_logo_image' src={logo} alt='letsMeet' />
        </div>
        <div className='login-page_title_container'>
          <h2>Let's Meet</h2>
        </div>
        <UsernameInput username={username} setUsername={setUsername} />
        <SubmitButton handleletsgoButtonPressed={handleletsgoButtonPressed} />
      </div>
      {/* This div contains the informaion about the features that are included in this project */}
      <div className='login-page_info'>
        <div className="responsive">
          <div className="gallery">

            <img src={ss} alt="Cinque Terre" width="600" height="400">
            </img>

            <div className="desc">You can share your screen while calling</div>
          </div>
        </div>
        <div className="responsive">
          <div className="gallery">

            <img src={recordico} alt="Cinque Terre" width="500" height="300">
            </img>

            <div className="desc">Record remote stream of the call</div>
          </div>
        </div>
        <div className="responsive">
          <div className="gallery">

            <img src={faceico} alt="Cinque Terre" width="500" height="300">
            </img>

            <div className="desc">Track your hand to prevent the spread of covid 19</div>
          </div>
        </div>
        <div className="responsive">
          <div className="gallery">

            <img src={micico} alt="Cinque Terre" width="500" height="300">
            </img>

            <div className="desc">Control mic while calling</div>
          </div>
        </div>
        <div className="responsive">
          <div className="gallery">

            <img src={camico} alt="Cinque Terre" width="500" height="300">
            </img>

            <div className="desc">Control camera while calling</div>
          </div>
        </div>
        <div className="responsive">
          <div className="gallery">

            <img src={chatico} alt="Cinque Terre" width="500" height="300">
            </img>

            <div className="desc">Chat with your friend</div>
          </div>

        </div>
      </div>


    </div>
  );
};

const mapActionsToProps = (dispatch) => {
  return {
    saveUsername: username => dispatch(setUsername(username))
  };
};
//  connecting action from store to this page
export default connect(null, mapActionsToProps)(LoginPage);
