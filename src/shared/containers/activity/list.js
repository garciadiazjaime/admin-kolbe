import { connect } from 'react-redux';

const mapStateToProps = (state) => {
  const { selectedGroup, activitiesByGroup, selectedParent } = state;
  const {
    isProcessing,
    lastUpdated,
    data: activities,
  } = activitiesByGroup[selectedGroup] || {
    isProcessing: true,
    data: [],
  };

  return {
    selectedGroup,
    isProcessing,
    lastUpdated,
    activities,
    selectedParent,
  };
};

export default connect(mapStateToProps);
