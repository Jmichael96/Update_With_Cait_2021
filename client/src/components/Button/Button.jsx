import React from 'react';

// styles
import './button.css';

// utils
import Colors from '../../utils/constants/Colors';

const Button = (props) => {
    return (
        <button className="buttonStyles_btn push" {...props} style={{ backgroundColor: !props.isdelete ? Colors.buttonBg : '#8f0303', border: Colors.buttonBg, color: Colors.buttonText }}>{props.children}</button>
    );
};

export default Button;