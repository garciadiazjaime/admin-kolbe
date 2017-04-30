import { connect } from 'react-redux';

const mapStateToProps = (state) => {
  const { selectedGroup, activitiesByGroup } = state;
  const {
    isFetching,
    lastUpdated,
    data: activities,
  } = activitiesByGroup[selectedGroup] || {
    isFetching: true,
    data: [],
  };

  return {
    selectedGroup,
    isFetching,
    lastUpdated,
    activities,
  };
};

export default connect(mapStateToProps);
