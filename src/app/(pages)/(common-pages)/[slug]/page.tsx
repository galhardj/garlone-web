import httpClient from "@/src/lib/http-client";
import { getStaticPageSlugs } from "@/src/lib/contentful";
import { NextRouteSuccess } from "@/src/lib/route-handler/utils";

type Props = {
  params: Promise<{ slug: string }>;
};

export const dynamicParams = false;
export async function generateStaticParams() {
  // TODO: (06/20/26) Consider creating separate backend service with free hosting and allSlugs will be with httpClient
  const allSlugs = await getStaticPageSlugs();
  return allSlugs.map((slug) => ({ slug }));
}

export default async function Page({ params }: Props) {
  const { slug } = await params;

  return <div>{slug}</div>;
}
