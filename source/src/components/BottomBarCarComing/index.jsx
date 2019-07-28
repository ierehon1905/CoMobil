import React from 'react';
import { Button, Typography, List } from 'antd';
import Car from '../CarScheme';
import Seat from '../CarScheme/Seat';

import '../BottomBar/style.css';

const { Text } = Typography;

const mockSeats = [
  { number: 1, bgColor: 'green', name: 'vasya' },
  {},
  { number: 2, bgColor: 'green', name: 'pupkin' },
  { number: 3, bgColor: 'green', name: 'loh' },
];

const Searching = props => (
  <div
    className="bottombar"
    style={{ textAlign: 'center', display: 'flex', flexDirection: 'column' }}
  >
    <h1 style={{ fontWeight: 'bold', fontSize: 28, marginTop: 12 }}>Машина найдена!</h1>
    {/* <br /> */}
    {/* <div style={{ fontSize: 18, marginBottom: 10 }}>
      Несколько машин доступно. Выбираем наиболее подходящую.
    </div> */}
    <div>
      <Text code>Белый</Text>
      <Text style={{ fontSize: 18 }}>Huyndai Solaris</Text>
      <Text code>Р777АН</Text>
    </div>
    <Car seats={mockSeats} />
    <List
      dataSource={mockSeats.filter(el => !!el.number)}
      renderItem={item => (
        <List.Item style={{ padding: '6px 34px' }}>
          <Seat bgColor={item.bgColor} number={item.number} />
          <span style={{ marginLeft: 14, fontWeight: 'bold' }}>{item.name}</span>
        </List.Item>
      )}
      style={{ textAlign: 'left' }}
    />
    <Button
      shape="round"
      size="large"
      style={{
        margin: 20,
        marginBottom: 40,
        backgroundColor: '#EF7930',
        color: 'white',
      }}
    >
      Далее
    </Button>
  </div>
);

export default Searching;
