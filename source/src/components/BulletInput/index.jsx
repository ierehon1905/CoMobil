import React from 'react';
import { Input } from 'antd';
import './style.css';

const BulletInput = props => (
  <div className="bulletinput">
    <div className="bullet" style={{ backgroundColor: props.bulletColor }} />
    <div className="bulletinputwrapper">
      <Input
        {...props}
        size="large"
        style={{ backgroundColor: '#E5E5EA', border: 'none', borderRadius: 8 }}
      />
    </div>
  </div>
);

export default BulletInput;
