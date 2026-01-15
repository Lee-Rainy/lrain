export interface RequestOptions extends RequestInit {
  params?: Record<string, any>;
  timeout?: number;
  raw?: boolean; // 是否返回原始 Response
}

export interface ApiResponse<T = any> {
  code: number;
  data: T;
  message?: string;
}
