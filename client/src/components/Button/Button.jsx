import React from 'react';

// styles
import './button.css';

// utils
import Colors from '../../utils/constants/Colors';

const Button = (props) => {
    return (
        <a className="buttonStyles_btn push" {...props} style={{ backgroundColor: !props.isdelete ? Colors.secondaryBgColor : '#8f0303' }}>{props.children}</a>
    );
};

export default Button;