import httpClient from "@/src/lib/http-client";
import { getPages } from "@/src/lib/route-handler/contentful";
import { Banner } from "@/src/type/contentful";

export const getThisFeature = async () => {
  const contentfulBanner = `${process.env.CONTENTFUL_DOMAIN_CDN}/spaces/${process.env.CONTENTFUL_SPACE}/environments/${process.env.CONTENTFUL_ENV_PROD}/entries/3h4tEEKIoBT03odMTANIoK`;

  return await httpClient<Banner>(contentfulBanner, {
    method: "GET",
    renderMode: "SSG",
    headers: {
      Authorization: `Bearer ${process.env.CONTENTFUL_TOKEN}`,
    },
  });
};

export const getPageSlugs = async () => {
  const allPages = await getPages();
  const allSlugs = allPages.items.map((page) => page.fields.slug);
  return allSlugs;
};

export const getPageBySlug = async (slug: string) => getPages(slug);
