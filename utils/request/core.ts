import { FetchError } from "./error";
import type { ApiResponse, RequestOptions } from "./type";

const isServer = typeof window === "undefined";

function buildQuery(params?: Record<string, any>) {
  if (!params) return "";
  const qs = new URLSearchParams();
  Object.entries(params).forEach(([k, v]) => {
    if (v !== undefined && v !== null) {
      qs.append(k, String(v));
    }
  });
  return qs.toString();
}

export async function request<T>(
  url: string,
  options: RequestOptions = {}
): Promise<ApiResponse<T>> {
  const { params, headers, body, timeout = 10000, raw, ...rest } = options;

  const env = typeof process !== "undefined" ? process.env : undefined;
  const defaultBase =
    env?.NEXT_PUBLIC_BASE_URL ||
    (env?.VERCEL_URL ? `https://${env.VERCEL_URL}` : "http://localhost:3000");
  const baseURL = isServer ? defaultBase : "";

  const query = buildQuery(params);
  const rawUrl = query ? `${url}${url.includes("?") ? "&" : "?"}${query}` : url;
  const fullUrl =
    rawUrl.startsWith("http") || rawUrl.startsWith("//")
      ? rawUrl
      : new URL(rawUrl, isServer ? baseURL : window.location.origin).toString();

  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), timeout);

  let finalBody = body;
  const finalHeaders = new Headers(headers);

  if (body && !(body instanceof FormData)) {
    finalHeaders.set("Content-Type", "application/json");
    finalBody = JSON.stringify(body);
  }

  try {
    const res = await fetch(fullUrl, {
      ...rest,
      headers: finalHeaders,
      body: finalBody,
      signal: controller.signal,
      credentials: "include",
    });

    if (raw) return res as any;
    const data = await res.json().catch(() => null);
    if (!res.ok) {
      throw new FetchError(data?.message || res.statusText, res.status, data);
    }

    return {
      code: res.status,
      data,
      message: data?.message || res.statusText,
    };
  } catch (err: any) {
    if (err.name === "AbortError") {
      throw new FetchError("请求超时", 408);
    }
    throw err;
  } finally {
    clearTimeout(id);
  }
}
