/* eslint max-len: [2, 500, 4] */

import React, { Component, PropTypes } from 'react';
import Subheader from 'material-ui/Subheader';
import { Tabs, Tab } from 'material-ui/Tabs';
import { Table, TableBody, TableRow, TableRowColumn } from 'material-ui/Table';

import { Link } from 'react-router';

import LocationContainer from '../../../../containers/location';

class LocationShow extends Component {

  static renderGroup(data) {
    return data && data.group ?
      data.group.map(item => <TableRow key={item.id} displayBorder={false}>
        <TableRowColumn>
          <Subheader>
            {data.name} {item.name}
          </Subheader>
        </TableRowColumn>
        <TableRowColumn>
          <Link to={`/group/${item.id}/activity`}>Actividades</Link>
        </TableRowColumn>
        <TableRowColumn>
          <Link to={`/group/${item.id}/document`}>Documentos</Link>
        </TableRowColumn>
        <TableRowColumn>
          <Link to={`/group/${item.id}/newsletter`}>Boletines</Link>
        </TableRowColumn>
        <TableRowColumn>
          <Link to={`/group/${item.id}/parent`}>Padres</Link>
        </TableRowColumn>
      </TableRow>)
      : null;
  }

  static renderGrade(data) {
    return data && data.grade ?
      data.grade.map(item => <Table selectable={false} key={item.id}>
        <TableBody displayRowCheckbox={false} stripedRows>
          {LocationShow.renderGroup(item)}
        </TableBody>
      </Table>) : null;
  }

  static renderLevels(data) {
    return data && data.level ? data.level.map(item => <Tab key={item.id} label={item.name}>
      {LocationShow.renderGrade(item)}
    </Tab>) : null;
  }

  render() {
    const { location } = this.props;
    return (<div>
      <Tabs>{LocationShow.renderLevels(location)}</Tabs>
    </div>);
  }
}

LocationShow.propTypes = {
  location: PropTypes.shape({}).isRequired,
};

export default LocationContainer(LocationShow);
