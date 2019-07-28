import React from 'react';
import { List } from 'antd';
import Seat from './Seat';
import './style.css';

const mockSeats = [
  { voted: true, name: 'vasya' },
  {},
  { voted: false, name: 'pupkin' },
  { voted: true, name: 'loh' },
];

const Car = props => (
  <div className="car">
    {mockSeats.map((s, i) => (
      <Seat number={i + 1} bgColor={s.voted ? 'green' : ''} />
    ))}
  </div>
);

export default Car;
