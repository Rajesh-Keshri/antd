import React from 'react';
import configureStore from 'redux-mock-store';
import GridContent from './GridContent';
import { initialState, setup, findByTestAttr  } from '@/utils/utilsTest';
import styles from './GridContent.less';

function setupTest(customState){ 
  // here it is possible to pass in any middleware if needed into //configureStore
  const mockStore = configureStore();
  const props ={
    contentWidth: ''
  }
  const store = mockStore({ ...customState});

  const {wrapper}  =  setup(<GridContent store={store} {...props} />)


  return {
    wrapper
  }

}


describe('ModalContent unit test',()=>{

  // Render GridContent component without error
  test('Render GridContent with contentWith as empty', () => {
        
    const { wrapper  } = setupTest(initialState);

    const gridContent = findByTestAttr(wrapper.dive(), '[data-test="grid-content"]');
        
    expect(gridContent.props().className).toBe(styles.GridContent);
        
    expect(gridContent.length).toBe(1);

  });


  // Render GridContent component without error
  test('Render GridContent with contentWidth as fixed', () => {
    initialState.setting.contentWidth= 'Fixed';

    const { wrapper  } = setupTest(initialState);

    const gridContent = findByTestAttr(wrapper.dive(), '[data-test="grid-content"]');

    expect(gridContent.props().className).toBe(`${styles.GridContent} ${styles.GridContent__wide}`);

  });
})
