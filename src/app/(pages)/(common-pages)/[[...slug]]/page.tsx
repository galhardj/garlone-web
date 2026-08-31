import { getAllSlugs, getPageBySlug } from "@/src/lib/contentful/get-pages";
import ComponentMapper from "@/src/lib/contentful/mapper";

export const dynamicParams = false;

type PageProps = {
  params: Promise<{ slug?: string[] }>;
};

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
