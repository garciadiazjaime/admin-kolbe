import _ from 'lodash';

import constants from '../../../constants';

// If prop doesn't exist on data then invalid text is sent back
// @param {string} prop
// @param {object} data
// @return {string}
export function getErrorText(prop, data) {
  return data && data[prop] && data[prop].touch && data[prop].valid ? null : constants.invalidText;
}

// Helper function to set fields when onChange
// @param {object} event - Native event object
// @param {object} data - Form data
// @return {object}
export function setField(event, data) {
  const newData = _.assign({}, data);
  if (event && event.target) {
    const { name, value } = event.target;
    newData[name] = {
      value,
      touch: true,
      valid: !!value,
    };
  }
  return newData;
}


// Check fields submitted on a form
// @param {array} fields - eg. ['fieldName1', 'fieldName2']
// @param {object} data - eg. {fieldName1: {value: 'value', touch: 'true', valid: true}}
// @return {object}
export function checkFields(fields, data) {
  let isValid = !_.isEmpty(data);
  const newData = _.assign({}, data);

  if (_.isArray(fields) && fields.length) {
    fields.forEach((field) => {
      newData[field] = newData[field] || {};
      if (!newData[field].value) {
        isValid = false;
      }
      newData[field].touch = true;
      newData[field].valid = !!newData[field].value;
    });
  }

  return {
    isValid,
    data: newData,
  };
}
