import { ctflClient } from "@/src/lib/contentful/client";
import { mapAllSlugs } from "@/src/lib/contentful/utils";
import { ContentfulRoot } from "@/src/type/contentful";
import {
  DEFAULT_LOCALE,
  ENTRIES_LEVELS,
  CONTENT_TYPE_PAGE,
  FIELD_PAGE_SLUG,
} from "@/src/constants/contentful";

type EntriesQuery = { [FIELD_PAGE_SLUG]?: string };

export const getPages = async (
  query: EntriesQuery = {},
): Promise<ContentfulRoot> => {
  return (await ctflClient.getEntries({
    content_type: CONTENT_TYPE_PAGE,
    locale: DEFAULT_LOCALE,
    include: ENTRIES_LEVELS,
    ...query,
  })) as unknown as ContentfulRoot;
};

export const getPageBySlug = async (slug: string) =>
  getPages({ [FIELD_PAGE_SLUG]: `/${slug}` });

export const getAllSlugs = async () => {
  const allPages = await getPages();
  return mapAllSlugs(allPages);
};
