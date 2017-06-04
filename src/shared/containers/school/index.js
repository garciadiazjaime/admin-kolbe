/* eslint max-len: [2, 500, 4] */
import { connect } from 'react-redux';

const mapStateToProps = (state) => {
  const { selectedSchool, selectedLocation, selectedParent, schoolById } = state;
  const {
    isFetching,
    lastUpdated,
    data: school,
  } = schoolById[selectedSchool] || {
    isFetching: true,
    data: {},
  };

  let locations = [];
  const locationByGroup = {};
  const groupById = {};
  if (school.location && school.location.length) {
    locations = school.location.map(item => ({ id: item.id, name: item.name }));

    school.location.map((location) => {
      location.level.map((level) => {
        level.grade.map((grade) => {
          grade.group.map((group) => {
            locationByGroup[group.id] = location.id;
            groupById[group.id] = `${level.name} | ${grade.name} ${group.name}`;
            return null;
          });
          return null;
        });
        return null;
      });
      return null;
    });
  }

  return {
    locations,
    locationByGroup,
    groupById,
    selectedSchool,
    selectedLocation,
    selectedParent,
    school,
    isFetching,
    lastUpdated,
  };
};

export default connect(mapStateToProps);
