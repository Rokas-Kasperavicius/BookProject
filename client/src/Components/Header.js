import React from 'react'
import { withRouter } from 'react-router-dom';

class Header extends React.Component {

  render () {
    const { history, location } = this.props;

    return (
      <div className="ui secondary pointing menu">
        <a
          className={location.pathname === '/' ? "item active" : "item"}
          onClick={() => history.push('/')}
        >
          Home
        </a>
        <a
          className={location.pathname === '/account-settings' ? "item active" : "item"}
          onClick={() => history.push('/account-settings')}
        >
          Settings
        </a>
        <div className="right menu">
          <a className="ui item" onClick={() => history.push('/login')}>
            Logout
          </a>
        </div>
      </div>
    );
  }
}

export default withRouter(Header);