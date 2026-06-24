import ImageNext from "@/src/components/common/ImageNext";
import RichText from "@/src/components/common/RichText";
import { LinkButton, type buttonColors } from "@/src/components/common/Button";
import { featureVariants } from "./styles";
import type { Document } from "@contentful/rich-text-types";

export type FeatureProps = {
  isImageLeft: boolean;
  image: {
    src: string;
    alt: string;
  };
  title: string;
  description: string | Document;
  button?: {
    label: string;
    href: string;
    buttonColor?: buttonColors;
  };
};

const Feature = ({
  isImageLeft = true,
  image,
  title,
  description,
  button,
}: FeatureProps) => {
  return (
    <section
      className={featureVariants({ position: isImageLeft ? "left" : "right" })}
    >
      <figure className="relative aspect-square h-full w-full md:w-2/5">
        <ImageNext
          src={image.src}
          alt={image.alt}
          className="object-cover"
          fill
          sizes="halfWidth"
        />
      </figure>
      <div className="flex flex-col items-start justify-center gap-2 text-justify leading-6 md:w-3/5 md:gap-5">
        <h2 className="text-left">{title}</h2>
        <RichText text={description} className="whitespace-pre-line" />
        {button && (
          <LinkButton
            href={button.href}
            buttonColor={button.buttonColor}
            className="self-stretch md:self-start"
          >
            {button.label}
          </LinkButton>
        )}
      </div>
    </section>
  );
};

export default Feature;
