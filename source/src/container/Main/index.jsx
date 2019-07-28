import React, { useState } from 'react';
import {
  Input, Button, Icon, Typography, Row, Col, Divider,
} from 'antd';
import BottomBar from '../../components/BottomBarCarComing';
import PinPoint from '../../components/PinPoint';
import Map from '../../components/Map';
import Overlay from '../../components/MapSearchingOverlay';
import './style.css';

const { Title } = Typography;

const Kek = () => {
  const [geocoder, setGeocoder] = useState(null);
  const [map, setMap] = useState(null);
  // const [setPoint, setSetPoint] = useState(null);

  return (
    <>
      <div
        style={{
          position: 'absolute',
          display: 'flex',
          justifyContent: 'space-between',
          zIndex: 2,
          left: 0,
          right: 0,
          top: 0,
          padding: '10px',
        }}
      >
        <Icon type="bars" style={{ fontSize: '50px' }} />

        <Title style={{ marginTop: '10px' }}>CARэта</Title>

        <Icon type="user" style={{ fontSize: '50px' }} />
      </div>
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
          {/* <Overlay /> */}
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
