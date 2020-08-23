import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import { ChartStore } from './contexts/ChartContext'

ReactDOM.render(
  <React.StrictMode>
    <ChartStore>
      <App />
    </ChartStore>
  </React.StrictMode>,
  document.getElementById('root')
);
