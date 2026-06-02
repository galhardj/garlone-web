import { fetcher } from "@/src/lib/fetcher";
import { Banner } from "@/src/type/contentful";
import { SSG } from "@/src/constants/rendering-type";

export const fetchContentful = async () => {
  const contentfulBanner = `https://cdn.contentful.com/spaces/${process.env.CONTENTFUL_SPACE}/environments/master/entries/3h4tEEKIoBT03odMTANIoK?access_token=${process.env.CONTENTFUL_TOKEN}`;

  return await fetcher<Banner>(contentfulBanner, SSG);
};
