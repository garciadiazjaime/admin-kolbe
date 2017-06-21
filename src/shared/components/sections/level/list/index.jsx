/* eslint max-len: [2, 500, 4] */
/* eslint no-underscore-dangle: ["error", { "allow": ["_id"] }] */
import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import _ from 'lodash';
import LevelController from '../../../../../client/controllers/levelController';
import LogUtil from '../../../../utils/logUtil';
// const style = require('./style.scss');

export default class LevelList extends React.Component {

  constructor(args) {
    super(args);
    this.locationId = this.props.params.locationId;
    this.baseUrl = `/location/${this.locationId}/level`;
    this.controller = new LevelController(this.locationId);
    this.state = {
      data: [],
    };
  }

  componentDidMount() {
    if (this.props.params.locationId) {
      this.controller.list()
        .then((results) => {
          if (results.entity.status) {
            this.setState({
              data: _.isArray(results.entity.data) ? results.entity.data : [],
            });
          }
        })
        .catch(error => LogUtil.log(error));
    } else {
      LogUtil.log(`[ERROR::LOADING] ${this.props.location.pathname}`);
    }
  }

  renderItems() {
    const { data } = this.state;
    if (data.length) {
      return data.map(item => <tr key={item._id}>
        <td>{item.name}</td>
        <td><Link to={`${this.baseUrl}/${item._id}/edit`}><i className="glyphicon glyphicon-pencil" /></Link></td>
        <td><Link to={`${this.baseUrl}/${item._id}/grade`}><i className="glyphicon glyphicon-zoom-in" /></Link></td>
      </tr>);
    }
    return null;
  }

  render() {
    return (<div className="container-fluid">
      <div className="row">
        <div className="col-sm-12">
          <Link to={`${this.baseUrl}/add`} className="pull-right"><i className="glyphicon glyphicon-plus" /></Link>
        </div>
      </div>
      <div className="row">
        <div className="col-sm-12">
          <table className="table table-striped">
            <thead>
              <tr>
                <th>Nombre del Nivel</th>
                <th>Editar</th>
                <th>Grados</th>
              </tr>
            </thead>
            <tbody>
              {this.renderItems()}
            </tbody>
          </table>
        </div>
      </div>
    </div>);
  }
}

LevelList.propTypes = {
  params: PropTypes.shape({
    locationId: PropTypes.string.isRequired,
  }).isRequired,
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired,
  }).isRequired,
};
