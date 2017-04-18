import { connect } from 'react-redux';

const mapStateToProps = (state) => {
  const { selectedLocation, locationById } = state;
  const {
    isFetching,
    lastUpdated,
    data: location,
  } = locationById[selectedLocation] || {
    isFetching: true,
    data: {},
  };

  return {
    selectedLocation,
    location,
    isFetching,
    lastUpdated,
  };
};

export default connect(mapStateToProps);
