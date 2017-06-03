import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import Subheader from 'material-ui/Subheader';

import { ContentAdd } from 'material-ui/svg-icons';
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
    const { params, selectedParent, activities } = this.props;
    return (<div>
      <Link to={`/group/${params.groupId}/activity/add`} className="pull-right">
        <ContentAdd />
      </Link>
      <div className="clearfix" />
      <Subheader>Actividades</Subheader>
      { selectedParent ?
        <ParentList activities={activities} /> : <ProfessorList {...this.props} /> }
    </div>);
  }
}

ActivityList.propTypes = {
  params: PropTypes.shape({}).isRequired,
  selectedGroup: PropTypes.string,
  dispatch: PropTypes.func.isRequired,
  activities: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  selectedParent: PropTypes.string,
};

ActivityList.defaultProps = {
  selectedGroup: '',
  selectedParent: null,
};

export default ActivityListContainer(ActivityList);
