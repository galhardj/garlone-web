import ComponentMapper from "@/src/lib/contentful/components-mapper";
import { getPageSlugs, getPageBySlug } from "@/src/lib/contentful";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export const dynamicParams = false;
// TODO: (06/22/26) Consider having favicon.ico in src/app/ or public/
export async function generateStaticParams() {
  const allSlugs = await getPageSlugs();
  return allSlugs.map((slug) => ({ slug }));
}

export default async function Page({ params }: PageProps) {
  const { slug } = await params;
  const pageData = await getPageBySlug(slug);
  const pageComponents = pageData.items[0].fields.components;

  return <ComponentMapper components={pageComponents} />;
}
