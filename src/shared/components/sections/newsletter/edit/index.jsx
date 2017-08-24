/* eslint max-len: [2, 500, 4] */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { browserHistory } from 'react-router';
import LinearProgress from 'material-ui/LinearProgress';

import NewsletterForm from '../form';
import NewsletterContainer from '../../../../containers/newsletter';
import { getNewsletter, updateNewsletter } from '../../../../actions/newsletter';
import ApiErrorElement from '../../../elements/errorElement';

class NewsletterEdit extends Component {

  constructor(args) {
    super(args);
    this.actionHandler = this.actionHandler.bind(this);
  }

  componentDidMount() {
    const { dispatch, params } = this.props;
    dispatch(getNewsletter(params.groupId, params.newsletterId));
  }

  componentWillReceiveProps(nextProps) {
    const { params, didInvalidate, lastUpdated } = nextProps;
    if (lastUpdated && !didInvalidate) {
      browserHistory.push(`/group/${params.groupId}/newsletter?success`);
    }
  }

  actionHandler(data) {
    const { params, dispatch } = this.props;
    dispatch(updateNewsletter(params.groupId, params.newsletterId, data));
  }

  render() {
    const { params, newsletter, didInvalidate, lastUpdated } = this.props;
    return _.isEmpty(newsletter) ? <LinearProgress mode="indeterminate" /> : (<div>
      <NewsletterForm
        action={this.actionHandler}
        groupId={params.groupId}
        newsletter={newsletter}
        lastUpdated={lastUpdated}
        title="Editar Noticia"
      />
      { lastUpdated && didInvalidate ? <ApiErrorElement /> : null }
    </div>);
  }
}

NewsletterEdit.propTypes = {
  params: PropTypes.shape({}).isRequired,
  dispatch: PropTypes.func.isRequired,
  newsletter: PropTypes.shape({}),
  didInvalidate: PropTypes.bool,
  lastUpdated: PropTypes.number,
};

NewsletterEdit.defaultProps = {
  newsletter: {},
  didInvalidate: false,
  lastUpdated: null,
};


export default NewsletterContainer(NewsletterEdit);
