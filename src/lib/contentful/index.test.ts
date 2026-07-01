import { getPages } from "@/src/lib/route-handler/contentful";
import { ContentfulRoot } from "@/src/type/contentful";
import { getPageBySlug, getPageSlugs } from "./index";

jest.mock("@/src/lib/route-handler/contentful", () => ({
  getPages: jest.fn(),
}));

const mockedGetPages = getPages as jest.MockedFunction<typeof getPages>;

const createPagesResponse = (slugs: string[]): ContentfulRoot =>
  ({
    items: slugs.map((slug) => ({ fields: { slug } })),
  }) as ContentfulRoot;

describe("getPageSlugs", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("returns slugs from all pages", async () => {
    mockedGetPages.mockResolvedValue(createPagesResponse(["about", "product"]));

    await expect(getPageSlugs()).resolves.toEqual(["about", "product"]);
    expect(mockedGetPages).toHaveBeenCalledWith();
  });
});

describe("getPageBySlug", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("delegates to getPages with slug", async () => {
    const mockResponse = createPagesResponse(["contact"]);
    mockedGetPages.mockResolvedValue(mockResponse);

    await expect(getPageBySlug("contact")).resolves.toBe(mockResponse);
    expect(mockedGetPages).toHaveBeenCalledWith("contact");
  });
});
