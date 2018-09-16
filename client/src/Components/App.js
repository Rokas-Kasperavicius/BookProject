import React from 'react';
import Router from './Router';
import PrivateRouter from './PrivateRouter';
import { Switch, withRouter } from 'react-router-dom';
import { NotificationManager } from "react-notifications";
import UserLayout from '../Layouts/UserLayout';
import GuestLayout from '../Layouts/GuestLayout';
import Main from './Main';
import AccountSettings from './AccountSettings';
import Login from './Login';
import Register from './Register';
import NotFound from './404';


class App extends React.Component {
  render () {
    return (
      <Switch>
        { NotificationManager.listNotify = [] }
        <PrivateRouter exact path='/' layout={UserLayout} component={Main} history={this.props.history} location={this.props.location}/>
        <PrivateRouter exact path='/account-settings' layout={UserLayout} component={AccountSettings} history={this.props.history} location={this.props.location}/>
        <Router exact path='/login' layout={GuestLayout} component={Login}/>
        <Router exact path='/register' layout={GuestLayout} component={Register}/>
        <Router exact path='*' layout={GuestLayout} component={NotFound}/>
      </Switch>
    );
  }
}

export default withRouter(App);