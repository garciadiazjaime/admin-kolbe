/* eslint max-len: [2, 500, 4] */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { browserHistory } from 'react-router';

import NewsletterForm from '../form';
import NewsletterContainer from '../../../../containers/newsletter';
import { saveNewsletter } from '../../../../actions/newsletter';
import ApiErrorElement from '../../../elements/errorElement';

class NewsletterAdd extends Component {

  constructor(args) {
    super(args);
    this.actionHandler = this.actionHandler.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    const { params, lastUpdated, didInvalidate } = nextProps;
    if (lastUpdated && !didInvalidate) {
      browserHistory.push(`/group/${params.groupId}/newsletter?success`);
    }
  }

  actionHandler(data) {
    const { dispatch, params } = this.props;
    dispatch(saveNewsletter(params.groupId, data));
  }

  render() {
    const { params, didInvalidate, lastUpdated } = this.props;
    return (<div>
      <NewsletterForm
        action={this.actionHandler}
        groupId={params.groupId}
        title="Agregar Noticia"
      />
      { lastUpdated && didInvalidate ? <ApiErrorElement /> : null }
    </div>);
  }
}

NewsletterAdd.propTypes = {
  dispatch: PropTypes.func.isRequired,
  params: PropTypes.shape({}).isRequired,
  didInvalidate: PropTypes.bool,
  lastUpdated: PropTypes.number,
};

NewsletterAdd.defaultProps = {
  didInvalidate: false,
  lastUpdated: null,
};

export default NewsletterContainer(NewsletterAdd);
