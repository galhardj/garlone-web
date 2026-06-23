import PageComponents from "@/src/lib/contentful/components-mapper";
import httpClient from "@/src/lib/http-client";
import { getStaticPageSlugs } from "@/src/lib/contentful";
import { type NextRouteSuccess } from "@/src/lib/route-handler/utils";

type Props = {
  params: Promise<{ slug: string }>;
};

export const dynamicParams = false;
// TODO: (06/22/26) Consider having favicon.ico in src/app/ or public/
export async function generateStaticParams() {
  const allSlugs = await getStaticPageSlugs();
  return allSlugs.map((slug) => ({ slug }));
}

export default async function Page({ params }: Props) {
  const { slug } = await params;
  // TODO: (06/17/26) Update 'any' below NextRouteSuccess
  const res = await httpClient<NextRouteSuccess<any>>(
    `${process.env.LOCALHOST}/api/contentful/pages/${slug}`,
    {
      method: "GET",
      renderMode: "SSR",
    },
  );

  const pageComponents = res.data.items[0].fields.components;

  return <PageComponents components={pageComponents} />;
}
