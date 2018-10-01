import React from 'react';
import Router from './Router';
import { NotificationManager } from 'react-notifications';
import { connect } from "react-redux";
import { timeout } from '../Constants/Constants';

const PrivateRouter = ({ history, layout, component, logged_user }) => {

  return (
    <div>
      {logged_user.token && document.cookie.includes(`token=${logged_user.token}`) ?
        <Router layout={layout} component={component}/> : Redirect(history)
      }
    </div>
)};

const Redirect = history => {
  NotificationManager.error('Session Timeout', '', timeout);
  history.push('/login');
};


const mapStateToProps = state => {
  return { logged_user: state.state.logged_user };
};

export default connect(mapStateToProps)(PrivateRouter);