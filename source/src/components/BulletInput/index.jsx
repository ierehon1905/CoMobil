import React from 'react';
import { Input } from 'antd';
import './style.css';

const BulletInput = props => (
  <div className="bulletinput">
    <div className="bullet" />
    <div className="bulletinputwrapper">
      <Input {...props} />
    </div>
  </div>
);

export default BulletInput;
