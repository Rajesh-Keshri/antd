import React from 'react';
import { findByTestAttr, setupMountComponent, MockComponent, setup } from '@/utils/utilsTest';
import { testFormFactoryMock } from '@/mockData/common';
import { Form } from 'antd';
import FormFactory from './index';


// CREATE TEST SETTING CONTEXT
const setupTestComponent = () => {
  const EnhancedForm = Form.create()(MockComponent);

  const mockComponent = setup(<EnhancedForm  />).wrapper;

  const context = mockComponent.props();

  const props = {
    
    formArray:testFormFactoryMock,
    getFieldDecorator: context.form.getFieldDecorator,
    editValue: false,
    readOnly: false,
    onChangeEventRef: jest.fn()
  };

  const {wrapper} = setupMountComponent(<FormFactory {...props} />);
  

  return {
    wrapper,
    props,
  };
};

describe('Testing Edit/Create FormComponent', () => {
  let wrapper;

  beforeEach(() => {
    ({ wrapper } = setupTestComponent());
  });

  test('Form component is rendering without errors', () => {
    
    const formComponent = findByTestAttr(wrapper, Form.Item);

    expect(formComponent.length).toBe(testFormFactoryMock.length);
  });
 
  test('Form component is rendering without errors', () => {
    
    const formComponent = findByTestAttr(wrapper, Form.Item);

    expect(formComponent.length).toBe(testFormFactoryMock.length);
  });

})