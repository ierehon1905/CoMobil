import React from 'react';
import { Divider } from 'antd';
import BulletInput from '../BulletInput';
import './style.css';

const BottomBar = () => (
  <div className="bottombar">
    <div className="bottombarinputwrapper">
      <BulletInput placeholder="from" />
      <BulletInput placeholder="to" />
    </div>
    <Divider />
  </div>
);

export default BottomBar;
