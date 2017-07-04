import { connect } from 'react-redux';
import { isEmpty } from 'lodash';

function getLevel(locationById, selectedLevel) {
  if (!isEmpty(locationById) && selectedLevel) {
    const locationKeys = Object.keys(locationById);
    for (let i = 0, len = locationKeys.length; i < len; i += 1) {
      const location = locationById[locationKeys[i]];
      const levelKeys = Object.keys(location.level);
      for (let j = 0, len2 = levelKeys.length; j < len2; j += 1) {
        const level = location.level[levelKeys[j]];
        if (level.id === selectedLevel) {
          return level;
        }
      }
    }
  }
  return {};
}

const mapStateToProps = (state) => {
  const { locationById, selectedLevel } = state;
  const level = getLevel(locationById, selectedLevel);
  return {
    level,
  };
};

export default connect(mapStateToProps);
