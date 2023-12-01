import axios, { AxiosResponse, AxiosRequestConfig } from "axios";

const config = {
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  withCredentials: true,
};

function defaultResponseHandler(res: AxiosResponse) {
  return res["data"];
}

const axiosInstance = axios.create(config);

export async function get<T>(
  url: string,
  config: AxiosRequestConfig = {}
): Promise<T> {
  return axiosInstance.get<T>(url, config).then(defaultResponseHandler);
}
