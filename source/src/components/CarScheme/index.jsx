import React from 'react';
import { List } from 'antd';
import Seat from './Seat';
import './style.css';

const Car = props => (
  <div className="car">
    {props.seats.map(s => (
      <Seat number={s.number} bgColor={s.bgColor} />
    ))}
  </div>
);

export default Car;
