import { ContentfulRoot } from "@/src/type/contentful";

const stripLeadingSlash = (slug: string): string =>
  slug.startsWith("/") ? slug.slice(1) : slug;

export const mapAllSlugs = (allPages: ContentfulRoot) =>
  allPages.items.map((page) => stripLeadingSlash(page.fields.slug));
