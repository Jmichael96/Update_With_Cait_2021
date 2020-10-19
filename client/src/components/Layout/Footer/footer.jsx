import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaHeart } from 'react-icons/fa';
import { AiOutlineLogin } from 'react-icons/ai';

// styles
import './footer.css';

// components
import FooterImages from './FooterImages/FooterImages';
import Wrapper from '../Wrapper/Wrapper';

// utils
import Colors from '../../../utils/constants/Colors';

const Footer = () => {

  return (
    <footer id="footerStyles_root">
      <article id="footerStyles_innerWrap" style={{ backgroundColor: Colors.secondaryBgColor }}>
        <FooterImages />
        <Wrapper>
          <img id="footerStyles_logoImg" alt="logo" src={require('../../../assets/images/UWCNavLogo.PNG')} />
        </Wrapper>
        <Wrapper>
          <p id="footerStyles_copyrightText">
            &copy; Copyright {new Date().getFullYear()}
          </p>
        </Wrapper>
      </article>
      <div id="footerStyles_ownershipWrap">
        <Link to="/login1996">
          <AiOutlineLogin id="footerStyles_loginIcon" />
        </Link>
        <p id="footerStyles_ownershipText">Built with <FaHeart id="footerStyles_heartIcon" /> by Jeffrey VanHorn</p>
      </div>
    </footer>
  )
};

export default Footer;