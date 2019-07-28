/* eslint-disable react/jsx-indent */
import React from 'react';

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import request from './request';
import Map from './components/Map';
import Main from './container/Main';
import './App.css';
import './request';

class App extends React.PureComponent {
  state = {
    user: null,
    order: null,
  };

  componentDidMount() {
    request('/me').then(user => {
      this.setState({ user });
    });
    this._orderPolling();
  }

  handleSearch = order => {
    console.log("SETTING NEW ORDER");
    
    this.setState(order);
  };

  render() {
    console.log('state ', this.state);
    const { user } = this.state;

    return <Main user={user} handleSearch={this.handleSearch} order={this.state.order}/>;
  }

  _orderPolling() {
    this.interval = setInterval(() => {
      request('/order/status', { orderId: this.state.order ? this.state.order : '' })
        .then(({ order } = {}) => {
          console.log('order ', this.state.order);
          if (order) {
            this.setState({ order });
          }
        })
        .catch(e => {});
    }, 3000);
  }
}

export default App;
