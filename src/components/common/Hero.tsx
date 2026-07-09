import type { Document } from "@contentful/rich-text-types";
import ButtonLink from "@/src/components/common/Button/Link";
import ImageNext from "@/src/components/common/ImageNext";
import RichText from "@/src/components/common/RichText";
import { cn } from "@/src/lib/utils";

interface HeroBannerProps {
  image: {
    src: string;
    alt: string;
  };
  title: string;
  description: string | Document;
  link: {
    url: string;
    text: string;
  };
}

// TODO: consider having component for Text section (i.e., heading, paragraph, button — like Feature)
const Hero = ({ image, title, description, link }: HeroBannerProps) => {
  return (
    <div
      className={cn(
        "relative w-full lg:mb-12",
        "h-screen md:h-[58vh] lg:h-screen",
      )}
    >
      <div className="absolute inset-0 max-h-[47vh] md:max-h-[34vh] lg:max-h-[75vh]">
        <ImageNext
          src={image.src}
          alt={image.alt}
          className="object-cover"
          priority
        />
      </div>
      <div className="absolute bottom-8 left-1/2 w-[80%] -translate-x-1/2">
        <div className="bg-background absolute -inset-5 md:-inset-10 lg:-inset-12" />
        <div
          className={cn(
            "relative",
            "text-foreground text-center",
            "flex flex-col place-items-center content-center justify-center gap-4",
          )}
        >
          <h1>{title}</h1>
          <RichText
            text={description}
            className={cn(
              "max-w-2xl whitespace-pre-line [&_p:not(:last-child)]:mb-3",
              "flex min-h-60 flex-col items-center md:min-h-20",
            )}
          />
          <ButtonLink
            href={link.url}
            buttonColor="transparent"
            className="mt-3 inline-flex justify-center gap-2"
          >
            {link.text}
          </ButtonLink>
        </div>
      </div>
    </div>
  );
};

export default Hero;
