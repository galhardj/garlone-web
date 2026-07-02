import httpClient from "@/src/lib/http-client";
import { getPages } from "@/src/lib/route-handler/contentful";
import { ContentfulRoot } from "@/src/type/contentful";
import { ThisFeature } from "@/src/type/contentful/this-feature";

export const getThisFeature = async () => {
  const contentfulBanner = `${process.env.CONTENTFUL_DOMAIN_CDN}/spaces/${process.env.CONTENTFUL_SPACE}/environments/${process.env.CONTENTFUL_ENV_PROD}/entries/3h4tEEKIoBT03odMTANIoK`;

  return await httpClient<ThisFeature>(contentfulBanner, {
    method: "GET",
    renderMode: "SSG",
    headers: {
      Authorization: `Bearer ${process.env.CONTENTFUL_TOKEN}`,
    },
  });
};

const stripLeadingSlash = (slug: string): string =>
  slug.startsWith("/") ? slug.slice(1) : slug;

export const mapAllSlugs = (allPages: ContentfulRoot) =>
  allPages.items.map((page) => stripLeadingSlash(page.fields.slug));

export const getPageSlugs = async () => {
  const allPages = await getPages();
  return mapAllSlugs(allPages);
};

export const getPageBySlug = async (slug: string) => getPages(slug);
