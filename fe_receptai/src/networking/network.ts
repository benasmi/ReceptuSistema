import axios, { AxiosError, AxiosPromise, AxiosRequestConfig, AxiosResponse } from 'axios';
import { getCookie } from '../utils';


export interface IGetRequest {
  path: string;
  requestParams?: string;
}

export interface IPostRequest extends IGetRequest{
  payload: Object;
}

export interface IPostMultipartRequest {
  path: string;
  formData: string | Blob;
}

/**
 * Formed axios request
 * @param options
 * @param contentType
 */
const request = async function(options: AxiosRequestConfig, contentType = '') {

  const token = getCookie("jwt")
  const header = {
    'Content-Type': contentType === '' ? 'application/json' : contentType,
    Accept: 'application/json',
    'Access-Control-Allow-Origin': '*',
    Authorization: `Bearer ${token}`
  };

  const client = axios.create({
    baseURL: 'http://localhost:8080',
    headers: header
  });

  const onSuccess = function<T>(response: AxiosResponse) {
    console.log('Request Successful!', response);
    return response.data as T;
  };

  const onError = async function(error: AxiosError) {
    if (error.response) {
      console.debug('Status:', error.response.status);
      console.debug('Data:', error.response.data);
      console.debug('Headers:', error.response.headers);
    } else {
      console.debug('Error Message:', error.message);
    }

    return Promise.reject(error);
  };

  return client(options).then(onSuccess).catch(onError);
};

/**
 * Form a get request
 * @param path to api call
 * @param requestParams additional @RequestParams passed to Spring Boot backend
 */
export const getRequest = function({ path, requestParams = '' }: IGetRequest
): any {
  return request({
    url: path + requestParams,
    method: 'GET'
  });
};

/**
 * Form a post request
 * @param path to api call
 * @param payload to POST request
 * @param requestParams additional @RequestParams passed to Spring Boot backend
 */
export const postRequest = function({path, requestParams='', payload} : IPostRequest): any {
  return request({
    url: path + requestParams,
    method: 'POST',
    data: payload
  });
};

/**
 * Form a post request
 * @param path to api call
 * @param payload to POST request
 * @param requestParams additional @RequestParams passed to Spring Boot backend
 */
export const putRequest = function({path, requestParams='', payload} : IPostRequest): any {
  return request({
    url: path + requestParams,
    method: 'PUT',
    data: payload
  });
};

/**
 * Form a multipart request for uploading images or other files
 * @param path to api call
 * @param formData file
 */
export const postMultipartRequest = function({path, formData} : IPostMultipartRequest): any {
  return request(
    {
      url: path,
      method: 'POST',
      data: formData
    },
    'multipart/form-data'
  );
};

/**
 * Form a delete request
 * @param path to api call
 * @param requestParams additional @RequestParams passed to Spring Boot backend
 */
export const deleteRequest = function({ path, requestParams = '' }: IGetRequest): any {
  return request({
    url: path + requestParams,
    method: 'DELETE'
  });
};

