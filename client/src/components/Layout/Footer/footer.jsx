import React, { Component } from 'react';
import { Link } from 'react-router-dom';

// styles
import './footer.css';

class Footer extends Component {

  openCompany = () => {
    window.open('https://codevh.com');
  }

  render() {
    return (
      <main id="footerStyles_root">
        <footer>
          <p>&copy; {new Date().getFullYear()}</p>
          <Link to="/login1996">login icon</Link>
        </footer>
      </main>
    )
  }
}
export default Footer;