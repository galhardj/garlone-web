import Hero from "@/src/components/common/Hero";
import Feature from "@/src/components/common/Feature";
import type {
  Hero as HeroFields,
  Feature as FeatureFields,
} from "@/src/type/contentful/components";

export const MappedHero = ({ fields }: { fields: HeroFields }) => {
  const mappedProps = {
    image: {
      src: fields.image.fields.file.url,
      alt: fields.image.fields.description,
    },
    title: fields.title,
    description: fields.description,
    link: {
      url: fields.callToActions[0].fields.url,
      text: fields.callToActions[0].fields.label,
    },
  };

  return <Hero {...mappedProps} />;
};

export const MappedFeature = ({
  fields: { button, ...fields },
}: {
  fields: FeatureFields;
}) => {
  const mappedProps = {
    isImageLeft: fields.isImageLeftSide,
    image: {
      src: fields.image.fields.file.url,
      alt: fields.image.fields.description,
    },
    title: fields.title,
    description: fields.description,
    ...(button && {
      button: {
        label: button.fields.label,
        href: button.fields.url,
      },
    }),
  };
  return <Feature {...mappedProps} />;
};
