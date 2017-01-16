/* eslint max-len: [2, 500, 4] */
import React from 'react';
import About from './about';

const style = require('./style.scss');

export default function Footer1() {
  return (<div className={style.footerWrapper} id="footer_section">
    <div className="container-fluid">
      <div className="row">
        <div className="col-xs-12">
          <About />
        </div>
      </div>
    </div>
  </div>);
}
