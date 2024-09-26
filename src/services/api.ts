import axios, { AxiosRequestConfig } from "axios";
import { ApiProps } from './type';

export const api = axios.create({
    baseURL: "http://localhost:3000/",
});

export async function CallApi<T>({
        url,
        method,
        data,
        contentType = 'application/json',
    } : ApiProps) {

    const options : AxiosRequestConfig = {
        url,
        method,
        headers:{
            contentType
        }
    };

    if (data) {
        options.data = data;
    }

    const response = await api.request<T>(options);
  
    return response.data;
  }
  