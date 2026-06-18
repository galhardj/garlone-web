import httpClient from "@/src/lib/http-client";
import { NextRouteSuccess } from "@/src/lib/route-handler/utils";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const res = await httpClient<NextRouteSuccess<string[]>>(
    `${process.env.LOCALHOST}/api/contentful/pages/`,
    {
      method: "GET",
      renderMode: "SSR",
    },
  );

  const allSlugs = res.data;
  return allSlugs.map((slug) => ({ slug }));
}

export default async function Page({ params }: Props) {
  const { slug } = await params;

  return <div>{slug}</div>;
}
