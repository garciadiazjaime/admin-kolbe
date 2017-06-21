/* eslint max-len: [2, 500, 4] */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link, browserHistory } from 'react-router';
import RaisedButton from 'material-ui/RaisedButton';
import { ContentClear } from 'material-ui/svg-icons';
import Subheader from 'material-ui/Subheader';
import FormData from 'form-data';
import LinearProgress from 'material-ui/LinearProgress';

import GroupUploadContainer from '../../../../containers/group/upload';
import { uploadDocument } from '../../../../actions/group';
import style from './style.scss';

class GroupUploadForm extends Component {

  constructor(args) {
    super(args);
    this.state = {
      valid: false,
      touch: false,
    };
    this.handleFileUpload = this.handleFileUpload.bind(this);
    this.extensionsAllowed = ['xls', 'xlsx', 'csv'];
  }

  componentWillReceiveProps(nextProps) {
    const { params, lastUpdated } = nextProps;
    if (lastUpdated) {
      browserHistory.push(`/group/${params.groupId}/parent?action=upload&status=true`);
    }
  }

  handleFileUpload() {
    const { files } = document.getElementById('file');
    if (files.length) {
      const file = files[0];
      const extension = file.name.split('.').pop().toLowerCase();
      if (this.extensionsAllowed.indexOf(extension) !== -1) {
        const data = new FormData();
        const { params, dispatch } = this.props;
        data.append('data', file);
        dispatch(uploadDocument(params.groupId, data));
      } else {
        this.setState({
          valid: false,
          touch: true,
        });
      }
    }
  }

  render() {
    const { isProcessing, selectedLocation } = this.props;
    return (<div>
      { isProcessing ? <LinearProgress mode="indeterminate" /> : null }
      <Link to={`/location/${selectedLocation}`} className="pull-right">
        <ContentClear />
      </Link>
      <br />
      <Subheader>
        Subir Archivo
        <p>
          Subir lista de grupo con la información de estudiantes y padres.
          <br />
          Esta es la forma en la que se captura información al sistema.
        </p>
      </Subheader>
      <RaisedButton containerElement="label" label="Buscar">
        <input type="file" id="file" name="file" onChange={this.handleFileUpload} className={style.input} />
      </RaisedButton>
      { this.state.touch && !this.state.valid ?
        <div className="text-danger"><br />Archivos permitidos: {this.extensionsAllowed.join(' ')}</div> : null }
    </div>);
  }
}

GroupUploadForm.propTypes = {
  params: PropTypes.shape({}),
  selectedLocation: PropTypes.string,
  dispatch: PropTypes.func.isRequired,
  isProcessing: PropTypes.bool,
  lastUpdated: PropTypes.number,
};

GroupUploadForm.defaultProps = {
  params: {},
  selectedLocation: null,
  isProcessing: false,
  lastUpdated: null,
};

export default GroupUploadContainer(GroupUploadForm);
