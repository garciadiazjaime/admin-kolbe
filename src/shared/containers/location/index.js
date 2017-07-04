import { connect } from 'react-redux';

const mapStateToProps = (state) => {
  const {
    selectedLocation,
    locationById,
    selectedParent,
    selectedGroup,
    selectedLevel,
    selectedRole,
  } = state;
  const location = locationById[selectedLocation] || {};

  return {
    selectedLocation,
    location,
    selectedParent,
    selectedGroup,
    selectedLevel,
    selectedRole,
  };
};

export default connect(mapStateToProps);
