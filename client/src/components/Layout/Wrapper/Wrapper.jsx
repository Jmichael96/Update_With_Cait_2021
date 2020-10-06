import React from 'react';

function Wrapper(props) {
  return <main style={{...styles, ...props.styles}} {...props} />;
};

const styles = {
  height: '100%',
  display: 'flex',
  justifyContent: 'space-around',
  flexFlow: 'row wrap',
  alignContent: 'center',
  alignItems: 'center'
};

export default Wrapper;