/* eslint-disable no-unused-vars */

import axios, {
    AxiosError,
    AxiosInstance,
    AxiosRequestConfig,
    AxiosResponse,
  } from 'axios';
  
  export const api_url =
    process.env.REACT_APP_BUILDSTATUS === 'homol'
      ? 'http://192.168.68.102:8000/api/'
      : process.env.NODE_ENV === 'production'
      ? 'http://192.168.68.102:8000/api/'
      : 'http://192.168.68.102:8000/api/';
  
  // export const api_url =
  //   process.env.NODE_ENV === 'production'
  //     ? 'http://app-balancer-1452495260.sa-east-1.elb.amazonaws.com:8000/api/'
  //     : 'http://localhost:8000/api/';
  
  export default function api(): AxiosInstance {
    const api_token = localStorage.getItem('token');
    let axiosInstance = axios.create({
      baseURL: api_url,
      //Use abaixo a instancia do Token
      headers: {
        authorization: api_token ? `Token ${api_token}` : '',
      },
    });
  
    const onRequest = (config: AxiosRequestConfig): AxiosRequestConfig => {
      // console.info(`[INTERCEPTOR request] [${JSON.stringify(config)}]`);
      return config;
    };
  
    const onRequestError = (error: AxiosError): Promise<AxiosError> => {
      // console.error(`[INTERCEPTOR request error] [${JSON.stringify(error)}]`);
      if (error.response?.status === 401) {
        document.location.href = location.origin + '/login';
      }
      return Promise.reject(error);
    };
  
    const onResponse = (response: AxiosResponse): AxiosResponse => {
      // console.info(`[INTERCEPTOR response] [${JSON.stringify(response)}]`);
      return response;
    };
  
    const onResponseError = (error: AxiosError): Promise<AxiosError> => {
      // console.error(`[INTERCEPTOR response error] [${JSON.stringify(error)}]`);
      if (error.response?.status === 401) {
        document.location.href = location.origin + '/login';
      }
      return Promise.reject(error);
    };
  
    axiosInstance.interceptors.request.use(onRequest, onRequestError);
    axiosInstance.interceptors.response.use(onResponse, onResponseError);
  
    return axiosInstance;
  }
  