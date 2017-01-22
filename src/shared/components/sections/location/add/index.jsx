/* eslint max-len: [2, 500, 4] */
import React from 'react';
import LocationController from '../../../../../client/controllers/locationController';
import LogUtil from '../../../../utils/logUtil';
import InputElement from '../../../elements/inputElement';
import StringUtil from '../../../../utils/stringUtil';

export default class LocationCreate extends React.Component {

  constructor() {
    super();
    this.controller = new LocationController();
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = {
      data: {},
    };
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
    this.controller.save(this.state.data)
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
