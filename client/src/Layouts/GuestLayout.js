import React from 'react';

class GuestLayout extends React.Component {
  render() {
    return (
      <div>
        {this.props.children}
      </div>
    );
  }
}

export default GuestLayout;

