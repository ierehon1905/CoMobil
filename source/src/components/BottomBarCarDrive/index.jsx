import React from 'react';
import {
  Button, Typography, List, Divider,
} from 'antd';
import Car from '../CarScheme';
import Seat from '../CarScheme/Seat';

import '../BottomBar/style.css';

const { Text } = Typography;

const Searching = props => (
  <div
    className="bottombar"
    style={{ textAlign: 'center', display: 'flex', flexDirection: 'column' }}
  >
    <h1 style={{ fontWeight: 'bold', fontSize: 28, marginTop: 12 }}>Осталось ехать 7 мин</h1>
    {/* <br /> */}
    {/* <div style={{ fontSize: 18, marginBottom: 10 }}>
      Несколько машин доступно. Выбираем наиболее подходящую.
    </div> */}
    <div style={{marginBottom: 50}}>
      <Text style={{ fontSize: 18}}>Прибытие ≈ 9: 48</Text>
    </div>
  </div>
);

export default Searching;
