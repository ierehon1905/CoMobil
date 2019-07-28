import React from 'react';
import { Button, Typography, List } from 'antd';
import Car from '../CarScheme';
import Seat from '../CarScheme/Seat';
import request from '../../request';

import '../BottomBar/style.css';

const { Text } = Typography;

const mockSeats = [
  { voted: true, name: 'vasya' },
  {},
  { voted: true, name: 'pupkin' },
  { voted: true, name: 'loh' },
];

const handleForward = (id) => {
  request('/order/setState', { state: 'pickup', orderId: id }).then((res) => {
    console.log('res ', res);

    // if (res.order) {
    //   // this.setState(res.order);
    //   console.log('не Xуйня');
    // } else {
    //   console.log('Xуйня');
    // }
  });
};

const Searching = (props) => {
  const members = props.order
    ? props.order.members.map(el => ({ name: el.user.login, voted: el.user.voted }))
    : mockSeats;

  return (
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
      <Car seats={members} />
      <List
        dataSource={members}
        renderItem={(item, i) => (
          <List.Item style={{ padding: '6px 34px' }}>
            <Seat bgColor={item.voted ? 'green' : ''} number={i + 1} />
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
        onClick={() => handleForward(props.order.orderId)}
      >
        Далее
      </Button>
    </div>
  );
};

export default Searching;
