import React from 'react';
import { Button, Typography } from 'antd';
import Car from '../CarScheme';

import '../BottomBar/style.css';

const { Text } = Typography;

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
    <Car
      seats={[
        { number: 1, bgColor: 'green' },
        {},
        { number: 2, bgColor: 'green' },
        { number: 3, bgColor: 'green' },
      ]}
    />
    <Button
      shape="round"
      size="large"
      style={{
        margin: 20, marginBottom: 40, backgroundColor: '#EF7930', color: 'white',
      }}
    >
      Не ждать за 219 ₽
    </Button>
  </div>
);

export default Searching;
