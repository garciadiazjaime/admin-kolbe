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

  let locations = [];
  if (school.location && school.location.length) {
    locations = school.location.map(item => ({
      id: item.id,
      name: item.name,
    }));
  }

  return {
    locations,
    selectedSchool,
    school,
    isFetching,
    lastUpdated,
  };
};

export default connect(mapStateToProps);
