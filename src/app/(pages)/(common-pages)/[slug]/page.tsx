import Hero from "@/src/components/common/Hero";
import Feature from "@/src/components/common/Feature";
import httpClient from "@/src/lib/http-client";
import { getStaticPageSlugs } from "@/src/lib/contentful";
import { type NextRouteSuccess } from "@/src/lib/route-handler/utils";

type Props = {
  params: Promise<{ slug: string }>;
};

export const dynamicParams = false;
// TODO: (06/22/26) Consider having favicon.ico in src/app/ or public/
export async function generateStaticParams() {
  // TODO: (06/20/26) Consider creating separate backend service with free hosting and allSlugs will be with httpClient
  const allSlugs = await getStaticPageSlugs();
  return allSlugs.map((slug) => ({ slug }));
}

export default async function Page({ params }: Props) {
  const { slug } = await params;
  // TODO: (06/17/26) update 'any' below NextRouteSuccess
  const res = await httpClient<NextRouteSuccess<any>>(
    `${process.env.LOCALHOST}/api/contentful/pages/${slug}`,
    {
      method: "GET",
      renderMode: "SSG",
    },
  );

  const pageComps = res.data.items[0].fields.components;

  const componentOne = pageComps[0];
  const heroBannerProps = {
    image: {
      src: componentOne.fields.image.fields.file.url,
      alt: componentOne.fields.image.fields.description,
    },
    title: componentOne.fields.title,
    description: componentOne.fields.description,
    link: {
      url: componentOne.fields.callToActions[0].fields.url,
      text: componentOne.fields.callToActions[0].fields.label,
    },
  };

  const componentTwo = pageComps[1];
  const featureProps = {
    isImageLeft: componentTwo.fields.isImageLeftSide,
    image: {
      src: componentTwo.fields.image.fields.file.url,
      alt: componentTwo.fields.image.fields.description,
    },
    title: componentTwo.fields.title,
    description: componentTwo.fields.description,
    button: {
      label: componentTwo.fields.button.fields.label,
      href: componentTwo.fields.button.fields.url,
    },
  };

  return (
    <>
      <Hero
        image={heroBannerProps.image}
        title={heroBannerProps.title}
        description={heroBannerProps.description}
        link={heroBannerProps.link}
      />
      <Feature
        isImageLeft={featureProps.isImageLeft}
        image={featureProps.image}
        title={featureProps.title}
        description={featureProps.description}
        button={featureProps.button}
      />
    </>
  );
}
