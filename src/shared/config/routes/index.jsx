/* eslint max-len: [2, 500, 4] */
import React from 'react';
import { IndexRoute, Router, Route, browserHistory } from 'react-router';

import AppHandler from '../../components/AppHandler';

import LocationListSection from '../../components/sections/location/list';
import LocationEditSection from '../../components/sections/location/edit';
import LocationCreateSection from '../../components/sections/location/create';

import PeriodListSection from '../../components/sections/period/list';
import PeriodEditSection from '../../components/sections/period/edit';

export default(
  <Router history={browserHistory}>
    <Route path="/" component={AppHandler}>
      <IndexRoute component={LocationListSection} />

      <Route path="location">
        <IndexRoute component={LocationListSection} />
        <Route path="add" component={LocationCreateSection} />
        <Route path=":locationId/edit" component={LocationEditSection} />

        <Route path=":locationId/period">
          <IndexRoute component={PeriodListSection} />

          <Route path=":periodId/edit" component={PeriodEditSection} />
        </Route>
      </Route>
    </Route>
  </Router>
);
