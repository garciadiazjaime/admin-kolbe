import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Toolbar from 'react-big-calendar/lib/Toolbar';
import { assign } from 'lodash';

import StringUtil from '../../../../utils/stringUtil';

export default class CustomToolbar extends Component {

  constructor(args) {
    super(args);
    console.log('CustomToolbar');
  }

  render() {
    const props = assign({}, this.props, {
      label: StringUtil.toTitleCase(this.props.label),
      messages: {
        previous: 'Anterior',
        next: 'Siguiente',
        today: 'Hoy',
      },
    });
    return (<Toolbar {...props} />);
  }
}

CustomToolbar.propTypes = {
  label: PropTypes.string,
};

CustomToolbar.defaultProps = {
  label: '',
};
