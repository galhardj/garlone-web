import Image from "next/image";
import { cn } from "@/src/lib/utils";
import { normalizeUrl } from "@/src/lib/utils";

type ImageNextProps = {
  src: string;
  alt: string;
  className?: "object-cover" | "object-contain";
  priority?: boolean;
  fill?: boolean;
  sizes?: keyof typeof imageSizes;
};

const imageSizes = {
  halfWidth: "(max-width: 768px) 100vw, 50vw",
  grid5Col: "(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 20vw",
};

const ImageNext = ({
  src,
  className,
  fill = true,
  sizes,
  ...props
}: ImageNextProps) => {
  const isLocalImage = src.startsWith("/images/");
  const imagePath = isLocalImage ? src : normalizeUrl(src);
  return (
    <Image
      src={imagePath}
      className={cn(className, "object-center")}
      fill={fill}
      sizes={sizes && imageSizes[sizes]}
      unoptimized={src.endsWith(".gif")}
      {...props}
    />
  );
};

export default ImageNext;
