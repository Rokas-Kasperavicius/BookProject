import React from 'react';
import Header from '../Components/Header';

class UserLayout extends React.Component {
  render() {
    return (
      <div>
        <Header />
        {this.props.children}
      </div>
    );
  }
}

export default UserLayout;

