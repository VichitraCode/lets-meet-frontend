import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import store from './store/store';
import App from './App';
import ReactNotification from 'react-notifications-component';
import 'react-notifications-component/dist/theme.css';

import './index.css';

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
    <ReactNotification />
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
