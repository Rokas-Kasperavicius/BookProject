import React from 'react';
import { NotificationContainer } from 'react-notifications';
import App from '../Components/App';

class NotificationManager extends React.Component {
  render() {
    return (
      <div>
        <App />
        <NotificationContainer />
      </div>
    );
  }
}

export default NotificationManager;