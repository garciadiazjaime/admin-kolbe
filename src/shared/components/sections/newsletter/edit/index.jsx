/* eslint max-len: [2, 500, 4] */
import React from 'react';
import NewsletterController from '../../../../../client/controllers/newsletterController';
import LogUtil from '../../../../utils/logUtil';
import InputElement from '../../../elements/inputElement';
import StringUtil from '../../../../utils/stringUtil';

export default class NewsletterEdit extends React.Component {

  constructor(args) {
    super(args);
    this.entityId = this.props.params.newsletterId;
    this.controller = new NewsletterController();
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.state = {
      data: {},
    };
  }

  componentDidMount() {
    if (this.entityId) {
      this.controller.get(this.entityId)
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

  handleDelete() {
    this.setState({
      status: 'deleting',
    });
    this.controller.delete(this.entityId)
      .then(() => {
        this.setState({
          status: 'deleted',
        });
      })
      .catch(error => LogUtil.log(error));
  }

  handleSubmit() {
    this.setState({
      status: 'saving',
    });
    this.controller.update(this.entityId, this.state.data)
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
      <div className="row">
        <div className="col-sm-12">
          <button to="/location/delete" className="pull-right btn btn-danger" onClick={this.handleDelete}>Eliminar</button>
        </div>
      </div>
    </div>);
  }
}

NewsletterEdit.propTypes = {
  params: React.PropTypes.shape({
    newsletterId: React.PropTypes.string.isRequired,
  }).isRequired,
  location: React.PropTypes.shape({
    pathname: React.PropTypes.string.isRequired,
  }).isRequired,
};
