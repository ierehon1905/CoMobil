import React from 'react';
import { Input } from 'antd';
import './style.css';

const BulletInput = props => (
  <div className="bulletinput">
    <div className="bullet" style={{ backgroundColor: props.bulletColor }} />
    <div className="bulletinputwrapper">
      <Input {...props} />
    </div>
  </div>
);

export default BulletInput;
