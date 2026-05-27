import ImageNext from "@/src/components/common/ImageNext";
import { LinkButton } from "@/src/components/common/Button";
import { MoveRight } from "lucide-react";
import { HeroBannerProps } from "@/src/type/props";

const Hero = ({
  image,
  title,
  subtitle,
  description,
  link,
}: HeroBannerProps) => {
  return (
    <div className="relative h-screen w-full">
      <div className="absolute inset-0 max-h-[75vh]">
        <ImageNext
          src={image.src}
          alt={image.alt}
          className="object-cover"
          priority
        />
      </div>
      <div className="absolute bottom-8 left-1/2 w-[80%] -translate-x-1/2">
        <div className="bg-background absolute -inset-8 lg:-inset-12" />
        <div className="text-foreground relative flex flex-col items-center gap-4">
          <h1>{title}</h1>
          <p className="max-w-lg text-center">{description}</p>
          <LinkButton
            href={link.url}
            buttonColor="transparent"
            className="inline-flex justify-center gap-2"
          >
            {link.text}
          </LinkButton>
        </div>
      </div>
    </div>
  );
};

export default Hero;
