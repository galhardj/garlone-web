const mockCreateClient = jest.fn();
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
    await import("./client");

    expect(mockCreateClient).toHaveBeenCalledWith({
      host: "cdn.contentful.com",
      space: "space-id",
      environment: "master",
      accessToken: "token-value",
    });
  });
});
