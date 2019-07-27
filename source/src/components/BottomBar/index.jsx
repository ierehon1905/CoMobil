import React, { useState } from 'react';
import {
  Divider, Switch, Icon, Button,
} from 'antd';
import BulletInput from '../BulletInput';
import './style.css';

const BottomBar = () => {
  const [active, setActive] = useState(true);

  return (
    <div className="bottombar">
      <div
        className="bottombarinputwrapper"
        style={{
          'font-size': '18px',
        }}
      >
        <BulletInput placeholder="from" bulletColor="#355CE0" />
        <BulletInput placeholder="to" bulletColor="#EF7930" />
      </div>
      <Divider style={{ margin: 0 }} />
      <div className="bottombarinputwrapper" style={{ fontFamily: 'CirceBold', fontSize: 18 }}>
        <div onClick={() => setActive(!active)} role="button" style={{ display: 'inline-block' }}>
          <Switch defaultChecked checked={active} style={{ marginRight: 8 }} />
          <span>Найти попутчиков</span>
        </div>
        <Divider type="vertical" />
        <Icon type="apple" style={{ marginRight: 8 }} />
        <span>ApplePay</span>
        <Divider style={{ backgroundColor: 'transparent', margin: '5px 0' }} />
        <Button
          type="primary"
          block
          shape="round"
          style={{ backgroundColor: '#EF7930', fontSize: 20, height: 48 }}
        >
          Заказать
        </Button>
      </div>
    </div>
  );
};

export default BottomBar;
