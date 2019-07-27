/* eslint-disable react/jsx-indent */
import React from 'react';
import { Input, Button, Icon, Typography, Row, Col, Divider } from 'antd';


const { Title } = Typography;

function App() {
  return (
    <div className="App">
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
      <div>
      <Icon 
        type="pushpin"
        theme="filled"
        />
      </div>
      <div>
        <div>
          <Input placeholder="from" />
          <Input placeholder="to" />
          <Divider />
        </div>
      </div>
    </div>
  )
}

export default App
