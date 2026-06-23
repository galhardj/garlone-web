import Hero from "@/src/components/common/Hero";
import Feature from "@/src/components/common/Feature";

export const MappedHero = ({ fields }: { fields: any }) => {
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

export const MappedFeature = ({ fields }: { fields: any }) => {
  const mappedProps = {
    isImageLeft: fields.isImageLeftSide,
    image: {
      src: fields.image.fields.file.url,
      alt: fields.image.fields.description,
    },
    title: fields.title,
    description: fields.description,
    button: {
      label: fields.button.fields.label,
      href: fields.button.fields.url,
    },
  };
  return <Feature {...mappedProps} />;
};
