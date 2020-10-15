import React from 'react';
// components
import MoonLoader from 'react-spinners/MoonLoader';
import Colors from '../../../utils/constants/Colors';
// styles 
import './lgSpinner.css';

const SmSpinner = ({ }) => {
    return (
        <div id="lgSpinnerStyles_root">
            <MoonLoader size={75} color={Colors.alternateColor} loading={true} />
        </div>
    );
};
export default SmSpinner;