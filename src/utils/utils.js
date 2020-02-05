import React from 'react';
import {formatMessage} from 'umi/locale';
/* eslint no-useless-escape:0 import/prefer-default-export:0 */
// eslint-disable-next-line max-len
const reg = /(((^https?:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+(?::\d+)?|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)$/;

// Check URL
export function isUrl(path) {
  return reg.test(path);
}

export const getPagCache = (name, items, ...extraItems) => {
  const cachedPagination = localStorage.getItem(name) || '';
  const pageIndexCache = cachedPagination.split(',');

  const valueToReturn = {};

  extraItems.forEach(elem => {
    Object.keys(elem).forEach((key, index) => {
      if (pageIndexCache[index] && items.length < 1) {
        // eslint-disable-next-line no-restricted-globals
        valueToReturn[key] = isNaN(pageIndexCache[index]) ? pageIndexCache[index] : parseInt(pageIndexCache[index], 10);
      } else {
        valueToReturn[key] = elem[key];
      }
    });
  });

  return valueToReturn;

};

// Check is value is empty
export const isEmpty = (value) => value === undefined || value === '' || value == null;

// Clone an object savely.
export const iterationCopy = (src) => {
  const target = {};
  Object.keys(src).forEach(key => {
    target[key] = {...src[key]};
  });
  return target;
};

// Parse value that came from form.
export const parseEditedValue = (originalValue, newValue, classType) => {
  const newValToSend = {...originalValue};
  if (newValToSend.id) {
    Object.keys(newValue).forEach(key => {
      newValToSend[key] = newValue[key];
    });
  }

  return classType.parseJsonToBE(newValToSend, newValue);
};
// Check if any of the values from @valueToBeChecked is different than newValue
export const checkIfAnyValueChanged = (valueToBeChecked, newValue) => {
  let valueChanged = false;

  Object.keys(newValue).forEach(key => {
    if (typeof newValue[key] === 'string') {
      if (valueToBeChecked[key].toLowerCase() !== newValue[key].toLowerCase()) {
        valueChanged = true;
      }
    }
    if (typeof newValue[key] === 'number') {
      if (valueToBeChecked[key] !== newValue[key]) {
        valueChanged = true;
      }
    }
    if (typeof newValue[key] === 'object' && checkIfAnyValueChanged(valueToBeChecked[key], newValue[key])) {
      valueChanged = true;
    }

  });
  return valueChanged;
};

// This will check if a value exist depending to the index passed.
// Example:
// @arrayOfValues -> languages
// @item -> samplePage
// @index -> languageCode
export const getIndexFromValue = (arrayOfValues, item, unicIndex) =>
  arrayOfValues
    .map(val => val[unicIndex].toLowerCase())
    .indexOf(item[unicIndex].toLowerCase());


// Format Validation Message
export const formatValidation = (message, value) => (
  <div style={{'display': 'block'}}>
    {formatMessage({id: message}, {value})}
  </div>
);

// Sort array by name property
export const sortByName = (a, b) => {
  if (a.name.toLowerCase() < b.name.toLowerCase()) {
    return -1;
  }
  if (a.name.toLowerCase() > b.name.toLowerCase()) {
    return 1;
  }
  return 0;
};

// Sort array by code property
export const sortByCode = (a, b) => {
  if (a.code.toLowerCase() < b.code.toLowerCase()) {
    return -1;
  }
  if (a.code.toLowerCase() > b.code.toLowerCase()) {
    return 1;
  }
  return 0;
};


// Check is value is empty
export const capitalize = (value) => value.toLowerCase().split(' ')
  .map(elem => elem.charAt(0).toUpperCase() + elem.slice(1)).join(' ');

// Sort by field
export const sortByField = (a, b, field) => {
  if (a[field] < b[field]) {
    return -1;
  }
  if (a[field] > b[field]) {
    return 1;
  }
  return 0;
};

// Sort by multiple fields
export const sortByMultipleFields = (options, fields, direction = 'ASC') => options.sort((a, b) => {
  let i = 0; 
  let result = 0;
  const directionValue = (direction === 'ASC') ? 1 : -1;
  while(i < fields.length && result === 0) {
    const field = fields[i];
    result = directionValue * (a[field] - b[field]);
    i += 1;
  }
  return result;
});
