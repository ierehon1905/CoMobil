import React from 'react';
import { Button } from 'antd';
import '../BottomBar/style.css';

const Searching = props => (
  <div className="bottombar" style={{ textAlign: 'center' }}>
    <h1 style={{ fontWeight: 'bold', fontSize: 28, marginTop: 12 }}>Ищем машину для Вас</h1>
    {/* <br /> */}
    <div style={{ fontSize: 18, marginBottom: 10 }}>
      Несколько машин доступно. Выбираем наиболее подходящую.
    </div>

    <Button shape="round" size="large" style={{ marginBottom: 40 }}>
      Отменить
    </Button>
  </div>
);

export default Searching;
