/* eslint max-len: [2, 500, 4] */
import React from 'react';
import PropTypes from 'prop-types';

export default class InputElement extends React.Component {

  constructor() {
    super();
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.props.onChange(this.props.name, event.target.value);
  }

  render() {
    return (<input type={this.props.type} name={this.props.name} value={this.props.value} onChange={this.handleChange} className="form-control" />);
  }
}

InputElement.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  type: PropTypes.string,
};

InputElement.defaultProps = {
  value: '',
  type: 'text',
};
