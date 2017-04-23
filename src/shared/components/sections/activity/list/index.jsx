/* eslint max-len: [2, 500, 4] */
/* eslint no-underscore-dangle: ["error", { "allow": ["_id"] }] */
import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import _ from 'lodash';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import ActivityController from '../../../../../client/controllers/activityController';
import LogUtil from '../../../../utils/logUtil';
// const style = require('./style.scss');

export default class LocationList extends Component {

  constructor(args) {
    super(args);
    this.controller = new ActivityController();
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
        <td><Link to={`/activity/${item._id}/edit`}><i className="glyphicon glyphicon-pencil" /></Link></td>
      </tr>);
    }
    return null;
  }

  render() {
    const { params } = this.props;
    return (<div>
      <FloatingActionButton mini href={`/group/${params.groupId}/activity/add`} className="pull-right">
        <ContentAdd />
      </FloatingActionButton>
      <div className="row">
        <div className="col-sm-12">
          <table className="table table-striped">
            <thead>
              <tr>
                <th>Nombre de la Actividad</th>
                <th>Editar</th>
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

LocationList.propTypes = {
  params: PropTypes.shape({}).isRequired,
};
