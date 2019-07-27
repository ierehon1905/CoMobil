import React from 'react';
import {
  Input, Button, Icon, Typography, Row, Col, Divider,
} from 'antd';
import BottomBar from '../../components/BottomBar';
import PinPoint from '../../components/PinPoint';
import './style.css';

const { Title } = Typography;

const Kek = () => (
  <>
    <Row>
      <Col span={6}>
        <Icon type="bars" />
      </Col>
      <Col span={12}>
        <Title>КАРэта</Title>
      </Col>
      {/* <Button type="default">|||</Button> */}
      <Col span={6}>
        <Icon type="user" />
      </Col>
    </Row>
    <div
      style={{
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
      }}
    >
      <PinPoint />
    </div>
    <BottomBar />
  </>
);

export default Kek;
