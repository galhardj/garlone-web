// TODO: Check this out for best practice sample; https://dev.to/dmitrevnik/fetch-wrapper-for-nextjs-a-deep-dive-into-best-practices-53dh

export const fetcher = async <T>(
  url: string,
  options: RequestInit,
): Promise<T> => {
  try {
    // TODO: Validate / fix this Certificate handling
    // In dev on the server, relax TLS verification to avoid local issuer cert errors.
    // Do NOT rely on this in production; fix your system / proxy certs instead.
    const isServer = typeof window === "undefined";
    if (isServer && process.env.NODE_ENV !== "production") {
      process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
    }

    const res = await fetch(url, options);

    if (!res.ok) {
      throw new Error(`Fetch failed: ${res.status} ${res.statusText}`);
    }

    return res.json();
  } catch (err) {
    console.error("API error:", err);
    throw err;
  }
};
