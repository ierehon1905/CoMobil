import React, { useState } from 'react';
import { Input, Button, Icon, Typography, Row, Col, Divider } from 'antd';
import BottomBar from '../../components/BottomBar';
import BottomBarSearching from '../../components/BottomBarSearching';
import BottomBarCarFound from '../../components/BottomBarCarFound';
import BottomBarCarComing from '../../components/BottomBarCarComing';
import BottomBarCarPickup from '../../components/BottomBarCarPickup';

import Map from '../../components/Map';
import Overlay from '../../components/MapSearchingOverlay';
import './style.css';

const { Title } = Typography;

const orderStates = {
  find: 'find',
  wait: 'wait',
  pickup: 'pickup',
  drive: 'drive',
  cpmplete: 'complete',
};

class Main extends React.PureComponent {
  static defaultProps = {
    user: null,
  };

  state = {
    mapComp: {},
    orderState: orderStates.find,
  };

  render() {
    const { user } = this.props;
    const { geocoder, map } = this.state;

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
          {/* <Col span={6}>
            <Icon type="bars" />
          </Col>
          <Col span={12}>
            <Title>КАРэта</Title>
          </Col>
          <Col span={6}>
            <Icon type="user" />
          </Col> */}
          {user ? user.login : null}
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
              // onGeocoderReady={(geocoder) => this.setState({geocoder})}
              // onMapReady={(map) => this.setState({map})}
              getLink={link => this.setState({ mapComp: link })}
            />
            {/* <PinPoint /> */}
            {this.state.orderState == orderStates.wait && <Overlay />}
          </div>
          {this.state.orderState == orderStates.find && (
            <BottomBar
              mapComp={this.state.mapComp}
              //  setPoint={setPoint}
            />
          )}
          {this.state.orderState == orderStates.wait && <BottomBarSearching />}
          {/* <BottomBarCarPickup/> */}
          {this.state.orderState == orderStates.pickup && <BottomBarCarPickup />}
          {this.state.orderState == orderStates.drive && <BottomBarCarComing />}
        </div>
      </>
    );
  }
}

const Kek = () => {
  // const [setPoint, setSetPoint] = useState(null);
};

export default Main;
