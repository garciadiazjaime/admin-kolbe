import { connect } from 'react-redux';

const mapStateToProps = (state) => {
  const { selectedLocation, locationById, selectedParent } = state;
  const location = locationById[selectedLocation] || {};

  return {
    selectedLocation,
    location,
    selectedParent,
  };
};

export default connect(mapStateToProps);
