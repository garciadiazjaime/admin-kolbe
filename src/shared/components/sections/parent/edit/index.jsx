/* eslint max-len: [2, 500, 4] */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { browserHistory } from 'react-router';
import LinearProgress from 'material-ui/LinearProgress';
import _ from 'lodash';

import ParentForm from '../form';
import ParentContainer from '../../../../containers/parent';
import { getParent, updateParent } from '../../../../actions/parent';

class ParentEdit extends Component {

  constructor(args) {
    super(args);
    this.actionHandler = this.actionHandler.bind(this);
  }

  componentDidMount() {
    const { dispatch, params, selectedGroup } = this.props;
    if (!selectedGroup) {
      browserHistory.push('/');
    }
    dispatch(getParent(params.parentId));
  }

  componentWillReceiveProps(nextProps) {
    const { selectedGroup, lastUpdated } = nextProps;
    if (lastUpdated) {
      browserHistory.push(`/group/${selectedGroup}/parent?success`);
    }
  }

  actionHandler(data) {
    const { params, dispatch } = this.props;
    dispatch(updateParent(params.parentId, data));
  }

  render() {
    const { parent, lastUpdated, selectedGroup } = this.props;
    return _.isEmpty(parent) ? <LinearProgress mode="indeterminate" /> : (<div className="container-fluid">
      <ParentForm action={this.actionHandler} groupId={selectedGroup} parent={parent} lastUpdated={lastUpdated} />
    </div>);
  }
}

ParentEdit.propTypes = {
  params: PropTypes.shape({}).isRequired,
  dispatch: PropTypes.func.isRequired,
  parent: PropTypes.shape({}),
  lastUpdated: PropTypes.number,
  selectedGroup: PropTypes.string,
};

ParentEdit.defaultProps = {
  parent: {},
  lastUpdated: null,
  selectedGroup: null,
};


export default ParentContainer(ParentEdit);
