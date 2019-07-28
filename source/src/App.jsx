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
  }

  componentDidMount() {
      request('/me').then(user => {
        this.setState({user});
      });
      this._orderPolling();
  }

  render() {
    console.log(this.state);
    const {user} = this.state;

    return (
      <Router>
        <Switch>
          <Route path="/" exact render={() => <Main user={user} />} />
          <Route path="/map-exp/" render={<Map user={user} />} />
        </Switch>
      </Router>
    );
  }

  _orderPolling() {
    this.interval = setInterval(() => {
      request('/order/status')
        .then(({order} = {}) => {
          if (order) {
            this.setState({order});
          }
        })
        .catch(e => {});
    }, 3000)
  }
}

export default App;
