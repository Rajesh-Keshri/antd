import request from '@/utils/request';

export async function postRequest(url, params) {
  return request(url, 'post', params);
}

export async function getRequest(url, params) {
  return request(url, 'get', params);
}

export async function getRequestWithParams(url, payload, params) {
  return request(url, 'get', payload, params);
}
