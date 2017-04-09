/* eslint max-len: [2, 500, 4] */
import React from 'react';
import { IndexRoute, Router, Route, browserHistory } from 'react-router';

import AppHandler from '../../components/AppHandler';

import DashboardSection from '../../components/sections/dashboard';

import LocationListSection from '../../components/sections/location/list/locationListContainer';
import LocationAddSection from '../../components/sections/location/add';
import LocationEditSection from '../../components/sections/location/edit';

import LevelListSection from '../../components/sections/level/list';
import LevelAddSection from '../../components/sections/level/add';
import LevelEditSection from '../../components/sections/level/edit';

import GradeListSection from '../../components/sections/grade/list';
import GradeAddSection from '../../components/sections/grade/add';
import GradeEditSection from '../../components/sections/grade/edit';

import GroupListSection from '../../components/sections/group/list';
import GroupAddSection from '../../components/sections/group/add';
import GroupEditSection from '../../components/sections/group/edit';

import StudentListSection from '../../components/sections/student/list';
import StudentAddSection from '../../components/sections/student/add';
import StudentEditSection from '../../components/sections/student/edit';

import ActivityListSection from '../../components/sections/activity/list';
import ActivityAddSection from '../../components/sections/activity/add';
import ActivityEditSection from '../../components/sections/activity/edit';

import DocumentListSection from '../../components/sections/document/list';
import DocumentAddSection from '../../components/sections/document/add';
import DocumentEditSection from '../../components/sections/document/edit';

import NewsletterListSection from '../../components/sections/newsletter/list';
import NewsletterAddSection from '../../components/sections/newsletter/add';
import NewsletterEditSection from '../../components/sections/newsletter/edit';

import ParentListSection from '../../components/sections/parent/list';
import ParentAddSection from '../../components/sections/parent/add';
import ParentEditSection from '../../components/sections/parent/edit';

export default(
  <Router history={browserHistory}>
    <Route path="/" component={AppHandler}>
      <IndexRoute component={DashboardSection} />

      <Route path="location">
        <IndexRoute component={LocationListSection} />
        <Route path="add" component={LocationAddSection} />
        <Route path=":locationId/edit" component={LocationEditSection} />

        <Route path=":locationId/level">
          <IndexRoute component={LevelListSection} />
          <Route path="add" component={LevelAddSection} />
          <Route path=":levelId/edit" component={LevelEditSection} />

          <Route path=":levelId/grade">
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

      <Route path="activity">
        <IndexRoute component={ActivityListSection} />
        <Route path="add" component={ActivityAddSection} />
        <Route path=":activityId/edit" component={ActivityEditSection} />
      </Route>

      <Route path="document">
        <IndexRoute component={DocumentListSection} />
        <Route path="add" component={DocumentAddSection} />
        <Route path=":documentId/edit" component={DocumentEditSection} />
      </Route>

      <Route path="newsletter">
        <IndexRoute component={NewsletterListSection} />
        <Route path="add" component={NewsletterAddSection} />
        <Route path=":newsletterId/edit" component={NewsletterEditSection} />
      </Route>

      <Route path="parent">
        <IndexRoute component={ParentListSection} />
        <Route path="add" component={ParentAddSection} />
        <Route path=":parentId/edit" component={ParentEditSection} />
      </Route>
    </Route>
  </Router>
);
