/* eslint max-len: [2, 500, 4] */

import React from 'react';
import { Link } from 'react-router';

const style = require('./style.scss');

export default function MainMenu() {
  return (<div className={style.header}>
    <div className="container-fluid">
      <div className="row">
        <div className="col-xs-12 col-sm-10">
          <h1><Link to="/"><span>Sistema Kolbe</span></Link></h1>
        </div>
      </div>
    </div>
  </div>);
}
