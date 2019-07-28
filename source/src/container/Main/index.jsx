import React, { useState } from 'react';
import { Input, Button, Icon, Typography, Row, Col, Divider } from 'antd';
import BottomBar from '../../components/BottomBar';
import BottomBarSearching from '../../components/BottomBarSearching';
import BottomBarCarFound from '../../components/BottomBarCarFound';
import BottomBarCarComing from '../../components/BottomBarCarComing';
import BottomBarCarPickup from '../../components/BottomBarCarPickup';
import BottomBarCarDrive from '../../components/BottomBarCarDrive';
import Map from '../../components/Map';
import Overlay from '../../components/MapSearchingOverlay';
import _ from 'lodash';
import request from '../../request';
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
    order: null,
  };

  state = {
    mapComp: {},
    points: { arrPoint: null, depPoint: null },
    orderState: this.props.order ? this.props.order.state : 'find',
  };

  componentDidUpdate(prevProps, prevState) {
    if (!this.props.order) return;
    if (this.state.points.arrPoint && this.state.points.depPoint && !this.props.order) {
      // request('/order', { route: this.state.points, slot: 1 });
    }
  }

  handleSearch = () => {
    console.log('points', this.state.points);
    // if (!this.props.order) return;

    request('/order', { slot: 1, route: this.state.points })
      .then(res => {
        console.log('got', res);
        this.props.handleSearch(res);
        if (res.order) {
          // this.setState(res.order);
        } else {
          console.log('Xуйня');
        }
      })
      .catch(err => console.log('nothing'));
  };

  render() {
    const { user } = this.props;
    const { points } = this.state;

    const order = this.props.order || { state: '' };
  console.log('order', order);

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
              setPoints={this._setPoints}
              points={points}
              getLink={link => this.setState({ mapComp: link })}
            />
            {/* <PinPoint /> */}
            {order.state == orderStates.find && <Overlay />}
          </div>

          {!order.state && (
            <BottomBar
              mapComp={this.state.mapComp}
              setPoints={this._setPoints}
              handleSearch={this.handleSearch}
            />
          )}

          {order.state == orderStates.find && (
            <BottomBarSearching
              // mapComp={this.state.mapComp}
              // setPoint={setPoint}
              order={order}
            />
          )}
          
          {order.state == orderStates.wait && <BottomBarCarComing order={order} />}

          {/* <BottomBarCarPickup/> */}
          {order.state == orderStates.pickup && <BottomBarCarPickup order={order} />}
          {order.state == orderStates.drive && <BottomBarCarDrive order={order} />}
        </div>
      </>
    );
  }

  _setPoints = points => {
    const newPoints = Object.assign({}, this.state.points, points);
    this.setState({ points: newPoints });
  };
}

const Kek = () => {
  // const [setPoint, setSetPoint] = useState(null);
};

export default Main;
