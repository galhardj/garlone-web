import ImageNext from "@/src/components/common/ImageNext";
import { featureVariants, type featurePositions } from "./styles";
import { Link, type buttonColors } from "@/src/components/common/Button";

export type FeatureProps = {
  position: featurePositions;
  image: {
    src: string;
    alt: string;
  };
  title: string;
  description?: string;
  richText?: React.ReactNode; //specifically from Contentful api
  button?: {
    label: string;
    href: string;
    buttonColor: buttonColors;
  };
};

const Feature = ({
  position,
  image,
  title,
  description,
  richText,
  button,
}: FeatureProps) => {
  // TODO: Component to consider:
  // - Heading
  return (
    <section className={featureVariants({ position })}>
      <figure className="relative aspect-square h-full w-full md:w-2/5">
        <ImageNext
          src={image.src}
          alt={image.alt}
          className="object-cover"
          fill
          sizes="(max-width: 768px) 100vw, 45vw"
        />
      </figure>
      <div className="flex flex-col items-start justify-center gap-2 text-justify leading-6 md:w-3/5 md:gap-5">
        <h2 className="text-left">{title}</h2>
        {richText || <p className="whitespace-pre-line">{description}</p>}
        {button && (
          <Link
            href={button.href}
            buttonColor={button.buttonColor}
            className="self-stretch md:self-start"
          >
            {button.label}
          </Link>
        )}
      </div>
    </section>
  );
};

export default Feature;
