import { connect } from 'react-redux';

const mapStateToProps = (state) => {
  const { selectedLocation, locationById } = state;
  const location = locationById[selectedLocation] || {};

  return {
    location,
  };
};

export default connect(mapStateToProps);
