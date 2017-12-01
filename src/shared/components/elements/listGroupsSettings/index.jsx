import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { List, ListItem } from 'material-ui/List';
import Subheader from 'material-ui/Subheader';
import Checkbox from 'material-ui/Checkbox';

import style from './style.scss';

class ListGroupsSettings extends Component {

  renderGroup(data) {
    const { onChange } = this.props;
    return (data && data.group ? data.group.map(item => <ListItem
      key={item.id}
      leftCheckbox={<Checkbox onCheck={onChange.bind(this, item.id)} />} //eslint-disable-line
      primaryText={`${data.name} ${item.name}`}
    />) : null);
  }

  renderGrade(data) {
    return (data && data.grade ? data.grade.map(item => this.renderGroup(item)) : null);
  }

  renderLevels() {
    const { location } = this.props;
    return (location && location.level ? location.level.map(item => <div key={item.id}>
      <Subheader>{item.name}</Subheader>
      {this.renderGrade(item)}
    </div>) : null);
  }

  render() {
    return (<List>
      <Subheader>Seleccionar Grupos</Subheader>
      <div className={style.level}>
        {this.renderLevels()}
      </div>
    </List>);
  }
}

export default ListGroupsSettings;

ListGroupsSettings.propTypes = {
  location: PropTypes.shape({}).isRequired,
  onChange: PropTypes.func.isRequired,
};
