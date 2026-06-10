import { httpClient, renderConfig } from "@/src/lib/http-client";
import { Banner } from "@/src/type/contentful";

export const fetchContentful = async () => {
  const contentfulBanner = `https://cdn.contentful.com/spaces/${process.env.CONTENTFUL_SPACE}/environments/master/entries/3h4tEEKIoBT03odMTANIoK?access_token=${process.env.CONTENTFUL_TOKEN}`;

  return await httpClient<Banner>(contentfulBanner, renderConfig.SSG);
};
