import { getPages } from "@/src/lib/route-handler/contentful";
import { ContentfulRoot } from "@/src/type/contentful";

const stripLeadingSlash = (slug: string): string =>
  slug.startsWith("/") ? slug.slice(1) : slug;

export const mapAllSlugs = (allPages: ContentfulRoot) =>
  allPages.items.map((page) => stripLeadingSlash(page.fields.slug));

export const getPageSlugs = async () => {
  const allPages = await getPages();
  return mapAllSlugs(allPages);
};

export const getPageBySlug = async (slug: string) => getPages(slug);
