import React from 'react';
import HeaderAddButton from '.';
import { setup, findByTestAttr, checkProps} from '@/utils/utilsTest';

function setupTestComponent(){ 
  const props= {
    title: '',
    name:'',
    onClick: jest.fn()
  }
  const {wrapper} = setup(<HeaderAddButton {...props} />);


  return { 
    wrapper,
    props
  }
}

test('Render without error', ()=>{
  const {wrapper}  = setupTestComponent();

  const btnComponent = findByTestAttr(wrapper, 'Button');
    
  expect(btnComponent.length).toBe(1);

});

test('Confirm proptypes', ()=>{
  const { props}  = setupTestComponent();

  checkProps(HeaderAddButton.propTypes, props,  HeaderAddButton.name);

  checkProps(HeaderAddButton.propTypes, props,  HeaderAddButton.createModal);

});

test('Checking toggleModal method call', ()=>{
  const { wrapper, props }  = setupTestComponent();

  const btnComponent = findByTestAttr(wrapper, 'Button');

  btnComponent.simulate('click');

  wrapper.update();

  expect(props.onClick).toHaveBeenCalled();

  expect(props.onClick).toHaveBeenCalledTimes(1);
});
