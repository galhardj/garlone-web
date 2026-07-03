import { mapAllSlugs } from "./utils";
import { ContentfulRoot } from "@/src/type/contentful";

const createPagesResponse = (slugs: string[]): ContentfulRoot =>
  ({
    items: slugs.map((slug) => ({ fields: { slug } })),
  }) as ContentfulRoot;

describe("mapAllSlugs", () => {
  it("strips a leading slash when present", () => {
    const mockallPages = createPagesResponse(["/about"]);
    const result = mapAllSlugs(mockallPages);
    expect(result).toEqual(["about"]);
  });

  it("leaves the slug unchanged when there is no leading slash", () => {
    const mockallPages = createPagesResponse(["about"]);
    const result = mapAllSlugs(mockallPages);
    expect(result).toEqual(["about"]);
  });

  it("handles a mix of slugs with and without a leading slash", () => {
    const mockallPages = createPagesResponse(["/about", "product", "/contact"]);
    const result = mapAllSlugs(mockallPages);
    expect(result).toEqual(["about", "product", "contact"]);
  });

  it("returns an empty array for no pages", () => {
    const mockallPages = createPagesResponse([]);
    const result = mapAllSlugs(mockallPages);
    expect(result).toEqual([]);
  });
});
