import React from 'react';
import PropTypes from 'prop-types';
import Toolbar from 'react-big-calendar/lib/Toolbar';
import { assign } from 'lodash';

import StringUtil from '../../../../utils/stringUtil';

export default function CustomToolbar(props) {
  const newProps = assign({}, props, {
    label: StringUtil.toTitleCase(props.label),
    messages: {
      previous: 'Anterior',
      next: 'Siguiente',
      today: 'Hoy',
    },
  });
  return (<Toolbar {...newProps} />);
}

CustomToolbar.propTypes = {
  label: PropTypes.string,
};

CustomToolbar.defaultProps = {
  label: '',
};
