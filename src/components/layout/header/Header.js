import React from 'react';
import './Header.css';

class Footer extends React.Component {
  render() {
    return (
      <div className="Header">
        <title className="Header-title">{process.env.REACT_APP_NAME}</title>
      </div>
    );
  }
}

export default Footer;