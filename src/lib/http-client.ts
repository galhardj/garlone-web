// TODO: Check this out for best practice sample; https://dev.to/dmitrevnik/fetch-wrapper-for-nextjs-a-deep-dive-into-best-practices-53dh

export const renderConfig: Record<string, RequestInit> = {
  SSR: {
    cache: "no-store" as RequestCache,
  },
  SSG: {
    cache: "force-cache" as RequestCache,
  },
  ISR: { next: { revalidate: 60 } },
};

export const httpClient = async <T>(
  url: string,
  config: RequestInit,
): Promise<T> => {
  try {
    const res = await fetch(url, config);

    if (!res.ok) {
      throw new Error(`Fetch failed: ${res.status} ${res.statusText}`);
    }

    return res.json();
  } catch (err) {
    console.error("API error:", err);
    throw err;
  }
};
