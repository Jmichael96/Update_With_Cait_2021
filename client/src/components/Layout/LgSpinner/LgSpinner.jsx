import React from 'react';
// components
import MoonLoader from 'react-spinners/MoonLoader';
// styles 
import './lgSpinner.css';

// utils
import Colors from '../../../utils/constants/Colors';

const LgSpinner = () => {
    return (
        <div id="lgSpinnerStyles_root">
            <MoonLoader size={75} color={Colors.lgSpinner} loading={true} />
        </div>
    );
};
export default LgSpinner;