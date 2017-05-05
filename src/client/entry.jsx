/*eslint-disable */
import React from 'react';
/*eslint-enable */
import 'babel-polyfill';
import { render } from 'react-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import Root from '../shared/containers';

const App = () => (
  <MuiThemeProvider>
    <Root />
  </MuiThemeProvider>
);


render(<App />, document.getElementById('app'));
