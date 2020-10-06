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
      <footer>
        <p>&copy; {new Date().getFullYear()}</p>
        <Link to="/login1996">login icon</Link>
      </footer>
    )
  }
}
export default Footer;