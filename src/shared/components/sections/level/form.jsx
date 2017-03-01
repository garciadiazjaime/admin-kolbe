/* eslint max-len: [2, 500, 4] */
import React from 'react';
import _ from 'lodash';
import LogUtil from '../../../utils/logUtil';
import InputElement from '../../elements/inputElement';
import StringUtil from '../../../utils/stringUtil';

export default class LevelForm extends React.Component {

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
      .then((results) => {
        const newstate = _.assign({}, this.state);
        newstate.status = results.entity.status ? successStatus : 'error';
        if (results.entity.data.userId) {
          newstate.data.userId = results.entity.data.userId;
        }
        this.setState(newstate);
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
          <div className="form-horizontal">
            <legend>Datos Generales</legend>
            <div className="form-group">
              <label htmlFor="name" className="col-sm-2 control-label">Nombre</label>
              <div className="col-sm-10">
                <InputElement name="name" value={this.state.data.name} onChange={this.handleChange} />
              </div>
            </div>


            <legend>Acceso</legend>
            <div className="form-group">
              <label htmlFor="username" className="col-sm-2 control-label">Usuario</label>
              <div className="col-sm-10">
                <InputElement name="username" value={this.state.data.username} onChange={this.handleChange} />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="password" className="col-sm-2 control-label">Contraseña</label>
              <div className="col-sm-10">
                <InputElement name="password" value={this.state.data.password} onChange={this.handleChange} type="password" />
              </div>
            </div>
            <hr />
            <div className="form-group">
              <div className="col-sm-offset-2 col-sm-10">
                {
                  this.props.deleteAction ?
                    <span>
                      <button to="/location/delete" className="btn btn-danger" onClick={this.handleDelete}>Eliminar</button>
                      <span>&nbsp;&nbsp;</span>
                    </span>
                    : null
                }
                <button className="btn btn-primary" onClick={this.handleSubmit} value="Guardar">Guardar</button>
              </div>
            </div>

            <div className="form-group">
              <div className="col-sm-offset-2 col-sm-10">
                { StringUtil.getFormStatus(this.state.status) }
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>);
  }
}

LevelForm.propTypes = {
  submitAction: React.PropTypes.func.isRequired,
  deleteAction: React.PropTypes.func,
};

LevelForm.defaultProps = {
  deleteAction: null,
};
