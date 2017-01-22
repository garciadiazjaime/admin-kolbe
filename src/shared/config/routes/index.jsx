/* eslint max-len: [2, 500, 4] */
import React from 'react';
import { IndexRoute, Router, Route, browserHistory } from 'react-router';

import AppHandler from '../../components/AppHandler';
import LocationListSection from '../../components/sections/location/list';
import LocationEditSection from '../../components/sections/location/edit';

import PeriodListSection from '../../components/sections/period/list';
// <IndexRoute component={LocationListSection} />

export default(
  <Router history={browserHistory}>
    <Route path="/" component={AppHandler}>
      <IndexRoute component={LocationListSection} />

      <Route path="location">
        <IndexRoute component={LocationListSection} />

        <Route path=":locationId/edit" component={LocationEditSection} />

        <Route path=":locationId/period">
          <IndexRoute component={PeriodListSection} />
        </Route>
      </Route>
    </Route>
  </Router>
);
