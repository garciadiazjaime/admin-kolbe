import { connect } from 'react-redux';

const mapStateToProps = (state) => {
  const { activityHelper, selectedLocation, locationById, selectedRole } = state;
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
  };
};

export default connect(mapStateToProps);
