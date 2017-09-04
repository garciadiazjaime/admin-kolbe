/* eslint max-len: [2, 500, 4] */
import React from 'react';
import { IndexRoute, Router, Route, browserHistory } from 'react-router';

import AppHandler from '../../components/AppHandler';
import LoginSection from '../../components/sections/user/login';
import LogoutSection from '../../components/sections/user/logout';

import DashboardSection from '../../components/sections/dashboard';
import LocationShowSection from '../../components/sections/location/show';

import LevelShowSection from '../../components/sections/level/show';

import GroupShowSection from '../../components/sections/group/show';
import GroupUploadSection from '../../components/sections/group/upload';

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

      <Route path="school/:schoolId" component={DashboardSection} />
      <Route path="location/:locationId" component={LocationShowSection} />
      <Route path="level/:levelId" component={LevelShowSection} />

      <Route path="parent/:parentId">
        <IndexRoute component={ParentShowSection} />
        <Route path="group/:groupId">
          <Route path="activity/calendar" component={ActivityCalendarSection} />
          <Route path="activity/:activityId" component={ActivityShowSection} />

          <Route path="document" component={DocumentListSection} />
          <Route path="document/:documentId" component={DocumentShowSection} />

          <Route path="newsletter" component={NewsletterListSection} />
          <Route path="newsletter/:newsletterId" component={NewsletterShowSection} />
        </Route>
      </Route>

      <Route path="group/:groupId">
        <IndexRoute component={GroupShowSection} />
        <Route path="upload" component={GroupUploadSection} />
        <Route path="parent" component={ParentListSection} />

        <Route path="activity">
          <IndexRoute component={ActivityListSection} />
          <Route path="add" component={ActivityAddSection} />
          <Route path="calendar" component={ActivityCalendarSection} />
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
      </Route>

    </Route>
  </Router>
);
