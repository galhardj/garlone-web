import { createClient } from "contentful";
import { ContentfulRoot } from "@/src/type/contentful";
import {
  CONTENT_TYPE_PAGE,
  DEFAULT_LOCALE,
  ENTRIES_LEVELS,
} from "@/src/constants/contentful";

const ctflOptions = {
  host: `${process.env.CONTENTFUL_DOMAIN_CDN}`,
  space: `${process.env.CONTENTFUL_SPACE}`,
  environment: `${process.env.CONTENTFUL_ENV_PROD}`,
  accessToken: `${process.env.CONTENTFUL_TOKEN}`,
};

const ctflClient = createClient(ctflOptions);

export const getPages = async (slug?: string): Promise<ContentfulRoot> =>
  (await ctflClient.getEntries({
    content_type: CONTENT_TYPE_PAGE,
    locale: DEFAULT_LOCALE,
    include: ENTRIES_LEVELS,
    ...(slug && { "fields.slug": slug }),
  })) as unknown as ContentfulRoot;
