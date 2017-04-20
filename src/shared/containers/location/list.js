import { connect } from 'react-redux';

const mapStateToProps = (state) => {
  const { selectedSchool, schoolById } = state;
  const {
    isFetching,
    lastUpdated,
    data: school,
  } = schoolById[selectedSchool] || {
    isFetching: true,
    data: {},
  };

  return {
    selectedSchool,
    school,
    isFetching,
    lastUpdated,
  };
};

export default connect(mapStateToProps);
