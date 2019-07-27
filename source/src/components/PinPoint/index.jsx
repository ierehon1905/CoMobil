import React from 'react';

const PinPoint = props => (
  <div
    style={{
      width: '48px',
      height: '48px',
      borderRadius: '24px',
      backgroundColor: '#D8D8D8',
      position: 'relative',
      display: 'block',
    }}
  >
    <div
      style={{
        height: '42px',
        width: '4px',
        borderRadius: '4px',
        position: 'absolute',
        top: '24px',
        left: '22px',
        backgroundColor: 'inherit',
      }}
    />
  </div>
);

export default PinPoint;
