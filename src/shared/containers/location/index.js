import { connect } from 'react-redux';

const mapStateToProps = (state) => {
  const { selectedLocation, locationById } = state;
  const location = locationById[selectedLocation] || {};

  return {
    selectedLocation,
    location,
  };
};

export default connect(mapStateToProps);
