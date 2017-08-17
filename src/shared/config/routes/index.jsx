/* eslint max-len: [2, 500, 4] */
import React from 'react';
import { IndexRoute, Router, Route, browserHistory } from 'react-router';

import AppHandler from '../../components/AppHandler';
import LoginSection from '../../components/sections/user/login';
import LogoutSection from '../../components/sections/user/logout';

import DashboardSection from '../../components/sections/dashboard';

import LocationShowSection from '../../components/sections/location/show';

import LevelListSection from '../../components/sections/level/list';
import LevelAddSection from '../../components/sections/level/add';
import LevelEditSection from '../../components/sections/level/edit';
import LevelShowSection from '../../components/sections/level/show';

import GradeListSection from '../../components/sections/grade/list';
import GradeAddSection from '../../components/sections/grade/add';
import GradeEditSection from '../../components/sections/grade/edit';

import GroupListSection from '../../components/sections/group/list';
import GroupShowSection from '../../components/sections/group/show';
import GroupAddSection from '../../components/sections/group/add';
import GroupEditSection from '../../components/sections/group/edit';
import GroupUploadSection from '../../components/sections/group/upload';

import StudentParentListSection from '../../components/sections/student/list/parent';
import StudentGroupListSection from '../../components/sections/student/list/group';
import StudentAddSection from '../../components/sections/student/add';
import StudentEditSection from '../../components/sections/student/edit';

import ActivityListSection from '../../components/sections/activity/list';
import ActivityShowSection from '../../components/sections/activity/show';
import ActivityCalendarSection from '../../components/sections/activity/list/calendar';
import ActivityAddSection from '../../components/sections/activity/add';
import ActivityEditSection from '../../components/sections/activity/edit';

import DocumentListSection from '../../components/sections/document/list';
import DocumentShowSection from '../../components/sections/document/show';
import DocumentAddSection from '../../components/sections/document/add';
import DocumentEditSection from '../../components/sections/document/edit';

import NewsletterListSection from '../../components/sections/newsletter/list';
import NewsletterShowSection from '../../components/sections/newsletter/show';
import NewsletterAddSection from '../../components/sections/newsletter/add';
import NewsletterEditSection from '../../components/sections/newsletter/edit';

import ParentListSection from '../../components/sections/parent/list';
import ParentShowSection from '../../components/sections/parent/show';
import ParentAddSection from '../../components/sections/parent/add';
import ParentEditSection from '../../components/sections/parent/edit';

import AuthUtil from '../../utils/authUtil';

function requireAuth(nextState, replaceState) {
  if (!AuthUtil.isLoggedIn()) {
    replaceState({
      state: {
        nextPathname: nextState.location.pathname,
      },
      pathname: '/login',
    });
  }
}

export default(
  <Router history={browserHistory}>
    <Route path="/login" component={LoginSection} />
    <Route path="/logout" component={LogoutSection} />

    <Route path="/" component={AppHandler} onEnter={requireAuth}>

      <Route path="location">
        <Route path=":locationId" component={LocationShowSection} />

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
                <IndexRoute component={StudentGroupListSection} />
                <Route path="add" component={StudentAddSection} />
                <Route path=":studentId/edit" component={StudentEditSection} />
              </Route>
            </Route>
          </Route>
        </Route>
      </Route>

      <Route path="school/:schoolId" component={DashboardSection} />

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

        <Route path=":parentId">
          <IndexRoute component={ParentShowSection} />
          <Route path="edit" component={ParentEditSection} />
          <Route path="student" component={StudentParentListSection} />

          <Route path="group/:groupId">
            <Route path="activity">
              <IndexRoute component={ActivityListSection} />
              <Route path="calendar" component={ActivityCalendarSection} />
              <Route path=":activityId" component={ActivityShowSection} />
            </Route>

            <Route path="document" component={DocumentListSection} />
            <Route path="document/:documentId/show" component={DocumentShowSection} />

            <Route path="newsletter" component={NewsletterListSection} />
            <Route path="newsletter/:newsletterId/show" component={NewsletterShowSection} />
          </Route>
        </Route>
      </Route>

      <Route path="student/:studentId/edit" component={StudentEditSection} />

      <Route path="group/:groupId">
        <IndexRoute component={GroupShowSection} />
        <Route path="upload" component={GroupUploadSection} />
        <Route path="student" component={StudentGroupListSection} />

        <Route path="activity">
          <IndexRoute component={ActivityListSection} />
          <Route path="add" component={ActivityAddSection} />
          <Route path="calendar" component={ActivityCalendarSection} />
          <Route path=":activityId" component={ActivityShowSection} />
          <Route path=":activityId/edit" component={ActivityEditSection} />
        </Route>

        <Route path="document">
          <IndexRoute component={DocumentListSection} />
          <Route path="add" component={DocumentAddSection} />
        </Route>

        <Route path="newsletter">
          <IndexRoute component={NewsletterListSection} />
          <Route path="add" component={NewsletterAddSection} />
        </Route>

        <Route path="parent">
          <IndexRoute component={ParentListSection} />
          <Route path="add" component={ParentAddSection} />
        </Route>
      </Route>

      <Route path="level/:levelId">
        <IndexRoute component={LevelShowSection} />
      </Route>

    </Route>
  </Router>
);
