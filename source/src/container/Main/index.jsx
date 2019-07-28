import React, { useState } from 'react';
import {
  Input, Button, Icon, Typography, Row, Col, Divider,
} from 'antd';
import BottomBar from '../../components/BottomBar';
import PinPoint from '../../components/PinPoint';
import Map from '../../components/Map';
import Overlay from '../../components/MapSearchingOverlay';
import _ from 'lodash';
import request from '../../request';
import './style.css';

const { Title } = Typography;


class Main extends React.PureComponent {

  static defaultProps = {
    user: null,
    order: null,
  }


  state = {
    mapComp: {},
    points: {arrPoint: null, depPoint: null}
  }

  componentDidUpdate(prevProps, prevState) {
    if(
      (this.state.points.arrPoint && this.state.points.depPoint)
      && !this.props.order
      ) {
        request('/order', {route: this.state.points, slot: 1});
      }
  }

  render() {

    const {user} = this.props;
    const {points} = this.state;

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
              getLink={link => this.setState({mapComp: link})}
            />
            {/* <PinPoint /> */}
          </div>
          <BottomBar
            mapComp={this.state.mapComp}
            setPoints={this._setPoints}
            points={points}
            //  setPoint={setPoint}
          />
        </div>
      </>
    );
  }

  _setPoints = (points) => {
    const newPoints = Object.assign({}, this.state.points, points);
    this.setState({points: newPoints})
  }
}


const Kek = () => {
  
  // const [setPoint, setSetPoint] = useState(null);
};

export default Main;
