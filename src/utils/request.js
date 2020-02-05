/**
 * request
 *  api: https://github.com/umijs/umi-request
 */
import axios from 'axios';
import { notification } from 'antd';
import { isEmpty } from './utils';
import { errorHanlderNotif } from './erroHandler';
// import { mockResponse } from '../../mock/requestResponses';

const codeMessage = {
  200: 'The server successfully returned the requested data.',
  201: 'New or modified data is successful.',
  202: 'A request has entered the background queue (asynchronous task).',
  204: 'The data was deleted successfully.',
  400: 'The request was made with an error and the server did not perform any new or modified data operations.',
  401: 'User does not have permission (token, username, password is incorrect).',
  403: 'The user is authorized, but access is forbidden.',
  404: 'The request is made for a record that does not exist and the server does not operate.',
  406: 'The format of the request is not available.',
  410: 'The requested resource is permanently deleted and will not be retrieved.',
  422: 'A validation error occurred when creating an object.',
  500: 'An error occurred on the server. Please check the server.',
  502: 'Gateway error.',
  503: 'The service is unavailable and the server is temporarily overloaded or maintained.',
  504: 'The gateway timed out.',
};

/**
 * Error Handler
 */
export const errorHandler = error => {
  const { response = {} } = error;
  const errortext = codeMessage[response.status] || response.statusText;
  const { status, url } = response;
  const errorMessage = {
    message: `Error ${status}: ${url}`,
    description: errortext,
  };

  notification.error(errorMessage);

  return errorMessage;


};


const request = async (url, method, data = null, params = null) => {

  try {
    const response = await axios({
      method,
      url,
      baseURL: '/',
      data,
      params,
    });

    if (isEmpty(response.success) || response.success) return response.data;

    errorHanlderNotif(response.data.error.message);

    return response.data;

  } catch (e) {

    return errorHandler(e);

  }

};

// return mockResponse;

export default request;
