import { connect } from 'react-redux';

const mapStateToProps = (state) => {
  const { activityHelper, selectedLocation, locationById, selectedRole, selectedGroup } = state;
  const {
    isProcessing,
    lastUpdated,
    data: activity,
  } = activityHelper || {
    isProcessing: true,
    data: {},
  };

  const location = locationById[selectedLocation] || {};

  return {
    isProcessing,
    lastUpdated,
    activity,
    location,
    selectedRole,
    selectedGroup,
  };
};

export default connect(mapStateToProps);
