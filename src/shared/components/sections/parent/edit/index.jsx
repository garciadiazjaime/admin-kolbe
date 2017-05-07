/* eslint max-len: [2, 500, 4] */
import React, { Component, PropTypes } from 'react';
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
    const { dispatch, params } = this.props;
    dispatch(getParent(params.parentId));
  }

  componentWillReceiveProps(nextProps) {
    const { groupId, lastUpdated } = nextProps;
    if (lastUpdated) {
      browserHistory.push(`/group/${groupId}/parent?success`);
    }
  }

  actionHandler(parentId, data) {
    const { dispatch } = this.props;
    dispatch(updateParent(parentId, data));
  }

  render() {
    const { parent, lastUpdated } = this.props;
    return _.isEmpty(parent) ? <LinearProgress mode="indeterminate" /> : (<div className="container-fluid">
      <ParentForm action={this.actionHandler} groupId={parent.groupId} parent={parent} lastUpdated={lastUpdated} />
    </div>);
  }
}

ParentEdit.propTypes = {
  params: PropTypes.shape({}).isRequired,
  dispatch: PropTypes.func.isRequired,
  parent: PropTypes.shape({}),
  lastUpdated: PropTypes.number,
  groupId: PropTypes.string,
};

ParentEdit.defaultProps = {
  parent: {},
  lastUpdated: null,
  groupId: null,
};


export default ParentContainer(ParentEdit);
