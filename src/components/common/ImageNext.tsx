import Image, { type ImageProps } from "next/image";
import { cn } from "@/src/lib/utils/mergeTailwind";

type ImageNextProps = {
  src: string;
  alt: string;
  className?: "object-cover" | "object-contain";
  fill?: boolean;
  priority?: boolean;
  sizes?: ImageProps["sizes"];
};

const ImageNext = ({
  className,
  src,
  fill = true,
  ...props
}: ImageNextProps) => {
  return (
    <Image
      src={src}
      fill={fill}
      unoptimized={src.endsWith(".gif")}
      className={cn(className, "object-center")}
      {...props}
    />
  );
};

export default ImageNext;
