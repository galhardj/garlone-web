// TODO: Check this out for best practice sample; https://dev.to/dmitrevnik/fetch-wrapper-for-nextjs-a-deep-dive-into-best-practices-53dh

type RenderMode = "SSR" | "SSG" | "ISR";

type CustomRequestInit = RequestInit & {
  method: "GET" | "POST";
  renderMode?: RenderMode;
};

const renderConfig: Record<RenderMode, RequestInit> = {
  SSR: {
    cache: "no-store" as RequestCache,
  },
  SSG: {
    cache: "force-cache" as RequestCache,
  },
  ISR: { next: { revalidate: 60 } },
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
      throw new Error(`Fetch failed: ${res.status} ${res.statusText}`);
    }

    return res.json();
  } catch (err) {
    const refinedErr =
      err instanceof Error ? err : new Error("Request failed", { cause: err });

    console.error("API error:", refinedErr);
    throw refinedErr;
  }
};

export default httpClient;
