import {
  getPages,
  getPageBySlug,
  getAllSlugs,
} from "@/src/lib/contentful/get-pages";
import { ctflClient } from "@/src/lib/contentful/client";
import { ContentfulRoot } from "@/src/type/contentful";
import {
  FIELD_PAGE_SLUG,
  CONTENT_TYPE_PAGE,
  DEFAULT_LOCALE,
  ENTRIES_LEVELS,
} from "@/src/constants/contentful";

jest.mock("@/src/lib/contentful/client", () => ({
  ctflClient: {
    getEntries: jest.fn(),
  },
}));

const mockedGetEntries = ctflClient.getEntries as jest.MockedFunction<
  typeof ctflClient.getEntries
>;

const createPagesResponse = (slugs: string[]): ContentfulRoot =>
  ({
    items: slugs.map((slug) => ({ fields: { slug } })),
  }) as ContentfulRoot;

describe("getPages", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("fetches entries with default query params", async () => {
    const mockResponse = createPagesResponse(["about", "product"]);
    mockedGetEntries.mockResolvedValue(mockResponse as never);

    await expect(getPages()).resolves.toBe(mockResponse);
    expect(mockedGetEntries).toHaveBeenCalledWith({
      content_type: CONTENT_TYPE_PAGE,
      locale: DEFAULT_LOCALE,
      include: ENTRIES_LEVELS,
    });
  });
});

describe("getPageBySlug", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("delegates to getPages with slug query", async () => {
    const mockResponse = createPagesResponse(["contact"]);
    mockedGetEntries.mockResolvedValue(mockResponse as never);

    await expect(getPageBySlug("contact")).resolves.toBe(mockResponse);
    expect(mockedGetEntries).toHaveBeenCalledWith({
      content_type: CONTENT_TYPE_PAGE,
      locale: DEFAULT_LOCALE,
      include: ENTRIES_LEVELS,
      [FIELD_PAGE_SLUG]: "/contact",
    });
  });
});

describe("getAllSlugs", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("returns slugs from all pages", async () => {
    const mockResponse = createPagesResponse(["about", "product"]);
    mockedGetEntries.mockResolvedValue(mockResponse as never);

    await expect(getAllSlugs()).resolves.toEqual(["about", "product"]);
  });
});
