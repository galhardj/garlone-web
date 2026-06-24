import { createClient } from "contentful";
import { ContentfulRoot } from "@/src/type/contentful";

const ctflOptions = {
  host: `${process.env.CONTENTFUL_DOMAIN_CDN}`,
  space: `${process.env.CONTENTFUL_SPACE}`,
  environment: `${process.env.CONTENTFUL_ENV_PROD}`,
  accessToken: `${process.env.CONTENTFUL_TOKEN}`,
};

const ctflClient = createClient(ctflOptions);

//PAGE
const CONTENT_TYPE_PAGE = "page";
const DEFAULT_LOCALE = "en-US";
const ENTRIES_LEVELS = 3;

export const getPages = async (slug?: string): Promise<ContentfulRoot> =>
  (await ctflClient.getEntries({
    content_type: CONTENT_TYPE_PAGE,
    locale: DEFAULT_LOCALE,
    include: ENTRIES_LEVELS,
    ...(slug && { "fields.slug": slug }),
  })) as unknown as ContentfulRoot;
