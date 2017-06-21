import React, { Component } from 'react';
import PropTypes from 'prop-types';

import ActivityListContainer from '../../../../containers/activity/list';
import { getActivities } from '../../../../actions/activity/list';
import { selectGroup } from '../../../../actions/group';
import ParentList from './parent';
import ProfessorList from './professor';

class ActivityList extends Component {

  componentDidMount() {
    const { params, selectedGroup } = this.props;
    const { dispatch } = this.props;
    if (!selectedGroup || selectedGroup !== params.groupId) {
      dispatch(selectGroup(params.groupId));
    }
    dispatch(getActivities(params.groupId));
  }

  render() {
    const { params, activities } = this.props;
    return params.parentId ?
      (<ParentList
        activities={activities}
        parentId={params.parentId}
        groupId={params.groupId}
      />) :
      (<ProfessorList {...this.props} />);
  }
}

ActivityList.propTypes = {
  params: PropTypes.shape({}).isRequired,
  selectedGroup: PropTypes.string,
  dispatch: PropTypes.func.isRequired,
  activities: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
};

ActivityList.defaultProps = {
  selectedGroup: '',
};

export default ActivityListContainer(ActivityList);
