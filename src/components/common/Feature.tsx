import { cva } from "class-variance-authority";

export type FeatureProps = {
  position: "left" | "right";
  image: {
    src: string;
    alt: string;
  };
  title: string;
  description?: string;
  richText?: React.ReactNode;
};

const featureVariants = cva("flex flex-col gap-8 lg:gap-16", {
  variants: {
    position: {
      left: "md:flex-row",
      right: "md:flex-row-reverse",
    },
  },
  defaultVariants: {
    position: "left",
  },
});

const Feature = ({
  position,
  image,
  title,
  description,
  richText,
}: FeatureProps) => {
  return (
    <section className={featureVariants({ position })}>
      <figure className="aspect-square md:w-2/5">
        <img
          className="block h-full w-full object-cover"
          src={image.src}
          alt={image.alt}
        />
      </figure>
      <div className="flex flex-col justify-center gap-2 text-justify leading-6 md:w-3/5 md:gap-5">
        <h2 className="text-left">{title}</h2>
        {richText ? (
          richText
        ) : (
          <p className="whitespace-pre-line">{description}</p>
        )}
      </div>
    </section>
  );
};

export default Feature;
