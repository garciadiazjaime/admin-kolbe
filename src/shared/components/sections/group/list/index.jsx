/* eslint max-len: [2, 500, 4] */
/* eslint no-underscore-dangle: ["error", { "allow": ["_id"] }] */
import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import _ from 'lodash';
import GroupController from '../../../../../client/controllers/groupController';
import LogUtil from '../../../../utils/logUtil';
// const style = require('./style.scss');

export default class GroupList extends React.Component {

  constructor(args) {
    super(args);
    this.locationId = this.props.params.locationId;
    this.levelId = this.props.params.levelId;
    this.gradeId = this.props.params.gradeId;
    this.baseUrl = `/location/${this.locationId}/level/${this.levelId}/grade/${this.gradeId}/group`;
    this.controller = new GroupController(this.locationId, this.levelId, this.gradeId);
    this.state = {
      data: [],
    };
  }

  componentDidMount() {
    if (this.gradeId) {
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
        <td><Link to={`${this.baseUrl}/${item._id}/student`}><i className="glyphicon glyphicon-zoom-in" /></Link></td>
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
                <th>Nombre del Grupo</th>
                <th>Editar</th>
                <th>Alumnos</th>
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

GroupList.propTypes = {
  params: PropTypes.shape({
    locationId: PropTypes.string.isRequired,
    levelId: PropTypes.string.isRequired,
    gradeId: PropTypes.string.isRequired,
  }).isRequired,
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired,
  }).isRequired,
};
