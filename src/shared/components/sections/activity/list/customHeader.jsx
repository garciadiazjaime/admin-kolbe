import React from 'react';
import PropTypes from 'prop-types';

import StringUtil from '../../../../utils/stringUtil';

export default function CustomHeader({ label }) {
  return (<div>
    { StringUtil.toTitleCase(label) }
  </div>);
}

CustomHeader.propTypes = {
  label: PropTypes.string,
};

CustomHeader.defaultProps = {
  label: '',
};
