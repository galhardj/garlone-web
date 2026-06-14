import httpClient from "@/src/lib/http-client";
import {
  nextResponseSuccess,
  nextResponseFailed,
} from "@/src/lib/route-handler";
import ContentfulRoot from "@/src/type/contentful/api";

export async function GET() {
  try {
    const allPages: ContentfulRoot = await httpClient(
      `${process.env.CONTENTFUL_DOMAIN_CDN}/spaces/${process.env.CONTENTFUL_SPACE}/environments/${process.env.CONTENTFUL_ENV_PROD}/entries?content_type=page`,
      {
        method: "GET",
        renderMode: "SSG",
        headers: {
          Authorization: `Bearer ${process.env.CONTENTFUL_TOKEN}`,
        },
      },
    );

    const allSlugs = allPages.items.map((page) =>
      page.fields.slug.replace(/^\//, ""),
    );

    return nextResponseSuccess(allSlugs);
  } catch (err) {
    return nextResponseFailed(err, "contentful/all-slugs");
  }
}
