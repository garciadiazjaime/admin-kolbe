import React from 'react';
import { Link } from 'react-router';

export default class DashBoard extends React.Component {

  constructor() {
    super();
    this.state = {};
  }

  componentDidMount() {
    console.log('componentDidMount');
  }

  render() {
    return (<div className="container">
      <div className="row">
        <div className="col-sm-12">
          DashBoard
        </div>
      </div>
      <div className="row">
        <div className="col-sm-12">
          <Link to="/location">Planteles</Link> <br />
          <Link to="/activity">Actividades</Link> <br />
          <Link to="/document">Documents</Link> <br />
        </div>
      </div>
    </div>);
  }
}
