import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { isArray } from 'lodash';
import { Link } from 'react-router';
import {
  Table,
  TableBody,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';
import Subheader from 'material-ui/Subheader';
import { NavigationChevronRight } from 'material-ui/svg-icons';

import { selectLevel } from '../../../../actions/level';
import LevelShowContainer from '../../../../containers/level/show';

class LevelShowSection extends Component {

  static renderItems(data) {
    if (isArray(data) && data.length) {
      const style = {
        paddingLeft: '42px',
      };
      return data.map(item => <TableRow key={item.id}>
        <TableRowColumn>{item.name}</TableRowColumn>
        <TableRowColumn style={style}>
          <Link to={`/group/${item.id}`}>
            <NavigationChevronRight />
          </Link>
        </TableRowColumn>
      </TableRow>);
    }
    return null;
  }

  static renderGrade(data) {
    if (isArray(data) && data.length) {
      return data.map(item => (<div key={item.id}>
        <Subheader>{item.name}</Subheader>
        <Table selectable={false} displayRowCheckbox={false}>
          <TableBody displayRowCheckbox={false} stripedRows key={item.id}>
            {LevelShowSection.renderItems(item.group)}
          </TableBody>
        </Table>
      </div>));
    }
    return null;
  }

  componentDidMount() {
    const { selectedLevel, params, dispatch } = this.props;

    if (params.levelId && (!selectedLevel || selectedLevel !== params.levelId)) {
      dispatch(selectLevel(params.levelId));
    }
  }

  render() {
    const { level } = this.props;
    return (<div>
      <div className="clearfix" />
      <Subheader>{level.name}</Subheader>
      {LevelShowSection.renderGrade(level.grade)}
    </div>);
  }
}

LevelShowSection.propTypes = {
  level: PropTypes.shape({}),
  params: PropTypes.shape({}).isRequired,
  dispatch: PropTypes.func.isRequired,
  selectedLevel: PropTypes.string,
};

LevelShowSection.defaultProps = {
  level: {},
  selectedLevel: null,
};

export default LevelShowContainer(LevelShowSection);
