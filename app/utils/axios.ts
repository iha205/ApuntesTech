import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';

interface ApiHeaders {
  [key: string]: string;
}

async function get<T>(url: string, headers?: ApiHeaders): Promise<T> {
  const config: AxiosRequestConfig = { headers };
  try {
    const response: AxiosResponse<T> = await axios.get<T>(url, config);
    return response.data;
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
}

async function post<T, D>(url: string, data?: D, headers?: ApiHeaders): Promise<T> {
  const config: AxiosRequestConfig = { headers };
  try {
    const response: AxiosResponse<T> = await axios.post<T>(url, data, config);
    return response.data;
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
}

export { get, post };
