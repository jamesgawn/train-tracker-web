import React from 'react';
import './Footer.css';

class Footer extends React.Component {
  render() {
    return (
      <footer className="Footer">
        <div className="Footer-container">
          <div className="Footer-attribution">Powered by <a href="http://nationalrail.co.uk">National Rail Enquiries</a></div>
          <div className="Footer-credit">Built by <a href={process.env.REACT_APP_AUTHOR_URL}>{process.env.REACT_APP_AUTHOR_NAME}</a></div>
        </div>
      </footer>
    );
  }
}

export default Footer;