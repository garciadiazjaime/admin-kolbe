import { connect } from 'react-redux';
import _ from 'lodash';

function getGroupById(locations) {
  const data = {};
  locations.forEach((location) => {
    location.level.forEach((level) => {
      level.grade.forEach((grade) => {
        grade.group.forEach((group) => {
          data[group.id] = `${location.name} | ${level.name} | ${grade.name} ${group.name}`;
        });
      });
    });
  });
  return data;
}

const mapStateToProps = (state) => {
  const { selectedParent, groupsByParent, selectedSchool, schoolById } = state;
  const {
    isProcessing,
    lastUpdated,
    data: groups,
  } = groupsByParent[selectedParent] || {
    isProcessing: true,
    data: [],
  };
  let groupById = {};

  if (selectedSchool && schoolById && schoolById[selectedSchool]) {
    const { data } = schoolById[selectedSchool];
    if (data && _.isArray(data.location) && data.location.length) {
      groupById = getGroupById(data.location);
    }
  }

  return {
    isProcessing,
    lastUpdated,
    groups,
    selectedParent,
    groupById,
  };
};

export default connect(mapStateToProps);
