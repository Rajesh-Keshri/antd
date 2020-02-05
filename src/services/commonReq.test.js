import moxios from 'moxios';
import { languageMock, arrayLangMock } from '@/mockData/common';
import { getRequestWithParams, getRequest, postRequest } from './commonReq';
import { errorHandler } from '@/utils/request';
import { testAPIConstants } from '@/utils/constants';

const { API_CREATE_TEST, API_FETCH_TEST } = testAPIConstants;

describe('mocking axios requests', () => {
  beforeEach(() => {
    // import and pass your custom axios instance to this method
    moxios.install();
  });

  afterEach(() => {
    // import and pass your custom axios instance to this method
    moxios.uninstall();
  });


  test('testing getRequestWithParamss', async () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: languageMock,
      });
    });

    const res = await getRequestWithParams(API_FETCH_TEST, languageMock);

    expect(res).toBe(languageMock);

  });


  test('testing getRequest', async () => {

    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: arrayLangMock,
      });
    });

    const res = await getRequest(API_FETCH_TEST);

    expect(res).toBe(arrayLangMock);

  });
  test('testing getRequestWithParams', async () => {

    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: languageMock,
      });
    });

    const res = await getRequestWithParams(API_FETCH_TEST, null, languageMock);

    expect(res).toBe(languageMock);

  });

  test('testing postRequest', async () => {

    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: languageMock,
      });
    });

    const res = await postRequest(API_CREATE_TEST, languageMock);

    expect(res).toBe(languageMock);

  });

  test('testing errorHandlerEvent', async () => {
    const errorResponse = {
      response: {
        status: 400,
      },
    };
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 400,
        response: {},
      });
    });

    const res = await getRequest();

    const errorRes = errorHandler(errorResponse);

    expect(res).toEqual(errorRes);

  });

});
