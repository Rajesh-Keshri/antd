import React from 'react';
import { findByTestAttr, setup } from '@/utils/utilsTest';
import LoaderDataHandler from './LoaderDataHandler';


function setupTestComponent(){
  const props = {
    loading: true,
  };

  const { wrapper}  = setup(<LoaderDataHandler {...props} />);

  return {
    wrapper
  }

}

describe('Testting Edit Button Component', ()=>{
  let wrapper;

  beforeEach(()=>{
    ({ wrapper } = setupTestComponent());
  });

  test('LoaderHandler render component', ()=>{

    // loading =true
    const pageLoadingComponent = findByTestAttr(wrapper.dive(),'[data-test="pageLoading-component"]');

    expect(pageLoadingComponent.length).toBe(1);

    // loading =false
    wrapper.setProps({loading:false });

    const emptyComponent = findByTestAttr(wrapper,'[data-test="empty-component"]');

    expect(emptyComponent.length).toBe(1);

  })

});

