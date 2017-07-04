import { connect } from 'react-redux';

const mapStateToProps = (state) => {
  const {
    selectedLocation,
    locationById,
    selectedParent,
    selectedGroup,
    selectedLevel,
    selectedRole,
    selectedSchool,
  } = state;
  const location = locationById[selectedLocation] || {};

  return {
    selectedLocation,
    location,
    selectedParent,
    selectedGroup,
    selectedLevel,
    selectedRole,
    selectedSchool,
  };
};

export default connect(mapStateToProps);
