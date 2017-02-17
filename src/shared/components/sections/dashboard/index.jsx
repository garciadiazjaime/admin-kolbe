import React from 'react';
import { Link } from 'react-router';

const style = require('./style.scss');

export default class DashBoard extends React.Component {

  constructor() {
    super();
    this.state = {};
  }

  componentDidMount() {
  }

  render() {
    return (<div className={`container ${style.blockWrapper}`}>
      <div className="row">
        <div className="col-sm-4">
          <Link to="/location" className="btn btn-default">Planteles</Link>
        </div>
        <div className="col-sm-4">
          <Link to="/activity" className="btn btn-default">Actividades</Link>
        </div>
        <div className="col-sm-4">
          <Link to="/document" className="btn btn-default">Documentos</Link>
        </div>
      </div>
      <br />
      <div className="row">
        <div className="col-sm-4">
          <Link to="/newsletter" className="btn btn-default">Boletines</Link>
        </div>
        <div className="col-sm-4">
          <Link to="/parent" className="btn btn-default">Padres</Link>
        </div>
      </div>
    </div>);
  }
}
