import React from 'react';
import { Link } from 'react-router-dom';
import { FaHeart } from 'react-icons/fa';
import { AiOutlineLogin } from 'react-icons/ai';

// styles
import './footer.css';

// components
import FooterImages from './FooterImages/FooterImages';
import Wrapper from '../Wrapper/Wrapper';

const Footer = () => {

  return (
    <footer id="footerStyles_root">
      <article id="footerStyles_innerWrap" >
        <FooterImages />
        <Wrapper>
          <img id="footerStyles_logoImg" alt="logo" src={require('../../../assets/images/UWCNavLogo.PNG')} />
        </Wrapper>
        <Wrapper>
          <p id="footerStyles_copyrightText">
            &copy; Copyright {new Date().getFullYear()}
          </p>
        </Wrapper>
      <div id="footerStyles_ownershipWrap">
        <Link to="/login1996">
          <AiOutlineLogin id="footerStyles_loginIcon" />
        </Link>
        <p id="footerStyles_ownershipText">Built with <FaHeart id="footerStyles_heartIcon" /> by <a target="_blank" rel="noopener noreferrer" href="https://codevh.com">Jeffrey VanHorn</a></p>
      </div>
      </article>
    </footer>
  )
};

export default Footer;