/* eslint max-len: [2, 500, 4] */
import React, { Component, PropTypes } from 'react';
import { browserHistory } from 'react-router';

import ParentForm from '../form';
import ParentContainer from '../../../../containers/parent';
import { saveParent } from '../../../../actions/parent';

class ParentAdd extends Component {

  constructor(args) {
    super(args);
    this.actionHandler = this.actionHandler.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    const { groupId, lastUpdated } = nextProps;
    if (lastUpdated) {
      browserHistory.push(`/group/${groupId}/parent?success`);
    }
  }

  actionHandler(groupId, data) {
    const { dispatch } = this.props;
    dispatch(saveParent(groupId, data));
  }

  render() {
    const { params } = this.props;
    return (<div className="container-fluid">
      <ParentForm action={this.actionHandler} groupId={params.groupId} />
    </div>);
  }
}

ParentAdd.propTypes = {
  dispatch: PropTypes.func.isRequired,
  params: PropTypes.shape({}).isRequired,
  lastUpdated: PropTypes.number,
  groupId: PropTypes.string,
};

ParentAdd.defaultProps = {
  lastUpdated: null,
  groupId: null,
};

export default ParentContainer(ParentAdd);
