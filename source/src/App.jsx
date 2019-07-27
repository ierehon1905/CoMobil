/* eslint-disable react/jsx-indent */
import React from 'react';
import {
  Input, Button, Icon, Typography, Row, Col,
} from 'antd';

import { BrowserRouter as Router, Route } from 'react-router-dom';

import Map from './components/Map';
import './App.css';

const Kek = () => (
  <React.Fragment>
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
    <div>
      <Input placeholder="from" />
      <Input placeholder="to" />
    </div>
    </div>
  </React.Fragment>
);


const { Title } = Typography;

function App() {
  return (
    <div className="App">
       <Router>
          <Route path="/" exact component={Kek} />
          <Route path="/map-exp/" component={Map} />
       </Router>
    </div>
  );
}

export default App;
