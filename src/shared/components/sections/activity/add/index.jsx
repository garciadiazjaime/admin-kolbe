/* eslint max-len: [2, 500, 4] */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { browserHistory } from 'react-router';

import ActivityForm from '../form';
import ActivityContainer from '../../../../containers/activity';
import { saveActivity } from '../../../../actions/activity';

class AcitivityAdd extends Component {

  constructor(args) {
    super(args);
    this.actionHandler = this.actionHandler.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    const { selectedGroup, lastUpdated } = nextProps;
    if (lastUpdated) {
      browserHistory.push(`/group/${selectedGroup}/activity?success`);
    }
  }

  actionHandler(data) {
    const { dispatch } = this.props;
    dispatch(saveActivity(data));
  }

  render() {
    const { selectedGroup, location, selectedRole } = this.props;
    return (<div>
      <ActivityForm
        action={this.actionHandler}
        groupId={selectedGroup}
        title="Agregar Actividad"
        location={location}
        selectedRole={selectedRole}
      />
    </div>);
  }
}

AcitivityAdd.propTypes = {
  dispatch: PropTypes.func.isRequired,
  lastUpdated: PropTypes.number,
  location: PropTypes.shape({}).isRequired,
  selectedRole: PropTypes.number.isRequired,
  selectedGroup: PropTypes.string.isRequired,
};

AcitivityAdd.defaultProps = {
  lastUpdated: null,
};

export default ActivityContainer(AcitivityAdd);
