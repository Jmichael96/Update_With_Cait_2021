import React from 'react';
// components
import SyncLoader from 'react-spinners/SyncLoader';
import Colors from '../../../utils/constants/Colors'
const SmSpinner = ({ }) => {
    const styles = {
    };

    return <SyncLoader size={10} css={styles} color={Colors.primaryBgColor} loading={true} />
};
export default SmSpinner;