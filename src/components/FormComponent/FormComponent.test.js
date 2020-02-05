import React from 'react';
import { Form } from 'antd';
import { findByTestAttr,  longChar151, MockComponent, setupMountComponent, setup } from '@/utils/utilsTest';
import { languageMockForm, languageSetItemForm } from '@/mockData/common';
import FormComponent from './index';

// CREATE TEST SETTING CONTEXT
const setupTestComponent = (customProps, customForm, customHeaders) => {
  const formItems = customForm || languageMockForm.formObj
  
  const headers = customHeaders || ['title 1','title2']

  const EnhancedForm = Form.create()(MockComponent);

  const mockComponent = setup(<EnhancedForm  />).wrapper;

  const context = mockComponent.props();

  const props = {
    formItems,
    formName: 'newForm',
    form: context.form,
    headers,
    ...customProps
  };

  const {wrapper} = setupMountComponent(<FormComponent {...props} />);
  

  return {
    wrapper,
    props,
  };
};

const isEmpty = value => value === '' || value === undefined || value === null;

describe('Testing Edit/Create FormComponent', () => {
  let wrapper;

  beforeEach(() => {
    ({ wrapper } = setupTestComponent(languageSetItemForm));
  });

  test('Form Object: Render FormComponent with inputs without errors', () => {
    
    const formComponent = findByTestAttr(wrapper, '[data-test="form-item"]');

    expect(formComponent.length).toBe(3);
  });

  test('Check 3 fields are rendered and named properly', () => {
    const formFields = findByTestAttr(wrapper, 'Input');

    const formItems = Object.keys(languageMockForm.formObj).map(e => languageMockForm.formObj[e]);

    expect(formFields.length).toBe(formItems.length);

    const fieldNames = wrapper.props().form.getFieldsValue();

    const arrayFields = Object.keys(fieldNames);

    for (let index = 0; index < arrayFields.length; index += 1) {
      expect(arrayFields.indexOf(formItems[index].name) > -1).toBe(true);
    }
  });

});

describe('Testing Create FormComponent', () => {
  let wrapper;

  beforeEach(() => {
    ({ wrapper } = setupTestComponent(languageSetItemForm));
  });

  test('Check if values are setted properly.', () => {
    const testingValues = {
      code: '',
      name: '',
      nativeName: '',
    };

    wrapper.props().form.setFieldsValue(testingValues);

    const fieldForm = wrapper.props().form.getFieldsValue();

    expect(fieldForm.code).toBe(testingValues.code);

    expect(fieldForm.name).toBe(testingValues.name);

    expect(fieldForm.nativeName).toBe(testingValues.nativeName);
  });
});

describe('Testing Edit FormComponent', () => {
  let wrapper;
  let props;
  beforeEach(() => {
    ({ wrapper, props } = setupTestComponent(languageSetItemForm));
  });

  test('Check if values are setted properly in EditForm', () => {
    expect(props).toBeDefined();
  });

  test('Check if values are setted properly in EditForm', () => {
    const fieldForm = wrapper.props().form.getFieldsValue();

    expect(fieldForm.languageCode).toBe(languageSetItemForm.item.languageCode);

    expect(fieldForm.name).toBe(languageSetItemForm.item.name);

    expect(fieldForm.nativeName).toBe(languageSetItemForm.item.nativeName);
  });
})

test('Check LanguageCode rules', async () => {
  // languageCode Incorrect
  const testingValues = {
    languageCode: '',
    name: '',
    nativeName: '',
  };

  const langRegex = languageMockForm.formObj.LanguageCode.rules[2].pattern;
  const maxLength = languageMockForm.formObj.LanguageCode.rules[1].max;

  // is Required
  expect(isEmpty(testingValues.languageCode)).toBeTruthy();

  // Max 2 length
  testingValues.languageCode = 'ENasd23';
  expect(testingValues.languageCode.length <= maxLength).toBeFalsy();

  // Only alpha
  expect(langRegex.test(testingValues.languageCode)).toBeFalsy();

  // languageCode CORRECT
  testingValues.languageCode = 'EN';

  // is Required
  expect(isEmpty(testingValues.languageCode)).toBeFalsy();

  // Max 2 length
  expect(testingValues.languageCode.length <= maxLength).toBeTruthy();

  // Only alpha
  expect(langRegex.test(testingValues.languageCode)).toBeTruthy();
});

it('Check name rules', async () => {
  // languageCode Incorrect
  const testingValues = {
    languageCode: '',
    name: '',
    nativeName: '',
  };

  // Name INVALID
  const maxLength = languageMockForm.formObj.Name.rules[1].max;

  // is Required
  expect(isEmpty(testingValues.name)).toBeTruthy();

  testingValues.name = longChar151 + longChar151;
  // Max 150 length
  expect(testingValues.name.length <= maxLength).toBeFalsy();

  // Name VALID
  testingValues.name = 'EN';

  // is Required
  expect(isEmpty(testingValues.name)).toBeFalsy();

  // Max 150 length
  expect(testingValues.languageCode.length <= maxLength).toBeTruthy();
});

it('Check nativeName rules', async () => {
  // languageCode Incorrect
  const testingValues = {
    languageCode: '',
    name: '',
    nativeName: '',
  };

  // Name INVALID
  const maxLength = languageMockForm.formObj.nativeName.rules[1].max;

  // is Required
  expect(isEmpty(testingValues.nativeName)).toBeTruthy();

  // Max 150 length
  testingValues.nativeName = longChar151 + longChar151;
  expect(testingValues.nativeName.length <= maxLength).toBeFalsy();

  // nativeName VALID
  testingValues.nativeName = 'EN';

  // is Required
  expect(isEmpty(testingValues.nativeName)).toBeFalsy();

  // Max 150 length
  expect(testingValues.nativeName.length <= maxLength).toBeTruthy();
});


describe('Checking formComponent with a different form structure', ()=>{

  test('Form Array(1): Render FormComponent with inputs without errors', () => {
    const {wrapper} =   setupTestComponent(languageSetItemForm, languageMockForm.formArr1, []);
    const formComponent = findByTestAttr(wrapper, '[data-test="form-item"]');
    let numberOfFields = 0;
    languageMockForm.formArr1.forEach(form => { numberOfFields += Object.keys(form).length; });
    
    expect(formComponent.length).toBe(numberOfFields);
  });
  
  test('Form Array(2): Render FormComponent with inputs without errors', () => {
    const {wrapper} =   setupTestComponent(languageSetItemForm, languageMockForm.formArr2);
    const formComponent = findByTestAttr(wrapper, '[data-test="form-item"]');
    let numberOfFields = 0;
    languageMockForm.formArr2.forEach(form => { numberOfFields += Object.keys(form).length; });
    
    expect(formComponent.length).toBe(numberOfFields);
  });

 
})