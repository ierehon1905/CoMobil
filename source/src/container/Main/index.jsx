import React, { useState } from 'react';
import {
  Input, Button, Icon, Typography, Row, Col, Divider,
} from 'antd';
import BottomBar from '../../components/BottomBar';
import PinPoint from '../../components/PinPoint';
import Map from '../../components/Map';
import './style.css';

const { Title } = Typography;

const Kek = () => {
  const [geocoder, setGeocoder] = useState(null);
  const [map, setMap] = useState(null);
  // const [setPoint, setSetPoint] = useState(null);

  return (
    <>
      <Row
        style={{
          position: 'absolute',
          zIndex: 2,
          left: 0,
          right: 0,
          top: 0,
        }}
      >
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
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-start',
          alignItems: 'stretch',
        }}
      >
        <div className="mainmapcontainer">
          <Map
            onGeocoderReady={setGeocoder}
            onMapReady={setMap}
            //  onSetPointReady={setSetPoint}
          />
          {/* <PinPoint /> */}
        </div>
        <BottomBar
          geocoder={geocoder}
          map={map}
          //  setPoint={setPoint}
        />
      </div>
    </>
  );
};

export default Kek;
