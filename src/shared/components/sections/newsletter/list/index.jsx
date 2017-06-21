import React, { Component } from 'react';
import PropTypes from 'prop-types';

import NewsletterListContainer from '../../../../containers/newsletter/list';
import { getNewsletters } from '../../../../actions/newsletter/list';
import { selectGroup } from '../../../../actions/group';
import ParentList from './parent';
import ProfessorList from './professor';

class NewsletterList extends Component {

  componentDidMount() {
    const { params, selectedGroup } = this.props;
    const { dispatch } = this.props;
    if (!selectedGroup || selectedGroup !== params.groupId) {
      dispatch(selectGroup(params.groupId));
    }
    dispatch(getNewsletters(params.groupId));
  }

  render() {
    const { params, newsletters } = this.props;
    return params.parentId ?
      (<ParentList
        newsletters={newsletters}
        parentId={params.parentId}
        groupId={params.groupId}
      />) :
      (<ProfessorList {...this.props} />);
  }
}

NewsletterList.propTypes = {
  params: PropTypes.shape({}).isRequired,
  selectedGroup: PropTypes.string,
  dispatch: PropTypes.func.isRequired,
  newsletters: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
};

NewsletterList.defaultProps = {
  selectedGroup: '',
};

export default NewsletterListContainer(NewsletterList);
