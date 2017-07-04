import { connect } from 'react-redux';

const mapStateToProps = (state) => {
  const { selectedLocation, locationById, selectedParent, selectedGroup, selectedLevel } = state;
  const location = locationById[selectedLocation] || {};

  return {
    selectedLocation,
    location,
    selectedParent,
    selectedGroup,
    selectedLevel,
  };
};

export default connect(mapStateToProps);
