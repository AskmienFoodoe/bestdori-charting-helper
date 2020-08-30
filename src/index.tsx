import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import { ChartStore } from './contexts/ChartContext'
import { BrowserRouter, Route } from 'react-router-dom'
import SonolusConverter from './components/SonolusConverter';

ReactDOM.render(
  <React.StrictMode>
    <ChartStore>
      <BrowserRouter>
        <Route path="/" exact component={App} />
        <Route path="/sonolus-converter" component={SonolusConverter} />
      </BrowserRouter>
    </ChartStore>
  </React.StrictMode>,
  document.getElementById('root')
);