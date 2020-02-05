import React from 'react';
import { shallow, mount } from 'enzyme';
import { Form } from 'antd';
import { checkPropTypes } from 'prop-types';
import { createStore } from 'redux';
import { _setIntlObject } from 'umi/locale';
import { IntlProvider, intlShape } from 'react-intl';


import messages from '../locales/en-US';

// create any initial state needed by default
export const initialState = {
  global: {
    collapsed: true,
    actionMode: '',
    pagTotalItems: 0,
  },
  languageModel: {
    languages: [],
    loading: false,
  },
  locationModel: {
    locations: [],
    loading: false,
  },
  stateModel: {
    states: [],
    loading: false,
  },
  notices: [],
  loading: {
    effects: {
      'menu/getMenuData': false,
    },
    global: false,
    models: {
      menu: false,
    },
  },
  menu: {
    menuData: [],
  },
  routing: {},
  setting: {
    contentWidth: '',
  },
  user: {
    currentUser: {},
    list: [],
  },
};

const intlProvider = new IntlProvider({ locale: 'en-US', messages }, {});

const { intl } = intlProvider.getChildContext();

_setIntlObject(intl);

export const MockComponent = () => {
};

function nodeWithIntlProp(node) {

  return React.cloneElement(node, { intl });
}


export function mountWithIntl(node, { context, childContextTypes } = {}) {
  // if (node.type.name === 'InjectIntl') {
  //   const unwrappedType = node.type.WrappedComponent;
  //   node = React.createElement(unwrappedType, node.props);
  // }
  return mount(
    nodeWithIntlProp(node),
    {
      context: Object.assign({}, context, { intl }),
      childContextTypes: Object.assign({}, { intl: intlShape }, childContextTypes),
    },
  );
}

export function shallowWithIntl(node, { context, childContextTypes } = {}) {
  return shallow(
    nodeWithIntlProp(node),
    {
      context: Object.assign({}, context, { intl }),
      childContextTypes: Object.assign({}, { intl: intlShape }, childContextTypes),
    },
  );
}


export const storeFactory = (reducers, initState) => createStore(reducers, initState);

export const findByTestAttr = (wrapper, val) => wrapper.find(val);

export const findByDataTest = (wrapper, val) => wrapper.find(`[data-test="${val}"]`);

export const setup = (component, state) => {

  const wrapper = shallowWithIntl(component);

  if (state) wrapper.setState(state);

  return {
    wrapper,
  };

};

export const checkProps = (component, conformingProps, componentAttr) => {
  const propError = checkPropTypes(
    component.propTypes,
    conformingProps,
    'prop',
    componentAttr);
  expect(propError).toBeUndefined();
};

export const setupComponent = (component, state, context) => {
  let wrapper;

  if (context) {
    wrapper = shallowWithIntl(component, { context });
    // wrapper.setContext()
  } else {
    wrapper = shallowWithIntl(component);
  }


  if (state) wrapper.setState(state);

  return {
    wrapper,
  };

};

export const setupMountComponent = (component, state, context) => {
  let wrapper;

  if (context) {
    wrapper = mountWithIntl(component, { context });
    // wrapper.setContext()
  } else {
    wrapper = mountWithIntl(component);
  }


  if (state) wrapper.setState(state);

  return {
    wrapper,
  };

};

export const setupFormComponent = (component, store, props = {}) => {
  const EnhancedForm = Form.create()(component);
  const { wrapper } = setupComponent(<EnhancedForm store={store} {...props} />);
  return wrapper.dive();
};
// 151 characters
export const longChar151 = `Lorem ipsum dolor sit amet, 
 consectetuer adipiscing elit. Aene an commodo ligula
 eget dolor. Aenean massa. Cum sociis natoque penatibus et
 magnis dis pa`;

