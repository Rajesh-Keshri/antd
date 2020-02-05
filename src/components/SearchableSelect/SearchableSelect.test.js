import React from 'react';
import SearchableSelect from './index'
import { setup, findByTestAttr } from '@/utils/utilsTest';

function setupTestComponent() {
  
  const props = {
    selectOnChange: jest.fn(), 
    selectedValue: '',
    searchKeys: ['code', 'name', 'country'],
    placeholder: 'From'
  }
    
  const {wrapper} = setup(<SearchableSelect {...props} />)
  
  return {
    wrapper,
    props
  }
}

describe('Testing SearchableSelect component', ()=>{
  let wrapper;
  let props;
  beforeEach(()=>{
    ({wrapper, props} = setupTestComponent());
  })
  
  test('Verify select box', ()=>{

    const topComponent = findByTestAttr(wrapper, '[data-test="searchable-select"]');
    
    expect(topComponent.length).toBe(1);
  });

  test('Check Select On Change Call.', async()=>{
    const value = 'SHJ';
    wrapper.find('Select').simulate('change', value);

    expect(props.selectOnChange).toBeCalledWith(value);
  });

})