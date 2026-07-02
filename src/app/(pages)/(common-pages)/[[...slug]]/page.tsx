import ComponentMapper from "@/src/lib/contentful/components-mapper";
import { getPageSlugs, getPageBySlug } from "@/src/lib/contentful";

export const dynamicParams = false;

type PageProps = {
  params: Promise<{ slug?: string[] }>;
};

// TODO: (06/22/26) Consider having favicon.ico in src/app/ or public/
const mapSlugParams = (slug: string) =>
  slug === "" ? undefined : slug.split("/");

export async function generateStaticParams() {
  const allSlugs = await getPageSlugs();
  return allSlugs.map((slug) => ({
    slug: mapSlugParams(slug),
  }));
}

export default async function Page({ params }: PageProps) {
  const { slug } = await params;
  const slugPath = slug ? slug.join("/") : "";
  const pageData = await getPageBySlug(slugPath);
  const pageComponents = pageData.items[0].fields.components;

  return <ComponentMapper components={pageComponents} />;
}
