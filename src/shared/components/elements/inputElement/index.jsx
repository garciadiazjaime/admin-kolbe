/* eslint max-len: [2, 500, 4] */
import React from 'react';

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
  value: React.PropTypes.string,
  onChange: React.PropTypes.func.isRequired,
  name: React.PropTypes.string.isRequired,
  type: React.PropTypes.string,
};

InputElement.defaultProps = {
  value: '',
  type: 'text',
};
