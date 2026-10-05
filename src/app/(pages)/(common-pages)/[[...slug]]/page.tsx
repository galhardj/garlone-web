import contentstack from "@contentstack/delivery-sdk";
import { getAllSlugs, getPageBySlug } from "@/src/lib/contentful/get-pages";
import ComponentMapper from "@/src/lib/contentful/mapper";
import { footer } from "@/src/lib/contentstack/graphql/get-data";

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
  // console.log("Contentstack pages: ", footer);
  const stack = contentstack.stack({
    apiKey: "blt34f9c062eb4fca11",
    deliveryToken: "cs34e135933f1b8d9eda0fb899",
    environment: "production",
    branch: "main",
    region: "eu",
  });

  const entry = await stack
    .contentType("footer")
    .entry("bltfcb70edbf001be69")
    // .includeReference("carousel_items")
    .fetch();

  console.log(entry);

  const { slug } = await params;
  const slugPath = slug?.join("/") ?? ""; //homepage is undefined
  const pageData = await getPageBySlug(slugPath);
  const pageComponents = pageData.items[0].fields.components;

  return <ComponentMapper components={pageComponents} />;
}
