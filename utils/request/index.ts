import { request } from "./core";

export const http = {
  get<T>(url: string, options?: any) {
    return request<T>(url, { ...options, method: "GET" });
  },
  post<T>(url: string, body?: any, options?: any) {
    return request<T>(url, { ...options, method: "POST", body });
  },
  put<T>(url: string, body?: any, options?: any) {
    return request<T>(url, { ...options, method: "PUT", body });
  },
  delete<T>(url: string, options?: any) {
    return request<T>(url, { ...options, method: "DELETE" });
  },
};
