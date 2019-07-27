/* eslint-disable react/jsx-indent */
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Map from './components/Map';
import Main from './container/Main';

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={Main} />
        <Route path="/map-exp/" component={Map} />
      </Switch>
    </Router>
  );
}

export default App;
