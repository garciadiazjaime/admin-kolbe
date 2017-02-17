/* eslint max-len: [2, 500, 4] */
import React from 'react';
import LogUtil from '../../../utils/logUtil';
import InputElement from '../../elements/inputElement';
import StringUtil from '../../../utils/stringUtil';

export default class LocationForm extends React.Component {

  constructor(args) {
    super(args);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.state = {
      data: {},
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      data: nextProps.data,
    });
  }

  handleChange(prop, value) {
    const { state } = this;
    state.data[prop] = value;
    state.status = '';
    this.setState(state);
  }

  handleSubmit() {
    this.handleAction('saving', 'saved', this.props.submitAction);
  }

  handleDelete() {
    this.handleAction('deleting', 'deleted', this.props.deleteAction);
  }

  handleAction(initialStatus, successStatus, action) {
    this.setState({
      status: initialStatus,
    });
    action(this.state.data)
      .then(() => {
        this.setState({
          status: successStatus,
        });
      })
      .catch((error) => {
        LogUtil.log(`[ERROR] ${error}`);
        this.setState({
          status: 'error',
        });
      });
  }

  render() {
    return (<div className="container-fluid">
      <div className="row">
        <div className="col-sm-12">
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
        </div>
      </div>
      {
        this.props.deleteAction ?
          <div className="row">
            <div className="col-sm-12">
              <button to="/location/delete" className="pull-right btn btn-danger" onClick={this.handleDelete}>Eliminar</button>
            </div>
          </div> : null
      }
    </div>);
  }
}

LocationForm.propTypes = {
  submitAction: React.PropTypes.func.isRequired,
  deleteAction: React.PropTypes.func,
};

LocationForm.defaultProps = {
  deleteAction: null,
};
