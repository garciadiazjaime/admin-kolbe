/* eslint max-len: [2, 500, 4] */
import React from 'react';
import { IndexRoute, Router, Route, browserHistory } from 'react-router';

import AppHandler from '../../components/AppHandler';

import LocationListSection from '../../components/sections/location/list';
import LocationAddSection from '../../components/sections/location/add';
import LocationEditSection from '../../components/sections/location/edit';

import PeriodListSection from '../../components/sections/period/list';
import PeriodAddSection from '../../components/sections/period/add';
import PeriodEditSection from '../../components/sections/period/edit';

import GradeListSection from '../../components/sections/grade/list';
import GradeAddSection from '../../components/sections/grade/add';
import GradeEditSection from '../../components/sections/grade/edit';

export default(
  <Router history={browserHistory}>
    <Route path="/" component={AppHandler}>
      <IndexRoute component={LocationListSection} />

      <Route path="location">
        <IndexRoute component={LocationListSection} />
        <Route path="add" component={LocationAddSection} />
        <Route path=":locationId/edit" component={LocationEditSection} />

        <Route path=":locationId/period">
          <IndexRoute component={PeriodListSection} />
          <Route path="add" component={PeriodAddSection} />
          <Route path=":periodId/edit" component={PeriodEditSection} />

          <Route path=":periodId/grade">
            <IndexRoute component={GradeListSection} />
            <Route path="add" component={GradeAddSection} />
            <Route path=":gradeId/edit" component={GradeEditSection} />
          </Route>
        </Route>
      </Route>
    </Route>
  </Router>
);
