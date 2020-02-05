import { findByDataTest, findByTestAttr } from './utilsTest';
import { isUrl } from './utils';

export const commonModalUnitTest = async (wrapper, props, dataTestName) => {


  // Modal component
  const modalComponent = findByDataTest(wrapper, dataTestName);

  expect(modalComponent.length).toBe(1);


  /** ***************** Testing Submit Call*************** */

  // open the modal first
  wrapper.setState({ modalVisible: true });

  await modalComponent.props().handleOk();

  wrapper.update();

  let newModalState = wrapper.state('modalVisible');
  // Will validate the values submitted.
  expect(props.form.validateFields).toHaveBeenCalled();
  // Will close the modal after validate
  expect(newModalState).toBeFalsy();

  /** **********************Testing Cancel Call **************** */

  wrapper.setState({ modalVisible: true });

  const modalState = wrapper.state('modalVisible');

  modalComponent.props().closeModal();

  expect(props.form.resetFields).toHaveBeenCalled();

  wrapper.update();

  newModalState = wrapper.state('modalVisible');

  expect(modalState).toBeTruthy();

  expect(newModalState).toBeFalsy();


};

export const commonPaginationFooterTest = async (wrapper, fnToBeCalled) => {

  const paginationComponent = findByTestAttr(wrapper, 'PaginationFooter');

  // in case the pageSize changes,
  // the pageIndex has to comeback to 0
  await paginationComponent.props().onChange(1, 20);

  let pageIndex = wrapper.state('pageIndex');

  let pageSize = wrapper.state('pageSize');

  expect(pageIndex).toBe(0);

  expect(pageSize).toBe(20);

  // in case only page index change, page size should be the same,
  // and pageIndex change to the new value.
  await paginationComponent.props().onChange(5);

  pageIndex = wrapper.state('pageIndex');

  pageSize = wrapper.state('pageSize');

  expect(pageIndex).toBe(5);

  expect(pageSize).toBe(20);

  expect(fnToBeCalled).toHaveBeenCalled();
};

describe('isUrl tests', () => {
  it('should return false for invalid and corner case inputs', () => {
    expect(isUrl([])).toBeFalsy();
    expect(isUrl({})).toBeFalsy();
    expect(isUrl(false)).toBeFalsy();
    expect(isUrl(true)).toBeFalsy();
    expect(isUrl(NaN)).toBeFalsy();
    expect(isUrl(null)).toBeFalsy();
    expect(isUrl(undefined)).toBeFalsy();
    expect(isUrl()).toBeFalsy();
    expect(isUrl('')).toBeFalsy();
  });

  it('should return false for invalid URLs', () => {
    expect(isUrl('foo')).toBeFalsy();
    expect(isUrl('bar')).toBeFalsy();
    expect(isUrl('bar/test')).toBeFalsy();
    expect(isUrl('http:/example.com/')).toBeFalsy();
    expect(isUrl('ttp://example.com/')).toBeFalsy();
  });

  it('should return true for valid URLs', () => {
    expect(isUrl('http://example.com/')).toBeTruthy();
    expect(isUrl('https://example.com/')).toBeTruthy();
    expect(isUrl('http://example.com/test/123')).toBeTruthy();
    expect(isUrl('https://example.com/test/123')).toBeTruthy();
    expect(isUrl('http://example.com/test/123?foo=bar')).toBeTruthy();
    expect(isUrl('https://example.com/test/123?foo=bar')).toBeTruthy();
    expect(isUrl('http://www.example.com/')).toBeTruthy();
    expect(isUrl('https://www.example.com/')).toBeTruthy();
    expect(isUrl('http://www.example.com/test/123')).toBeTruthy();
    expect(isUrl('https://www.example.com/test/123')).toBeTruthy();
    expect(isUrl('http://www.example.com/test/123?foo=bar')).toBeTruthy();
    expect(isUrl('https://www.example.com/test/123?foo=bar')).toBeTruthy();
  });
});
