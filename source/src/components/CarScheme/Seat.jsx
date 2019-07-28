import React from 'react';
import { List } from 'antd';
import './style.css';

const Seat = props => (
  <div className="carseat" style={{ backgroundColor: props.bgColor }}>
    {props.number}
  </div>
);

export default Seat;
