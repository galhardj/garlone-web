// https://claude.ai/chat/294e5982-4f21-4c8c-9f50-860326c5c906
// ─── Types ────────────────────────────────────────────────────────────────────

export interface ApiConfig {
  baseUrl?: string;
  defaultHeaders?: Record<string, string>;
  timeout?: number;
  tokenProvider?: () => string | null | Promise<string | null>;
}

export interface ApiResponse<T = unknown> {
  data: T;
  status: number;
  headers: Headers;
}

export class ApiError extends Error {
  constructor(
    message: string,
    public readonly status: number,
    public readonly response?: Response,
  ) {
    super(message);
    this.name = "ApiError";
  }
}

// ─── Core ─────────────────────────────────────────────────────────────────────

const isServer = typeof window === "undefined";

function buildUrl(baseUrl: string, endpoint: string): string {
  if (endpoint.startsWith("http")) return endpoint;
  const base = baseUrl.replace(/\/$/, "");
  const path = endpoint.startsWith("/") ? endpoint : `/${endpoint}`;
  return `${base}${path}`;
}

async function parseResponse<T>(response: Response): Promise<T> {
  const contentType = response.headers.get("content-type") ?? "";

  if (contentType.includes("application/json")) {
    try {
      return (await response.json()) as T;
    } catch {
      throw new ApiError("Invalid JSON in response", response.status, response);
    }
  }

  return (await response.text()) as unknown as T;
}

async function request<T>(
  endpoint: string,
  options: RequestInit,
  config: Required<ApiConfig>,
): Promise<ApiResponse<T>> {
  const url = buildUrl(config.baseUrl, endpoint);

  // Resolve auth token
  const token = await config.tokenProvider();
  const authHeader: Record<string, string> = token
    ? { Authorization: `Bearer ${token}` }
    : {};

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), config.timeout);

  let response: Response;

  try {
    response = await fetch(url, {
      ...options,
      signal: controller.signal,
      headers: {
        "Content-Type": "application/json",
        ...config.defaultHeaders,
        ...authHeader,
        ...options.headers,
      },
    });
  } catch (err) {
    if (err instanceof Error && err.name === "AbortError") {
      throw new ApiError("Request timed out", 408);
    }
    throw err;
  } finally {
    clearTimeout(timeoutId);
  }

  if (!response.ok) {
    throw new ApiError(
      `HTTP ${response.status}: ${response.statusText}`,
      response.status,
      response,
    );
  }

  const data = await parseResponse<T>(response);
  return { data, status: response.status, headers: response.headers };
}

// ─── Factory ──────────────────────────────────────────────────────────────────

export function createApiClient(config: ApiConfig = {}) {
  const resolved: Required<ApiConfig> = {
    baseUrl: config.baseUrl ?? "",
    defaultHeaders: config.defaultHeaders ?? {},
    timeout: config.timeout ?? 10_000,
    tokenProvider: config.tokenProvider ?? (() => null),
  };

  return {
    get<T>(endpoint: string, options?: RequestInit) {
      return request<T>(endpoint, { ...options, method: "GET" }, resolved);
    },

    post<T>(endpoint: string, body?: unknown, options?: RequestInit) {
      return request<T>(
        endpoint,
        {
          ...options,
          method: "POST",
          body: body != null ? JSON.stringify(body) : undefined,
        },
        resolved,
      );
    },

    put<T>(endpoint: string, body?: unknown, options?: RequestInit) {
      return request<T>(
        endpoint,
        {
          ...options,
          method: "PUT",
          body: body != null ? JSON.stringify(body) : undefined,
        },
        resolved,
      );
    },

    patch<T>(endpoint: string, body?: unknown, options?: RequestInit) {
      return request<T>(
        endpoint,
        {
          ...options,
          method: "PATCH",
          body: body != null ? JSON.stringify(body) : undefined,
        },
        resolved,
      );
    },

    delete<T>(endpoint: string, options?: RequestInit) {
      return request<T>(endpoint, { ...options, method: "DELETE" }, resolved);
    },
  };
}

// ─── Ready-made instances ─────────────────────────────────────────────────────

/** Server-side client — use in Server Components, Route Handlers, Server Actions */
export const serverApi = createApiClient({
  baseUrl:
    process.env.API_URL ??
    process.env.NEXT_PUBLIC_API_URL ??
    "http://localhost:3000/api",
});

/** Client-side client — use in Client Components */
export const clientApi = createApiClient({
  baseUrl: process.env.NEXT_PUBLIC_API_URL ?? "/api",
  tokenProvider: () => (isServer ? null : localStorage.getItem("auth_token")),
});

export const api = isServer ? serverApi : clientApi;
