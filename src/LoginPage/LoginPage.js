import React, { useState } from 'react';
import { connect } from 'react-redux';
import logo from '../resources/logo.ico';
import ss from '../resources/screenshare.ico';
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

            <img src="https://image.flaticon.com/icons/png/512/2598/2598196.png" alt="Cinque Terre" width="500" height="300">
            </img>

            <div className="desc">Record remote stream of the call</div>
          </div>
        </div>
        <div className="responsive">
          <div className="gallery">

            <img src="https://cdn.icon-icons.com/icons2/2298/PNG/512/dont_touch_face_man_hand_no_covid_coronavirus_icon_141614.png" alt="Cinque Terre" width="500" height="300">
            </img>

            <div className="desc">Track your hand to prevent the spread of covid 19</div>
          </div>
        </div>
        <div className="responsive">
          <div className="gallery">

            <img src="https://img-premium.flaticon.com/png/512/2882/premium/2882911.png?token=exp=1625922314~hmac=f863df6cc493aa3be1be13f6480ceaf7" alt="Cinque Terre" width="500" height="300">
            </img>

            <div className="desc">Control mic while calling</div>
          </div>
        </div>
        <div className="responsive">
          <div className="gallery">

            <img src="https://image.flaticon.com/icons/png/512/3567/3567184.png" alt="Cinque Terre" width="500" height="300">
            </img>

            <div className="desc">Control camera while calling</div>
          </div>
        </div>
        <div className="responsive">
          <div className="gallery">

            <img src="https://img-premium.flaticon.com/png/512/3842/premium/3842142.png?token=exp=1625922498~hmac=e3dd4dab1008037a2cea4131d5e650ad" alt="Cinque Terre" width="500" height="300">
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
