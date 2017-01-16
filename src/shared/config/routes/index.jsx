import React from 'react';
import { IndexRoute, Router, Route, browserHistory } from 'react-router';
import sitemap from '../sitemap';

const { items } = sitemap;
const routes = items.children.map(item => <Route path={item.url} component={item.component} />);


export default(
  <Router history={browserHistory}>
    <Route path="/" component={items.component}>
      <IndexRoute component={items.default} />
      {routes}
    </Route>
  </Router>
);
