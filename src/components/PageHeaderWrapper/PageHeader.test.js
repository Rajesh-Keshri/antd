import React from 'react';
import configureStore from 'redux-mock-store';
import PageHeaderWrapper from '.';
import { initialState, findByTestAttr, setup } from '@/utils/utilsTest';


function setupTestComponent() {
  // here it is possible to pass in any middleware if needed into //configureStore
  const mockStore = configureStore();

  const props = {
    itemName: 'Some Item',
    title: 'Some Title',
    breadCrumbBtnTitle: 'someTitle',
    breadCrumbBtnAction: jest.fn(),
    breadCrumbBtn: true,
    dispatch: jest.fn()
  }

  const store = mockStore({ ...initialState });

  const { wrapper } = setup(<PageHeaderWrapper.WrappedComponent store={store} {...props} />);


  return {
    wrapper,
    props,
    store
  }
}

describe('Testing PageHeader component', () => {
  let wrapper;
  let props;

  beforeEach(() => {
    ({ wrapper, props } = setupTestComponent());
  })

  test('Render Wrapper Component without  error', () => {

    // First div that wraps render
    const wrapperComponent = findByTestAttr(wrapper, '[data-test="wrapper-component"]');

    expect(wrapperComponent.length).toBe(1);

    // Check default Props
    expect(PageHeaderWrapper.defaultProps.breadCrumbBtn).toBeDefined();

    expect(PageHeaderWrapper.defaultProps.status).toBeDefined();


  });


  test('testing PageHeader action -> PageHeaderAddButton actions', () => {

    /** ************************breadCrumbBtn = true ******************************* */
    // Page Header Action called
    wrapper.props().children[1].props.children().props.extra.props.onClick();

    expect(props.breadCrumbBtnAction).toHaveBeenCalled();

    /** ************************breadCrumbBtn = false ******************************* */

    // In case breadCrumbBtn isn't setted shouldn't show any action
    wrapper.setProps({ breadCrumbBtn: false })

    expect(wrapper.props().children[1].props.children().props.extra).toBe(null)

  })

});


