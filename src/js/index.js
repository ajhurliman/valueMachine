import React from 'react';
import { render } from 'react-dom';
import { Router, Route, browserHistory, IndexRoute } from 'react-router';
import App from './components/App';
import Home from './components/Home';
import Bollinger from './components/Bollinger';
import BollingerChart from './components/BollingerChart';
import CorrelationReducer from './components/CorrelationReducer';

render((
  <Router history={browserHistory}>
    <Route path='/' component={App}>

      <IndexRoute component={Home} />

      <Route path='/bollinger' component={Bollinger}>
        <Route path='/bollinger/:symbol' component={BollingerChart} />
      </Route>

      <Route path='/correlationReducer' component={CorrelationReducer} />
    </Route>
  </Router>
), document.getElementById('app'));
