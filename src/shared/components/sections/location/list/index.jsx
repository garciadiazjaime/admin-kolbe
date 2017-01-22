/* eslint max-len: [2, 500, 4] */
/* eslint no-underscore-dangle: ["error", { "allow": ["_id"] }] */
import React from 'react';
import { Link } from 'react-router';
import _ from 'lodash';
import LocationController from '../../../../../client/controllers/locationController';
import LogUtil from '../../../../utils/logUtil';
// const style = require('./style.scss');

export default class LocationList extends React.Component {

  constructor() {
    super();
    this.controller = new LocationController();
    this.state = {
      data: [],
    };
  }

  componentDidMount() {
    this.controller.list()
      .then((results) => {
        if (results.entity.status) {
          this.setState({
            data: _.isArray(results.entity.data) ? results.entity.data : [],
          });
        }
      })
      .catch(error => LogUtil.log(error));
  }

  renderLocation() {
    if (this.state.data.length) {
      return this.state.data.map(item => <tr key={item._id}>
        <td>{item.name}</td>
        <td><Link to={`/location/${item._id}/edit`}><i className="glyphicon glyphicon-pencil" /></Link></td>
        <td><Link to={`/location/${item._id}/period`}><i className="glyphicon glyphicon-zoom-in" /></Link></td>
      </tr>);
    }
    return null;
  }

  render() {
    return (<div className="container-fluid">
      <div className="row">
        <div className="col-sm-12">
          <table className="table table-striped">
            <thead>
              <tr>
                <th>Nombre del Plantel</th>
                <th>Editar</th>
                <th>Periodo</th>
              </tr>
            </thead>
            <tbody>
              {this.renderLocation()}
            </tbody>
          </table>
        </div>
      </div>
    </div>);
  }
}
