import React from 'react';
import { Provider } from 'react-redux';
import configureStore from '../stores';
import routes from '../config/routes';

const store = configureStore();

export default function Root() {
  return (
    <Provider store={store}>
      {routes}
    </Provider>
  );
}
