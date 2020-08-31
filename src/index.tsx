import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import { ChartStore } from './contexts/ChartContext'
import { BrowserRouter, Route, Link } from 'react-router-dom'
import SonolusConverter from './components/SonolusConverter';
import { Menu, Sticky } from 'semantic-ui-react';

ReactDOM.render(
  <React.StrictMode>
    <ChartStore>
      <BrowserRouter>
        <Sticky>
          <Menu size='massive'>
            <Menu.Item as={Link} to='/' content='Charting Tools' />
            <Menu.Item as={Link} to='/sonolus-converter' content='Bestdori-to-Sonolus Converter' />
          </Menu>
        </Sticky>
        <Route path="/" exact component={App} />
        <Route path="/sonolus-converter" component={SonolusConverter} />
      </BrowserRouter>
    </ChartStore>
  </React.StrictMode>,
  document.getElementById('root')
);