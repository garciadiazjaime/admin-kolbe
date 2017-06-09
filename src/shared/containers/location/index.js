import { connect } from 'react-redux';

const mapStateToProps = (state) => {
  const { selectedLocation, locationById, selectedParent, selectedGroup } = state;
  const location = locationById[selectedLocation] || {};

  return {
    selectedLocation,
    location,
    selectedParent,
    selectedGroup,
  };
};

export default connect(mapStateToProps);
