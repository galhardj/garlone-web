import Image, { type ImageProps } from "next/image";
import { cn } from "@/src/lib/utils/mergeTailwind";

type ImageNextProps = {
  src: string;
  alt: string;
  className?: string;
  fill?: boolean;
  priority?: boolean;
  sizes?: ImageProps["sizes"];
};

// TODO: consider; div wrapping, 'sizes' att
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

// export type ImageProps = {
//   sources?: Partial<{ [_T in ScreenNames]: string }>;
//   img: Img;
//   imageWidths?: object;
//   defaultWidth?: number;
//   priority?: boolean;
//   ariaHidden?: boolean;
//   alt?: string;
//   useProductWrapper?: boolean;
//   objectFit?: ImgElementStyle["objectFit"];
// };
