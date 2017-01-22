/* eslint max-len: [2, 500, 4] */
import React from 'react';
import PeriodController from '../../../../../client/controllers/periodController';
import LogUtil from '../../../../utils/logUtil';
import InputElement from '../../../elements/inputElement';
import StringUtil from '../../../../utils/stringUtil';

export default class PeriodEdit extends React.Component {

  constructor(args) {
    super(args);
    this.locationId = this.props.params.locationId;
    this.periodId = this.props.params.periodId;
    this.controller = new PeriodController(this.locationId);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = {
      data: {},
    };
  }

  componentDidMount() {
    if (this.periodId) {
      this.controller.get(this.periodId)
        .then((results) => {
          if (results.entity.status) {
            this.setState({
              data: results.entity.data,
            });
          }
        })
        .catch(error => LogUtil.log(error));
    } else {
      LogUtil.log(`[ERROR::LOADING] ${this.props.location.pathname}`);
    }
  }

  handleChange(prop, value) {
    const { state } = this;
    state.data[prop] = value;
    state.status = '';
    this.setState(state);
  }

  handleSubmit() {
    this.setState({
      status: 'saving',
    });
    this.controller.update(this.periodId, this.state.data)
      .then(() => {
        this.setState({
          status: 'saved',
        });
      })
      .catch((error) => {
        LogUtil.log(`[ERROR::UPDATING] ${error}`);
        this.setState({
          status: 'error',
        });
      });
  }

  render() {
    return (<div className="container-fluid">
      <table className="table table-striped">
        <tbody>
          <tr>
            <th>Nombre</th>
            <td>
              <InputElement name="name" value={this.state.data.name} onChange={this.handleChange} />
            </td>
          </tr>
          <tr>
            <td colSpan="2" className="text-right">
              <input type="submit" onClick={this.handleSubmit} value="Guardar" className="btn btn-primary" />
            </td>
          </tr>
          <tr>
            <td colSpan="2" className="text-right">
              { StringUtil.getFormStatus(this.state.status) }
            </td>
          </tr>
        </tbody>
      </table>
    </div>);
  }
}

PeriodEdit.propTypes = {
  params: React.PropTypes.shape({
    locationId: React.PropTypes.string.isRequired,
    periodId: React.PropTypes.string.isRequired,
  }).isRequired,
  location: React.PropTypes.shape({
    pathname: React.PropTypes.string.isRequired,
  }).isRequired,
};
