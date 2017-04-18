import { connect } from 'react-redux';

const mapStateToProps = (state) => {
  const { selectedSchool, locationsBySchool } = state;
  const {
    isFetching,
    lastUpdated,
    items: locations,
  } = locationsBySchool[selectedSchool] || {
    isFetching: true,
    items: [],
  };

  return {
    selectedSchool,
    locations,
    isFetching,
    lastUpdated,
  };
};

export default connect(mapStateToProps);
