import {
  CONTENT_TYPE_PAGE,
  DEFAULT_LOCALE,
  ENTRIES_LEVELS,
} from "@/src/constants/contentful";

const mockGetEntries = jest.fn();
const mockCreateClient = jest.fn(() => ({
  getEntries: mockGetEntries,
}));

jest.mock("contentful", () => ({
  createClient: mockCreateClient,
}));

describe("contentful route handler", () => {
  const originalEnv = process.env;

  beforeEach(() => {
    jest.resetModules();
    jest.clearAllMocks();
    process.env = {
      ...originalEnv,
      CONTENTFUL_DOMAIN_CDN: "cdn.contentful.com",
      CONTENTFUL_SPACE: "space-id",
      CONTENTFUL_ENV_PROD: "master",
      CONTENTFUL_TOKEN: "token-value",
    };
  });

  afterAll(() => {
    process.env = originalEnv;
  });

  it("creates contentful client from env vars", async () => {
    await import("./contentful");

    expect(mockCreateClient).toHaveBeenCalledWith({
      host: "cdn.contentful.com",
      space: "space-id",
      environment: "master",
      accessToken: "token-value",
    });
  });

  it("gets pages with default query params", async () => {
    const mockResponse = { items: [{ fields: { slug: "home" } }] };
    mockGetEntries.mockResolvedValue(mockResponse);

    const { getPages } = await import("./contentful");

    await expect(getPages()).resolves.toBe(mockResponse);
    expect(mockGetEntries).toHaveBeenCalledWith({
      content_type: CONTENT_TYPE_PAGE,
      locale: DEFAULT_LOCALE,
      include: ENTRIES_LEVELS,
    });
  });

  it("adds slug filter when slug provided", async () => {
    const mockResponse = { items: [{ fields: { slug: "about" } }] };
    mockGetEntries.mockResolvedValue(mockResponse);

    const { getPages } = await import("./contentful");

    await expect(getPages("about")).resolves.toBe(mockResponse);
    expect(mockGetEntries).toHaveBeenCalledWith({
      content_type: CONTENT_TYPE_PAGE,
      locale: DEFAULT_LOCALE,
      include: ENTRIES_LEVELS,
      "fields.slug": "about",
    });
  });
});
