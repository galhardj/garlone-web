// TODO: Check this out for best practice sample; https://dev.to/dmitrevnik/fetch-wrapper-for-nextjs-a-deep-dive-into-best-practices-53dh

type RenderMode = "SSR" | "SSG" | "ISR";

type CustomRequestInit = RequestInit & {
  method: "GET" | "POST";
  renderMode?: RenderMode;
};

class HttpError extends Error {
  status: number;
  constructor(message: string, status: number, options?: ErrorOptions) {
    super(message, options);
    this.status = status;
  }
}

const renderConfig: Record<RenderMode, RequestInit> = {
  SSR: {
    cache: "no-store" as RequestCache,
  },
  SSG: {
    cache: "force-cache" as RequestCache,
  },
  ISR: { next: { revalidate: 60 } },
};

export const refineCatchedErr = (err: unknown, id?: string) => {
  const refinedError =
    err instanceof HttpError
      ? err
      : new HttpError("Request failed", 500, { cause: err });
  const apiContext = id ? `[${id}] ` : "";

  console.error(`${apiContext}API error: `, refinedError);
  return refinedError;
};

const httpClient = async <T>(
  url: string,
  { renderMode, ...config }: CustomRequestInit,
): Promise<T> => {
  try {
    const requiresBody = ["POST", "PUT", "PATCH"].includes(config.method);
    const updatedConfig = {
      ...config,
      ...(renderMode && renderConfig[renderMode]),
      headers: {
        ...config.headers,
        ...(requiresBody && { "Content-Type": "application/json" }),
      },
    };

    const res = await fetch(url, updatedConfig);
    if (!res.ok) {
      throw new HttpError(
        `Fetch failed: ${res.status} ${res.statusText}`,
        res.status,
      );
    }

    return res.json();
  } catch (err) {
    throw refineCatchedErr(err);
  }
};

export default httpClient;
