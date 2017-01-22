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

import GroupListSection from '../../components/sections/group/list';
import GroupAddSection from '../../components/sections/group/add';
import GroupEditSection from '../../components/sections/group/edit';

import StudentListSection from '../../components/sections/student/list';
import StudentAddSection from '../../components/sections/student/add';
import StudentEditSection from '../../components/sections/student/edit';

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

            <Route path=":gradeId/group">
              <IndexRoute component={GroupListSection} />
              <Route path="add" component={GroupAddSection} />
              <Route path=":groupId/edit" component={GroupEditSection} />

              <Route path=":groupId/student">
                <IndexRoute component={StudentListSection} />
                <Route path="add" component={StudentAddSection} />
                <Route path=":studentId/edit" component={StudentEditSection} />

              </Route>

            </Route>
          </Route>
        </Route>
      </Route>
    </Route>
  </Router>
);
