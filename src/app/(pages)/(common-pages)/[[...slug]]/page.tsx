import ComponentMapper from "@/src/lib/contentful/mapper";
import { getAllSlugs, getPageBySlug } from "@/src/lib/contentful/get-pages";

export const dynamicParams = false;

type PageProps = {
  params: Promise<{ slug?: string[] }>;
};

// TODO: (06/22/26) Consider having favicon.ico in src/app/ or public/
export async function generateStaticParams() {
  const allSlugs = await getAllSlugs();
  return allSlugs.map((slug) => ({
    slug: slug.split("/"),
  }));
}

export default async function Page({ params }: PageProps) {
  const { slug } = await params;
  const slugPath = slug?.join("/") ?? ""; //homepage is undefined
  const pageData = await getPageBySlug(slugPath);
  const pageComponents = pageData.items[0].fields.components;

  return <ComponentMapper components={pageComponents} />;
}
